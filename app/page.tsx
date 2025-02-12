import React from "react";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="p-4">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <Link href="/" className="m-2">Home</Link>
          <Link href="/loadouts" className="m-2">Loadouts</Link>
          <Link href="/vendors" className="m-2">Vendors</Link>
          <Link href="/profile" className="m-2">Profile</Link>
        </div>
        <div>
          {isAuthenticated ? (
            <Button onClick={() => router.push("/profile")}>Go to Profile</Button>
          ) : (
            <Button onClick={() => router.push("/auth")}>Login</Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Welcome to Destiny 2 Loadout Manager</h1>
        <p className="mt-2 text-gray-600">Manage your loadouts and check vendor inventories.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Link href="/loadouts"><Button>View Loadouts</Button></Link>
          <Link href="/vendors"><Button>Check Vendors</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;