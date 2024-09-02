import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Name</label>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <Input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <Button type="submit" variant="default">
        Register
      </Button>
    </form>
  );
};
