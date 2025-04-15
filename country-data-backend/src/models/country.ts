class Country {
    name: string;
    flag: string;
    countryCode?: string;
    population?: number;
    languages?: object;
    region: string;
    currency?: object;
    timezones?: object[];

    constructor(name: string, flag: string, region: string,countryCode:string, population?: number, languages?: object, currency?: object, timezones?: object[]) {
        this.name = name;
        this.flag = flag;
        this.region = region;
        this.population = population;
        this.languages = languages;
        this.currency = currency;
        this.timezones = timezones;
        this.countryCode = countryCode;
    }
}
export default Country;