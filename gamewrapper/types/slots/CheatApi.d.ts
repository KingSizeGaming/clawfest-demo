import { SlotRgsInterface } from '../rgs/SlotApi';
export default class CheatApi implements SlotRgsInterface {
    scenarios: {
        "No win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "5OAK": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Big Win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Three line win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Six line win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Less than 10 win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Line + Scatter win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Free Game": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
                freespin: {
                    winAmount: number;
                    spinsAwarded: number;
                    spinsRemaining: number;
                    trigger: {
                        symbol: number;
                        offset: number[][];
                    };
                };
            };
        };
        "Free game retrigger": {
            stops: number[];
            gameType: string;
            hidden: boolean;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                freespin: {
                    stops: number[];
                    grid: number[][];
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    spinsAwarded: number;
                    spinsRemaining: number;
                    spinsRetrigger: number;
                    trigger: {
                        symbol: number;
                        offset: number[][];
                    };
                    retrigger: {
                        symbol: number;
                        offset: number[][];
                    };
                    betType: string;
                };
            };
        };
        "Free game with Multiple Paylines": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
                freespin: {
                    winAmount: number;
                    spinsAwarded: number;
                    spinsRemaining: number;
                    trigger: {
                        symbol: number;
                        offset: number[][];
                    };
                };
            };
        };
        "Free game without Big Win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
                freespin: {
                    winAmount: number;
                    spinsAwarded: number;
                    spinsRemaining: number;
                    trigger: {
                        symbol: number;
                        offset: number[][];
                    };
                };
            };
        };
        "Scatter Win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "5oak + Big win": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
        "Multiple Wild": {
            stops: number[];
            gameType: string;
            result: {
                game: {
                    nextAction: string;
                    action: string;
                    lines: number;
                    totalWin: number;
                    totalBet: number;
                    ticketId: string;
                    name: string;
                };
                config: {
                    autoplayOptions: number[];
                    defaultLineCount: number;
                    defaultStake: number;
                    hasJackpot: boolean;
                    stakeValues: number[];
                };
                spin: {
                    stops: number[];
                    grid: number[][];
                    totalBet: number;
                    wildMultiplier: number;
                    winnings: {
                        symbol: number;
                        payout: number;
                        payline: number;
                        offset: number[][];
                    }[];
                    winAmount: number;
                    betType: string;
                    lineCount: number;
                };
            };
        };
    };
    constructor(gameId: any, params: any, rpcUrl?: string);
    getAccount(): Promise<any>;
    getTicket(ticketId: string): Promise<any>;
    getHistory(pageSize: number, pageNumber: number): Promise<any>;
    refresh(): Promise<any>;
    spin(lineCount: number, gameType: string, bet: number): Promise<any>;
    freeSpin(gameTypeOrTicketId: string, bet?: number): Promise<any>;
    close(ticketId: string): Promise<any>;
    setCheat(cheatId: string): void;
}
