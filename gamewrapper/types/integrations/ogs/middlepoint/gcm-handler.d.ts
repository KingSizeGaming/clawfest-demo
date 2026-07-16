import { OgsParams, GcmCore, CommonUIConfig } from '../ogs-integration-types';
import { GcmLoader } from '../gcm-loader';
export declare const params: any;
declare type GcmHandlerConfig = {
    createTokenUrl: string;
    gcmConfigPrefix?: string;
    langPath?: string;
    isIosPlatform?: boolean;
    glUtilPath?: string;
};
export declare class GcmHandler {
    protected config: GcmHandlerConfig;
    protected gcmLoader: GcmLoader;
    protected gcm: GcmCore;
    protected ogsParams: OgsParams;
    private langPath;
    init(): Promise<void>;
    protected getInitializationObject(): {
        getConfig: () => CommonUIConfig;
        configReady: (ogsParams: OgsParams) => void;
        gameRevealed: () => void;
        gcmReady: (gcm: GcmCore) => void;
        balancesHasChanged: () => void;
        optionHasChanged: () => void;
        redirect: (redirectUrl: string) => void;
        reload: () => void;
        resume: any;
    };
    private setBlackScreen;
    protected resume(errorParamIndex: number): void;
    protected redirectToGame(): Promise<void>;
}
export {};
