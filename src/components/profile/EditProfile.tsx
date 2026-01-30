import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Plus, User, Briefcase, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: any;
  onSave: (data: any) => Promise<void>;
}

const studentProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  interests: z.array(z.string()).optional(),
});

const mentorProfileExtendedSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  userEmail: z.string().email("Invalid email address"),
  userAvatar: z.string().optional(),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters"),
  jobTitle: z.string().min(2, "Job title is required"),
  company: z.string().optional().or(z.literal("")),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  education: z.string().optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
  domains: z.array(z.string()).min(1, "Select at least one domain"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  currency: z.string().min(1, "Currency is required"),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export default function EditProfileModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: EditProfileModalProps) {
  const isMentor = initialData.role === "mentor";
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const form = useForm({
    resolver: zodResolver(
      isMentor ? mentorProfileExtendedSchema : studentProfileSchema,
    ),
    defaultValues: isMentor
      ? {
          userName: initialData.name || "",
          userEmail: initialData.email || "",
          userAvatar: initialData.avatar || "",
          bio: initialData.bio || "",
          jobTitle: initialData.jobTitle || "",
          company: initialData.company || "",
          experience: initialData.experience || 0,
          education: initialData.education || "",
          skills: initialData.skills || [],
          domains: initialData.domains || [],
          price: initialData.price || 0,
          currency: initialData.currency || "INR",
          githubUrl: initialData.githubUrl || "",
        }
      : {
          name: initialData.name || "",
          email: initialData.email || "",
          bio: initialData.bio || "",
          interests: initialData.interests || [],
        },
  });

  const onSubmit = async (values) => {
    console.log(values);
    await onSave(values);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = form.getValues("skills") || [];
      if (!currentSkills.includes(newSkill.trim())) {
        form.setValue("skills", [...currentSkills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills") || [];
    form.setValue(
      "skills",
      currentSkills.filter((s: string) => s !== skillToRemove),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-[#7e22ce] to-purple-800 text-white">
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
          <p className="text-purple-100/80 text-sm">
            Update your personal and professional information
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <ScrollArea className="flex-1 px-6 py-4 max-h-[60vh]">
              <div className="space-y-6">
                {/* Basic Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#7e22ce] font-semibold">
                    <User className="h-4 w-4" />
                    <span>Basic Information</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={isMentor ? "userName" : "name"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={isMentor ? "userEmail" : "email"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
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
                            {...field}
                            placeholder="Tell us about yourself..."
                            className="h-24 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="bg-purple-100" />

                {/* Mentor Specific Section */}
                {isMentor && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[#7e22ce] font-semibold">
                      <Briefcase className="h-4 w-4" />
                      <span>Professional Details</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber || 0)
                                }
                                onBlur={field.onBlur}
                                value={field.value as number}
                                name={field.name}
                                ref={field.ref}
                              />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="bg-purple-100" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#7e22ce] font-semibold">
                        <Sparkles className="h-4 w-4" />
                        <span>Skills & Expertise</span>
                      </div>
                      <div className="space-y-3">
                        <FormLabel>Skills</FormLabel>
                        <div className="flex gap-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill (e.g. React)"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addSkill}
                            className="border-[#7e22ce] text-[#7e22ce] hover:bg-purple-50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {form.watch("skills")?.map((skill: string) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="bg-purple-100 text-[#7e22ce] hover:bg-purple-200 px-3 py-1 gap-1"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-purple-100" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#7e22ce] font-semibold">
                        <Target className="h-4 w-4" />
                        <span>Session Pricing</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price per Hour</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber || 0)
                                  }
                                  onBlur={field.onBlur}
                                  value={field.value as number}
                                  name={field.name}
                                  ref={field.ref}
                                />
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
                                <Input {...field} placeholder="INR" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Student Specific Section (Interest handled similarly to skills) */}
                {!isMentor && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#7e22ce] font-semibold">
                      <Target className="h-4 w-4" />
                      <span>Interests</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Add an interest"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const current = form.getValues("interests") || [];
                              if (
                                newInterest.trim() &&
                                !current.includes(newInterest.trim())
                              ) {
                                form.setValue("interests", [
                                  ...current,
                                  newInterest.trim(),
                                ]);
                              }
                              setNewInterest("");
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const current = form.getValues("interests") || [];
                            if (
                              newInterest.trim() &&
                              !current.includes(newInterest.trim())
                            ) {
                              form.setValue("interests", [
                                ...current,
                                newInterest.trim(),
                              ]);
                            }
                            setNewInterest("");
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.watch("interests")?.map((interest: string) => (
                          <Badge
                            key={interest}
                            variant="secondary"
                            className="bg-purple-100 text-[#7e22ce] hover:bg-purple-200 px-3 py-1 gap-1"
                          >
                            {interest}
                            <button
                              type="button"
                              onClick={() => {
                                const current =
                                  form.getValues("interests") || [];
                                form.setValue(
                                  "interests",
                                  current.filter((i: string) => i !== interest),
                                );
                              }}
                              className="hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <DialogFooter className="p-6 bg-gray-50/50 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7e22ce] hover:bg-purple-800"
                onClick={onSubmit}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
