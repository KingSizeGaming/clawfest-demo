export declare type BonusInfo = {
    status: 'notstarted' | 'inprogress' | 'completed';
    id: string;
    description?: string;
    totalWin: number;
    totalRounds: number;
    remainingRounds: number;
    betLevel: number | number[];
    endDateTime?: string;
};
