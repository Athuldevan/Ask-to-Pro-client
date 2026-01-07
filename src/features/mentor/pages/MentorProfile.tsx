import { Card, CardHeader } from "@/components/ui/card";
import { useLazyGetMentorProfileQuery } from "@/lib/slices/mentorApi";
import { useEffect } from "react";

export default function MentorProfilePage() {
  const [getMentorProfile, { data, isLoading }] =
    useLazyGetMentorProfileQuery();

  useEffect(
    function () {
      getMentorProfile();
    },
    [getMentorProfile]
  );
  if (isLoading) {
    return <p>L 0 a d i n g </p>;
  }

  //Cnvrting to obj -> arr
  const mentor = [data];
  console.log(mentor);

  {
    mentor.map((mentor) => (
      <div>
        <Card className="flex justify-center items-center">
          <div>
            <CardHeader className="w-screen">
              <label className="text-center text-2xl">name</label>
              <div className="flex justify-center items-center">
                <img src="" alt="Mentor Image" />
              </div>
              <div className="flex justify-center items-center mt-9"></div>
            </CardHeader>
          </div>
        </Card>
      </div>
    ));
  }
}
