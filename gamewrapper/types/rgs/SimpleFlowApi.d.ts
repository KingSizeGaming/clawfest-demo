import { RgsInterface, Rgs } from './Rgs';
import { RgsAdapter, RgsAdapterConfig, RgsAdapterBaseAction, RgsAdapterPlugin } from './RgsAdapter';
import { ConstructorOf } from '../UtilTypes';
export interface SimpleFlowInterface extends RgsInterface {
    refresh(): Promise<any>;
    spin(...args: any[]): Promise<any>;
    freeSpin?(ticketId: string, ...args: any[]): Promise<any>;
    setFreeSpin?(ticketId: string, freeSpinType: string): Promise<any>;
    getPreviousTicket?(): Promise<any>;
    close(ticketId: string): Promise<any>;
    getGame?(): Promise<any>;
}
type SimpleFlowAction = 'refresh' | 'spin' | 'freespin' | 'setfreespin' | 'close';
type RgsAdapterAction = SimpleFlowAction | RgsAdapterBaseAction;
export default class SimpleFlowAdapter<T extends SimpleFlowRgs> extends RgsAdapter<T> implements SimpleFlowInterface {
    nextAction: SimpleFlowAction;
    protected plugins: Record<RgsAdapterAction, RgsAdapterPlugin[]>;
    constructor(config: RgsAdapterConfig, RgsClass: ConstructorOf<T>);
    applyGameConfig(): void;
    applyGameData(data: any): void;
    initGame(): Promise<any>;
    purchase(...args: any[]): Promise<any>;
    settle(): Promise<any>;
    getTicket(ticketId: string): Promise<any>;
    refresh(): Promise<any>;
    spin(...args: any[]): Promise<any>;
    freeSpin(...args: any[]): Promise<any>;
    setFreeSpin(ticketIdOrFreespinType: string, freeSpinType?: any): Promise<import("../UtilTypes").AnyObject>;
    close(ticketId?: string): Promise<any>;
}
export declare class SimpleFlowRgs extends Rgs implements SimpleFlowInterface {
    refresh(): Promise<any>;
    getTicket(ticketId: string): Promise<any>;
    spin(...args: any[]): Promise<any>;
    freeSpin(ticketId: string, ...args: any[]): Promise<any>;
    setFreeSpin(ticketId: string, freeSpinType: string): Promise<any>;
    close(ticketId: string): Promise<any>;
    getGame(): Promise<any>;
}
export {};
