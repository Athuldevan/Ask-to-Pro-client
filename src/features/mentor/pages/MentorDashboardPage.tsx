import {
  Card,
  CardTitle,
} from "@/components/ui/card";

export default function MentorDashboardPage() {
  return (
    <div className="bg-gray-50  w-screen flex items-center justify-center ml-0">
      <Card className="w-[199px] flex justify-around items-center">
        <CardTitle className="font-light">Total Sessions</CardTitle>
        <p className="ml-1">42</p>
      </Card>
      <Card className="w-[199px] flex justify-around items-center">
        <CardTitle className="font-light">Total Sessions</CardTitle>
        <p className="ml-1">42</p>
      </Card>
      <Card className="w-[199px] flex justify-center items-center">
        <CardTitle className="font-light">Total Sessions</CardTitle>
        <p className="ml-1">42</p>
      </Card>
    </div>
  );
}
