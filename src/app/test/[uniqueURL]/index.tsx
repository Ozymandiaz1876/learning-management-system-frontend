"use client";
import React from "react";
import { RegistrationForm } from "@/components/RegistrationForm";

const UniqueURLPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register for the Test</h1>
      <RegistrationForm />
    </div>
  );
};

export default UniqueURLPage;
