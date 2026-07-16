export declare function initHelper(isCdnSupportEnabled: boolean): void;
export declare function makeCdnUrl(origUrl: string): string;
export declare function fetchFromCdn(input: RequestInfo, init?: RequestInit): Promise<Response>;
