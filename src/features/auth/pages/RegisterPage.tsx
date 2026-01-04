import { Outlet } from "react-router-dom";
import { BrandSidebar } from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <BrandSidebar />

      {/* Right content */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-white overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
