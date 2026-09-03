import { CapabilitiesHost } from './CapabilitiesHost';
export default class RealityCheck extends CapabilitiesHost {
    url: string;
    historyUrl: string;
    intervalSeconds: number;
    startTime: number;
    constructor(intervalSeconds: any, remainingSeconds: any, elapsedSeconds: any, url: any, historyUrl?: any);
    getUrl(): string;
    getHistoryUrl(): string;
    getMessage(): string;
    resolve(): void;
    private doRealityCheck;
}
