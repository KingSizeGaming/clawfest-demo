import { BonusRoundManager } from '../bonus-round-manager';
import { PluginHost } from '../../CapabilityTypes';
import { AnyObject } from '../../UtilTypes';
export declare class PmrBonusRoundManager extends BonusRoundManager {
    protected addBonusHeader(xmlHttp: XMLHttpRequest): void;
    cancelBonus(): void;
    setEventHandlers(): void;
    registerRequestPlugin(rgs: PluginHost): void;
    protected handleJwtUpdate(_host: any, data: AnyObject): Promise<void>;
}
