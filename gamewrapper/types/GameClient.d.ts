export declare type BetModes = 'single-multiplier';
export interface GameClientConfig {
    bonusRoundsGameId?: string;
    autoplayOptions?: number[];
    stakeValues?: number[];
    defaultStake?: number;
    gamble?: {
        hasGamble?: boolean;
        prizeTable?: string[];
    };
    betMode?: BetModes;
    betMultipliers?: {
        [key: string]: number[];
    };
    lineCount?: number[];
    defaultLineCount?: number;
    denomValues?: number[];
    initialStakeIndex?: number;
    [key: string]: any;
}
