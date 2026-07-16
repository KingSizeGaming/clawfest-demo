import { CapabilitiesHost } from '../CapabilitiesHost';
import { AnyObject } from '../UtilTypes';
export interface RgsInterface {
    getJwt(): string;
    initGame(): Promise<any>;
    purchase(...args: any[]): Promise<any>;
    feature(feature: string, ...args: any[]): Promise<any>;
    settle(): Promise<any>;
    getUnsettledTicket(): Promise<any>;
    getAccount(): Promise<any>;
    getTicket(ticketId: string): Promise<any>;
    getTicketData(ticketId?: string): Promise<any>;
    setTicketData(data: string | object, ticketId?: string): Promise<any>;
    getWalletData(): Promise<any>;
    getGamble(ticketId: string): Promise<any>;
    gamble(symbol: string, ticketId: string): Promise<any>;
    getJackpots(): Promise<any>;
    getAllJackpots(): Promise<any>;
    getJackpotWins(jackpotId: string, numberOfWins: number): Promise<any>;
    sendCustomRequest(service: string, method: string, args: any[]): Promise<any>;
}
export interface RgsConfig {
    gameId: string;
    params: any;
    rpcUrl?: string;
    gameService?: string | {
        demo: string;
        real: string;
    };
    demo?: boolean;
}
export declare type RgsBaseAction = 'jwt-updated' | 'request-constructed';
export declare type RgsPlugin = (rgs: Rgs, data: AnyObject) => Promise<any>;
declare type RgsAction = RgsBaseAction;
export interface CachedTicketData {
    gameData: string;
    accountData: {
        balance: number;
        currency?: string;
    };
}
export declare class Rgs extends CapabilitiesHost {
    gameId: string;
    walletId: string;
    isPlayForFun: boolean;
    accountService: string;
    gameService: string;
    ticketService: string;
    gambleService: string;
    jackpotService: string;
    walletService: string;
    subscribeService: string;
    bonusService: string;
    cachedTicketData: CachedTicketData;
    protected jwt: string;
    protected rpcUrl: string;
    protected useBonusFunds: boolean;
    protected plugins: Record<RgsAction, RgsPlugin[]>;
    constructor(config: RgsConfig);
    protected invoke(serviceName: any, methodName: any, args: any): Promise<unknown>;
    protected parseData(data: string): any;
    getJwt(): string;
    setJwt(jwt: string): void;
    initGame(): Promise<any>;
    purchase(...args: any[]): Promise<any>;
    feature(): Promise<any>;
    settle(): Promise<any>;
    getAccount(): Promise<any>;
    getTicket(ticketId: any): Promise<any>;
    getUnsettledTicket(): Promise<any>;
    getTicketData(ticketId: any): Promise<any>;
    parseGameData(data: any): any;
    setTicketData(data: any, ticketId: any): Promise<any>;
    setCachedTicketData(ticketId: any): Promise<any>;
    getWalletData(): Promise<any>;
    getGamble(ticketId: any): Promise<any>;
    gamble(symbol: any, ticketId: any): Promise<any>;
    getJackpots(): Promise<any>;
    getAllJackpots(): Promise<any>;
    getJackpotWins(jackpotId: any, numberOfWins: any): Promise<any>;
    getJackpotSubscriptionUrl(): Promise<any>;
    getBonusOffer(): Promise<any>;
    startUsingBonusFunds(): void;
    stopUsingBonusFunds(): void;
    isUsingBonusFunds(): boolean;
    sendCustomRequest(service: string, method: string, args?: any[]): Promise<any>;
}
export {};
