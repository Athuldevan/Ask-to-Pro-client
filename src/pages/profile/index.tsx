import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useViewProfileQuery } from "@/lib/slices/authApi";

export default function ProfilePage() {
    const {data:user, isLoading, isError} = useViewProfileQuery();
    console.log(user)
  return (
    <div className="w-full min-h-screen p-10 bg-white dark:bg-gray-950">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          View and update your personal information.
        </p>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Profile Card */}
        <Card className="col-span-1 bg-[#faf5ff] dark:bg-[#0d0f1a] border-none shadow-xl rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center">

            {/* Avatar */}
            <Avatar className="h-28 w-28 border-4 border-[#7e22ce] shadow-md">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#7e22ce] text-white text-2xl font-bold">
                ST
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Student User
            </h2>
            <p className="text-gray-500 dark:text-gray-400">student@example.com</p>

            {/* Button */}
            <Button className="mt-6 w-full bg-[#7e22ce] hover:bg-[#6c1fa5] text-white rounded-xl">
              Change Photo
            </Button>

          </CardContent>
        </Card>

        {/* RIGHT: Form Section */}
        <Card className="col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-8 space-y-8">

            {/* Personal Info Title */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Update your basic account details.
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <Label className="text-gray-700 dark:text-gray-300">Full Name</Label>
                <Input
                  placeholder="Enter name"
                  className="mt-1 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                  focus-visible:ring-[#7e22ce]"
                />
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  placeholder="Enter email"
                  className="mt-1 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                  focus-visible:ring-[#7e22ce]"
                />
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300">Phone</Label>
                <Input
                  placeholder="Phone number"
                  className="mt-1 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                  focus-visible:ring-[#7e22ce]"
                />
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300">Role</Label>
                <Input
                  disabled
                  value="Student"
                  className="mt-1 rounded-xl bg-gray-200 dark:bg-gray-800 border-none cursor-not-allowed"
                />
              </div>
            </div>

            <Button className="bg-[#7e22ce] hover:bg-[#6c1fa5] text-white px-6 py-3 rounded-xl">
              Save Changes
            </Button>

            {/* Security Section */}
            <div className="pt-10">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Security
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Manage your password settings.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Current Password</Label>
                  <Input
                    type="password"
                    className="mt-1 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                    focus-visible:ring-[#7e22ce]"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">New Password</Label>
                  <Input
                    type="password"
                    className="mt-1 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                    focus-visible:ring-[#7e22ce]"
                  />
                </div>

              </div>

              <Button className="mt-6 bg-[#7e22ce] hover:bg-[#6c1fa5] text-white px-6 py-3 rounded-xl">
                Update Password
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
