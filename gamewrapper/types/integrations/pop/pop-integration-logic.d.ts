import { GameWrapperConfig } from '../../GameWrapper';
import { DefaultIntegrationLogic } from '../default-integration-logic';
export declare class PopIntegrationLogic extends DefaultIntegrationLogic {
    init(config: GameWrapperConfig): void;
    private overrideGetAccount;
}
