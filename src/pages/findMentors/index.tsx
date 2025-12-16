import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetAllMentorsQuery, type Mentor } from "../../lib/slices/mentorApi";
// Correct Avatar imports for shadcn/ui pattern
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Correct Badge import from your components directory
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react"; // Import Star icon for rating

// --- Utility function to get initials safely ---
const getInitials = (mentor: Mentor) => {
  const name = mentor.userName || mentor.userEmail;
  if (!name) return "M";

  const parts = name.split(' ');
  if (parts.length > 1) {
    // Use first letter of first and last name part
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  // Use first letter of the name/email prefix
  return name.charAt(0).toUpperCase();
};

export default function FindMentorsPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllMentorsQuery();

  const mentors = data?.mentors ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-9 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 font-medium">Failed to load mentors.</p>;
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Find Mentors
        </h1>
        <p className="text-muted-foreground">
          Connect with experienced professionals for 1-on-1 guidance.
        </p>
      </div>

      {/* Mentor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors?.map((mentor: Mentor) => {
          // Determine the name to display
          const displayName = mentor.userName || mentor.userEmail?.split('@')[0] || mentor.jobTitle || "Mentor";

          return (
            <Card
              key={mentor._id}
              className="border border-border bg-background hover:shadow-lg transition"
            >
              <CardContent className="p-6 space-y-4">

                {/* 1. Avatar + Name + Category */}
                <div className="flex items-start justify-between gap-4">
                  {/* Avatar */}
                  <Avatar className="h-14 w-14 flex-shrink-0" style={{ backgroundColor: "#7e22ce" }}>
                    <AvatarImage src={mentor.userAvatar} />
                    <AvatarFallback className="text-xl font-bold text-white bg-[#7e22ce]">
                      {getInitials(mentor)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name + Job/Company */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                      {displayName}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {mentor.jobTitle && mentor.company
                        ? `${mentor.jobTitle} @ ${mentor.company}`
                        : mentor.jobTitle || mentor.company || "Industry Mentor"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mentor.category}
                    </p>
                  </div>

                  {/* Category Pill (Moved for better layout) 
                      Removed the pill here to use the category line below the name
                      and kept the logic simple.
                  */}
                </div>

                {/* 2. Bio */}
                {mentor.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {mentor.bio}
                  </p>
                )}

                {/* 3. Skills */}
                <div className="flex flex-wrap gap-2">
                  {mentor.skills?.slice(0, 3).map((skill: string) => (
                    // Using your specified color theme for the skill badges
                    <Badge
                      key={skill}
                      className="bg-[#7e22ce]/10 text-[#7e22ce] dark:bg-[#7e22ce]/30 dark:text-white"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {mentor.skills && mentor.skills.length > 3 && (
                    <Badge
                      className="bg-muted text-muted-foreground"
                    >
                      +{mentor.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* 4. Meta (Experience, Rating, Sessions, Education) */}
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Exp:</span>
                    <span className="font-medium">{mentor.experience ?? 0} yrs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
                      <span className="font-medium">{mentor.avgRating?.toFixed(1) ?? 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Sessions:</span>
                    <span className="font-medium">{mentor.totalSessions ?? 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Edu:</span>
                    <span className="font-medium truncate">{mentor.education || 'N/A'}</span>
                  </div>
                </div>

                {/* 5. Pricing and CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Price / hr</p>
                    {/* Using your specific color for the price */}
                    <p className="text-xl font-bold text-[#7e22ce]">${mentor.price ?? 0}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {mentor.githubUrl && (
                      <a
                        className="text-sm text-[#7e22ce] hover:underline whitespace-nowrap"
                        href={mentor.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub Profile
                      </a>
                    )}

                    {/* CTA Button */}
                    <Button
                      className="w-auto px-4 bg-[#7e22ce] hover:bg-[#6c1fa5] text-white"
                      onClick={() => navigate(`/user/dashboard/mentors/${mentor._id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}