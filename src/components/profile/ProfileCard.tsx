import { useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Badge } from "../ui/badge";
//eslint-disable-next-line
const verificationStatus = {
  Pending: "pending",
  Rejected: "rejected",
  Approved: "approved",
} as const;

export type VerificationStatus =
  (typeof verificationStatus)[keyof typeof verificationStatus];

interface ProfileCardProps {
  avatar: string;
  name: string;
  role: "user" | "admin" | "mentor";
  email: string;
  status: VerificationStatus;
  skills?: string[];
  children?: ReactNode;
  company?: string;
  domains?: string[];
  githubUrl?: string;
  jobTitle: string;
}

export default function ProfileCard({
  avatar,
  name,
  role,
  email,
  status,
  children,
  skills,
}: ProfileCardProps) {
  const [isEditing, setIsEditingMode] = useState(false);

  
  const form = useForm({
    defaultValues: {
      username: name,
    },
  });

  function onSubmit(values: any) {
    console.log(values);
    setIsEditingMode(false);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="relative">
          <div className="flex justify-between items-start">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar || "https://github.com/shadcn.png"} />
              <AvatarFallback>
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingMode(!isEditing)}
            >
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-blue-600 font-medium uppercase tracking-wider">
            {role}
          </p>
        </CardHeader>

        <CardContent className="px-6 py-4 flex flex-col items-center gap-3">
          <p className="text-gray-500">{email}</p>
          <div
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
              status === "approved"
                ? "bg-green-100 text-green-700"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
 
            <div className="w-full mt-4">{children}</div>
          </div>
          {skills &&
            skills.map((skill: string) => (
              <Badge variant="destructive"> Skill Badge</Badge>
            ))}
        </CardContent>
      </Card>

      {/* 2. THE FIX: Wrap the fields in the Form provider */}
      {isEditing && (
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </Card>
      )}
    </div>
  );
}
