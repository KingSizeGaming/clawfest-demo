import GameWrapper from '../../GameWrapper';
import WrapperUI from '../../UI';
import { StringDictionary } from '../../UtilTypes';
import { PopIntegrationLogic } from './pop-loader';
export default function popCreateComponents(gameWrapper: GameWrapper, params: StringDictionary): {
    integration: PopIntegrationLogic;
    uiClass: typeof WrapperUI;
};
