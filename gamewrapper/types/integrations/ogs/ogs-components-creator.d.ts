import GameWrapper from '../../GameWrapper';
import { OgsIntegrationLogic } from './ogs-integration-logic';
import { DefaultIntegrationLogic } from '../default-integration-logic';
import EmbeddedUI from '../../EmbeddedUI';
import WrapperUI from '../../UI';
import { StringDictionary } from '../../UtilTypes';
export default function ogsCreateComponents(gameWrapper: GameWrapper, params: StringDictionary): {
    integration: DefaultIntegrationLogic | OgsIntegrationLogic;
    uiClass: typeof EmbeddedUI | typeof WrapperUI;
};
