import ScratchAdapter from './rgs/ScratchApi';
import SimpleFlowAdapter from './rgs/SimpleFlowApi';
import MessageDialog from './MessageDialog';
import { EventDispatcher } from './CapabilityTypes';
import Overlay from './ui/Overlay';
export interface Loader {
    logo: HTMLElement;
    progressBar: HTMLElement;
    percentLabel: HTMLElement;
    progress: number;
}
export interface SplashConfig {
    logo?: boolean;
    progressBar?: boolean;
}
export interface TopBarConfig {
    btnLobby?: boolean;
    btnSound?: boolean;
    title?: boolean;
    date?: boolean;
    clock?: boolean;
    btnMenu?: boolean;
    elapsedTime?: boolean;
}
export interface BottomBarConfig {
    btnMenu?: boolean;
    btnLobby?: boolean;
    btnHelp?: boolean;
    btnSound?: boolean;
    btnAutoplay?: boolean;
    lblBalance?: boolean;
    lblBonusRounds?: boolean;
    lblBet?: boolean;
    lblWinAmount?: boolean;
    lblNetAmount?: boolean;
    lblCoinBalance?: boolean;
    lblCoinStake?: boolean;
    lblGameMode?: boolean;
    elapsedTime?: boolean;
    providerLogo?: boolean;
    demoShowsModeOnly?: boolean;
}
export interface UIConfig {
    splash?: boolean | SplashConfig;
    topBar?: boolean | TopBarConfig;
    help?: boolean;
    autoplay?: boolean;
    bottomBar?: boolean | BottomBarConfig;
}
export interface UIInterface extends EventDispatcher {
    element: HTMLElement;
    ready: Promise<void | unknown>;
    overlay: Overlay;
    messageDialog: MessageDialog;
    attachRgs(rgs: ScratchAdapter | SimpleFlowAdapter<any>, params: any): void;
    updateMode(): void;
    setTitle(name: string): void;
    pauseGame(): void;
    resumeGame(): void;
    updateStrings(): void;
    setLoaderProgress(progress: number): void;
    hideSplash(force?: boolean): Promise<void>;
    updateBet(bet: number): void;
    clearWinAmount(): void;
    updateWinAmount(): void;
    showAutoplayDialog(): void;
    goToLobby(): Promise<any>;
    showMessage(message: string | {
        title?: string;
        subtitle?: string;
        text?: string;
    }): void;
    muteSound(mute: boolean): void;
    changeSoundStatus(soundOn: boolean): void;
    setVolume(volume: number): void;
    setTurbo(turbo: boolean): void;
    showElementsTopBar(show: boolean, className: string): any;
    showElementsBottomBar(show: boolean, className: string): any;
}
