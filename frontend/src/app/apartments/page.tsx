'use client'

import { useEffect, useState } from "react";
import apiClient from "../lib/axios";
import { Apartment } from "../lib/models/apartment";
import Link from "next/link";

export default function Apartments() {
  // State hook to store the fetched apartments data.
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [name, setName] = useState("");  // State for filtering by apartment name
  const [unitNumber, setUnitNumber] = useState(""); // State for filtering by unit number
  const [project, setProject] = useState(""); // State for filtering by project

  const fetchApartments = async () => {
    try {
      const response = await apiClient.get( // Sending GET request to fetch apartments data from the backend API.
        "/apartments", { 
        params: { // Passing filter parameters in the API request
          name,
          unitNumber,
          project,
        },
      }
      );
      setApartments(response.data); // Updating the state with the fetched apartments.

    } catch (error) {
      // Logging any errors that occur during the fetch process.
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    // useEffect hook to fetch apartments when the component is mounted.

    fetchApartments(); // Triggering the fetch request inside useEffect

  }, [name, unitNumber, project]); // Dependancy array ensures refetching whenever filtering inpout changes

  return (
    <div className="my-auto">
      <div className="flex my-10">
        <h1 className="text-3xl pl-6 w-1/5 py-3">Apartments</h1>
        
        {/* Search and filter inputs */}
        <input
          type="text"
          placeholder="Search by unit name"
          className="w-1/5 border p-3 border-slate-700 mr-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by unit number"
          className="w-1/5 border p-3 border-slate-700 mr-2 rounded"
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by project"
          className="w-1/5 border p-3 border-slate-700 mr-10 rounded"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />

        {/* Link to navigate to the Add Apartment page */}
        <Link href="/apartments/add" className="w-1/5">
          <button className="p-3 bg-gray-600 hover:bg-gray-800 border border-slate-700 rounded text-white">Add Apartment</button>
        </Link>
      </div>

      {/* Rendering the list of apartments as a responsive grid */}
      <ul className="flex flex-wrap">

        {/* Mapping over apartments array and rendering each apartment */}
        {apartments.map((apartment: Apartment) => (
          <li key={apartment.id} className="w-1/4 cursor-pointer">
            {/* Each apartment card with a link to apartment details page using id param in url */}
            <div className="rounded-xl border-slate-700 border mx-5 my-5 px-6 py-3">
              <Link href={`/apartments/${apartment.id}`}>
                {/* Displaying apartment details */}
                <h2 className="font-bold capitalize">{apartment.name}</h2>
                <p>{apartment.project}</p>
                <p className="text-gray-600 font-semibold">{apartment.unitNumber}</p>
                <p className="text-red-600 text-lg tracking-wider font-bold">${apartment.price}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
