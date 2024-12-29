'use client'

import apiClient from "@/app/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Apartment() {
    // Retrieving the apartment ID from the URL parameter using Next.js' `useParams` hook.
    const params = useParams();

    // Extracting the apartment ID from the URL params.
    const apartmentId = params.id;

    // State hook to store the apartment details.
    const [apartmentDetails, setApartmentDetails] = useState({
        name: "",
        unitNumber: "",
        project: "",
        price: null,
    });

    // useEffect hook to fetch apartment details when the component mounts or when the apartmentId changes.
    useEffect(() => {

         // Function to fetch the apartment details from the backend API.
        const fetchApartmentDetails = async () => {
            try {
                // Sending GET request to fetch details of a specific apartment using the ID from the URL.
                const response = await apiClient.get(
                    `/apartments/${apartmentId}`
                );

                // Updating the state with the fetched apartment details.
                setApartmentDetails(response.data);
            } catch (error) {
                console.error("Error fetching apartments:", error);
            }
        };

        fetchApartmentDetails();
    }, [apartmentId]); // Dependency array ensures the effect runs only when the apartmentId changes and when the component mounts

    return (
        <div className="mt-20 w-1/2">
            {/* Displaying the apartment details */}
            <h1 className="text-5xl">Apartment Details</h1>
            <div className="rounded-xl border-slate-700 border mx-0 mt-24 px-6 py-3">
                <p className="mb-10 text-2xl font-bold capitalize">{apartmentDetails.name}</p>
                <p className="mb-7 text-xl ">{apartmentDetails.project}</p>
                <p className="text-gray-600 font-semibold text-xl mb-7">{apartmentDetails.unitNumber}</p>
                <p className="text-red-600 text-lg tracking-wider font-bold">${apartmentDetails.price}</p>
            </div>
        </div>
    )
}