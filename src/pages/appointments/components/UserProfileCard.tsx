import clsx from "clsx";
import { Handshake, Mail, Phone, PhoneCall, User } from "lucide-react";
import React from "react";

interface UserProfileCardProps {
  title: string;
  name: string;
  email: string;
  phone?: string;
  id?: React.ReactNode;
  profilePic?: string;
  role: "customer" | "partner";
}

export const getInitials = (name: string) => {
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
  role = "customer",
}: UserProfileCardProps) => {
  return (
    <div className="border rounded-lg shadow-md p-5  w-full flex-1 bg-white ">
      <div className="text-md font-semibold mb-2 flex gap-2 items-center">
        <div
          className={clsx(
            role === "customer" && " text-gold",
            role === "partner" && " text-gold",
            "rounded-full ",
          )}
        >
          {role === "partner" ? <Handshake size={18} /> : <User size={18} />}
        </div>
        <h1>{title}</h1>
      </div>
      <hr />

      <div className="flex items-center gap-4 my-4">
        {/* Avatar Section */}
        {profilePic ? (
          <img
            src={profilePic}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <div
            className={clsx(
              role === "partner" ? "bg-gradient-mgm" : "bg-gold",
              "w-14 h-14 rounded-full  text-white flex items-center justify-center text-lg font-semibold",
            )}
          >
            {getInitials(name)}
          </div>
        )}

        {/* User Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Mail size={17} />
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
      </div>
      {phone && (
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Phone size={17} />
          <p className="text-md font-medium text-black ">{phone}</p>
        </div>
      )}
      <div
        className={clsx(
          phone ? "" : "mt-2",
          "bg-gray-100 border-gray-400 text-gray-600 inline px-2 border rounded-md text-sm",
        )}
      >
        {id}
      </div>
    </div>
  );
};

export default UserProfileCard;
