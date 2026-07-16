import { CapabilitiesHost } from '../CapabilitiesHost';
export interface FullscreenConfig {
    android?: boolean;
    ios?: boolean;
}
export default class Fullscreen extends CapabilitiesHost {
    overlay: HTMLElement;
    private active;
    private swipeUp;
    constructor(element: HTMLElement, config: boolean | FullscreenConfig);
    setState(isActive: boolean): void;
    isActive(): boolean;
    setSwipeUpDone(): void;
    isSwipeUp(): boolean;
}
