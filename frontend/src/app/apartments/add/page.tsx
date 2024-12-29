"use client";

import apiClient from "@/app/lib/axios";
import { Apartment } from "@/app/lib/models/apartment";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AddApartmentPage() {
  // Initialize form data state with default values.
  const [formData, setFormData] = useState<Apartment>({
    id: 0,
    name: "",
    project: "",
    price: 0,
    unitNumber: ""
  });

  // Handle change in input fields and update formData state.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update the specific field based on the input name.
  };

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    try {
      // Make a POST request to the backend to create a new apartment.
      const response = await apiClient.post("/apartments", {
        ...formData,
      });

      if (response.status == 200) {
        // If the response status is 200, the apartment was added successfully.
        alert("Apartment added successfully!");

        // Reset the form fields after successful submission.
        setFormData({ name: "", project: "", unitNumber: "", price: 0 }); // Reset form

      } else {
        // If the response status is not 200, there was an error.
        const error = await response.data(); // Fetch error details from the response.
        alert(`Error: ${error.message}`); // Show an alert with the error message.
      }
    } catch (error) {

      // If an error occurs during the API call, log the error and show an error alert.
      console.error("Error adding apartment:", error);
      alert("An error occurred. Please try again.");

    } finally {
      // Redirect to the apartments listing page after form submission.
      // redirect throws an internal error so can't be placed in try block.
      redirect("/apartments");
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-3xl mb-20">Add New Apartment</h1>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
       {/* Apartment name input field */}
        <div className="mb-7 flex">
          <label htmlFor="name" className="text-xl my-auto block w-1/4">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-slate-700 rounded p-2 w-3/4"
            value={formData.name}
            onChange={handleChange} // Call handleChange when the user types in the input.
            required
          />
        </div>

        {/* Apartment project input field */}
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

        {/* Apartment unit number input field */}
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

        {/* Apartment price input field */}
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

        {/* Submit button */}
        <button type="submit" className="p-3 vorder border-slate-700 bg-gray-600 hover:bg-gray-800 text-white rounded ">Add Apartment</button>
      </form>
    </div>
  );
}