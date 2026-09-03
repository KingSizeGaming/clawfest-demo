import { GameWrapperConfig } from '../../GameWrapper';
import { DefaultIntegrationLogic } from '../default-integration-logic';
export declare class PopIntegrationLogic extends DefaultIntegrationLogic {
    init(config: GameWrapperConfig): void;
    w2gConnect(): void;
    private gameInitializationHandler;
    private gamePauseHandler;
    private interruptAutoplayHandler;
    private gameSoundHandler;
    private refreshBalanceHandler;
    g2wSendMessage(messageType: string, data?: any): void;
    g2wConnect(): void;
    private overridePopAdapterFunctions;
    private addHistoryButton;
    private createIframeHistory;
}
