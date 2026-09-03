import GameWrapper from '../GameWrapper';
import { StringDictionary } from '../UtilTypes';
export declare function setComponentCreator(creator: typeof defaultCreateComponents): void;
export default function defaultCreateComponents(gameWrapper: GameWrapper, params: StringDictionary): {
    integration: any;
    uiClass: any;
};
