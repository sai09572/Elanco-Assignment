//import BackButton from "@/src/components/BackButton";
import CountryDetail from "@/src/components/CountryDetail";
import { countryService } from "@/src/services/countryService";
import { ICountryDetails } from "@/src/models/country";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CountryCode() {
  const router = useRouter();
  const { code } = router.query;
  const countryCode = Array.isArray(code) ? code[0] : code ?? "";

  const [countryDetails, setCountryDetails] = useState<ICountryDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await countryService.getCountryByCode(countryCode);
        if (response.status === 200) {
          setCountryDetails(response.data);
        } else {
          setError(response.data || "Failed to fetch country details");
        }
      } catch {
        setError("Failed to fetch country details");
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryDetails();
    }
  }, [countryCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      <CountryDetail countryDetails={countryDetails} loading={loading} error={error} />
      <div className="fixed bottom-6 right-6">
        {/* <BackButton /> */}
      </div>
    </div>
  );
}

export default CountryCode;
