import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe] = useState(false);
  //   const form = useForm({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       email: "",
  //     },
  //   });

  const handleLogin = async function () {
    console.log("Logging IN....");
  };

  return (
    <div className="min-h-screen flex">
      <BrandSidebar />

      {/* Right Section (Login Form) - Takes half the screen */}
      <div className="flex-1 flex items-center justify-center p-12 bg-white">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center md:text-left">
              Sign In
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username or Email Input */}
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Username or Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-6 px-4 text-base rounded-lg border-gray-300 focus:border-[#7e22ce]"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-6 px-4 text-base rounded-lg border-gray-300 focus:border-[#7e22ce]"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    // onCheckedChange={setRememberMe}
                    className="border-gray-400 data-[state=checked]:bg-[#7e22ce] data-[state=checked]:text-white"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-purple-700 hover:text-purple-900"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="link"
                className="w-full py-3 h-auto bg-[#7e22ce] hover:bg-[#6c1fa5] text-white text-lg rounded-lg shadow-lg transition duration-200"
              >
                Sign In <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {/* OR Separator */}
            <div className="flex items-center my-6">
              <div className="grow border-t border-gray-300"></div>
              <span className="shrink mx-4 text-gray-500 text-sm">Or</span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            {/* Sign In with Google Button */}
            <Button
              variant="outline"
              className="w-full py-3 h-auto text-base text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg flex items-center justify-center"
              onClick={() => console.log("Sign in with Google")}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Google_2020_Vector.svg"
                alt="Google logo"
                className="w-5 h-5 mr-3"
              />
              Sign in with Google
            </Button>

            {/* Don't have an account link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-700 font-medium hover:text-purple-900"
              >
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
// / Helper component for the brand section
const BrandSidebar = () => (
  <div className="flex-1 bg-purple-50 p-12 flex flex-col justify-between">
    {/* Logo section */}
    <div className="text-5xl font-extrabold text-[#7e22ce] tracking-tight">
      Ask to Pro
    </div>

    {/* Welcome text */}
    <div className="mb-24">
      <h1 className="text-2xl font-semibold text-gray-800 leading-snug">
        <br />
        Connect With experienced Proffesionals
        <br />
        Get 1-on-1 guidance from industry mentors
      </h1>
    </div>

    <div className="flex items-center text-purple-700 cursor-pointer hover:text-purple-900">
      <ChevronLeft className="w-4 h-4 mr-1" />
      <span className="text-sm">Back</span>
    </div>
  </div>
);
