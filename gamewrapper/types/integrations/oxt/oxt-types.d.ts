interface KeyByValue {
    key(value: any): string;
}
declare class CustomMap implements KeyByValue {
    key(value: any): string;
}
export type Resolver = (data: any | void) => void;
export type Balance = {
    balance: number;
    mode: string;
    stake?: number;
};
export type AccountInfo = {
    sessionID: number;
    operatorID: string;
    operatorBrandID?: number;
    gameID?: number;
    api_version?: number;
};
export type OxtError = {
    data: number;
    error: {
        code: number;
        message: string | [string, number];
        action?: (data: any | void) => any;
    };
};
export type OxtButton = {
    text: string;
    action: "exit" | "continue" | "history";
    url: string;
};
export type OxtMessage = {
    message: {
        code: number;
        title: string;
        text: string;
        buttons: OxtButton[];
    };
};
export declare let WrapperToOxtClientEvents: CustomMap;
export declare let OxtInGameEvents: CustomMap;
export {};
