import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_KEY = "your_bungie_api_key";

const VendorsPage = ({ accessToken }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (accessToken) {
      fetchVendors();
    }
  }, [accessToken]);

  const fetchVendors = async () => {
    try {
      const response = await axios.get("https://www.bungie.net/Platform/Destiny2/Vendors/", {
        headers: { "Authorization": `Bearer ${accessToken}`, "X-API-Key": API_KEY }
      });
      setVendors(response.data.Response);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  return (
    <div className="p-4">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <Link href="/"><a className="m-2">Home</a></Link>
          <Link href="/loadouts"><a className="m-2">Loadouts</a></Link>
          <Link href="/profile"><a className="m-2">Profile</a></Link>
        </div>
      </nav>
      <h1 className="text-xl font-bold">Vendors</h1>
      <Button onClick={fetchVendors} className="m-2">Refresh Vendors</Button>
      <div>
        {vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <div key={index} className="p-4 border rounded m-2">
              <h2 className="text-lg font-semibold">{vendor.vendorName}</h2>
              <p>{vendor.description}</p>
            </div>
          ))
        ) : (
          <p>No vendors found.</p>
        )}
      </div>
    </div>
  );
};

export default VendorsPage;
