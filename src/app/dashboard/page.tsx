
import UserProfile from "@/components/user-profile";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <UserProfile />
    </div>
  );
};

export default Dashboard;
