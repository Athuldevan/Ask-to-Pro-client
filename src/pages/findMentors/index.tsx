import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetAllMentorsQuery } from "@/lib/slices/mentorApi";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge, Star } from "lucide-react";

export default function FindMentorsPage() {
  const { data } = useGetAllMentorsQuery();
  const mentors = data?.mentors;
  console.log(mentors)
  mentors?.map((mentor) => (
    <Card className="w-80 h-auto p-4 bg-white dark:bg-[#1e1e2d] text-gray-900 dark:text-white border-gray-200 dark:border-none shadow-xl">
      {/* 2. Header Section: Avatar, Name, and Field */}
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-14 w-14" style={{ backgroundColor: "#7e22ce" }}>
          <AvatarFallback
            className="text-xl font-bold text-white"
            style={{ backgroundColor: "#7e22ce" }}
          >
            JD
          </AvatarFallback>
        </Avatar>

        {/* Name and Field Details */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{mentor.name}</h3>
          {/* Text color changes based on theme */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Web Development
          </p>

          {/* MERN Stack Badge */}
          <Badge
            className="w-fit rounded-full text-xs font-medium px-2 py-0.5 
                       bg-gray-100 text-gray-700 
                       dark:bg-[#3a3a4c] dark:text-white dark:border-none"
          >
            MERN Stack
          </Badge>
        </div>
      </div>

      {/* 3. Stats Section: Rating and Hourly Rate */}
      <div className="flex items-center justify-start space-x-6 mb-4">
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-lg font-semibold">4.9</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (120)
          </span>
        </div>

        {/* Hourly Rate */}
        <div className="flex items-baseline">
          {/* Applying the primary text color (#7e22ce) directly to the dollar sign */}
          <span className="text-xl font-bold" style={{ color: "#7e22ce" }}>
            $
          </span>
          <span className="text-xl font-bold">50</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">/hr</span>
        </div>
      </div>

      {/* 4. Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Senior software engineer with 10+ years of experience in web...
      </p>

      {/* 5. Button */}
      {/* **SINGLE CLASSNAME HERE:** Primary Color (#7e22ce) and Hover Color (#6a1dad) */}
      <Button className="w-full h-12 text-lg font-semibold text-white transition-colors duration-200 bg-[#7e22ce] hover:bg-[#6a1dad]">
        View Profile
      </Button>
    </Card>
  ));
}
