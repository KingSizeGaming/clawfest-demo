import { CapabilitiesHost } from './CapabilitiesHost';
import GameWrapper from './GameWrapper';
interface PostMessageInterface {
    name: string;
    data: any;
}
export interface PostMessageConfig {
    allowedEvents: string[];
    boolean?: {
        true: string;
        false: string;
    };
    maps?: {
        [index: string]: {
            name?: string;
            data?: {
                [index: string]: string;
            };
        };
    };
}
export default class WindowMessaging extends CapabilitiesHost {
    origin: string;
    config: PostMessageConfig;
    constructor(config?: PostMessageConfig);
    map(message: PostMessageInterface): PostMessageInterface;
    sendGameReady(isReady?: boolean): void;
    sendGameStart(stake: number): void;
    sendGameEnd(wonAmount: number): void;
    sendFreeSpinTrigger(freeSpinCount: number): void;
    sendFreeSpinEnd(): void;
    sendBonusStart(): void;
    sendBonusEnd(wonAmount: number, totalBonusWonAmount?: number): void;
    sendAccountData(data: any): void;
    sendOutOfFunds(attemptedStake: number): void;
    sendErrorMessage(error?: any): void;
    sendCustomMessage(name: string, data: any): void;
    sendToLobby(detail: any): void;
    parseBoolean(value: string): boolean;
}
export declare function attach(wrapper?: GameWrapper, config?: PostMessageConfig): WindowMessaging;
export {};
