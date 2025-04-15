import { useEffect, useState } from "react";
import { ICountry } from "@/src/models/country";
import { countryService } from "@/src/services/countryService";

interface SearchBarProps {
  setCountries: React.Dispatch<React.SetStateAction<ICountry[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

function SearchBar({ setCountries, setLoading, setError }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce user input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch default countries on first load
  useEffect(() => {
    const fetchInitialCountries = async () => {
      try {
        const response = await countryService.searchCountries({});
        if (response.status !== 200) throw new Error("Initial fetch failed");

        const countryDetails: ICountry[] = response.data.map((country: any) => ({
          name: country?.name?.common,
          flag: country?.flags?.svg,
          region: country?.region,
          countryCode: country?.cca3,
        }));

        setCountries(countryDetails);
      } catch {
        setCountries([]);
      }
    };

    fetchInitialCountries();
  }, [setCountries]);

  // Fetch countries based on debounced search input
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setCountries([]);
      return;
    }

    const fetchFilteredCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const isTimezoneQuery =
          !isNaN(Number(debouncedValue)) || debouncedValue.includes("UTC");

        const payload = isTimezoneQuery
          ? { timezone: debouncedValue }
          : { name: debouncedValue, capital: debouncedValue };

        const response = await countryService.searchCountries(payload);
        if (response.status !== 200) throw new Error("Search failed");

        const countryDetails: ICountry[] = response.data.map((country: any) => ({
          name: country?.name?.common,
          flag: country?.flags?.svg,
          region: country?.region,
          countryCode: country?.cca3,
        }));

        setCountries(countryDetails);
      } catch {
        setError("Failed to fetch countries");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCountries();
  }, [debouncedValue, setCountries, setError, setLoading]);

  return (
    <input
      type="text"
      placeholder="Search countries..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value.trimStart())}
      className="p-2 border border-gray-300 rounded-md w-[32ch] md:w-[40ch] lg:w-[50ch]"
    />
  );
}

export default SearchBar;
