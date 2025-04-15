class Country {
    name: string;
    flag: string;
    population?: number;
    languages?: object;
    region: string;
    currency?: object;

    constructor(name: string, flag: string, region: string, population?: number, languages?: object, currency?: object) {
        this.name = name;
        this.flag = flag;
        this.region = region;
        this.population = population;
        this.languages = languages;
        this.currency = currency;
    }
}
export default Country;