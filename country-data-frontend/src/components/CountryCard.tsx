import Image from "next/image";
import { useRouter } from "next/router";
import { ICountry } from "../models/country";

interface ICountryCard {
  country: ICountry;
}

function CountryCard(props: Readonly<ICountryCard>) {
  const { country } = props;
  const router = useRouter();

  return (
    <>
      {/* Display filtered countries */}
      <div
        key={country.name}
        data-testid={`country-card-${country.countryCode}`}
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer h-full flex flex-col"
        onClick={() => {
          router.push(`/countries/${country.countryCode}`);
        }}
      >
        {/* Accessing the flag from the 'flag' property */}
        {country.flag ? (
          <Image
            className="w-10 h-10 object-cover"
            src={country.flag}
            alt={`Flag of ${country.name}`}
            width={40}
            height={40}
          />
        ) : (
          <p className="text-center">No Flag Available</p>
        )}
        <div className="mt-2 text-center">
          <h2 className="font-bold">{country.name}</h2>
          <p>&#127760; {country.region}</p>
        </div>
      </div>
    </>
  );
}

export default CountryCard;