export type RgsResponse = {
    result?: any;
    error?: string;
    [key: string]: any;
};
export type RgsError = {
    error: string;
    errorDetails?: {
        details: string;
        isInDoubt?: boolean;
        [key: string]: any;
    };
    [key: string]: any;
};
export type StakeLimits = {
    stakes: number[];
    lines?: number[];
    denominations?: number[];
    subgames?: string[];
    defaultStake?: number;
};
export type RgsBonusOffer = {
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
