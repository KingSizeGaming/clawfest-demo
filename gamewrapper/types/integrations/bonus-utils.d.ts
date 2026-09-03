import { RgsAdapter } from '../rgs/RgsAdapter';
import { Rgs } from '../rgs/Rgs';
import { StakeLimits } from '../rgs/RgsTypes';
export declare function calculateBetLevel(totalBets: number | number[], totalBetDivider: number): number | number[];
export declare function calculateTotalBets(rgs: RgsAdapter<Rgs>, totalBetDivider: number): number[];
export declare function isBetAvailable(rgs: RgsAdapter<Rgs>, bet: number | number[]): boolean;
export declare function getLimitsForBet(rgs: RgsAdapter<Rgs>, bet: number | number[]): StakeLimits;
