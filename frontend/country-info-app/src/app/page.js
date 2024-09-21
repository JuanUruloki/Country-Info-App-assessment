/**
 * The above function is a React component that fetches a list of countries from a backend API,
 * displays them with their flags, and allows pagination through the list.
 * @returns The `HomePage` component is being returned. It fetches a list of countries from a backend
 * API, displays them in a grid layout with their flags and names, and provides pagination
 * functionality to navigate through the list of countries. The component also handles errors in case
 * there is a problem fetching the countries.
 */
"use client"; 
import './Styles/globals.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 15;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/countries"); // Asegúrate de que el backend esté corriendo
        setCountries(response.data);
      } catch (err) {
        setError("Error fetching countries");
      }
    };

    fetchCountries();
  }, []);

  

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col mt-20 items-center">
      <h2 className="my-6 text-3xl text-white font-bold">Available Countries</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {currentCountries.map((country) => (
          <div 
            key={country.countryCode} 
            className="p-4 w-[350px] bg-gray-200 shadow-2xl hover:scale-105 rounded-lg flex flex-col items-center justify-center bg-cover bg-center text-white" 
            style={{ backgroundImage: `url(${country.flag})` }}
          >
            <div className="flex justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 w-full rounded-md">
              <Link href={`/country/${country.countryCode}`} className="text-2xl font-light text-white ">
                {country.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded shadow-md ${currentPage === index + 1 ? 'bg-red text-darkGrey' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
