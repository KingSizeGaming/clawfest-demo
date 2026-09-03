export default class LimitSelector {
    element: HTMLElement;
    checkbox: HTMLElement;
    textbox: HTMLInputElement;
    transformValue: Function;
    private value;
    constructor(id: any, labelText: string | Function, currencySymbol?: string);
    getValue(): number;
    updateView(): void;
    updateCurrency(newCurrency: string): void;
    updateStrings(): void;
    reset(): void;
}
