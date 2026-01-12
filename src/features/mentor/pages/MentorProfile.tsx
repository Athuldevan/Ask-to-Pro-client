import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { IMentor } from "@/constants/mentor";
import { useGetMentorProfileQuery } from "@/lib/slices/mentorApi";
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
} from "lucide-react";
import { Link } from "react-router";
import Loading from "@/components/Loading";

export default function MentorProfilePage() {
  const { data, isLoading, isError } = useGetMentorProfileQuery();

  if (isLoading) {
   <Loading>Loading Your Profile</Loading>
    
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
        <Card className="max-w-md border-red-200">
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <XCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
            <p className="text-center text-gray-500">
              We couldn't load your profile. Please try again later.
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-[#7e22ce] text-[#7e22ce] hover:bg-purple-50"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.mentor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
        <Card className="max-w-md border-purple-100">
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <AlertCircle className="h-12 w-12 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-800">No Profile Found</h2>
            <p className="text-center text-gray-500">
              You haven't created a mentor profile yet.
            </p>
            <Button asChild className="bg-[#7e22ce] hover:bg-purple-800">
              <Link to="/mentor/createProfile">Create Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mentor: IMentor = data.mentor;

  const {
    userName,
    userEmail,
    userAvatar,
    verificationStatus,
    jobTitle,
    company,
    githubUrl,
    domains,
    skills,
    bio,
    experience,
    education,
    price,
    currency,
  } = mentor;

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case "approved":
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

  return (
    <div className="min-h-screen bg-purple-50/30 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Hero Section */}
        <Card className="overflow-hidden border-none shadow-xl shadow-purple-100/50">
          <div className="relative bg-[#7e22ce] p-8 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white/20 shadow-xl">
                  <AvatarImage src={userAvatar || "https://github.com/shadcn.png"} />
                  <AvatarFallback className="bg-purple-100 text-3xl font-bold text-[#7e22ce]">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {verificationStatus === "approved" && (
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1.5 shadow-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">{userName}</h1>
                {jobTitle && (
                  <p className="mt-1 text-lg text-purple-100">
                    {jobTitle} {company && `at ${company}`}
                  </p>
                )}
                <div className="mt-4">{getVerificationBadge()}</div>
              </div>

              {/* Edit Button */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-0 top-0 md:relative bg-white text-[#7e22ce] hover:bg-purple-50"
                asChild
              >
                <Link to="/mentor/editProfile">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Bio Section */}
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
                    {experience} {experience === 1 ? "Year" : "Years"}
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
                  <p className="font-semibold text-gray-800">{education || "Not specified"}</p>
                </div>
              </div>

              {company && (
                <>
                  <Separator className="bg-purple-100" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <Building2 className="h-6 w-6 text-[#7e22ce]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-semibold text-gray-800">{company}</p>
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
              {/* Skills */}
              {skills && skills.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-medium text-gray-500">
                    Technical Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
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

              {/* Domains */}
              {domains && domains.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-medium text-gray-500">
                    Domains of Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {domains.map((domain: string) => (
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

        {/* Contact & Pricing */}
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
                    {currency} {price}
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
                  <p className="truncate font-medium text-gray-800">{userEmail}</p>
                </div>
              </div>

              {/* GitHub */}
              {githubUrl && (
                <a
                  href={githubUrl}
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
      </div>
    </div>
  );
}
