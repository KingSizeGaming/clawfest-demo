import { RgsInterface, Rgs, RgsConfig } from './Rgs';
import { RgsAdapter, RgsAdapterConfig, RgsAdapterBaseAction, RgsAdapterPlugin } from './RgsAdapter';
export interface ScratchRgsInterface extends RgsInterface {
    getToken?(tokenUrl: string, callback: Function): any;
    getGame(): Promise<any>;
    purchaseTicket(bet: number): Promise<any>;
    settleTicket(ticketId: string): Promise<any>;
}
declare type ScratchAction = 'get-game' | 'get-unsettled-ticket' | 'purchase' | 'settle';
declare type RgsAdapterAction = ScratchAction | RgsAdapterBaseAction;
export default class ScratchAdapter extends RgsAdapter<ScratchcardRgs> implements ScratchRgsInterface {
    protected plugins: Record<RgsAdapterAction, RgsAdapterPlugin[]>;
    constructor(config: RgsAdapterConfig);
    applyGameData(data: any): void;
    initGame(): Promise<any>;
    purchase(bet: any): Promise<any>;
    settle(): Promise<any>;
    getToken(tokenUrl: string, callback: Function): void;
    getGame(): Promise<any>;
    purchaseTicket(bet: number): Promise<any>;
    settleTicket(ticketId?: string): Promise<any>;
}
export declare class ScratchcardRgs extends Rgs implements ScratchRgsInterface {
    constructor(config: RgsConfig);
    getToken(tokenUrl: any, callback: any): void;
    getGame(): Promise<any>;
    getUnsettledTicket(): Promise<any>;
    purchaseTicket(bet: number): Promise<any>;
    settleTicket(ticketId: string): Promise<any>;
}
export {};
