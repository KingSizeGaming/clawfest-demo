export default class Telemetry {
    os: string;
    browser: string;
    gameId: string;
    uniqueId: string;
    debug: boolean;
    private queue;
    constructor(gameId: string, uniqueId: string, debug?: boolean);
    log(event: string, data?: any): void;
}
