'use client'

import apiClient from "@/app/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Apartment() {
    const params = useParams();
    const apartmentId = params.id;

    const [apartmentDetails, setApartmentDetails] = useState({
        name: "",
        unitNumber: "",
        project: "",
        price: null,
    });

    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await apiClient.get(
                    `/apartments/${apartmentId}`
                );
                setApartmentDetails(response.data);
            } catch (error) {
                console.error("Error fetching apartments:", error);
            }
        };

        fetchApartmentDetails();
    }, [apartmentId]);

    return (
        <div className="mt-20 w-1/2">
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