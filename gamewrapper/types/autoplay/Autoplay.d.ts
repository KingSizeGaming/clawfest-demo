import { CapabilitiesHost } from '../CapabilitiesHost';
import GameWrapper from "../GameWrapper";
import { AnyObject } from '../UtilTypes';
export interface AutoplayWrapperConfig {
    requireLossLimit?: boolean;
    stopOnJackpot?: boolean;
    stopConfirmation?: boolean;
    hideAdvancedAutoplay?: boolean;
}
export interface AutoplaySettings {
    spins: number;
    lossLimit?: number;
    winLimit?: number;
    singleWinLimit?: number;
    stopOnWin?: boolean;
    stopOnJackpot?: boolean;
    stopFromLobby?: boolean;
}
export type AutoplayAction = 'unexpected-error-on-spin';
export type AutoplayPlugin = (autoplay: Autoplay, data: AnyObject) => Promise<any>;
export default class Autoplay extends CapabilitiesHost {
    settings: AutoplaySettings;
    spinsLeft: number;
    isActive: boolean;
    readonly wrapper: GameWrapper;
    protected wonAmount: number;
    protected totalWonAmount: number;
    protected lossAmount: number;
    protected isJackpotWin: boolean;
    protected plugins: Record<AutoplayAction, AutoplayPlugin[]>;
    constructor(wrapper: GameWrapper);
    start(settings: AutoplaySettings): void;
    stop(reason?: string): void;
    validateSettings(settings: AutoplaySettings): boolean;
    setEnabled(value: boolean): void;
}
