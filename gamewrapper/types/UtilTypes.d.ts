export declare type AnyObject = {
    [key: string]: any;
};
export declare type Dictionary = {
    [key: string]: any;
};
export declare type StringDictionary = {
    [key: string]: string;
};
export declare type ConstructorOf<T> = {
    new (...args: any[]): T;
};
export declare type Currency = {
    code: string;
    locale: string;
};
export declare type CurrencyConfig = {
    [key: string]: Currency;
};
export declare type CurrencyDisplay = 'symbol' | 'narrowSymbol' | 'code' | 'name';
export declare type FormatCurrencyOptions = {
    code: string | undefined;
    locale: string;
    trimFraction?: boolean;
    display?: CurrencyDisplay;
    isSocialCasinoMode?: boolean;
    useCompactNotation?: boolean;
};
