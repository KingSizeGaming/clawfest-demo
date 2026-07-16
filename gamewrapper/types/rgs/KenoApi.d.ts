import SimpleFlowAdapter, { SimpleFlowInterface, SimpleFlowRgs } from './SimpleFlowApi';
import { RgsConfig } from './Rgs';
import { RgsAdapterConfig } from './RgsAdapter';
import { StakeLimits } from './RgsTypes';
export interface KenoRgsInterface extends SimpleFlowInterface {
    spin(bet: number, selectedNumbers: number[]): Promise<any>;
    freeSpin(ticketId: string, selectedNumbers: number[]): Promise<any>;
}
export declare class KenoAdapter extends SimpleFlowAdapter<KenoRgs> implements KenoRgsInterface {
    protected denominationList: number[];
    protected denominationOptions: number[];
    constructor(config: RgsAdapterConfig);
    applyGameConfig(): void;
    getAllDenominations(): number[];
    getDenominationOptions(): number[];
    setDenominationLimits(limits: number[]): void;
    getLimits(): {
        denominations: number[];
        stakes: number[];
    };
    setLimits(limits: StakeLimits): void;
}
export declare class KenoRgs extends SimpleFlowRgs implements KenoRgsInterface {
    constructor(config: RgsConfig);
    spin(bet: number, selectedNumbers: number[]): Promise<any>;
    freeSpin(ticketId: string, selectedNumbers: number[]): Promise<any>;
}
