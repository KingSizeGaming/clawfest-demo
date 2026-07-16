import GameWrapper from '../../GameWrapper';
import WrapperUI from '../../UI';
import { StringDictionary } from '../../UtilTypes';
import { DefaultIntegrationLogic } from '../default-integration-logic';
import { OxtIntegrationLogic } from './oxt-loader';
export default function oxtCreateComponents(gameWrapper: GameWrapper, params: StringDictionary): {
    integration: DefaultIntegrationLogic | OxtIntegrationLogic;
    uiClass: typeof WrapperUI;
};
