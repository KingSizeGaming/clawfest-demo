# Table Game API overview

When the GameWrapper is initialized, you can access the RGS features through `GameWrapper.rgs`.

The interface and the available methods depend on the `gameType` set during initialization. This document describes the methods and their responses for `gameType: 'table-game'` games - built on `TableGameService` / `PlayForFunTableGameService`. 

**Note**: To avoid [blocked requests](Usage%20guide.md#Blocked-requests), it is recommended to check [`GameWrapper.state`](Usage%20guide.md#GameWrapper-states) before calling RGS methods and only call them if the state is `active`. If the state is `paused`, the client should wait for a `game-resume` event before calling the desired method.

**Autoplay is not supported for `table-game`.** The built-in autoplay dialog/button is automatically hidden (`GameWrapper` forces `ui.autoplay: false` for this `gameType`, regardless of what the game config passes), and calling `GameWrapper.autoplay.start()` directly throws a `GameWrapperError`.

# Common interfaces

## `RgsAccountData`

```typescript
  {
    balance: number,
    currency: string
  }
```

## `RgsCommonResponse`

```typescript
  {
    context: RgsContextData,
    game: RgsGameData,
    play?: RgsTableGameData,   // present on play(), and on refresh() when resuming a round whose
                               // last action was play()
    move?: RgsTableGameData,   // present on move(), and on refresh() when resuming a round whose
                               // last action was move() - confirmed live by reloading mid-round
  }
```

## `RgsContextData`

```typescript
  {
    playerId: string,
    data: {
      currency: string,
      currentBalance?: number  // only present in demo mode - real-money balance requires getAccount()
    }
  }
```

## `RgsGameData`

```typescript
  {
    nextAction: string,   // "play" | "move" | "close"
    action: string,
    totalWin?: number,    // accumulated across the round, not per action
    totalBet?: number,    // accumulated across the round, not per action
    ticketId?: string,
    name?: string
  }
```

# Methods

* [`getAccount()`](#getaccount)
* [`refresh()`](#refresh)
* [`play(betType: string, bet: number, playerSelection?: any)`](#playbettype-string-bet-number-playerselection-any)
* [`move(playerSelection: any, ticketId?: string)`](#moveplayerselection-any-ticketid-string)
* [`close(ticketId?: string)`](#closeticketid-string)
* [`getGame()`](#getgame)
* [`getTicket(ticketId: string)`](#getticketticketid-string)
* [`sendCustomRequest(service: string, method: string, args: any[])`](#sendcustomrequestservice-string-method-string-args-any)

## `getAccount()`

Get user's current balance data including the currency. Calling this method will trigger a balance update throughout the whole GameWrapper.

**Real-money note**: unlike demo mode (which embeds `currentBalance` directly in `refresh`/`play`/`move` responses, see [`RgsContextData`](#rgscontextdata)), real-money responses carry no balance field at all - `getAccount()` must be called explicitly (e.g. right after `play()` debits the bet, and again after `close()` credits any win) to keep the displayed balance in sync.

**Return value**

* `Promise<RgsAccountData>` - a promise that resolves to [`RgsAccountData`](#rgsaccountdata) once a valid response is received. In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.getAccount()
    .then((data) => {
      console.log('Current balance: ' + data.balance + ' ' + data.currency);
    })
    .catch(handleErrors);
```

## `refresh()`

Get game data and the currently pending action. Should always be the first RGS API call after GameWrapper is initialized - a round left open by a dropped connection must be resumed or settled before a new `play()` is accepted.

**Return value**

* `Promise<RgsCommonResponse>` - a promise that resolves to [`RgsCommonResponse`](#rgscommonresponse) once a valid response is received. In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.refresh()
    .then((data) => {
      if (data.game.nextAction !== 'play') {
        // a round was already open (or finished but never settled) - resume it
      }
    })
    .catch(handleErrors);
```

### Example response (fresh state, demo mode)

```typescript
  {
    context: {
      playerId: "demo:1787321497",
      data: { currency: "", currentBalance: 10000 }
    },
    game: { nextAction: "play", action: "refresh", name: "gromada-blackjack" }
  }
```

### Example response (resuming a round left open by a dropped connection)

Reloading mid-round (before calling `close()`) and calling `refresh()` again returns the full payload needed to redraw the round, under whichever key (`play`/`move`) the last action before the drop used - here the round never got past `play()`.

```typescript
  {
    context: { playerId: "demo:1787557175", data: { currency: "", currentBalance: 10000 } },
    game: { nextAction: "move", action: "refresh", totalWin: 0, totalBet: 5, ticketId: "...", name: "gromada-blackjack" },
    play: {
      bT: "main",
      p: ["KH", "6C"],
      pT: 16,
      d: ["10H"],
      o: ["hit", "stand", "surrender"],
      wA: 0
    }
  }
```

## `play(betType: string, bet: number, playerSelection?: any)`

Open a round.

**Arguments**

* `betType` - `{string}` - the table type to play. Must match one of the `type` values in the game's `tableType` list (see [`getGame()`](#getgame)) - an unrecognized value is rejected server-side.
* `bet` - `{number}` - the stake for this round. Must be one of the game's valid `ticketPrice` values (see [`getGame()`](#getgame)).
* `playerSelection` - `{any}` - game-specific selection payload. `null`/omitted when the game needs no input to start (e.g. poker, blackjack without side bets); an object of side-bet stakes keyed by feature id for games that support them (e.g. blackjack: `{ gbjPerfectPairs: 1.0 }`).
  Side-bet stakes are ADDITIONAL to `bet`, confirmed live: `play('main', 5, { gbjPerfectPairs: 0.5 })` returned `game.totalBet: 5.5`, and the account balance dropped by exactly `5.5` - `bet` and the side-bet stake are debited together as one combined amount, not two separate transactions.

**Return value**

* `Promise<RgsCommonResponse>` - a promise that resolves to [`RgsCommonResponse`](#rgscommonresponse) once a valid response is received (`play` holds the game-specific payload). In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.play('main', 5, null)
    .then((data) => {
      console.log('Play done. Next action is ' + data.game.nextAction);
    })
    .catch(handleErrors);
```

### Example response (blackjack - a decision is owed)

```typescript
  {
    context: { playerId: "...", data: { currency: "GBP" } },
    game: { nextAction: "move", action: "play", totalWin: 0, totalBet: 5, ticketId: "...", name: "gromada-blackjack" },
    play: {
      bT: "main",
      p: ["6C", "10S"],
      pT: 16,
      d: ["AD"],
      o: ["hit", "stand", "surrender"],
      wA: 0
    }
  }
```

### Example response (video poker - a draw is owed)

```typescript
  {
    context: { playerId: "...", data: { currency: "GBP" } },
    game: { nextAction: "move", action: "play", totalWin: 0, totalBet: 5, ticketId: "...", name: "gromada-poker" },
    play: {
      bT: "jacksOrBetter",
      h: ["10C", "KC", "3H", "7H", "KS"],
      o: ["hold"],
      wA: 0
    }
  }
```

## `move(playerSelection: any, ticketId?: string)`

Make one in-round decision. Repeat while `nextAction` stays `"move"`. Not every game has a Move step (e.g. keno, where the whole bet is placed on `play()`) - such games never return `nextAction: "move"` and this is simply never called.

Read the legal decisions from the previous response's `play`/`move` and build `playerSelection` from that - **never hardcode which decisions are available**, they change per hand (e.g. blackjack's `surrender` is offered only on the first decision, `evenMoney` only on a natural against a dealer ace).

**Arguments**

* `playerSelection` - `{any}` - the decision payload. The key is the decision and its value carries that decision's arguments (one key per call). Examples:
  * blackjack: `{ hit: null }`, `{ stand: null }`, `{ surrender: null }`, `{ evenMoney: null }`
  * poker: `{ hold: [true, true, false, false, false] }` - a 5-card mask, `true` = keep
* `ticketId` - `{string}` - defaults to the current ticket.

**Return value**

* `Promise<RgsCommonResponse>` - a promise that resolves to [`RgsCommonResponse`](#rgscommonresponse) once a valid response is received (`move` holds the game-specific payload). In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.move({ hit: null }, ticketId)
    .then((data) => {
      console.log('Move done. Next action is ' + data.game.nextAction);
    })
    .catch(handleErrors);
```

### Example response (blackjack - hit, still deciding)

```typescript
  {
    context: { playerId: "...", data: { currency: "GBP" } },
    game: { nextAction: "move", action: "move", totalWin: 0, totalBet: 5, ticketId: "...", name: "gromada-blackjack" },
    move: {
      a: "hit",
      bT: "main",
      p: ["5C", "3S", "3H"],
      pT: 11,
      d: ["3S"],
      o: ["hit", "stand"],
      wA: 0
    }
  }
```

### Example response (blackjack - stand, round resolved with a win)

The dealer's full hand (hidden card plus every card drawn by the house's automatic play-out) is revealed all at once on this response - the client never drives the dealer's turn.

```typescript
  {
    context: { playerId: "...", data: { currency: "GBP" } },
    game: { nextAction: "close", action: "move", totalWin: 10, totalBet: 5, ticketId: "...", name: "gromada-blackjack" },
    move: {
      a: "stand",
      bT: "main",
      p: ["5C", "3S", "3H", "8D"],
      pT: 19,
      d: ["3S", "JH", "10H"],
      dT: 23,
      r: "win",
      w: [{ f: "win", p: 10 }],
      wA: 10
    }
  }
```

### Example response (blackjack - surrender)

```typescript
  {
    context: { playerId: "...", data: { currency: "GBP" } },
    game: { nextAction: "close", action: "move", totalWin: 2.5, totalBet: 5, ticketId: "...", name: "gromada-blackjack" },
    move: {
      a: "surrender",
      bT: "main",
      p: ["6C", "10S"],
      pT: 16,
      d: ["AD", "3H"],
      dT: 14,
      r: "surrender",
      w: [{ f: "surrender", p: 2.5 }],
      wA: 2.5,
      sr: true
    }
  }
```

### Example response (video poker - draw, two pair)

```typescript
  {
    context: { playerId: "...", data: { currency: "GBP" } },
    game: { nextAction: "close", action: "move", totalWin: 10, totalBet: 5, ticketId: "...", name: "gromada-poker" },
    move: {
      bT: "jacksOrBetter",
      h: ["8S", "3C", "3H", "JS", "JH"],
      d: ["10C", "KC", "3H", "7H", "KS"],
      s: [false, false, true, false, false],
      r: "twoPair",
      w: [{ f: "gpJacksOrBetter", p: 10 }],
      wA: 10
    }
  }
```

## `close(ticketId?: string)`

Settle and pay. 

**Argument**

* `ticketId` - `{string}` - defaults to the current ticket.

**Return value**

* `Promise<RgsCommonResponse>` - a promise that resolves to [`RgsCommonResponse`](#rgscommonresponse) once a valid response is received. In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.close(ticketId)
    .then((data) => { console.log('Ticket closed'); })
    .catch(handleErrors);
```

## `getGame()`

Get game configuration data - the valid `betType`/table-type list, valid stake (`ticketPrice`) values, pay tables, and supported actions. Not part of the refresh/play/move/close lifecycle.

**Return value**

* `Promise<any>` - a promise that resolves to the game's configuration once a valid response is received. In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.getGame()
    .then((data) => {
      console.log('Valid table types: ', data.tableType.map((t) => t.type));
      console.log('Valid stakes: ', data.ticketPrice);
    })
    .catch(handleErrors);
```

### Example response (blackjack)

```typescript
  {
    gameId: "gromada-blackjack",
    isSuspended: false,
    gameEngine: "blackjack001",
    gameEngineConfiguration: {
      deckCount: 6,
      maxMovesAllowed: 20,
      payouts: { blackjackWin: 2.5, loss: 0, mainBetWin: 2, push: 1, surrenderLoss: 0.5 },
      rules: {
        blackjackBeatsDealer21: true,
        dealSequence: ["player", "dealerUp", "player", "dealerHole"],
        dealerPeek: true,
        dealerSoft17: "hit",
        evenMoneyOffered: true,
        surrender: "late"
      },
      supportedActions: ["hit", "stand", "surrender", "evenMoney"]
    },
    ticketPrice: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    tableType: [{
      type: "main",
      betMultiplier: 1,
      featuresPreDeal: ["gbjPerfectPairs", "gbjTwentyOnePlus3"],
      featuresPostDeal: ["gbjPerfectPairs", "gbjTwentyOnePlus3"]
    }],
    feature: {
      gbjPerfectPairs: { minStake: 0.5, maxStake: 100, winMultiplier: { coloredPair: 12, mixedPair: 6, perfectPair: 25 } },
      gbjTwentyOnePlus3: { minStake: 0.5, maxStake: 100, winMultiplier: { flush: 5, straight: 10, straightFlush: 40, suitedThreeOfAKind: 100, threeOfAKind: 30 } }
    }
  }
```

### Example response (video poker)

```typescript
  {
    gameId: "gromada-poker",
    isSuspended: false,
    gameEngine: "card001",
    gameEngineConfiguration: { deckCount: 1, handSize: 5, maxMovesAllowed: 1, rng: "remote" },
    ticketPrice: [1, 2, 3, 4, 5],
    tableType: [
      { type: "jacksOrBetter", betMultiplier: 1, featuresPreDeal: ["gpDraw"], featuresPostDeal: ["gpJacksOrBetter"] },
      { type: "bonusPoker", betMultiplier: 1, featuresPreDeal: ["gpDraw"], featuresPostDeal: ["gpBonusPoker"] }
    ],
    feature: {
      gpDraw: { maxCardsSelected: 5, minCardsSelected: 0, movesAllowed: 1, options: ["hold"] },
      gpJacksOrBetter: {
        minPayingRank: "jacksOrBetter",
        payTable: { flush: 6, fourOfAKind: 25, fullHouse: 9, jacksOrBetter: 1, royalFlush: 250, straight: 4, straightFlush: 50, threeOfAKind: 3, twoPair: 2 }
      }
    }
  }
```

## `getTicket(ticketId: string)`

Get ticket data for a previously played game. This is useful for getting historical ticket data, though this is usually handled by the GameWrapper and there is no need for the client to call this method. For more details about [history replay](Usage%20guide.md#History-replay), see the Usage Guide.

**Argument**

* `ticketId` - `{string}` - ticket ID of a previously played game.

**Return value**

* `Promise<RgsCommonResponse>` - a promise that resolves to [`RgsCommonResponse`](#rgscommonresponse) once a valid response is received. In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  wrapper.rgs.getTicket('ba88e2b9-2f9f-11e9-ae8a-3417ebd6a5f0')
    .then((data) => {
      console.log('Replaying game with ticket ID: ' + data.game.ticketId);
    })
    .catch(handleErrors);
```

## `sendCustomRequest(service: string, method: string, args: any[])`

Send a custom RGS request through the wrapper. This is useful when the client wants to use a feature which is supported by the RGS, but not implemented by the wrapper.

Should be used with caution. Best course of action is to ask first if this is the right way to implement required functionality. That is to avoid unnecessary debugging and delays.

**Argument**

* `service` - `{string}` - RGS service name.
* `method` - `{string}` - RGS method name.
* `args` - `{any[]}` - array of arguments for the method. May be an empty array for no arguments.

**Return value**

* `Promise<any>` - a promise that resolves to the response object once a valid response is received. The exact response structure depends on the RGS method that is being called. In case of failure, the promise will be rejected with an error type string. For details about error handling see [Error Handling Guidelines](../pdf/Error%20Handling%20Guidelines.pdf).

### Usage example

```typescript
  const gameId = /* some gameId related logic */;
  wrapper.rgs.sendCustomRequest('TableGameService', 'Refresh', [gameId])
    .then((data) => { console.log('Refresh response: ', data); })
    .catch(handleErrors);
```

# Errors

Returned as RPC errors, not HTTP status codes - a failed call can still be `200`.

| error | meaning |
|---|---|
| `unsettledTicketExists` | a round is already open - `refresh()`, then resume or `close()` |
| `moveAvailable` | `close()` called while moves remain - `move()` first |
| `noMoveAvailable` | `move()` called with none left - `close()` |
| `gameSuspended` | game disabled |
| `unexpectedError` | anything else; details are server-side only |
