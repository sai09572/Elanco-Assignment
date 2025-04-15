import SearchBar from "./SearchBar";
import { ICountry } from "@/src/models/country";

interface HeaderProps {
  setCountries: React.Dispatch<React.SetStateAction<ICountry[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

function Header({ setCountries, setLoading, setError }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md sticky top-0 w-fit mx-auto gap-4">
      <SearchBar
        setCountries={setCountries}
        setLoading={setLoading}
        setError={setError}
      />
    </header>
  );
}

export default Header;
