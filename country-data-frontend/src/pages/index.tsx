import { useState } from "react";
import Header from "@/src/components/Header";
import CountryList from "@/src/components/CountryList";
import { ICountry } from "@/src/models/country";

export default function Home() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="p-6 flex flex-col gap-6 ">
      <Header
        setCountries={setCountries}
        setLoading={setLoading}
        setError={setError}
      />
      <CountryList countries={countries} loading={loading} error={error} />
    </div>
  );
}
