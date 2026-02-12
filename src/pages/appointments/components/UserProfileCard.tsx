import { Phone, PhoneCall } from "lucide-react";
import React from "react";

interface UserProfileCardProps {
  title: string;
  name: string;
  email: string;
  phone: string;
  id?: React.ReactNode;
  profilePic?: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const UserProfileCard = ({
  title,
  name,
  email,
  phone,
  id,
  profilePic,
}: UserProfileCardProps) => {
  return (
    <div className="border rounded-lg shadow-md p-5  w-full flex-1 bg-white">
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      <hr />

      <div className="flex items-center gap-4 mt-4">
        {/* Avatar Section */}
        {profilePic ? (
          <img
            src={profilePic}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {getInitials(name)}
          </div>
        )}

        {/* User Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{name}</h2>

          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground my-2">
        <Phone size={17} />
        <p className="text-md font-medium text-black ">{phone}</p>
      </div>
      <div className="bg-gray-100 border-gray-400 text-gray-600 inline px-2 border rounded-md text-sm ">
        {id}
      </div>
    </div>
  );
};

export default UserProfileCard;
