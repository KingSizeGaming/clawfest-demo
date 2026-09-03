import { GcmHandler } from "./gcm-handler";
export declare class MiddlePoint {
    protected gcmHandler: GcmHandler;
    constructor();
    run(): void;
}
export declare const middlePointInstance: MiddlePoint;
