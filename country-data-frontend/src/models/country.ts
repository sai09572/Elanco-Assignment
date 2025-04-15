export interface ICountry {
    name: string;
    flag: string;
    region: string;
    countryCode: string;
  }
  
  export interface ICountryDetails {
    name?: string;
    flag?: string;
    population?: number;
    languages?: Record<string, string>;
    region?: string;
    currency?: Record<string, Record<string, string>>;
    timezones?: string[];
    maps?: { googleMaps: string; openStreetMaps: string };
    capital?: string[];
  }
  
  export interface ICountryState {
    countries: ICountry[];
    countryDetails: ICountryDetails;
    loading: boolean;
    error: string | null;
  }