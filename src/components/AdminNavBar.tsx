import React from "react";
import { Button } from "@/components/ui/button";

export const AdminNavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" className="bg-red-500 hover:bg-red-600">
          Logout
        </Button>
      </div>
    </nav>
  );
};
