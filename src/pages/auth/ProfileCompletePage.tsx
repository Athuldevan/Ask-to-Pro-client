import { Box } from "@mui/material";
import {
  profileCompletionSchema,
  type MentorCompleteProfileSchema,
} from "../../lib/zod/formSchema";
import type { FieldConfig } from "../../components/custom/FormBuilder";
import FormBuilder from "../../components/custom/FormBuilder";
import { useCompleteMentorProfileMutation } from "../../lib/slices/profileApi";
import { toast } from "sonner";

const defaultValues: MentorCompleteProfileSchema = {
  jobTitle: "",
  company: "",
  industry: "",
  yearsOfExperience: 0,
  bio: "",
  gender: "",
  dateOfBirth: "",
  expertise: "",
  skills: [],
  languages: [],
  credentials: [],
};
export default function MentorCompleteStudentProfile() {
  const [completeMentorProfile] = useCompleteMentorProfileMutation();
  const fields: FieldConfig<MentorCompleteProfileSchema>[] = [
    {
      name: "jobTitle",
      label: "Job Title",
      type: "text",
    },
    {
      name: "company",
      label: "Job Company",
      type: "text",
    },


  
    {
      name: "industry",
      label: "Industry",
      type: "text",
    },
    {
      name: "yearsOfExperience",
      label: "experience in years",
      type: "text",
    },
    {
      name: "bio",
      label: "Bio",
      type: "text",
    },
  ];

  const onSubmit = async (values: MentorCompleteProfileSchema) => {
    try {
      const response = await completeMentorProfile({ ...values }).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
      }
    } catch {
      toast.error("failed to complete data try again later");
    }
  };
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <FormBuilder
        schema={profileCompletionSchema}
        fields={fields}
        onSubmit={onSubmit}
        loading={false}
        defaultValues={defaultValues}
      />
    </Box>
  );
}
