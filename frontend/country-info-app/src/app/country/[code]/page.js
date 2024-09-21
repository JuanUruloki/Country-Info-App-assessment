"use client";

import '../../Styles/globals.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CountryPage({ params }) {
  const { code: countryCode } = params; 
  const [countryInfo, setCountryInfo] = useState(null);
  const [populationData, setPopulationData] = useState([]); 
  const [loadingCountryInfo, setLoadingCountryInfo] = useState(true); // Estado de carga para la información del país
  const [loadingPopulationData, setLoadingPopulationData] = useState(true); // Estado de carga para la información de la población
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!countryCode) return;

    /**
     * The function `fetchCountryInfo` fetches country information using an API and sets the retrieved
     * data while also fetching population data based on the country's official and common names.
     */
    const fetchCountryInfo = async () => {
      setLoadingCountryInfo(true);
      try {
        const infoResponse = await axios.get(`http://localhost:5000/api/country/${countryCode}`);
        setCountryInfo(infoResponse.data);
        setLoadingCountryInfo(false);

        // Fetch population data
        await fetchPopulationData(infoResponse.data.officialName, infoResponse.data.commonName);
      } catch (err) {
        console.error(err);
        setError("Error fetching country info");
        setLoadingCountryInfo(false);
      }
    };

    /**
     * The function `fetchPopulationData` asynchronously fetches population data for a country using its
     * official name and falls back to the common name if needed.
     * @param officialName - The official name of the country.
     * @param commonName - The common name of the country.
     */
    const fetchPopulationData = async (officialName, commonName) => {
      setLoadingPopulationData(true);
      try {
        let populationResponse = await axios.post(
          "http://localhost:5000/api/country/population",
          { country: officialName }
        );

        if (Array.isArray(populationResponse.data.data.populationCounts)) {
          setPopulationData(populationResponse.data.data.populationCounts);
        } else {
          console.warn("No population data for official name");
        }
      } catch (err) {
        console.warn("Official name failed, trying common name:", err.message);
        try {
          const fallbackResponse = await axios.post(
            "http://localhost:5000/api/country/population",
            { country: commonName }
          );

          if (Array.isArray(fallbackResponse.data.data.populationCounts)) {
            setPopulationData(fallbackResponse.data.data.populationCounts);
          } else {
            console.warn("No population data for common name");
          }
        } catch (fallbackErr) {
          console.error("Error fetching population data for common name:", fallbackErr.message);
        }
      } finally {
        setLoadingPopulationData(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (error) return <p className="text-red-600">{error}</p>;

  if (loadingCountryInfo) return <p>Loading country info...</p>;

  const data = {
    labels: populationData.map((entry) => entry.year || "Unknown Year"),
    datasets: [
      {
        label: "Population",
        data: populationData.map((entry) => entry.value || 0),
        backgroundColor: "rgba(190, 49, 68, 0.6)",
      },
    ],
  };

  return (
    <div className='flex flex-col items-center pt-20 px-8'>
      <div className='flex flex-col w-1/3 rounded-2xl items-center p-6 bg-darkGray'>
        <img
          src={countryInfo.flagUrl}
          alt={`Flag of ${countryInfo.commonName}`}
          className="w-60 mt-4 rounded-2xl shadow-xl"
        />
        <h2 className="pt-4 text-4xl text-white text-center font-semibold">{countryInfo.commonName}</h2>
        <h3 className="text-2xl text-white text-center mt-6">Bordering Countries</h3>
        <ul className='flex flex-col items-center'>
          {countryInfo.borders.length > 0 ? (
            countryInfo.borders.map((border) => (
              <li key={border.countryCode}>
                <Link
                  href={`/country/${border.countryCode}`}
                  className="text-white text-xl hover:text-red"
                >
                  {border.commonName}
                </Link>
              </li>
            ))
          ) : (
            <p>No bordering countries available</p>
          )}
        </ul>
      </div>

      <div className="flex flex-col items-center mt-14 px-8 w-full bg-gray rounded-2xl">
        <h3 className="text-3xl my-6">Population Chart</h3>

        {loadingPopulationData ? (
          <p>Loading population data...</p> 
        ) : populationData.length > 0 ? (
          <Bar data={data} />
        ) : (
          <p>No population data available</p> 
        )}
      </div>
    </div>
  );
}
