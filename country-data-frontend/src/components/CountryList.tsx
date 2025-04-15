import { useEffect, useState } from "react";
import { countryService } from "../services/countryService";
import { ICountry } from "../models/country";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [regionList, setRegionList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await countryService.getCountriesList();
        if (response.status === 200) {
          const countryData: ICountry[] = response.data;
          setCountries(countryData);

          // Extract unique regions
          const uniqueRegions = [
            ...Array.from(
              new Set<string>(
                countryData
                  .map((country) => country.region)
                  .filter(Boolean)
              )
            ),
          ];
          setRegionList(uniqueRegions);
        } else {
          setError("Failed to fetch countries");
        }
      } catch (err) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full min-h-[50vh]">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-lg w-full">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : countries.length > 0 ? (
              countries.map((country) => (
                <div key={country.countryCode}>
                  <CountryCard country={country} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No countries found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CountryList;
