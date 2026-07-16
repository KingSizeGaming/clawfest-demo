import GameWrapper from "./GameWrapper";
import { MessageQueue } from './MessageQueue';
export interface MessageDialogConfig {
    exclude?: string[];
    include?: string[];
    showLobbyButton?: boolean;
}
export default class MessageDialog {
    gameWrapper: GameWrapper;
    dialog: HTMLDivElement;
    exclude: string[];
    protected messageQueue: MessageQueue;
    protected showLobbyButton: boolean;
    constructor(gameWrapper: GameWrapper, config: MessageDialogConfig | boolean);
    displayMessage(message: any, primaryAction?: any, secondaryAction?: any, thirdAction?: any): Promise<any>;
    displayError(errorData: any, message: any, primaryAction: any, secondaryAction?: any): Promise<any>;
    showGameError(errorData: any, message: any, canReturnToGame?: boolean): Promise<any>;
    showInfoMessage(message: any): Promise<any>;
    showLobbyConfirmation(): Promise<any>;
    showInsufficientFunds(depositUrl: any): Promise<any>;
    showRetryPurchase(): Promise<any>;
    showRealityCheck(realityUrl: string, realityInfo?: string, realityHistoryUrl?: string): Promise<any>;
    showTransactionFailed(): Promise<void>;
    showReplayStarted(): Promise<any>;
    showReplayFinished(): Promise<any>;
    hide: () => void;
    goToLobbyAction: (msg?: any) => void;
    goToUrlHandler: (url?: string) => void;
}
