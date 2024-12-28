import { useEffect, useState } from "react";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/apartments"
        );
        setApartments(response.data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="">
      <h2>Apartments</h2>
      <div className="flex"></div>
    </div>
  );
}
