import SimpleFlowAdapter, { SimpleFlowInterface, SimpleFlowRgs } from './SimpleFlowApi';
import { RgsAdapterConfig } from './RgsAdapter';
import { RgsConfig } from './Rgs';
import { StakeLimits } from './RgsTypes';
import { BetModes } from '../GameClient';
export interface SlotRgsInterface extends SimpleFlowInterface {
    spin(lineCount: number, gameType: string, bet: number): Promise<any>;
    getGame(): Promise<any>;
}
export declare class SlotAdapter extends SimpleFlowAdapter<SlotRgs> implements SlotRgsInterface {
    protected lineList: number[];
    protected lineOptions: number[];
    protected betMode: BetModes;
    protected betMultipliers: {
        [key: string]: number[];
    };
    protected currentMultiplier: number;
    constructor(config: RgsAdapterConfig);
    getGame(): Promise<any>;
    applyGameConfig(): void;
    getCurrentMultiplier(): number;
    getDefaultStake(): number;
    getDefaultLines(): number;
    getAllLines(): number[];
    getLineOptions(): number[];
    setLineLimits(limits: number[]): void;
    getLimits(): {
        lines: number[];
        stakes: number[];
    };
    setLimits(limits: StakeLimits): void;
}
export declare class SlotRgs extends SimpleFlowRgs implements SlotRgsInterface {
    constructor(config: RgsConfig);
    spin(lineCount: number, gameType: string, betPerLine: number): Promise<any>;
    getGame(): Promise<any>;
    protected parseData(data: any): any;
}
