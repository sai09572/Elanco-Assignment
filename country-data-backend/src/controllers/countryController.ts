import { Request, Response } from 'express';
import axios from 'axios';
import Country from '../models/country';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';


/**
 * Get all countries
 * Fetches a list of countries from the REST Countries API and returns
 * an array of country objects containing their name, flag, and region.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 *
 * @returns A JSON response containing an array of countries with the following structure:
 * - `name`: The common name of the country (or 'Unknown' if unavailable).
 * - `flag`: The URL of the country's flag in SVG format (or an empty string if unavailable).
 * - `region`: The region of the country (or 'Unknown' if unavailable).
 *
 * @throws A 500 status code with an error message if the API request fails.
 */
export const getCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${REST_COUNTRIES_API}/all`);
    const countries = response.data.map((country: any) => 
      new Country(
        country?.name?.common || 'Unknown',
        country?.flags?.svg || '',
        country?.region || 'Unknown'
      )
    );
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};


/**
 * Get country by code
 * Retrieves country details by its code from the REST Countries API.
 *
 * @param req - The HTTP request object, containing the country code in `req.params.code`.
 * @param res - The HTTP response object used to send the response.
 *
 * @returns A JSON response containing the country's details, including:
 * - `name`: The common name of the country.
 * - `flag`: The URL of the country's flag in SVG format.
 * - `population`: The population of the country.
 * - `languages`: An object representing the languages spoken in the country.
 * - `region`: The region where the country is located.
 * - `currency`: An object representing the currencies used in the country.
 *
 * @throws Returns a 404 status with an error message if the country is not found.
 * @throws Returns a 500 status with an error message if an unexpected error occurs.
 * @throws Returns the status and error message from the REST Countries API if the API call fails.
 */
export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${REST_COUNTRIES_API}/alpha/${code}`);
    const country = response.data[0];
    if (!country) {
       res.status(404).json({ error: 'Country not found' });
    }
  const countryDetails = new Country(
    country?.name?.common || 'Unknown',
    country?.flags?.svg || '',
    country?.region || 'Unknown',
    country?.population || 0,
    country?.languages || {},
    country?.currencies || {}
  );
  res.json(countryDetails);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.response?.data || 'Failed to fetch country' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

/**
 * Filter countries by region
 * Filters countries by a specified region and returns the matching countries.
 *
 * @param req - The HTTP request object, containing the region parameter in `req.params`.
 * @param res - The HTTP response object used to send the filtered countries or an error message.
 * 
 * @remarks
 * This function fetches all countries from the REST Countries API and filters them based on the `region` parameter.
 * If an error occurs during the API call or filtering process, a 500 status code is returned with an error message.
 *
 * @throws Will return a 500 status code if the API call fails or an unexpected error occurs.
 */
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  try {
    const { region } = req.params;
    const response = await axios.get<Country[]>(`${REST_COUNTRIES_API}/all`);
    const countries = response.data.filter((country: any) => country?.region === region);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries by region' });
  }
};

/**
 * Search countries
 * Handles the search for countries based on query parameters such as name, capital, region, and timezone.
 * Fetches data from the REST Countries API and filters the results according to the provided query parameters.
 * 
 * @param req - The HTTP request object, containing query parameters:
 *   - `name` (optional): A string to filter countries by their common name (case-insensitive).
 *   - `capital` (optional): A string to filter countries by their capital city (case-insensitive).
 *   - `region` (optional): A string to filter countries by their region.
 *   - `timezone` (optional): A string to filter countries by their timezones.
 * @param res - The HTTP response object used to send the filtered list of countries or an error message.
 * 
 * @returns A JSON response containing the filtered list of countries or an error message if the operation fails.
 * 
 * @throws 500 - If there is an error while fetching or processing the data from the REST Countries API.
 */
export const searchCountries = async (req: Request, res: Response) => {
  try {
    const { name, capital, region, timezone } = req.query;
    const response = await axios.get(`${REST_COUNTRIES_API}/all`);
    let countries = response.data;

    if (name) {
      countries = countries.filter((country: any) =>
        country.name.common.toLowerCase().includes((name as string).toLowerCase())
      );
    }
    if (capital) {
      countries = countries.filter((country: any) =>
        country.capital && country.capital[0].toLowerCase().includes((capital as string).toLowerCase())
      );
    }
    if (region) {
      countries = countries.filter((country: any) => country.region === region);
    }
    if (timezone) {
      countries = countries.filter((country: any) => country.timezones.includes(timezone as string));
    }

    res.json(countries);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.response?.data || 'Failed to fetch countries' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
  }
