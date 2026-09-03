import { AnyObject } from './UtilTypes';
import { EventDispatcher, CustomEventListener, PluginHost, Plugin } from './CapabilityTypes';
export declare class CapabilitiesHost implements EventDispatcher, PluginHost {
    protected eventDispatcher: Text;
    protected plugins: Record<string, Plugin[]>;
    constructor();
    on(event: string, handler: CustomEventListener): void;
    off(event: string, handler: CustomEventListener): void;
    once(event: string, handler: CustomEventListener): void;
    dispatchEvent(event: string, data?: any): void;
    addPlugin(action: string, plugin: Plugin): void;
    removePlugin(action: string, plugin: Plugin): void;
    protected execPlugins(action: string, data: AnyObject): Promise<AnyObject>;
}
