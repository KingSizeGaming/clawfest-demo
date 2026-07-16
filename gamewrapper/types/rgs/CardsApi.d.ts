import SimpleFlowAdapter, { SimpleFlowInterface, SimpleFlowRgs } from './SimpleFlowApi';
import { RgsConfig } from './Rgs';
import { RgsAdapterConfig } from './RgsAdapter';
export interface CardsRgsInterface extends SimpleFlowInterface {
    spin(bet: number, selectedCards: number[][]): Promise<any>;
    freeSpin(ticketId: string, selectedCards: number[]): Promise<any>;
    execute(commands: string[]): Promise<any>;
    getPreviousTickets(): Promise<any>;
    getGame(): Promise<any>;
}
export declare class CardsAdapter extends SimpleFlowAdapter<CardsRgs> implements CardsRgsInterface {
    constructor(config: RgsAdapterConfig);
    execute(commands: string[]): Promise<any>;
    getPreviousTickets(): Promise<any>;
    getGame(): Promise<any>;
}
export declare class CardsRgs extends SimpleFlowRgs implements CardsRgsInterface {
    constructor(config: RgsConfig);
    spin(bet: number, selectedCards: number[][]): Promise<any>;
    freeSpin(ticketId: string, selectedCards: number[]): Promise<any>;
    execute(commands: string[]): Promise<any>;
    getPreviousTickets(): Promise<any>;
    getGame(): Promise<any>;
}
