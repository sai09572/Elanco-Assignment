import { ICountry } from "@/src/models/country";
import CountryCard from "./CountryCard";

interface CountryListProps {
  countries: ICountry[];
  loading: boolean;
  error: string | null;
}

function CountryList({ countries, loading, error }: CountryListProps) {
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
            ) : countries?.length > 0 ? (
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
