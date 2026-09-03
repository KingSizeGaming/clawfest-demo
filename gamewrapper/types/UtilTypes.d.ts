export type AnyObject = {
    [key: string]: any;
};
export type Dictionary = {
    [key: string]: any;
};
export type StringDictionary = {
    [key: string]: string;
};
export type ConstructorOf<T> = {
    new (...args: any[]): T;
};
export type Currency = {
    code: string;
    locale: string;
};
export type CurrencyConfig = {
    [key: string]: Currency;
};
export type CurrencyDisplay = 'symbol' | 'narrowSymbol' | 'code' | 'name';
export type FormatCurrencyOptions = {
    code: string | undefined;
    locale: string;
    trimFraction?: boolean;
    display?: CurrencyDisplay;
    isSocialCasinoMode?: boolean;
    useCompactNotation?: boolean;
};
