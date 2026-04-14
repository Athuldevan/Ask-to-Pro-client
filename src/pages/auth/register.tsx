// pages/auth/RegisterPage.tsx
import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Link,
} from "@mui/material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../../lib/slices/authApi";
import FormBuilder from "../../components/custom/FormBuilder";
import type { FieldConfig } from "../../components/custom/FormBuilder";
import {
  mentorRegistrationSchema,
  otpSchema,
  studentRegistrationSchema,
  type MentorRegistrationForm,
  type OtpForm,
  type StudentRegistrationForm,
} from "../../lib/zod/formSchema";
import type { RegistrationData } from "../../types/student";
import type { Role } from "../../constants/role";

type FormData = StudentRegistrationForm | MentorRegistrationForm;

const RegisterPage = () => {
  const navigate = useNavigate();

  // State
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  

  const [activeStep, setActiveStep] = useState(0);
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);
  const [userEmail, setUserEmail] = useState("");

  // RTK Query hooks
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const steps = ["Create Account", "Verify Email"];

  // ============ Student Fields ============
  const studentFields: FieldConfig<StudentRegistrationForm>[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Phone Number (Optional)",
      type: "text",
      placeholder: "10-digit phone number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a strong password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
    },
  ];

  // ============ Mentor Fields ============
  const mentorFields: FieldConfig<MentorRegistrationForm>[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Phone Number (Optional)",
      type: "text",
      placeholder: "10-digit phone number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a strong password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
    },
  ];

  // ============ OTP Fields ============
  const otpFields: FieldConfig<OtpForm>[] = [
    {
      name: "otp",
      label: "Verification Code",
      type: "text",
      placeholder: "Enter 6-digit OTP",
    },
  ];

  // ============ Get Config Based on Role ============
  const getFieldsForRole = () => {
    return selectedRole === "mentor" ? mentorFields : studentFields;
  };

  const getSchemaForRole = () => {
    return selectedRole === "mentor"
      ? mentorRegistrationSchema
      : studentRegistrationSchema;
  };

  const getDefaultValuesForRole = (): FormData => {
    if (selectedRole === "mentor") {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      };
    }
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    };
  };

  const handleRegistrationSubmit = async (values: FormData) => {
    try {
      const { confirmPassword, ...dataToSend } = values;
      console.log(confirmPassword);
      // Clean empty strings
      const cleanedData = Object.fromEntries(
        Object.entries(dataToSend).filter(([_, v]) => v !== ""),
      );

      const response = await sendOtp({
        role: selectedRole,
        data: cleanedData,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message);
        setRegistrationData(cleanedData as RegistrationData);
        setUserEmail(values.email);
        setActiveStep(1);
      }
    } catch (error: any) {
      const message = error?.data?.message || "Failed to send OTP";
      toast.error(message);
    }
  };

  const handleOtpSubmit = async (values: OtpForm) => {
    if (!userEmail) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }
    try {
      const response = await verifyOtp({
        role: selectedRole,
        email: userEmail,
        otp: values.otp,
      }).unwrap();

      if (response.status === "success") {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error: any) {
      const message = error?.data?.message || "OTP verification failed";
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    if (!registrationData) {
      toast.error("Registration data not found");
      return;
    }

    try {
      const response = await sendOtp({
        role: selectedRole,
        data: registrationData,
      }).unwrap();

      if (response.status === "success") {
        toast.success("OTP resent successfully!");
      }
    } catch (error: any) {
      const message = error?.data?.message || "Failed to resend OTP";
      toast.error(message);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
    setRegistrationData(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ bgcolor: "background.default", p: 2 }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              alt="Logo"
              sx={{ width: 70, height: 70, mb: 2 }}
              variant="square"
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {activeStep === 0 ? "Create Account" : "Verify Email"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeStep === 0
                ? "Join our mentorship platform"
                : `Enter the OTP sent to ${userEmail}`}
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ width: "100%" }}>
            {activeStep === 0 ? (
              <>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Register as</InputLabel>
                  <Select
                    value={selectedRole}
                    label="Register as"
                    onChange={(e) => setSelectedRole(e.target.value as Role)}
                    disabled={isSendingOtp}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="mentor">Mentor</MenuItem>
                  </Select>
                </FormControl>

                <FormBuilder
                  key={selectedRole}
                  schema={getSchemaForRole()}
                  fields={getFieldsForRole()}
                  onSubmit={handleRegistrationSubmit}
                  loading={isSendingOtp}
                  defaultValues={getDefaultValuesForRole()}
                  submitLabel="Send OTP"
                />

                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    underline="hover"
                    sx={{ fontWeight: 600 }}
                  >
                    Login
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                <FormBuilder
                  schema={otpSchema}
                  fields={otpFields}
                  onSubmit={handleOtpSubmit}
                  loading={isVerifying}
                  defaultValues={{ otp: "" }}
                  submitLabel="Verify & Continue"
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={3}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={handleBack}
                  >
                    ← Back
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      cursor: isSendingOtp ? "not-allowed" : "pointer",
                      opacity: isSendingOtp ? 0.5 : 1,
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={!isSendingOtp ? handleResendOtp : undefined}
                  >
                    {isSendingOtp ? "Sending..." : "Resend OTP"}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
