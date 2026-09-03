import Selector from "../ui/Selector";
import Autoplay from "./Autoplay";
import ScratchAdapter from "../rgs/ScratchApi";
import SimpleFlowAdapter from "../rgs/SimpleFlowApi";
import { Currency } from '../UtilTypes';
export default class AutoplayDialog {
    element: HTMLElement;
    spinSlider: Selector;
    private autoCloseBtn;
    private autoSettingsBtn;
    private resetBtn;
    private autoOptions;
    private optionsShown;
    constructor(autoplay: Autoplay);
    resetValues(): void;
    start(spinCount: number): void;
    attachRgs(rgs: ScratchAdapter | SimpleFlowAdapter<any>): void;
    switchVisibility(): void;
    show(): void;
    hideAdvancedAutoplayButton(): void;
    showAdvancedSettings(): void;
    hide(): void;
    updateCloseButton(): void;
    updateStrings(): void;
    getCurrencySymbol(currency: Currency): string;
    updateCurrency(currency: Currency): void;
}
