import {
  useGetAllPendingMentorsQuery,
  useApproveMentorMutation,
  useRejectMentorMutation
} from "@/features/admin/services/adminApi";
import { type Mentor } from "@/lib/slices/mentorApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const getInitials = (mentor: Mentor) => {
  const name = mentor.userName || mentor.userEmail;
  if (!name) return "M";
  const parts = name.split(' ');
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
};

export default function GetPendingMentors() {
  const { data, isLoading, isError } = useGetAllPendingMentorsQuery();
  const [approveMentor, { isLoading: isApproving }] = useApproveMentorMutation();
  const [rejectMentor, { isLoading: isRejecting }] = useRejectMentorMutation();

  console.log("Admin API Data:", data);

  let mentors: Mentor[] = [];
  if (data?.mentors) {
    if (Array.isArray(data.mentors)) {
      mentors = data.mentors;
    } else if (typeof data.mentors === 'object' && data.mentors !== null) {
      mentors = [data.mentors as any];
    }
  } else if (Array.isArray(data)) {
    mentors = data;
  }

  const handleApprove = async (id: string) => {
    try {
      await approveMentor(id).unwrap();
      toast.success("Mentor approved successfully");
    } catch (error) {
      toast.error("Failed to approve mentor");
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectMentor(id).unwrap();
      toast.success("Mentor rejected successfully");
    } catch (error) {
      toast.error("Failed to reject mentor");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <p className="text-red-500 font-medium">Failed to load pending mentors.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Pending Mentors
        </h1>
        <p className="text-muted-foreground">
          Review and approve new mentor applications.
        </p>
      </div>

      {mentors.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-muted/50">
          <p className="text-lg font-medium text-muted-foreground">No pending mentors found</p>
          <p className="text-sm text-muted-foreground">Check back later for new applications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor._id} className="border border-border bg-background hover:shadow-md transition">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={mentor.userAvatar} />
                    <AvatarFallback className="text-white bg-[#7e22ce]">
                      {getInitials(mentor)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                      {mentor.userName}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {mentor.userEmail}
                    </p>
                    <p className="text-xs font-medium text-[#7e22ce] mt-1">
                      {mentor.category || "General"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {mentor.bio || "No bio provided."}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.skills && mentor.skills.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{mentor.skills.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground italic">Experience</span>
                    <span className="font-medium">{mentor.experience} Years</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground italic">Proposed Price</span>
                    <span className="font-medium text-[#7e22ce]">${mentor.price}/hr</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-[#7e22ce] hover:bg-[#6c1fa5] text-white"
                    size="sm"
                    onClick={() => handleApprove(mentor._id)}
                    disabled={isApproving || isRejecting}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50/10 hover:text-red-600"
                    size="sm"
                    onClick={() => handleReject(mentor._id)}
                    disabled={isApproving || isRejecting}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
