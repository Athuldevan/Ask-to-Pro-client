import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IMentor } from "@/constants/mentor";
import {
  useGetMentorProfileQuery,
} from "@/lib/slices/mentorApi";
import { Users, CheckCircle2, Calendar, AlertCircle } from "lucide-react";


export default function MentorDashboardPage() {
  const { data, isLoading, isError } = useGetMentorProfileQuery();
  //TODO: aDD LOADING SCREEN
  if (isLoading) return <p>Loadinng</p>;
  if (isError || !data) return <p>Error Something went wrong</p>;
  const mentor: IMentor = data?.mentor;

  if(!mentor) return <h4>No Mentor Profile found</h4>

  const isVerified = mentor.isVerified;
  const verificationStatus = mentor.verificationStatus;

  const stats = [
    { label: "Total Sessions", value: 42, icon: Users, color: "text-blue-600" },
    {
      label: "Completed",
      value: 30,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    { label: "Upcoming", value: 12, icon: Calendar, color: "text-purple-600" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {mentor.userName}
            </h1>
            <p className="text-gray-500">
              Here is what's happening with your sessions today.
            </p>
          </div>

          {!isVerified && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
              <AlertCircle size={16} />
              {verificationStatus === "pending" && `Approval Pending`}
            </div>
          )}
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {label}
                </CardTitle>
                <Icon size={18} className={color} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                <p className="text-xs text-gray-400 mt-1">+2 from last week</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder for Main Content Area */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-sm min-h-[300px] flex items-center justify-center border-2 border-dashed bg-white">
            <div className="text-center">
              <p className="text-gray-400">
                Recent Session Activity will appear here
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
