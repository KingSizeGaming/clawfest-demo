import { GameWrapperConfig } from '../../GameWrapper';
import { DefaultIntegrationLogic } from '../default-integration-logic';
import { PmrBonusRoundManager } from './pmr-bonus-manager';
import { RgsError } from '../../rgs/RgsTypes';
export declare class PmrIntegrationLogic extends DefaultIntegrationLogic {
    private w2gMappings;
    static PMR_SHOW_HISTORY_EVENT: string;
    private get pmrConfig();
    init(config: GameWrapperConfig): void;
    protected createBonusRoundManager(): PmrBonusRoundManager;
    w2gConnect(): void;
    private gameInitializationHandler;
    private gamePauseHandler;
    private interruptAutoplayHandler;
    private gameSoundHandler;
    private refreshBalanceHandler;
    g2wSendMessage(messageType: string, data?: any): void;
    g2wConnect(): void;
    private createPmrHistoryIFrame;
    private createPmrHistoryButton;
    private overrideLanguageStrings;
    private settupBetLabelVisibility;
    handleRgsError(reason: RgsError): void;
}
