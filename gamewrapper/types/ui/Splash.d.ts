import { Loader, SplashConfig } from '../UITypes';
export declare class Splash {
    private config;
    loader: Loader;
    splash: HTMLElement;
    constructor(config: SplashConfig | undefined);
    createSplash(): void;
    setLoaderProgress(progress: number, percentage: number): void;
    hide(): void;
    getProgress(): number;
}
