import { GcmCore } from './ogs-integration-types';
export declare class GcmLoader {
    gcm: GcmCore;
    protected envType: string;
    protected gcmUrl: string;
    protected gameObject: any;
    protected configPaths: string;
    protected isGlUtilRequired: boolean;
    protected glUtilPath: string;
    protected originUrl: string;
    protected isGcmLoaded: boolean;
    protected isGlUtilLoaded: boolean;
    setIsGlUtilRequired(value: boolean): void;
    setGlUtilPath(value: string): void;
    getOriginUrl(): string;
    setInitializationObject(gameObject: any): void;
    setConfigPaths(configPaths: string): void;
    loadGcm(envid: string, stage?: string, dev?: string): Promise<void>;
    protected onConfigLoaded(): void;
    protected onGcmLoaded(): void;
    protected onGlUtilLoaded(): void;
    protected constructGcm(): void;
}
