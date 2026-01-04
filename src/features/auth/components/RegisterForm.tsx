import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ArrowRight, ChevronLeft, User, GraduationCap } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Link, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/lib/slices/authApi";

export default function RegisterForm() {
  const [role, setRole] = useState<"user" | "mentor">("user");
  console.log(role);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ ...formData, role }).unwrap();
      navigate("verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section (Brand) */}
      {/* <BrandSidebar /> */}

      {/* Right Section (Form) */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-white overflow-y-auto">
        <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center md:text-left">
              Create Account
            </h2>

            <p className="text-gray-500 mb-8 text-center md:text-left">
              Join our community of over 10,000+ professionals and students.
            </p>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Student Buutton */}
              <button
                type="button"
                onClick={() => setRole("user")}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                  role === "user"
                    ? "border-[#7e22ce] bg-purple-50 text-[#7e22ce]"
                    : "border-gray-200 bg-transparent text-gray-500 hover:border-gray-300"
                )}
              >
                <GraduationCap
                  className={cn(
                    "w-8 h-8 mb-2",
                    role === "user" ? "text-[#7e22ce]" : "text-gray-400"
                  )}
                />
                <span className="font-semibold">Student</span>
              </button>

              {/* Mentor Button */}
              <button
                type="button"
                onClick={() => setRole("mentor")}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                  role === "mentor"
                    ? "border-[#7e22ce] bg-purple-50 text-[#7e22ce]"
                    : "border-gray-200 bg-transparent text-gray-500 hover:border-gray-300"
                )}
              >
                <User
                  className={cn(
                    "w-8 h-8 mb-2",
                    role === "mentor" ? "text-[#7e22ce]" : "text-gray-400"
                  )}
                />
                <span className="font-semibold">Mentor</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="py-6 px-4 text-base rounded-lg border-gray-300 focus:border-[#7e22ce]"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="py-6 px-4 text-base rounded-lg border-gray-300 focus:border-[#7e22ce]"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="password"
                  placeholder="Password"
                  className="py-6 px-4 text-base rounded-lg border-gray-300 focus:border-[#7e22ce]"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="py-6 px-4 text-base rounded-lg border-gray-300 focus:border-[#7e22ce]"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  className="border-gray-400 data-[state=checked]:bg-[#7e22ce] data-[state=checked]:text-white h-5 w-5 rounded"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-gray-600"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-[#7e22ce] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#7e22ce] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full py-4 h-auto bg-[#7e22ce] hover:bg-[#6c1fa5] text-white text-lg rounded-xl shadow-lg transition duration-200 mt-4 group"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="flex items-center my-6">
              <div className="grow border-t border-gray-300"></div>
              <span className="shrink mx-4 text-gray-500 text-sm">
                Or register with
              </span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            <Button
              variant="outline"
              className="w-full py-3 h-auto text-base text-gray-700 border-gray-300 hover:bg-gray-50 rounded-xl flex items-center justify-center transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Google_2020_Vector.svg"
                alt="Google logo"
                className="w-5 h-5 mr-3"
              />
              Register with Google
            </Button>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#7e22ce] font-bold hover:text-purple-900 underline-offset-4 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const BrandSidebar = () => (
  <div className="hidden lg:flex w-1/3 bg-purple-50 p-12 flex-col justify-between border-r border-purple-100/50">
    <div className="text-4xl font-black text-[#7e22ce] tracking-tighter">
      Ask to Pro
    </div>

    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-purple-100/50 border border-purple-100">
        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <ArrowRight className="text-[#7e22ce] w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Accelerate Your Learning
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Book sessions with veterans from Google, Meta, and top startups to get
          personalized career advice.
        </p>
      </div>

      <div className="bg-[#7e22ce] p-6 rounded-2xl shadow-xl shadow-purple-200 text-white">
        <h3 className="text-xl font-bold mb-2">For Mentors</h3>
        <p className="text-purple-50 text-sm leading-relaxed opacity-90">
          Share your wisdom, build your personal brand, and earn while helping
          others succeed in their journey.
        </p>
      </div>
    </div>

    <div className="flex items-center text-purple-700 cursor-pointer hover:text-purple-900 group">
      <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
      <Link to="/" className="text-sm font-semibold">
        Back to Home
      </Link>
    </div>
  </div>
);
