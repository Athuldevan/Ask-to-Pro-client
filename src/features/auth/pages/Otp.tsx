import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "@/lib/slices/authApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Otp() {
  const [verifyOtp] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  // Verifying  Otp
  async function handleVerifyOtp() {
    console.log(enteredOtp);
    await verifyOtp({ enteredOtp, email: email }).unwrap();
    navigate("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <p className="text-3xl font-bold text-[#7e22ce]">Enter Your OTP</p>

      <InputOTP
        maxLength={6}
        value={enteredOtp}
        onChange={(value) => setEnteredOtp(value)}
      >
        <InputOTPGroup className="gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="w-16 h-16 text-2xl font-semibold text-[#7e2cce]"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={handleVerifyOtp}>Enter</Button>
    </div>
  );
}
