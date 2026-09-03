import { RgsInterface, Rgs, RgsConfig } from './Rgs';
import { RgsAdapter, RgsAdapterConfig, RgsAdapterBaseAction, RgsAdapterPlugin } from './RgsAdapter';
import { RgsError } from './RgsTypes';
export interface TableGameInterface extends RgsInterface {
    refresh(): Promise<any>;
    play(betType: string, bet: number, playerSelection?: any): Promise<any>;
    move(playerSelection: any, ticketId?: string): Promise<any>;
    close(ticketId: string): Promise<any>;
    getGame?(): Promise<any>;
}
type TableGameAction = 'refresh' | 'play' | 'move' | 'close';
type RgsAdapterAction = TableGameAction | RgsAdapterBaseAction;
export default class TableGameAdapter extends RgsAdapter<TableGameRgs> implements TableGameInterface {
    nextAction: TableGameAction;
    protected plugins: Record<RgsAdapterAction, RgsAdapterPlugin[]>;
    constructor(config: RgsAdapterConfig);
    applyGameConfig(): void;
    applyGameData(data: any): void;
    initGame(): Promise<any>;
    purchase(...args: any[]): Promise<any>;
    settle(): Promise<any>;
    getGame(): Promise<any>;
    getTicket(ticketId: string): Promise<any>;
    protected isRecoverableFlowError(reason: RgsError): boolean;
    refresh(): Promise<any>;
    play(betType: string, bet: number, playerSelection?: any): Promise<any>;
    move(playerSelection: any, ticketId?: string): Promise<any>;
    close(ticketId?: string): Promise<any>;
}
export declare class TableGameRgs extends Rgs implements TableGameInterface {
    constructor(config: RgsConfig);
    refresh(): Promise<any>;
    getTicket(ticketId: string): Promise<any>;
    play(betType: string, bet: number, playerSelection?: any): Promise<any>;
    move(ticketId: string, playerSelection: any): Promise<any>;
    close(ticketId: string): Promise<any>;
    getGame(): Promise<any>;
}
export {};
