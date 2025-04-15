// import FilterDropDown from "./FilterDropDown";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md sticky top-0 w-fit mx-auto gap-4">
      <SearchBar />
      {/* <FilterDropDown /> */}
    </header>
  );
}

export default Header;