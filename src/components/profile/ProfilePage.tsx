import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Clock,
  Github,
  Mail,
  DollarSign,
  Pencil,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  Target,
  Calendar,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import type { MentorData, VerificationStatus } from "@/types/mentor";
import EditMentorProfile from "./EditProfile";
import { useEditProfileMutation as useStudentEditProfileMutation } from "@/lib/slices/authApi";
import { useEditProfileMutation as useMentorEditProfileMutation } from "@/lib/slices/mentorApi";
interface UserData {
  interests?: string[];
  learningGoals?: string[];
  sessionsCompleted?: number;
  memberSince?: string;
}

export interface ProfilePageProps {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  company?: string;
  role: "mentor" | "user";
  editProfileLink?: string;
  mentorData?: MentorData;
  userData?: UserData;
  children?: ReactNode;
}

export default function ProfilePage({
  name,
  email,
  avatar,
  bio,
  role,
  editProfileLink,
  mentorData,
  userData,
  children,
}: ProfilePageProps) {
  const isMentor = role === "mentor";
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [studentEditProfile] = useStudentEditProfileMutation();
  const [mentorEditProfile] = useMentorEditProfileMutation();

  const editProfile = isMentor ? mentorEditProfile : studentEditProfile;
  const handleSaveProfile = async (data: any) => {
    console.log("Saving profile:", data);
    try {
      await editProfile(data).unwrap();
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };
  return (
    <div className="min-h-screen bg-purple-50/30 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Hero Section */}
        <Card className="overflow-hidden border-none shadow-xl shadow-purple-100/50">
          <div className="relative bg-[#7e22ce] p-8 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white/20 shadow-xl">
                  <AvatarImage
                    src={avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback className="bg-purple-100 text-3xl font-bold text-[#7e22ce]">
                    {name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isMentor &&
                  mentorData &&
                  mentorData &&
                  mentorData?.verificationStatus === "verified" && (
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1.5 shadow-lg">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                {isMentor && mentorData?.jobTitle && (
                  <p className="mt-1 text-lg text-purple-100">
                    {mentorData.jobTitle}{" "}
                    {mentorData.company && `at ${mentorData.company}`}
                  </p>
                )}
                {!isMentor && (
                  <p className="mt-1 text-lg text-purple-100">Student</p>
                )}
                <div className="mt-4">
                  {isMentor ? (
                    getVerificationBadge(mentorData?.verificationStatus, role)
                  ) : (
                    <Badge className="bg-purple-100/20 text-white hover:bg-purple-100/30 gap-1.5 border-0">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Active Learner
                    </Badge>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              {editProfileLink && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Modify your profile information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </Card>

        {bio && (
          <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <Sparkles className="h-5 w-5 text-[#7e22ce]" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-600">{bio}</p>
            </CardContent>
          </Card>
        )}

        {/* ==================== MENTOR-SPECIFIC SECTIONS ==================== */}
        {isMentor && mentorData && (
          <>
            {/* Stats & Details Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Experience & Education */}
              <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                    <Briefcase className="h-5 w-5 text-[#7e22ce]" />
                    Professional Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <Clock className="h-6 w-6 text-[#7e22ce]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-semibold text-gray-800">
                        {mentorData.experience}{" "}
                        {mentorData.experience === 1 ? "Year" : "Years"}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-purple-100" />

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <GraduationCap className="h-6 w-6 text-[#7e22ce]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-semibold text-gray-800">
                        {mentorData.education || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {mentorData.company && (
                    <>
                      <Separator className="bg-purple-100" />
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                          <Building2 className="h-6 w-6 text-[#7e22ce]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Company</p>
                          <p className="font-semibold text-gray-800">
                            {mentorData.company}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Skills & Domains */}
              <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                    <Sparkles className="h-5 w-5 text-[#7e22ce]" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mentorData.skills && mentorData.skills.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-gray-500">
                        Technical Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mentorData.skills.map((skill: string) => (
                          <Badge
                            key={skill}
                            className="bg-purple-100 text-[#7e22ce] hover:bg-purple-200 px-3 py-1 text-sm border-0"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {mentorData.domains && mentorData.domains.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-gray-500">
                        Domains of Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mentorData.domains.map((domain: string) => (
                          <Badge
                            key={domain}
                            variant="outline"
                            className="border-[#7e22ce]/30 px-3 py-1 text-sm text-[#7e22ce]"
                          >
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Pricing & Contact */}
            <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                  <DollarSign className="h-5 w-5 text-[#7e22ce]" />
                  Session Pricing & Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Pricing */}
                  <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[#7e22ce] to-purple-800 p-4 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-100">Session Rate</p>
                      <p className="text-2xl font-bold">
                        {mentorData.currency} {mentorData.price}
                        <span className="text-sm font-normal text-purple-200">
                          /hr
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 rounded-xl bg-purple-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Mail className="h-6 w-6 text-[#7e22ce]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="truncate font-medium text-gray-800">
                        {email}
                      </p>
                    </div>
                  </div>

                  {/* GitHub */}
                  {mentorData.githubUrl && (
                    <a
                      href={mentorData.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl bg-purple-50 p-4 transition-colors hover:bg-purple-100"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                        <Github className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">GitHub</p>
                        <p className="truncate font-medium text-[#7e22ce]">
                          View Profile →
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* ==================== USER-SPECIFIC SECTIONS ==================== */}
        {!isMentor && userData && (
          <>
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Interests */}
              {userData.interests && userData.interests.length > 0 && (
                <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                      <Target className="h-5 w-5 text-[#7e22ce]" />
                      Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest: string) => (
                        <Badge
                          key={interest}
                          className="bg-purple-100 text-[#7e22ce] hover:bg-purple-200 px-3 py-1 text-sm border-0"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Learning Goals */}
              {userData.learningGoals && userData.learningGoals.length > 0 && (
                <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                      <Sparkles className="h-5 w-5 text-[#7e22ce]" />
                      Learning Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {userData.learningGoals.map(
                        (goal: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-600"
                          >
                            <CheckCircle2 className="h-5 w-5 text-[#7e22ce] mt-0.5 shrink-0" />
                            {goal}
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Session Stats & Contact */}
            <Card className="border-purple-100 shadow-lg shadow-purple-100/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                  <Calendar className="h-5 w-5 text-[#7e22ce]" />
                  Activity & Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Sessions Completed */}
                  <div className="flex items-center gap-4 rounded-xl bg-linear-to-br from-[#7e22ce] to-purple-800 p-4 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-100">
                        Sessions Completed
                      </p>
                      <p className="text-2xl font-bold">
                        {userData.sessionsCompleted ?? 0}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 rounded-xl bg-purple-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Mail className="h-6 w-6 text-[#7e22ce]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="truncate font-medium text-gray-800">
                        {email}
                      </p>
                    </div>
                  </div>

                  {/* Member Since */}
                  {userData.memberSince && (
                    <div className="flex items-center gap-4 rounded-xl bg-purple-50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Calendar className="h-6 w-6 text-[#7e22ce]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium text-gray-800">
                          {userData.memberSince}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {children}
      </div>
      <EditMentorProfile
        open={isEditingProfile}
        onOpenChange={setIsEditingProfile}
        initialData={{
          name,
          email,
          avatar: avatar ?? "",
          bio: bio ?? "",
          role,
          ...(isMentor && mentorData ? {
            jobTitle: mentorData.jobTitle ?? "",
            company: mentorData.company ?? "",
            experience: mentorData.experience ?? 0,
            education: mentorData.education ?? "",
            price: mentorData.price ?? 0,
            githubUrl: mentorData.githubUrl ?? "",
            skills: mentorData.skills ?? [],
            domains: mentorData.domains ?? [],
            currency: mentorData.currency ?? "USD",
          } : {}),
          ...(!isMentor && userData ? {
            interests: userData.interests ?? [],
            learningGoals: [], // Add if available in userData
          } : {})
        }}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

const getVerificationBadge = (status?: VerificationStatus, role?: string) => {
  if (role !== "mentor" || !status) return null;

  switch (status) {
    case "verified":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1.5 border-0">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Verified Mentor
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 gap-1.5 border-0">
          <AlertCircle className="h-3.5 w-3.5" />
          Pending Verification
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 gap-1.5 border-0">
          <XCircle className="h-3.5 w-3.5" />
          Verification Rejected
        </Badge>
      );
    default:
      return null;
  }
};
