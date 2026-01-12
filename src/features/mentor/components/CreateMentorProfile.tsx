import { BrandSidebar } from "@/features/auth/components/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateMentorProfileMutation } from "@/lib/slices/mentorApi";
import { useNavigate } from "react-router";

/* =========================
   ZOD SCHEMA
   ========================= */

const mentorProfileSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  userEmail :z.email(),
  bio: z.string().min(20, "Bio needs to be at least 20 characters long"),
  career: z.string().min(2, "Career field is required"),
  domains: z.array(z.string()).min(1, "Add at least one domain"),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  education: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  experience: z.coerce.number().min(0),
  hourlyRate: z.coerce.number().min(0),
  currency: z.enum(["INR", "USD"]),
});

type MentorProfileForm = z.infer<typeof mentorProfileSchema>;

export default function CreateMentorProfile() {
  const [skillInput, setSkillInput] = useState("");
  const name = useSelector((store) => store.auth);
  const [createMentorProfile] = useCreateMentorProfileMutation();
  const navigate = useNavigate();
  console.log(name.user?.name);

  if (!name.user.name) {
    return <>navigate("/login")</>;
  }

  const form = useForm<MentorProfileForm>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      userName: name?.user?.name,
      userEmail : name?.user?.email,
      bio: "",
      career: "",
      domains: [],
      skills: [],
      education: "",
      company: "",
      jobTitle: "",
      experience: 0,
      hourlyRate: 0,
      currency: "INR",
    },
  });
  
  async function onSubmit(values: MentorProfileForm) {
    // console.log('Navigate to dashboar')
    await createMentorProfile(values)
      .unwrap()
      .then(() => navigate("/mentor/dashboard"));
   
  }


  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = skillInput.trim();
      if (value) {
        if (!field.value.includes(value)) {
          field.onChange([...field.value, value]);
        }
        setSkillInput("");
      }
    }
  };

  // Add Skill
  const addSkill = (field: any) => {
    const value = skillInput.trim();
    if (value) {
      if (!field.value.includes(value)) {
        field.onChange([...field.value, value]);
      }
      setSkillInput("");
    }
  };

  // Remove Skill
  const removeSkill = (skillToRemove: string, field: any) => {
    field.onChange(
      field.value.filter((skill: string) => skill !== skillToRemove)
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDEBAR */}
      <BrandSidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex justify-center items-start overflow-y-auto bg-muted/30 p-4 md:p-10">
        <Card className="w-full max-w-4xl shadow-lg border-t-4 border-t-primary">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create Mentor Profile
            </CardTitle>
            <CardDescription>
              Share your expertise and start your journey as a mentor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* --- Basic Info Section --- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} disabled className="bg-muted" />
                          </FormControl>
                          <FormDescription>
                            Your unique handle on the platform.
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="career"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Title / Career</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Senior Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Tell us about your journey, expertise, and what you can offer to students..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* --- Professional Details Section --- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Tech Lead" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Acme Corp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Years)</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. BS Computer Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* --- Expertise Section --- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Expertise & Skills
                  </h3>

                  {/* Domains */}
                  <FormField
                    control={form.control}
                    name="domains"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domains of Expertise</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Backend, DevOps, AI (Comma separated)"
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  .split(",")
                                  .map((d) => d.trim())
                                  .filter(Boolean)
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Broad categories you specialize in.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Skills - Custom Chip Input */}
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type a specific skill and press Enter..."
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, field)}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => addSkill(field)}
                              >
                                <Plus className="w-4 h-4 mr-2" /> Add
                              </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 min-h-10 p-4 bg-muted/20 rounded-md border border-dashed">
                              {field.value.length === 0 && (
                                <span className="text-muted-foreground text-sm italic">
                                  No skills added yet.
                                </span>
                              )}
                              {field.value.map((skill: string) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="px-3 py-1 text-sm flex items-center gap-2 hover:bg-secondary/80"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(skill, field)}
                                    className="text-muted-foreground hover:text-destructive transition-colors focus:outline-none"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Press Enter or click Add to include a skill.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* --- Pricing Section --- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Pricing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="number"
                                min={0}
                                className="pl-6"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Create Mentor Profile
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}