'use client'

import { useEffect, useState } from "react";
import apiClient from "../lib/axios";
import { Apartment } from "../lib/models/apartment";
import Link from "next/link";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await apiClient.get(
          "/apartments"
        );
        setApartments(response.data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="my-auto">
      <div className="flex my-10">
        <h1 className="text-3xl pl-6 w-3/4 py-3">Apartments</h1>
        <Link href="/apartments/add">
          <button className="p-3 bg-gray-600 hover:bg-gray-800 border border-slate-700 rounded text-white">Add Apartment</button>        
        </Link>
      </div>
      <ul className="flex flex-wrap">
        {apartments.map((apartment: Apartment) => (
          <li key={apartment.id} className="w-1/4 cursor-pointer">
            <div className="rounded-xl border-slate-700 border mx-5 my-5 px-6 py-3">
              <Link href={`/apartments/${apartment.id}`}>
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
