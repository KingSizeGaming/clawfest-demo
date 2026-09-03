import GameWrapper from '../../GameWrapper';
import WrapperUI from '../../UI';
import { StringDictionary } from '../../UtilTypes';
import { PmrIntegrationLogic } from './pmr-loader';
export default function pmrCreateComponents(gameWrapper: GameWrapper, params: StringDictionary): {
    integration: PmrIntegrationLogic;
    uiClass: typeof WrapperUI;
};
