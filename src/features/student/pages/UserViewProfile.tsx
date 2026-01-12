import { useViewProfileQuery } from "@/lib/slices/authApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, XCircle } from "lucide-react";
import { Link } from "react-router";
import Loading from "@/components/Loading";
import ProfilePage from "@/components/profile/ProfilePage";

export default function UserViewProfile() {
    const { data, isLoading, isError } = useViewProfileQuery(undefined);

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

    if (!data?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
                <Card className="max-w-md border-purple-100">
                    <CardContent className="flex flex-col items-center gap-4 p-8">
                        <AlertCircle className="h-12 w-12 text-amber-500" />
                        <h2 className="text-xl font-semibold text-gray-800">
                            No Profile Found
                        </h2>
                        <p className="text-center text-gray-500">
                            We couldn't find your profile information.
                        </p>
                        <Button asChild className="bg-[#7e22ce] hover:bg-purple-800">
                            <Link to="/login">Login Again</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const user = data.user;

    return (
        <ProfilePage
            name={user?.name}
            email={user?.email}
            avatar={user?.avatar}
            bio={user.bio}
            role="user"
            editProfileLink="/student/profile"
            userData={{
                interests: user?.interests,
                learningGoals: user?.learningGoals,
                sessionsCompleted: user?.sessionsCompleted,
                memberSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : undefined,
            }}
        />
    );
}
