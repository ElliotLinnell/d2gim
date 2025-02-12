import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_KEY = "your_bungie_api_key";

const ProfilePage = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/", {
        headers: { "Authorization": `Bearer ${accessToken}`, "X-API-Key": API_KEY }
      });
      setProfile(response.data.Response);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="p-4">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <Link href="/"><a className="m-2">Home</a></Link>
          <Link href="/loadouts"><a className="m-2">Loadouts</a></Link>
          <Link href="/vendors"><a className="m-2">Vendors</a></Link>
        </div>
      </nav>
      <h1 className="text-xl font-bold">Profile</h1>
      <Button onClick={fetchProfile} className="m-2">Refresh Profile</Button>
      <div>
        {profile ? (
          <div className="p-4 border rounded m-2">
            <h2 className="text-lg font-semibold">{profile.bungieNetUser.displayName}</h2>
            <img src={profile.bungieNetUser.profilePicturePath} alt="Profile" className="w-20 h-20 rounded-full" />
            <p>Membership ID: {profile.bungieNetUser.membershipId}</p>
          </div>
        ) : (
          <p>No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
