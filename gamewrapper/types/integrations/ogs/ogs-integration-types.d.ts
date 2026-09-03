export type OgsParams = {
    gameid: string;
    device: string;
    currency: string;
    lang: string;
    operatorid: string;
    sessionid: string;
    mode: string;
    lobbyurl?: string;
    depositurl?: string;
    jurisdiction?: string;
    realitycheck_uk_limit?: string;
    realitycheck_uk_elapsed?: string;
    realitycheck_uk_proceed?: string;
    realitycheck_uk_history?: string;
    realitycheck_uk_exit?: string;
    realitycheck_uk_autospin?: string;
};
export type ErrorCategory = 'CRITICAL' | 'INSUFFICIENT_FUNDS' | 'LOGIN_ERROR' | 'RECOVERABLE_ERROR' | 'NON_RECOVERABLE_ERROR' | 'CONNECTION_ERROR' | 'MULTI_CHOICE_DIALOG' | 'OTHER_GAME_IN_PROGRESS' | 'REALITY_CHECK';
export type ErrorSeverity = 'WARNING' | 'INFO' | 'ERROR';
type LayeredStringsObject = {
    [key: string]: string | LayeredStringsObject;
};
type ErrorParams = {
    [key: string]: string | string[] | LayeredStringsObject;
};
export type PromoInfo = {
    PROMOTIONS: {
        GAMEPLAY: 'pending' | 'complete';
        FREEROUNDS: {
            CAMPAIGNID: string;
            ACTIVATIONID: string;
            OPTIONS: PromoInfoOptions;
            ENDDATE?: string;
            REJECTABLE?: boolean;
            CAMPAIGNVALUE?: number;
            TOTALWIN?: number;
        }[];
    };
};
export type PromoInfoOptions = {
    BETLEVEL: number;
    REMAININGROUNDS: number;
    TOTALROUNDS: number;
    FEATURE: string;
}[];
export type FreeRoundsInfo = {
    STATUS: 'notstarted' | 'inprogress' | 'completed';
    ACTIVATIONID: string;
    CAMPAIGNID: string;
    CAMPAIGNVALUE: number;
    CAMPAIGNVALUE_FMT: string;
    ENDDATE: string;
    REJECTABLE: boolean;
    TOTALWIN: number;
    TOTALWIN_FMT: string;
    OPTIONS: {
        BETLEVEL: number;
        BETLEVEL_FMT: string;
        REMAININGROUNDS: number;
        TOTALROUNDS: number;
        FEATURE: string;
    }[];
};
export type GcmCore = {
    init(game: any, gcmUrlString: string, gameUrlString: string): void;
    loadProgressUpdate(percentLoaded: number): void;
    regOption(option: OptionTypes): boolean;
    balancesUpdate(balances: BalanceType): any;
    gameReady(): void;
    gameAnimationStart(): void;
    gameAnimationComplete(resumeCallback: () => void): void;
    stakeUpdate(stake: number): any;
    paidUpdate(paid: number): any;
    optionHasChanged(optionType: OptionTypes, changedFrom: 'GAME', newValue: boolean): void;
    handleError(errorCategory: ErrorCategory, errorSeverity: ErrorSeverity, errorCode: string, errorMessage: string, errorParams?: ErrorParams): void;
    handleMessageTrigger(messageNodeStr: string): void;
    setPromoInfo(promoInfo: PromoInfo): void;
    getPromoInfo(): PromoInfo;
    resume(): void;
    formatAmount(amount: number): string;
    redirect(redirectUrl: string): void;
    reload(): void;
};
export type BalanceType = {
    CASH: {
        amount: number;
    };
    BONUS?: {
        amount: number;
    };
};
export type OptionTypes = 'MUTE' | 'TURBO' | 'ABOUT' | 'HELP' | 'PAYTABLE' | 'GAME_PREFERENCES';
export type CommonUIConfig = {
    gameName?: string;
    gameLoadingScreen?: boolean;
    cuiPosition?: 'left' | 'right' | 'centre';
};
export type RgsBalance = {
    balance: number;
    currency: string;
    accounts?: {
        balance: number;
        currency: string;
        type: 'real' | 'bonus';
    }[];
};
export {};
