import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_KEY = "your_bungie_api_key";

const LoadoutsPage = ({ accessToken }) => {
  const [loadouts, setLoadouts] = useState([]);

  useEffect(() => {
    if (accessToken) {
      fetchLoadouts();
    }
  }, [accessToken]);

  const fetchLoadouts = async () => {
    try {
      const response = await axios.get("https://www.bungie.net/Platform/Destiny2/Loadouts/", {
        headers: { "Authorization": `Bearer ${accessToken}`, "X-API-Key": API_KEY }
      });
      setLoadouts(response.data.Response);
    } catch (error) {
      console.error("Error fetching loadouts:", error);
    }
  };

  return (
    <div className="p-4">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <Link href="/"><a className="m-2">Home</a></Link>
          <Link href="/vendors"><a className="m-2">Vendors</a></Link>
          <Link href="/profile"><a className="m-2">Profile</a></Link>
        </div>
      </nav>
      <h1 className="text-xl font-bold">Loadouts</h1>
      <Button onClick={fetchLoadouts} className="m-2">Refresh Loadouts</Button>
      <div>
        {loadouts.length > 0 ? (
          loadouts.map((loadout, index) => (
            <div key={index} className="p-4 border rounded m-2">
              <h2 className="text-lg font-semibold">{loadout.name}</h2>
              <p>{loadout.description}</p>
            </div>
          ))
        ) : (
          <p>No loadouts found.</p>
        )}
      </div>
    </div>
  );
};

export default LoadoutsPage;