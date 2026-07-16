import GameWrapper from '../GameWrapper';
import { DefaultIntegrationLogic } from './default-integration-logic';
import WrapperUI from '../UI';
import { StringDictionary } from '../UtilTypes';
export default function defaultCreateComponents(gameWrapper: GameWrapper, params: StringDictionary): {
    integration: DefaultIntegrationLogic;
    uiClass: typeof WrapperUI;
};
