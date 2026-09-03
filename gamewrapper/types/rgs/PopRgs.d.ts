import { Rgs } from './Rgs';
export declare class PopRgs extends Rgs {
    getAccount(): Promise<{
        balance: number;
    }>;
}
