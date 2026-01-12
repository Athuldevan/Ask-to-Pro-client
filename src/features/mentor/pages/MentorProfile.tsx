import type { IMentor } from "@/constants/mentor";
import { useGetMentorProfileQuery } from "@/lib/slices/mentorApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, XCircle } from "lucide-react";
import { Link } from "react-router";
import Loading from "@/components/Loading";
import ProfilePage from "@/components/profile/ProfilePage";

export default function MentorProfilePage() {
  const { data, isLoading, isError } = useGetMentorProfileQuery();

  if (isLoading) {
    return <Loading>Loading Your Profile</Loading>;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
        <Card className="max-w-md border-red-200">
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <XCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Something went wrong
            </h2>
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
            <h2 className="text-xl font-semibold text-gray-800">
              No Profile Found
            </h2>
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

  return (
    <ProfilePage
      name={mentor.userName}
      email={mentor.userEmail}
      avatar={mentor.userAvatar}
      bio={mentor.bio}
      role="mentor"
      editProfileLink="/mentor/editProfile"
      mentorData={{
        skills: mentor.skills,
        domains: mentor.domains,
        experience: mentor.experience,
        education: mentor.education,
        company: mentor.company,
        jobTitle: mentor.jobTitle,
        price: mentor.price,
        currency: mentor.currency,
        githubUrl: mentor.githubUrl,
        verificationStatus: mentor.verificationStatus,
      }}
    />
  );
}
