import Image from "next/image";
import { useEffect, useState } from "react";
import { ICountryDetails } from "../models/country";
import { countryService } from "../services/countryService";

interface CountryDetailProps {
    countryDetails: ICountryDetails | null;
    loading: boolean;
    error: string | null;
  }

const CountryDetail: React.FC<CountryDetailProps> = ({ countryDetails, loading, error }) => {
    //const [countryDetails, setCountryDetails] = useState<ICountryDetails | null>(null);
    //const [loading, setLoading] = useState<boolean>(true);
    //const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchCountryDetails = async () => {
    //         try {
    //             const response = await countryService.getCountryByCode(countryCode);
    //             if (response.status !== 200) {
    //                 throw new Error("Failed to fetch country details");
    //             }
    //             setCountryDetails(response.data);
    //         } catch (err) {
    //             setError("Failed to load country details.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (countryCode) {
    //         fetchCountryDetails();
    //     }

    //     return () => {
    //         setCountryDetails(null); // cleanup if needed
    //     };
    // }, [countryCode]);


    const getTimeFromOffset = (utcOffset: string): string => {
        try {
            if (utcOffset === "UTC")
                return new Date().toLocaleTimeString("en-US", {
                    timeZone: "UTC",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                });

            const [, sign, hrs, mins] = /UTC([+-])(\d{2}):(\d{2})/.exec(utcOffset) || [];
            if (!sign) throw new Error("Invalid UTC format");

            const offsetMs = (parseInt(hrs) * 60 + parseInt(mins)) * 60000 * (sign === "+" ? 1 : -1);
            const localTime = new Date(Date.now() + offsetMs - new Date().getTimezoneOffset() * 60000);

            return localTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
        } catch {
            return "Invalid Timezone";
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
                    {/* Flag */}
                    {countryDetails?.flag ? (
                        <Image
                            className="w-20 h-14 mx-auto mb-4 object-cover rounded"
                            src={countryDetails?.flag}
                            alt={`Flag of ${countryDetails?.name}`}
                            width={80}
                            height={56}
                        />
                    ) : (
                        <p className="text-gray-500">No Flag Available</p>
                    )}

                    {/* Country Name */}
                    <h1 className="text-2xl font-bold text-gray-800">{countryDetails?.name}</h1>
                    <p className="text-gray-500 text-lg">&#127760; {countryDetails?.region}</p>

                    {/* Time Display */}
                    <div className="mt-4 p-4 rounded-lg border border-gray-200 text-center">
                        <p className="text-lg font-medium text-gray-800">
                            &#128339; Time Zone: {!loading && countryDetails?.timezones?.[0]}
                        </p>
                        <div className="mt-2 text-lg font-semibold text-gray-700">
                            &#8987; Current Time:{" "}
                            {!loading &&
                                countryDetails?.timezones?.length &&
                                getTimeFromOffset(countryDetails?.timezones?.[0])}
                        </div>
                    </div>

                    {/* Country Details */}
                    <div className="mt-4 text-left">
                        <p className="text-gray-500 text-lg">
                            &#127963; Capital: {countryDetails?.capital?.[0]}
                        </p>
                        <p className="text-lg font-medium">
                            &#127968; Population:{" "}
                            <span className="font-normal text-gray-700">
                                {countryDetails?.population?.toLocaleString()}
                            </span>
                        </p>

                        <h2 className="text-xl font-semibold mt-3">&#128483; Languages</h2>
                        {countryDetails?.languages ? (
                            <ul className="list-disc pl-6 text-gray-700">
                                {Object.keys(countryDetails.languages).map((key) => (
                                    <li key={key}>{countryDetails.languages?.[key] ?? "Unknown Language"}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No language data available</p>
                        )}

                        <h2 className="text-xl font-semibold mt-3">&#128176; Currency</h2>
                        {countryDetails?.currency ? (
                            <ul className="list-disc pl-6 text-gray-700">
                                {Object.keys(countryDetails.currency).map((key) => (
                                    <li key={key}>
                                        {countryDetails.currency?.[key]?.name ?? "Unknown Currency"} (
                                        {countryDetails.currency?.[key]?.symbol ?? "Unknown Symbol"})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No currency data available</p>
                        )}
                    </div>
                </div>

                <div className="mt-5">
                    <a
                        href={countryDetails?.maps?.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        &#128205; View on Google Maps
                    </a>
                    <br />
                    <a
                        href={countryDetails?.maps?.openStreetMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        &#128506; View on OpenStreetMap
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CountryDetail;
