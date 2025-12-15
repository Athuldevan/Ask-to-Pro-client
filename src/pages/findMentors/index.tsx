import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetAllMentorsQuery,
  type Mentor,
} from "../../lib/slices/mentorApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FindMentorsPage() {
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
        {mentors?.map((mentor: Mentor) => (
          <Card
            key={mentor._id}
            className="border border-border bg-background hover:shadow-lg transition"
          >
            <CardContent className="p-6 space-y-4">
              {/* Avatar + Name + Category */}
              <div className="flex items-center justify-between gap-4">
                {/* Avatar */}
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.image} />
                  <AvatarFallback>
                    {(mentor.name || mentor.jobTitle || "M")?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Name + Company / Role */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-tight">
                    {mentor.name || mentor.jobTitle || "Mentor"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mentor.company
                      ? `${mentor.company} • ${mentor.jobTitle || "Mentor"}`
                      : mentor.jobTitle || "Industry Mentor"}
                  </p>
                </div>

                {/* Category pill */}
                {mentor.category && (
                  <span className="inline-flex items-center rounded-full bg-[#5b21b6] px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
                    {mentor.category}
                  </span>
                )}
              </div>

              {/* Bio */}
              {mentor.bio && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {mentor.bio}
                </p>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {mentor.skills?.slice(0, 3).map((skill: string) => (
                  <Badge
                    key={skill}
                    className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>Experience: {mentor.experience ?? 0} yrs</span>
                <span>Rating: {mentor.avgRating ?? 0} ⭐</span>
                <span>Sessions: {mentor.totalSessions ?? 0}</span>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Price / session</p>
                  <p className="text-lg font-semibold">${mentor.price ?? 0}</p>
                </div>

                {mentor.githubUrl && (
                  <a
                    className="text-sm text-[#7e22ce] hover:underline"
                    href={mentor.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>

              {/* CTA */}
              <Button className="w-full bg-[#7e22ce] hover:bg-[#6c1fa5] text-white">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
