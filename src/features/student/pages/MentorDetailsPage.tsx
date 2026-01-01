import { useParams } from "react-router";
import { useGetMentorByIdQuery, type Mentor } from "@/lib/slices/mentorApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Building, Briefcase, Calendar, Clock, GraduationCap } from "lucide-react";

// --- Utility function to get initials safely ---
const getInitials = (mentor: Mentor) => {
    const name = mentor.userName || mentor.userEmail;
    if (!name) return "M";

    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
};

export default function MentorDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetMentorByIdQuery(id || "", {
        skip: !id,
    });

    const mentor = data?.mentor;

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 space-y-6 animate-pulse">
                <div className="h-64 bg-muted rounded-xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div className="h-40 bg-muted rounded-xl"></div>
                        <div className="h-40 bg-muted rounded-xl"></div>
                    </div>
                    <div className="h-80 bg-muted rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (isError || !mentor) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Mentor Not Found</h2>
                <p className="text-muted-foreground">The mentor you are looking for does not exist or has been removed.</p>
                <Button className="mt-4" variant="outline" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    const displayName = mentor.userName || mentor.userEmail?.split('@')[0] || mentor.jobTitle || "Mentor";

    return (
        <div className="container mx-auto container-padding py-8 space-y-8">
            {/* 1. Header Section */}
            <Card className="border-none bg-gradient-to-r from-[#7e22ce]/10 to-transparent shadow-sm">
                <CardContent className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl" style={{ backgroundColor: "#7e22ce" }}>
                        <AvatarImage src={mentor.userAvatar} className="object-cover" />
                        <AvatarFallback className="text-4xl font-bold text-white bg-[#7e22ce]">
                            {getInitials(mentor)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{displayName}</h1>
                            <Badge variant="secondary" className="text-[#7e22ce] bg-[#7e22ce]/10 border-[#7e22ce]/20 px-3 py-1">
                                {mentor.category}
                            </Badge>
                        </div>

                        <p className="text-xl text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                            <Briefcase className="w-5 h-5" />
                            {mentor.jobTitle || "Mentor"}
                            {mentor.company && <span className="flex items-center gap-1"><Building className="w-4 h-4 ml-1" /> at {mentor.company}</span>}
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-semibold text-foreground">{mentor.avgRating?.toFixed(1) ?? 'N/A'}</span> ({mentor.totalSessions} sessions)
                            </div>
                            <div className="flex items-center gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                                <Clock className="w-4 h-4 text-[#7e22ce]" />
                                {mentor.experience ?? 0} Years Experience
                            </div>
                            <div className="flex items-center gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                                <GraduationCap className="w-4 h-4 text-[#7e22ce]" />
                                {mentor.education || "N/A"}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        <div className="text-center md:text-right p-4 bg-background/80 rounded-xl border border-border shadow-sm">
                            <p className="text-sm text-muted-foreground">Hourly Rate</p>
                            <div className="text-3xl font-bold text-[#7e22ce]">${mentor.price ?? 0}</div>
                        </div>
                        <Button size="lg" className="w-full bg-[#7e22ce] hover:bg-[#6c1fa5] font-semibold shadow-lg shadow-[#7e22ce]/20">
                            Book Session
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-8">
                    {/* About Section */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            About Me
                        </h2>
                        <Card>
                            <CardContent className="p-6 text-muted-foreground leading-relaxed whitespace-pre-line">
                                {mentor.bio || "No bio available."}
                            </CardContent>
                        </Card>
                    </section>

                    {/* Skills Section */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Skills & Expertise</h2>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    {mentor.skills?.map((skill) => (
                                        <Badge
                                            key={skill}
                                            className="px-4 py-2 text-sm bg-[#7e22ce]/5 text-[#7e22ce] border-[#7e22ce]/20 hover:bg-[#7e22ce]/10 transition-colors"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                    {!mentor.skills?.length && <p className="text-sm text-muted-foreground">No skills listed.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Right Column: Additional Info / Booking Preview (Future) */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-lg">Why book with {displayName.split(' ')[0]}?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3">
                                <div className="p-2 bg-background rounded-full shadow-sm">
                                    <Calendar className="w-5 h-5 text-[#7e22ce]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Flexible Scheduling</h4>
                                    <p className="text-sm text-muted-foreground">Book slots that work for you.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-2 bg-background rounded-full shadow-sm">
                                    <Briefcase className="w-5 h-5 text-[#7e22ce]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Industry Expert</h4>
                                    <p className="text-sm text-muted-foreground">Vetted professional background.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {mentor.githubUrl && (
                        <a
                            href={mentor.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block"
                        >
                            <Button variant="outline" className="w-full gap-2 hover:text-[#7e22ce] hover:border-[#7e22ce]">
                                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                                View GitHub Profile
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
