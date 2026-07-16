import { AnyObject } from './UtilTypes';
export interface CustomEventListener {
    (evt: CustomEvent): void;
}
export interface EventDispatcher {
    on(event: string, handler: CustomEventListener): void;
    off(event: string, handler: CustomEventListener): void;
    once(event: string, handler: CustomEventListener): void;
    dispatchEvent(event: string, data?: any): void;
}
declare class CapabilitiesHost {
}
export declare type Plugin = (host: CapabilitiesHost, data: AnyObject) => Promise<any>;
export interface PluginHost {
    addPlugin(action: string, plugin: Plugin): void;
    removePlugin(action: string, plugin: Plugin): void;
}
export {};
