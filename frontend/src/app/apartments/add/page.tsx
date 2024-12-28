"use client";

import apiClient from "@/app/lib/axios";
import { Apartment } from "@/app/lib/models/apartment";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AddApartmentPage() {
  const [formData, setFormData] = useState<Apartment>({
    id: 0,
    name: "",
    project: "",
    price: 0,
    unitNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/apartments", {
        ...formData,
      });

      if (response.status == 200) {
        alert("Apartment added successfully!");
        setFormData({ name: "", project: "",unitNumber: "", price: 0 }); // Reset form
      } else {
        const error = await response.data();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding apartment:", error);
      alert("An error occurred. Please try again.");
    } finally {
        redirect("/apartments");
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-3xl mb-20">Add New Apartment</h1>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        <div className="mb-7 flex">
          <label htmlFor="name" className="text-xl my-auto block w-1/4">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-slate-700 rounded p-2 w-3/4"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-7 flex">
          <label htmlFor="project" className="text-xl my-auto block w-1/4">Project:</label>
          <input
            type="text"
            id="project"
            name="project"
            className="border border-slate-700 rounded p-2 w-3/4"
            value={formData.project}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-7 flex">
          <label htmlFor="unitNumber" className="text-xl my-auto block w-1/4">Unit Number:</label>
          <input
            type="text"
            id="unitNumber"
            name="unitNumber"
            className="border border-slate-700 rounded p-2 w-3/4"
            value={formData.unitNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-10 flex">
          <label htmlFor="price" className="text-xl my-auto block w-1/4">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            className="border border-slate-700 rounded p-2 w-3/4"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="p-3 vorder border-slate-700 bg-gray-600 hover:bg-gray-800 text-white rounded ">Add Apartment</button>
      </form>
    </div>
  );
}