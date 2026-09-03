import { IntegrationLogic } from './integration-logic';
import { GameWrapperConfig } from '../GameWrapper';
import { AnyObject, Currency } from '../UtilTypes';
import { BonusRoundManager } from './bonus-round-manager';
import { RgsAdapter } from '../rgs/RgsAdapter';
import { Rgs } from '../rgs/Rgs';
import { RgsError } from '../rgs/RgsTypes';
import Autoplay from '../autoplay/Autoplay';
export declare class DefaultIntegrationLogic extends IntegrationLogic {
    protected config: GameWrapperConfig;
    protected bonusRoundManager: BonusRoundManager;
    protected locale: any;
    init(config: GameWrapperConfig): void;
    protected createBonusRoundManager(): BonusRoundManager;
    applyCurrencyLocaleOverride(currencyCode?: string): Currency;
    formatCurrency(value: number, trimFraction?: boolean, currencyCode?: string): string;
    formatNumber(value: number, trimFraction?: boolean): string;
    updateLoadingProgress(progress: number): void;
    muteSound(mute: boolean): void;
    showInfoMessage(scenario: string, message?: string): Promise<void>;
    handleRgsError(reason: RgsError): void;
    handleReplayStarted(): Promise<void>;
    handleReplayFinished(): void;
    protected registerPlugins(): void;
    protected handleContextBalanceUpdate(rgs: RgsAdapter<Rgs>, data: AnyObject): Promise<void>;
    protected handleErrorInAutoplay(autoplay: Autoplay, data: AnyObject): Promise<void>;
    protected setEventHandlers(): void;
}
