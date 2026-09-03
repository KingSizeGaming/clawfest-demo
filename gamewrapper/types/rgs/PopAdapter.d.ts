import ScratchAdapter from './ScratchApi';
export declare class PopAdapter extends ScratchAdapter {
    private firstTimeExecuted;
    getAccount(fromJwt?: boolean): Promise<any>;
    getUnsettledTicket(): Promise<any>;
}
