
"use client";
import { useUser, useAuth } from "@/firebase/auth/use-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push("/");
  };

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.photoURL || ""} />
            <AvatarFallback>
              {user?.displayName
                ? user.displayName.charAt(0)
                : user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user?.displayName || "Welcome"}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSignOut} className="w-full">
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
