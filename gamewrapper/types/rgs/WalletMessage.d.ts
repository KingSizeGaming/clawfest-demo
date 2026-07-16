import { RgsAdapter } from './RgsAdapter';
import { AnyObject } from '../UtilTypes';
import { Rgs } from './Rgs';
declare type BehaviorTypes = 'postpone' | 'postponeIfInRound' | 'immediate';
export declare function getMessagesHandled(): Promise<void>;
export declare function startMessageQueueExecution(rgs: RgsAdapter<Rgs>): Promise<void>;
export declare function handleWalletMessages(behavior: BehaviorTypes, methodName?: string): (rgs: RgsAdapter<Rgs>, data: AnyObject) => Promise<void>;
export declare class WalletMessage {
    msg: string;
    readonly resolved: Promise<void>;
    private _resolve;
    static exists(data: any, jwt: string): boolean;
    constructor(msg: string);
    resolve(): void;
}
export {};
