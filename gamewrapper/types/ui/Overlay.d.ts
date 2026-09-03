export default class Overlay {
    element: HTMLDivElement;
    activeElements: HTMLElement[];
    constructor();
    append(...elements: HTMLElement[]): void;
    show(child?: HTMLElement): void;
    hide(child?: HTMLElement): void;
    switch(child: HTMLElement): void;
}
