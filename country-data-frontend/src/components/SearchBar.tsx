import { useEffect, useState } from "react";
import { countryService } from "../services/countryService";
import { ICountry } from "../models/country";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== debouncedValue) {
        setDebouncedValue(inputValue);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch countries when debouncedValue changes
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const payload =
        !isNaN(Number(debouncedValue)) || debouncedValue.includes("UTC")
            ? { timezone: debouncedValue }
            : { name: debouncedValue, capital: debouncedValue };

        const response = await countryService.searchCountries(payload);
        if (response.status !== 200) {
          throw new Error(response.data || "Failed to fetch countries");
        }

        const countryDetails: ICountry[] = response?.data?.map((country: any) => ({
          name: country?.name?.common,
          flag: country?.flags?.svg,
          region: country?.region,
          countryCode: country?.cca3,
        }));
        setCountries(countryDetails);
      } catch (err: any) {
        setError("Failed to fetch countries");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedValue.trim() !== "") {
      fetchCountries();
    } else {
      setCountries([]);
    }
  }, [debouncedValue]);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={inputValue}
        onChange={(e) => handleChange(e.target.value.trimStart())}
        className="p-2 border border-gray-300 rounded-md w-[32ch] md:w-[40ch] lg:w-[50ch]"
      />
    </div>
  );
}

export default SearchBar;
