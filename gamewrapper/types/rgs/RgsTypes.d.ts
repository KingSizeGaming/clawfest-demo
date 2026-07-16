export declare type RgsResponse = {
    result?: any;
    error?: string;
    [key: string]: any;
};
export declare type RgsError = {
    error: string;
    errorDetails?: {
        details: string;
        isInDoubt?: boolean;
        [key: string]: any;
    };
    [key: string]: any;
};
export declare type StakeLimits = {
    stakes: number[];
    lines?: number[];
    denominations?: number[];
    subgames?: string[];
};
export declare type RgsBonusOffer = {
    id: number;
    description: string;
    gameConfig: {
        title: string;
        description: string;
        rules: {
            gameId: string;
            totalBets: number[];
        }[];
    };
    validFrom: string;
    validTo: string;
    amountAwarded: number;
    amountRemaining: number;
};
