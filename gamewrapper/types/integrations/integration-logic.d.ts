import GameWrapper, { GameWrapperConfig } from '../GameWrapper';
import { RgsError } from '../rgs/RgsTypes';
import { StringDictionary } from '../UtilTypes';
export interface IntegrationLogicInterface {
    configReady: Promise<GameWrapperConfig>;
    init(config: GameWrapperConfig): void;
    formatCurrency(value: number, trimFraction?: boolean, currencyCode?: string): string;
    formatNumber(value: number, trimFraction?: boolean): string;
    updateLoadingProgress(progress: number): void;
    muteSound(mute: boolean): void;
    showInfoMessage(scenario: string, message?: string): Promise<void>;
    handleRgsError(reason: RgsError): void;
    handleReplayStarted(): Promise<void>;
    handleReplayFinished(): void;
}
export declare abstract class IntegrationLogic implements IntegrationLogicInterface {
    configReady: Promise<GameWrapperConfig>;
    protected configPrepared: (value?: GameWrapperConfig | PromiseLike<GameWrapperConfig>) => void;
    protected gameWrapper: GameWrapper;
    protected wrapperParams: StringDictionary;
    constructor(gameWrapper: GameWrapper, params: StringDictionary);
    abstract init(config: GameWrapperConfig): void;
    abstract formatCurrency(value: number, trimFraction?: boolean, currencyCode?: string): string;
    abstract formatNumber(value: number, trimFraction?: boolean): string;
    abstract updateLoadingProgress(progress: number): void;
    abstract muteSound(mute: boolean): void;
    abstract showInfoMessage(scenario: string, message?: string): Promise<void>;
    abstract handleRgsError(reason: RgsError): void;
    abstract handleReplayStarted(): Promise<void>;
    abstract handleReplayFinished(): void;
}
