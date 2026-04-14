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
} from "@mui/material";
import { useLoginMutation } from "../../lib/slices/authApi";
import type { FieldConfig } from "../../components/custom/FormBuilder";
import { toast } from "sonner";
import FormBuilder from "../../components/custom/FormBuilder";
import type { Role } from "../../constants/role";
import { useState } from "react";
import { loginSchema, type LoginForm } from "../../lib/zod/formSchema";

const defaultValues: LoginForm = {
  email: "",
  password: "",
  role: "mentor",
};

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: LoginForm) => {
    try {
      const response = await login({ ...values, role: selectedRole }).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
      }
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message ?? "Invalid credentials");
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  const fields: FieldConfig<LoginForm>[] = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
  ];

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ bgcolor: "background.default", p: 2 }}
    >
      <Card
        sx={{ maxWidth: 400, width: "100%", borderRadius: 3, boxShadow: 4 }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <Avatar
            alt="Logo"
            sx={{ width: 80, height: 80, mb: 2 }}
            variant="square"
          />

          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            Welcome Back
          </Typography>

          <Box sx={{ width: "100%", mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Login as</InputLabel>
              <Select
                value={selectedRole}
                label="Login as"
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                disabled={isLoading}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <FormBuilder
              schema={loginSchema}
              fields={fields}
              onSubmit={onSubmit}
              loading={isLoading}
              defaultValues={{ ...defaultValues, role: selectedRole }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
