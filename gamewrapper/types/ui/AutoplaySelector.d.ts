export default class AutoplaySelector {
    element: HTMLElement;
    lblValue: HTMLElement;
    checkbox: HTMLElement;
    index: number;
    values: number[];
    constructor(id: any, labelText: string | Function);
    setValues(values: any): void;
    setCurrentValue(value: any): void;
    getValue(): number;
    updateView(): void;
    updateStrings(): void;
}
