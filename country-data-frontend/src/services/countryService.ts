import axios from "axios";

interface ISearchParams {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}

const BASE_URL = "http://localhost:3001";
const API_ENDPOINT_COUNTRIES = "/countries";
const API_ENDPOINT_REGION = "/countries/region";
const API_ENDPOINT_SEARCH = "/countries/search";

const getCountriesList = () => {
  return axios.get(`${BASE_URL + API_ENDPOINT_COUNTRIES}`);
};

const getCountryByCode = (code: string) => {
  return axios.get(`${BASE_URL + API_ENDPOINT_COUNTRIES}/${code}`);
};

const getCountriesByRegion = (region: string) => {
  return axios.get(`${BASE_URL + API_ENDPOINT_REGION}/${region}`);
};

const searchCountries = (params: ISearchParams) => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return axios.get(`${BASE_URL + API_ENDPOINT_SEARCH}?${query}`);
};

export const countryService = {
  getCountriesList,
  getCountryByCode,
  getCountriesByRegion,
  searchCountries,
};