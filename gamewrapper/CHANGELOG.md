# Changelog

## [5.10.0] - 2026-08-28

- Core: Fixed simple-flow adapter's settle() recursing into itself instead of closing the ticket.
- Added jurisdiction support for including new config options.
- TableGameAPI: Added support for table games (poker/blackjack/keno-table).
- Bonus Engine: Added support for table games.

## [5.9.7] - 2026-07-20

- Core: Fixed history replay balance incrementing repeatedly on winning rounds until the replay-finished dialog is dismissed.
- Core: Fixed a race condition where wrapper.ready could resolve before jurisdiction overrides were applied to the configuration. 
- Usage Guide: Reorganized content for clarity and easier navigation.

## [5.9.6] - 2026-07-15
- Bonus Engine: Added support for games that use lineCountMultiplier for total bet calculation. 

## [5.9.5] - 2026-06-30

- Bonus Engine: Fixed an issue with closing bonus rounds.
- UI: Fixed an issue with accessing demoShowsModeOnly on an undefined bottomBar config.

## [5.9.4] - 2026-06-02

- UI: Added confirm action to insufficient funds message.

## [5.9.3] - 2026-05-14

- Core: Fixed bottom bar mute/unmute functionality.

## [5.9.2] 2026-04-24

- Core: Fixed an issue where playing history replay with old tickets will show wrong balance value.
- Core: `betStops` postMessage can now set default bet if `defaultStake` property is provided.
- Dev: Changed the structure of the project build script and migrated from sh/ps1 to node.

## [5.9.1] - 2026-03-27

- UI: Added `demoShowsModeOnly` option to `BottomBarConfig` which enables showing only the game mode in the bottom bar during demo mode.
- Core: Fixed an issue where `GetTicketData` will not work properly for some games while playing history replay with old tickets.
- NYX Integration: Fixed an issue with displaying message using `messageDialog` element.
- Bonus Engine: Fixed an issue with handling multiple bonuses where some have an invalid bet level.


## [5.9.0] - 2026-03-23
- Bonus Engine: Added support for wallet-controlled Bonus Engine in main version of wrapper.
- Core: Use ticket data to store account info (balance and currency) during gameplay to display balance during history replay.

## [5.8.3] - 2025-10-15

* NYX Integration: Display `Network Error`, don't wait for wallet messages.
* Core: Added `mainUI` in the wrapper config. When it's true, NYX integration displays top/bottom bars.  

## [5.8.2] - 2025-09-03

* Autoplay: Fixed calculation of `Loss amount` and `Total won amount` during the autoplay.

## [5.8.1] - 2025-08-21

* NYX Integration: Process message batch on `wallet-message` event.

## [5.8.0] - 2025-07-28

* Core: Added `useCompactNotation`. It formats numbers using compact notation. 
* Core: `isSocialCasinoMode` hides `SOC` currency code.

## [5.7.13] - 2025-07-11

- HistoryReplay: Fixed return value from `showReplayFinished()`
- UI: Fixed hidding elements in the landscape mode 

## [5.7.12] - 2025-06-06

- ScratchAPI: Apply `hasGamble` from `gameConfig`.

## [5.7.11] - 2025-05-26

- WindowMessaging: Added `toLobby` event.

## [5.7.10] - 2025-05-14

- LnW Integration (nyx): Removed `To Lobby` button after history replay if `lobbyUrl` param doesn't exist.


## [5.7.9] - 2025-04-30

- LnW Integration (nyx): Removed processing RGS's `RemoteError`.

## [5.7.8] - 2025-04-23

- Autoplay: Fixed autoplay decreasing counter in the `ScratchApi`.
- Core: Added `jackpotReconnectIntervals` in the wrapper config - exponential backoff strategy.
- UI: Adjusted class names in the top/bottom bar to enable access from jurisdiction config.
- Autoplay: Fixed notification order during autoplay when the reality check is active.

## [5.7.7] - 2025-03-17

- Autoplay: Fixed `ticket-settled` event and win/loss calculations.

## [5.7.6] - 2025-01-20

- RGS: Added `updateOgsRgsMap()`, a function that ensure accurate game ID mapping in the `rgsMap` for history mode important to NYX integration.
- RGS: The property `hasGamble` is set to true by default. If the game need to suspend the gamble, it can be done through `gameConfig.gamble.hasGamble` property.

## [5.7.5] - 2024-12-10

- RGS: Removed rgs verification in multiadapter `getTicket()`.

## [5.7.4] - 2024-10-30

- RGS: Removed unnecessary game id verification in `getTicket()`.

## [5.7.3] - 2024-09-25

- AutoplayDialog: Added flag `hideAdvancedAutoplay` in the wrapper config that disables the advanced autoplay dialog.
- RGS: Added support for `execute()` for Card games

## [5.7.2] - 2024-08-19

- WindowMessaging: Added `freeSpinTrigger` and `freeSpinEnd` events

## [5.7.1] - 2024-04-26

- AutoplayDialog: Fixed locale language in `formatCurrency()` 

## [5.7.0] - 2024-03-01

- RGS: Added support for `getPreviousTickets()` for Card games 
- RGS: Added support for `getGame()` for Cards and Slot games
- Language: Added translations of all strings into new languages (id, ja, ko, vi, etc). 

## [5.6.5] - 2023-12-15

- UI: Updating currency symbols in the autoplay dialogue follows the update of UI strings.

## [5.6.4] - 2023-11-24

- UI: Added `providerLogo` to `BottomBarConfig` for displaying/hiding the provider lobby icon as part of the bottom bar.
- Autoplay: Fixed `LimitSelector` to display the correct symbol for currency.
- LnW Integration (nyx): Added additional processing of error codes and new error message.

## [5.6.3] - 2023-07-04

- RGS: Added support for Card games with `CardApi`.
- Core: Added custom game ID for jackpot subscription.
- Core: Fixed display and update of net amount and elapsed time labels.

## [5.6.2] - 2023-06-15

- Dev: Fixed version mismatch.
- Dev: Changed the structure of the project build script.

## [5.6.1] - 2023-06-02

- RGS: Fixed handling of unsettled ticket errors.
- Fullscreen: Fixed Safari iOS animation turning off.
 
## [5.6.0] - 2023-05-05

- Style: Fixed message word splitting.
- Core: Added `enableLangAttribute` parameter to `language-config.json` which allows adding lang attribute to the main html document, enabled by default. 
- Core: Added versioning with current time parameter on wrapper resources files to avoid caching data 
- Fullscreen: Displaying hide toolbar animaton after splash screen in Safari browser 
- RGS: Fixed handling of unsettled ticket error.

## [5.5.13] - 2023-01-16

- iOS: Displaying swipe-up animation just once
- Core: Fixed displaying `topBarSoundButton` in the same way as `bottomBarSoundButton`
- Core: `fullscreen` is updated to be `boolean | {android?: boolean, ios?: boolean}`

## [5.5.12] - 2022-11-22

- Core: Element creation in top and bottom bar through jurisdiction is enabled.
- 1x2: Updated RC messaging behaviour

## [5.5.11] - 2022-11-1

- Core: Game Wrapper's help screen disabled by default.
- Oxt: Adaptation of the messages displayed in the console.

## [5.5.10] - 2022-10-25

- OXT Integration: Changed parameter for accessing the win amount in scratchcard games.

## [5.5.9] - 2022-10-19

- Core: Added support for local testing on Windows platform
- Core: Added README.md with instructions for running the local wrapper
- Core: Created  new configuration file `language-config.json`.  
  This dictionary allows you to change the `langPath` path to the directory containing the GameWrapper and `langMap` language files to remap the language URL code to another code.
- Core: Parameter `langPath` moved from Game Wrapper `config` to `language-config.json`. 
- Core: Language mapping moved to new  `language-config.json` configuration file.

## [5.5.8] - 2022-08-08

- Autoplay: Advanced settings are set to be reset each time a player closes the auto-play menu.
- Autoplay: Display all values from `autoplayOptions` from `gameConfig`.
- Core: Added `stopConfirmation` to Game Wrapper `config`. It provides not show a message when autoplay is stopping.
- Autoplay: Closing button `X` is more responsive on mobile devices.
- Core: Fixed button display issue on mobile devices in landscape mode.

## [5.5.7] - 2022-07-07

- Core: Language mapping have been moved to new  `languageMap.json` configuration file.
- `languageMap` configuration lets you remap a URL language code to a different code (e.g. from a non-standard language to a BCP47 code).
- Core: Add `lobbyLanguage` GameWrapper parameter that stores initial language code received from the lobby.

## [5.5.6] - 2022-06-27

- Fullscreen: Displaying swipe animation after splash screen
- Autoplay: New UI. `On any win` checkbox, `RESET` button for options.
- Strings: Added: `BTN_AUTOPLAY_RESET`, `AUTOPLAY_STOP_AUTOPLAY`, amended `AUTOPLAY_STOP_ON_WIN`.
- Core: Removed `languageMap` from Game Wrapper `config`.
- Core & OXT Integration: Added internal language mapping {se: sv}

## [5.5.5] - 2022-06-10

- Added `languageMap` to Game Wrapper `config`. This dictionary allows you to change sent language from the URL based on [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag).
- OXT Integration: Game client parameter set as default.
- NYX Integration: `nyxGameId` and `rgsGameId` are part of redirection URL
- NYX Integration: Rounding stake value on two decimals in free rounds handling
- NYX Integration: Multi-game support with unique config where `gameId` contains only suffixes

## [5.5.4] - 2022-06-2

- Core: Autoplay options display fix.

## [5.5.3] - 2022-05-26

- Language: "Autoplay stopped due to a technical error" will now be correctly translated to other languages.
- New method `showJurisdiction()` for showing or jurisdiction ui config parameters.

## [5.5.2] - 2022-04-29

- Core: Enable games to override game config depanding of diferent custom jurisdiction game config options.
   The default jurisdiction path is 'gamewrapper/jurisdiction'.
- UI: Added date to topBar, hidden by default.
- UI: New method `showElements(show: boolean, elementName: string)` for showing or hidding ui elements.
- Fullscreen: Improved swipe to full screen behaviour on iOS.
- Fullscreen: Swipe up overlay won't slide off the screen any more when you swipe.
- Style: `<html>` and `<body>` elements now have a default height of `100vh` on mobile.

## [5.5.1] - 2022-03-29

- Core: Added `rsiLobbyRestriction` to `config`. If it's true, it provides checking of the lobby URLs from where the game is launched.
- OXT version: upon game pause event emitted from the lobby an overlay is shown to pause all game actions and enable lobby messages to be displayed.
- OXT version: enables games to default to english when pre-selected language is not supported.
- Autoplay: `stopOnJackpot` toggle switch will be shown only if appropriate `config` field is set to true.

## [5.5.0] - 2022-02-21

- Core: Allow clients to use custom properties in the `gameConfig` configuration section.
- UI: Fixed `goToLobby()` method to trigger game pause when called.
- UI: Fixed `goToLobby()` type definition. It now has the correct return type - `Promise<any>`.
- UI: Added `btnSound` to `TopBarConfig` for displaying the sound button as part of the top bar
- History: Fixed `handleReplayStarted` returns `Promise<void>`. Spin doesn't start until _MessageDialog_ hides.
- UI: Added `elapsedTime` to `TopBarConfig`
- UI: Added `elapsedTime` and `lblNetAmount` to `BottomBarConfig`
- Core: Exported `getNetAmount()` and `getElapsedTime()` as part of `LegacyWrapper`
- Autoplay: Added `stopFromLobby` parameter to autoplay config. If enabled 'autoplay-next' will not be resolved after the was purchased.

## [5.0.0] - 2021-09-20

- Core: Game client configuration moved from `clientConfiguration` section in backend setup files to the GameWrapper configuration JSON as mandatory `gameConfig` property.
- NYX Integration: `freeRoundsGameId` param is now deprecatad, `bonusRoundsGameId` should be used instead.
- Bonus Engine: Added support for RGS Bonus Engine in main version of wrapper.
- Core: Added `isSocialCasinoMode` parameter to GameWrapper config. If enabled, currency designation is not shown and currency label is compacted (e.g. '10K' instead of '10,000').

## [4.0.8] - 2021-06-10

- Core: Fix for internal error.

## [4.0.7] - 2021-06-10

- Core: Fixes in jackpot notifications logic:
  * Added automatic reconnection in case of broken connection.
  * Notification messages are no longer filtered for repeats.
- Core: Fixed logging in some edge cases.
- NYX Integration: Fixed behavior and logging on errors during loading.

## [4.0.6] - 2021-04-05

- Core: Add support for dynamic CDN URLs.
- NYX Integration: Fix Free Rounds support for multi-ID games.

## [4.0.5] - 2021-03-10

- NYX Integration: Fix initial checking for wallet messages.

## [4.0.4] - 2021-03-09

- Multi game: Correctly expose `configured` promise in meta adapter.

## [4.0.3] - 2021-02-17

- Core: Fixed overwriting game ID with ID from query parameters.
- GCM Integration: Fixed overwriting multi-ID with single ID value received from GCM. Now in case of multi-ID game, game ID value received from GCM is assigned to `metaGameId` field.

## [4.0.2] - 2021-02-01

- Util: Fixed incorrect format of locale strings in `formatCurrency()` and `formatNumber()`.

## [4.0.1] - 2021-01-27

- Core: Fixed crash on Slingo Arcade iOS app.
- Fullscreen: Tap animation for entering fullscreen is not shown in Android applications. Android apps are expected to handle fullscreen on their own.
- RGS: Fixed an issue where `RgsMultiAdapter` instance doesn't have plugins initialized.
- Messaging: Lobbies can now listen for an 'accountData' window message to receive updates for player balance and other account data.
- Messaging: Fixed an issue where the wrapper would crash if post message `map` configuration wasn't provided. This is an optional setting and the wrapper can now send post messages without it.
- NYX Integration: Helper library ogsGLUtil is now loaded if platform is iOS and game client is deployed on localhost.

## [4.0.0] - 2020-12-28

- Core: New configuration option - `currencyDisplayed`. It is used to specify which display format to use when formatting currency strings. Possible values are:  'symbol', 'narrowSymbol', 'code' and 'name' as [specified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) by the ECMAScript Internationalization API.
- Core: New method for pretty printing of numbers - `formatNumber()`. It groups a number by thousands based on locale rules.
- RGS: Added usage of and checking for betMode and betMultipliers in SlotApi.
- RGS: Dispatch 'account-data-received' if balance was sent within a ticket.
- Autoplay: Fixed precedence of 'autoplay-stopped' messages.
- Language: "Reality check" will now be correctly translated to other languages.
- Language: Updated REALITY_CHANGE_INFO for Russian.
- Usage Guide: Added info about 'set-enabled' event, clientConfiguration and autoplay duration options.
- Fix for the bug with scrolling inside some iOS instances.
- NYX Integration: Use helper library ogsGLUtil to get backend URL when inside an app on iOS.
- NYX Integration: Fix for displaying Responsiple Gaming messages during autoplay.

## [3.2.10] - 2020-11-27

- RGS: Fixed handling of unsettled ticket errors. Affects fixed odds games only.
- UI: Update balance when it arrives withing a ticket. Affects fixed odds games only.

## [3.2.9] - 2020-11-18

- UI: Fixes for retry purchase and insufficient funds dialog.

## [3.2.8] - 2020-10-25

- Langs: Added Ukrainian translation.
- Core: Fixes for fullscreen issues on mobile platforms.
- RGS: Fix for multi-adapter related issues.

## [3.2.7] - 2020-09-18

- Core: Fixed an issue where the starting stake in fixed odds games would be set to a list, instead of a single value.

## [3.2.6] - 2020-09-17

- Core: Added denomination options to 'set-stake-limits' event payload.

## [3.2.5] - 2020-09-16

- RGS: Added denominationValues support for Keno games.
- RGS: Added support for limiting number of paylines for Slot games.
- RGS: Fix bug with incorrect first default stake for Slot games.
- UI: Added setting document title to game name.
- Core: Fix bugs in jackpot notifications:
  * Fix incorrect behavior in case of notifications with same text.
  * Disable notifications while history replay is active.

## [3.2.4] - 2020-09-04

- ScratchApi: Fix an issue where the game would crash after the first game round.
- SimpleFlowApi: Fix an issue where startReplay() would not resolve correctly.

## [3.2.3] - 2020-08-28

- Core: `enableJackpotNotifications` option is added to provide ability to subscribe to Jackpot notifications from RGS.

## [3.2.2] - 2020-08-13

- RGS: Fix game setup issue in history replay.

## [3.2.1] - 2020-08-13

- Fullscreen: Fix instructional rotate animation on iOS 13.1 and above.

## [3.2.0] - 2020-07-24

- RGS: Errors now reject with a full error object, instead of a simple string.
- RGS: Fixed issue where an incorrect error would be returned in some games.
- RGS: Network errors are now rejected with correct format similar to RGS errors.
- Autoplay: Added new event 'set-enabled' for flows where autoplay can be disabled as a feature.
- Autoplay: Fix issue where sometimes autoplay dialog could not be closed on mobile. (Fix in 3.1.2 was incomplete)

## [3.1.2] - 2020-07-13

- Autoplay: It is now possible to stop autoplay when a jackpot is won.
- Autoplay: New configuration parameter `autoplay.stopOnJackpot` which enables or disables the stop on jackpot switch in the autoplay dialog.
- Autoplay: Fix issue where sometimes autoplay dialog could not be closed on mobile.

## [3.1.1] - 2020-07-03

- Core: Fix issue where `ready` promise was sometimes undefined.
- RGS: Fix issue where `RgsMultiAdapter` wouldn't always redirect events from child RGS instances.
- RGS: Correctly update ticket IDs when a history ticket is received.
- Multi game: Forward missing properties from child RGSes.
- Multi game: Correctly update game settings during initalization.

## [3.1.0] - 2020-07-01

- Core: Modified config parameter `gameId` - it can now either be a game ID string, or an array of game IDs.
- Core: New config parameter `metaGameId` - ID of a group of multiple games. Recommended to use when using multiple game IDs.
- RGS: Implemenation has been overhauled for better maintenance and easier extension.
- RGS: New method `setJwt(jwt: string)` for setting a custom JWT.
- RGS: New set of universal flow methods: `initGame()`, `purchase()`, `feature()`, `settle()`. These are available in all game types and replace game specific flow methods.
- RGS: Game specific flow methods are now deprecated:
  * for *fixed odds* games these are: `getGame()`, `purchaseTicket()`, `settleTicket()`,
  * for *simple flow* games these are: `refresh()`, `spin()`, `setFreeSpin()`, `freespin()`, `close()`.
- RGS: Support for games with multiple game IDs.
- Autoplay: Won't start anymore if spin amount is less than one or invalid.
- Autoplay: Fixed issue where autoplay dialog would try to trigger multiple autoplays.
- Dev: Updated polyfills.

## [3.0.4] - 2020-06-30

- Autoplay fix was missing from the previous build.

## [3.0.3] - 2020-06-25

- Core: GameWrapper constructor and `setup()` method now accept an extra parameter - `overrides`. Use it to specify parameters which should override the ones loaded from the configuration JSON.
- Core: Correctly set stake after 'refresh' calls.
- Autoplay: Fix issue where 'autoplay-next' would fire before the settle promise is resolved.

## [3.0.2] - 2020-05-21

- SlotApi: Fix parsing error when a response is null (`{result: null}`).

## [3.0.1] - 2020-05-19

- SimpleFlow: Split 'spin-done' event into 'spin-done' and 'free-spin-done'. 'spin-done' is fired only when RGS Spin response is received, while 'free-spin-done' is fired when the FreeSpin response is received.
- Messaging: Send 'gameStart' event correctly when a simple flow ticket is received.

## [3.0.0] - 2020-05-14

- Core: Move GameWrapper functionality into a class. This means that the wrapper can now be used as a module much more easily and also allows for better type completion.
Old behaviour is deprecated, but still available in IIFE builds.
- Core: Wrapper can now be initialized by supplying the URI to the configuration JSON, instead of passing in the object directly. Note that most wrapper fields won't be initialized immediately in this case. In that case, you should wait for the `ready` promise to resolve.
- Core: Game id can now be set with a URL parameter (`gameId`). The URL parameter overrides the game id specified in the wrapper configuration.
- Core: Wrapper will now update the bet automatically for unsettled instant games.
- Core: Wrapper now keeps track of the won amount.
- Core: Emit *'stake-change'* event when stake changes.
- Core: Currency data isn't required anymore. All currencies are automaticaly supported by relying on browser support.
- Core: Currency data JSON can be used to force a certain locale with a certain currency. Use `currencyData` parameter to specify the path to the currency configuration file.
- Core: Fallback to default language as soon as params are initialized, don't wait for `GameWrapper.init()`.
- Core: Fix inconsistencies between actual win amount and the one being displayed.
- Core: Wrapper will now correctly set the current stake during history replay.
- RGS: New member `configured` - a Promise which resolves when stake options have been configured. In fixed odds games, this happens after `rgs.getGame()`, while in simple flow games this happens after the first `rgs.refresh()` or `rgs.getTicket()`.
- RGS: New methods for getting and setting ticket data: `rgs.getTicketData()` and `rgs.setTicketData(data)`.
- RGS: New method to get the latest JWT: `rgs.getJwt()`.
- RGS: New method to send custom requests to RGS: `sendCustomRequest(service: string, method: string, args: any[])`;
- SlotApi: Added support for shortened response structure. Wrapper will map the new fields to the old human readable ones, so there is no need to change anything in games.
- ScratchApi: Keep track of ticket ID, so clients don't have to.
- ScratchApi: Reality now triggers only on spin start and after close.
- Reality Check: Display total time since game start. Previously, the wrapper wouldn't count the time spent while the RC dialog is open.
- Reality Check: The elapsed time will now be displayed only in minutes (rounded).
- Autoplay: It is possible to make setting a loss limit mandatory now, by setting `requireLossLimit` in GameWrapper configuration.
- UI: Added `ui.setVolume()` method.
- UI: A new event is dispatched when the volume is set: 'sound-set-volume' with the new volume in range 0-1 as the argument.
- UI: Added `ui.setTurbo()` method for activating/deactivating turbo mode in games that support it.
- UI: A new event will be dispatched when turbo is switched: 'set-turbo' with a boolean on/off flag as the argument.
- UI: Clear win amount when stake changes.
- UI: Fix input issues on iOS when running the game in a WebView.
- New: Rotation overlay - display an animation instructing the player to rotate their device.
- Core: Add new config parameter `fullscreen`. If set to `false` it will disable the wrapper's fullscreen handler.
- Core: Added new config parameter `forceOrientation`. When set to 'landscape' or 'orientation' it will display the rotation overlay if the viewport orientation is wrong.
- Language: New languages - Bulgarian, Czech, Danish, German, French, Croatian, Hungarian, Polish, Portuguese, Russian, Slovakian.
- Language: Turkish and English language have been updated.
- CheatApi: is no longer being built and packaged with the wrapper.
- Dev: Removed `CounterSelector` ui element as it was being unused.

### [Window Messaging]

- New: Window messaging support through `postMessage` mechanism.
- RGS: RGS modules will now keep track of possible stake values.
- RGS: New method `rgs.getDefaultStake()` - return the default stake provided by the RGS.
- RGS: New method `rgs.getAllStakes()` - return a list of all stakes supported by the current game.
- RGS: New method `rgs.getStakeOptions()` which returns an array of all stakes allowed by the operator for the current player. This is a subset of all possible stakes.
- RGS: New method `rgs.limitStakes(limits: number[])` which limits the choice of stakes to the ones listed in the `limits` argument.
- SlotApi: New method `rgs.getLineOptions()` which returns an array of all possible line choices.
- SlotApi: New method `rgs.setLineLimits()` which sets the list of possible line choices.

### [Gamble]

- New: Gamble feature support.
- RGS: New method `rgs.getGamble()` - check gamble history and if any new gambles are possible.
- RGS: New method `rgs.gamble(symbol: string)` - perform a gamble with the selected symbol.
- RGS: New property `hasGamble` - will be `true` if the gamble feature is available for the current game, or `false` otherwise. If gamble feature availability is unknown `hasGamble` will be `undefined`.
- RGS: New method `rgs.getGambleOptions()` - returns a list of gamble options and their configuration. For slots and keno games it will return a valid list only if gamble options are defined in client configuration of the game configuration JSON. If `rgs.getGambleOptions()` cannot return a valid list, it will return `undefined`.


## [2.3.0]

- Core: Exposed `VERSION` and `BUILD_DATE` as GameWrapper members.
- Core: Url parameters are now available even before the wrapper init() method is called.
- Core: JWT can now be set through cookies, as an alternative to the URL parameter or response header.
- Core: Disallow RGS calls other than `getTicket()` during history replay.
- Core: `formatCurrency()` signature has changed to `formatCurrency(value: number, trimFraction?: boolean, currencyCode?: string)`. If `trimFraction` is `true`, the currency formatter will trim the fractional part if the value is an integer.
- Fullscreen: New fullscreen overlay animations.
- Fullscreen: Fix blank space on some Android devices.
- Fullscreen: Fix broken scroll containers on iOS 13.
- Autoplay: Handle limit checks in a less error-prone way (by relying on integer comparison).
- Autoplay: Loss limit is now inclusive. The player will be able to spend up to and including the amount of money that is set as the loss limit value.
- Autoplay: Single win limit now has greater priority than total win limit.
- Autoplay: Don't throw an error if client configuration isn't set in the ticket response.
- Dev: Export ambient types.

## [2.2.0]

- Telemetry: Telemetry module has been added.
- Core: Components don't depend on jQuery any more.
- Core: New property - `GameWrapper.initialized`. It's a promise which resolves as soon as GameWrapper finishes initialization (i.e. `GameWrapper.init()` is done). Unlike `GameWrapper.ready` there are no guarantees that all wrapper assets have been loaded. `initialized` is useful for hooking up GameWrapper extensions.
- Core: New method - `GameWrapper.getConfig()`. Returns the wrapper configuration parameters that were set during initialization.
- Core: `GameWrapper.ui` will now dispatch a 'stake-change' event whenever the stake changes (and only if it's different from before). The 'stake-change' event will contain an object in the form of `{ stake: <new-stake> }`.
- KenoApi: `freeSpin()` now requires one argument - an array of selected numbers for the free spin.

## [2.1.6] 2019-09-13

- Core: Read game parameters from JWT if they are present. JWT parameters override URL parameters.

## [2.1.5] 2019-08-21

- SimpleFlowApi: `getTicket()` promise will now reject with 'invalid-ticket' in case of an invalid ticket.

## [2.1.4] 2019-08-21

- History: When history replay is finished, the info dialog will now offer the player to go to `historyUrl` (provided by the lobby), or back to lobby. Previously it offered the choice of staying in game or going back to lobby.
- ScratchApi: `getTicket()` promise will now reject with 'invalid-ticket' in case of an invalid ticket.


## [2.1.3] 2019-08-12

- UI: Fixed autoplay selector being stuck in a single position.

## [2.1.2] 2019-08-09

- CheatApi: Added support for custom responses during free spin.
- UI: "Number of spins" selector in autoplay menu will now display correctly even after orientation change.

## [2.1.1] 2019-08-07

- Style: Fix bottom bar misaligment which could be caused by CSS reset styles.

## [2.1.0] 2019-07-31

- Core: Added polyfill for ES6 Set.
- Core: Fullscreen overlay can now be delayed to show after the game has finished loading (`fullscreenAfterLoad` config parameter).
- Core: Added a property `fullscreen` which references fullscreen data.
- Fullscreen: Added new overlay animations.
- Fullscreen: Will fire an event - 'change' whenever the fullscreen state changes.
- ScratchApi: Improved IE11 support

## [2.0.0] 2019-07-16

- Keno: API support implemented.
- Slot/Keno: New method `rgs.setFreeSpin()` which is used to select the next free spin type.
- Slot/Keno: Wrapper now keeps track of `ticketId`. No need to use it as an argument when calling `rgs.freeSpin()` or `rgs.close()` anymore.
- Slot/Keno: Errors will now correctly reject the `rgs.freeSpin()` promise.
- Dev: RGS interface classes have been moved to 'rgs' directory for better organization.
- Dev: `SimpleFlowApi` is now an abstraction over `SlotRgs` and `KenoRgs`.

# [1.7.13] 2019-07-09

- UI: Fixed render issues on iOS that could cause content to be wrongly offset. iPad was mainly affected.
- Fullscreen: Improved fullscreen behaviour on iOS, especially for non-Safari browsers (Chrome, Firefox).

## [1.7.12] 2019-07-08

- Autoplay: Loss limit check now aplies to all autoplay rounds *before* placing a bet.
- Style: Removed subtitle from Message Dialog.

### [scratchcard]

- Core: Added new `gameType` 'fixed-odds' to replace 'scratchcard'. 'scratchcard' is now deprecated but still available.
- UI: In scratchcard games, show "resuming game" dialog when an unsettled ticket is received.
- ScratchApi: `getUnsettledTicket()` will now dispatch an 'unsettled-ticket-received' event when the server response arrives.
- Doc: Added fixed-odds (previously scratchcard) RGS API usage details.

## [1.7.11] 2019-06-24

- Autoplay: Fixed loss limit check.
- Style: Fit all bottom bar labels on iPhone 5s.
- Style: Shrank message dialog to fit on iPhone 5s in landscape.
- Fullscreen: Fixed fullscreen on Chrome for iOS.
- Fullscreen: Prevent zoom gestures on iOS as much as possible.
- Reality Check: Handle negative values for reality check parameters.
- Strings: Changed "PLAY FOR FUN" label to "DEMO PLAY".

## [1.7.10] 2019-05-29

- Style: Fixed padding on elements which rely on safe-area-inset.
- Style: Fixed bottom bar not showing on iPad.

## [1.7.9] 2019-05-28

- Reality Check: Message dialog will now show how long the player has been playing during the current session.
- Fullscreen: Disable fullscreen overlays on iPad for better user experience.
- Fullscreen: Added id `#fs-extender` to the scroll extender div.
- Fullscreen: Added an `#ios-resize-fixer` element to improve chances of getting the correct screen size after refresh on iOS.
- Fullscreen: Re-test fullscreen mode on iOS some time after game start (700ms). This should show fullscreen overlay if it failed to show during load due to incorrect window size.
- Style: Position top bar labels within safe area.
- Style: Added autoplay dialog show/hide animation.
- Style: Position autoplay close dialog button within safe area.
- Style: Disabled text-size-adjust on mobile. Fixes unpredictable font size changes on iOS.
- Style: Hide button outline that shows in Chrome and Safari.
- Dev: RealityCheck class extracted from GameWrapper.

## [1.7.8] 2019-05-17

- Style: In portrait mode, increased height of bottom bar to neatly fit all elements.
- Style: Fixed bottom bar vertical text alignment on mobile landscape.
- Style: Explicit `background: none` on `#gamewrapper` root element. This should fix white borders on iOS devices.
- Style: Removed safe-area padding from landscape on iPhone X.
- Style: Fixed scrolling behaviour in autoplay dialog on mobile.
- Style: Resized switch slider on mobile.
- Style: Cleaned up and improved autoplay dialog.
- Style: Fixed mobile media queries to catch more devices (hopefully all).
- Fullscreen: Fixed bug where scrolling within elements was being blocked.
- Fullscreen: Fixed minimal-ui detection. It should now work correctly on all iPhones.
- Fullscreen: Won't show overlay on iOS when an input field is active (affects autoplay dialog mainly).
- Fullscreen: Don't use Fullscreen API on iPads, due to usability issues. Rely on minimal-ui instead.

## [1.7.7] 2019-05-07

- Autoplay: Only "Loss Limit" will be set to a minimum of current bet. Other limits only have to be positive integers.
- Autoplay: `LimitSelector` now has instance specific value transformation function (trigger on 'change' event).
- Fullscreen: Fixed fullscreen overlay not showing on all iOS devices.
- Fullscreen: Fixed orientation detection for iOS 10 and earlier devices.
- Fullscreen: Scroll to top when swipe-up touch ends (iPhone).
- Style: Message dialog should now display without being cropped in landscape on mobile.
- Style: Fixed splash screen logo on high-DPI devices.
- Language: Added Turkish language files.

## [1.7.6] 2019-04-25

- Style: Changed full screen overlay animation size.
- CheatApi: Added consecutive free spin retrigger option.
- CheatApi: Added free spin retrigger with line win.

## [1.7.5] 2019-04-25

- Fullscreen: Fixed overscroll in fullscreen (minimal ui) on iOS.

## [1.7.4] 2019-04-24

- Core/UI: Implemented pause queue, so that 'game-resume' will dispatch only after ALL pause requests have been resolved.
- Autoplay: Total win counter won't carry over between autoplay session anymore.
- Autoplay: Single win limit will now work correctly.

## [1.7.3] 2019-04-23

- Autoplay: Added "Single win limit" which is separate from (total) "Win limit".
- Autoplay: Loss limit now stops autoplay if total losses + total bet greater than the limit. Previously it would stop only when the limit was crossed, not before.
- UI: Won't display error message when a request is blocked, so that blocked requests can be handled gracefully.
- UI: New LimitSelector component for use in autoplay dialog limit selection.
- Dev: Added `Strings.SYMBOL_CURRENCY` as a currency symbol placeholder.

## [1.7.2] 2019-04-18

- Style: Updated splash screen with Gromada Assets.
- Style: Progress bar won't overflow the screen anymore in portrait on thin devices.
- Core: `GameWrapper.init()` now accepts a new parameter `langPath` for setting a custom language path. The default is 'gamewrapper/lang'.
- Core: Reality Check will now stop autoplay when the RC pop-up blocks the game, not when the timer times out. This preserves the RC/wallet message flow.
- Lang: Added default English language file.
- Dev: Added 'lang' dir to packaging script.

### [browser-compat]

- Style: Set cursor to 'default' to all elements by default.
- Style: Removed 'position:absolute' from #messageDialog. (IE compatibility).

## [1.7.1] 2019-04-15

- Autoplay: Fixed Autoplay Dialog to always dispatch a 'dialog-closed' event.
- SlotApi: Time-based (url parameter) Reality Check can now trigger on `getAccount` and `close` calls.

## [1.7.0] 2019-04-12

- Autoplay: Fixed settings validation.
- Style: Changed text height in message dialog.

### [Browser Compatibility]

- Style: Set a property to `auto` before setting `unset` (IE compatibility).
- Core: Include polyfills for: Fetch, Promises, Map, Object.assign, Number.isNaN and ParentNode.append.
- Dev: Refactored Ui/Selector.ts tos store items as NodeList instead of HTMLCollection for compatibility reasons.
- Dev: Minimized usage of spread syntax (`...`).
- Dev: Added eslint config for testing browser compatibility.
- Dev: Changed typescript target to 'es5', so we can catch some compatibility errors.
- Dev: Use only one argument with `classList.add()` (IE compatibility).

## [1.6.5] 2019-04-11

- Autoplay: Constructor parameter should now be a reference to GameWrapper, not an RgsAdapter
- Autoplay: Validate settings before starting. Dispatch a 'losslimit-too-low' event if loss limit is lower than the current stake.
- Core: GameWrapper now stores the current bet. Added `getBet()` and `setBet(bet: number)` methods.
- Style: Changed bottom bar height on mobile to 2.5em (30px).

## [1.6.4] 2019-04-11

- Docs: Added Error Handling Guidelines.
- Cheats: Added a Max win scenario set.
- CheatApi: Added an option to cap free spins.
- CheatApi: Fixed freespin responses to better match server spec.

## [1.6.3] 2019-04-09

- Core: Throw `GameWrapperError` on errors during `GameWrapper.init()`.
- CheatApi: Will now return correct payouts for bet per line values other than 1.
- CheatApi: Random scenarios during free spin will now always be of the desired bet type.

### [scratchcard]

- UI: In scratchcard games, show "resuming game" dialog when an unsettled ticket is received.
- ScratchApi: `getUnsettledTicket()` will now dispatch an 'unsettled-ticket-received' event when the server response arrives.

## [1.6.2] 2019-04-03

- CheatApi: Fixed an issue where using random scenarios in free spins would occasionaly crash the game.
- CheatApi: Should now preserve `totalWin` correctly between games.
- Dev: Fixed packaging script to merge css files in the correct order.

## [1.6.1] 2019-04-01

- CheatApi: Changed "Free game retrigger" scenario to include valid free spin data, including `spinsRetrigger`.
- CheatApi: Use `spinsRetrigger` for incrementing spin count instead of spins awarded.

## [1.6.0] 2019-03-29

- Strings: Added missing reasons for autoplay stop.
- MessageDialog: Fixed message queue. It doesn't break anymore.
- SlotApi/ScratchardApi: Block requests after an error is received.
- SlotApi/ScratchardApi: Added new method to activate/deactivate reality check - `setRealityCheck()`.
- Core: Added `GameWrapper.state` which can be `active`, `paused`, or `error`.

## [1.5.4] 2019-03-27

- CheatApi: Improved free spin cheats. There is now an additional menu with more options for free spin cheats.

## [1.5.3] 2019-03-25

- Assets: Fixed `icons.svg` spritesheet to render correctly on Chrome.
- CheatApi: Added support for loading cheats from `cheats.json`.
- CheatApi: Cheat API will now try to select the cheat for the selected game type (e.g. S2D3). If it is not available it will default to the scenario under the "result" key.

## [1.5.2] 2019-03-19

- Style: Hide menu buttons on mobile.
- Style: Apply `safe-area-inset-bottom` padding to bottom bar (iPhone X).
- Core: Improved demo mode support. Now supports 'playMode' and 'isPlayForFun' parameters.
- Currency: Updated default currency set. Added CAD, RUB, HUF, CHF, BGN, RON, HRK, CZK and PLN.

## [1.5.1] 2019-03-08

- Style: Hidden Autoplay button from bottom bar.
- Core: Added fullscreen handling for mobile devices.
- Core: Added methods for setting and getting API selector. Fixes cheat loading bug.

## [1.5.0] 2019-03-04

- UI: Now displays game name.
- UI: Message dialog now displays subtitles.
- UI: Top and bottom bar are now hidden during splash screen.
- UI: Autoplay button is now hidden during history replay.
- UI: By default splash screen will now stay visible until all game wrapper assets have been loaded.
- UI: `hide()` method now accepts an argument `force`. If set to **true**, it will force the splash screen to hide immediately, without waiting for the wrapper assets to load.
- UI: New property - `ready`. `ready` is a promise that resolves when the UI is ready to show the game, i.e. when loader progress is complete and all the wrapper assets have been loaded.
- UI: RGS events callbacks will now wait for `GameWrapper.ready` to resolve before executing. This ensures that all the formatting and language data has been loaded before updating displays.
- UI: Update UI strings when a language is loaded.
- Style: All icons now use a single SVG spritesheet
- Style: Game mode display (e.g. "Play For Fun") positioned below notch on landscape.
- Style: Autoplay dialog spin selector fixed on desktop.
- Style: Preload images for advanced settings button in autoplay dialog.
- MessageDialog: Message Dialog can now be styled with icons.
- Core: Game can now pass its name to GameWrapper. This is done by either specifying the `gameName` parameter in the init config, or by calling `GameWrapper.setName(name: string)` after initalization.
- Core: Translation support. Wrapper will try to load external language data from `gamewrapper/lang/<language>.json` and update the internal strings. If a language file isn't available, wrapper will fall back to hardcoded English strings.
- Core: Wrapper will try to load external currency data from `gamewrapper/currency.json`. It will fall back gracefully to a hardcoded currency data set if `currency.json` is unavailable.
- Core: Exposed a `GameWrapper.ready` Promise variable. It will resolve when all additional wrapper assets have been loaded (such as currency data and language).
- Util: Added `once()` method to `EventDispatcher`, for handlers that should only execute once.
- CheatApi: Return correct `spinAwards` when game is resumed
- CheatApi: Fixed `game` and `config` output for resumed games.

## [1.4.0] - 2019-02-08

- Added styles for mobile.
- Re-enabled autoplay button in bottom bar.
- MessageDialog: Fixed message queueing.
- CheatApi: Fixed issues with freespin responses.

## Progressive Jackpots 2020-03-11

- RGS: new method: `getJackpots()` - fires event `jackpots-received`
- RGS: new method: `getAllJackpots()` - fires event `all-jackpots-received`
- RGS: new method: `getWins(jackpotId: string, numberOfWins: number)` - fires event `wins-received`. Parameters: `jackpotId` Jackpot ID as defined in JSON Configuration. `numberOfWins` shoud be up to 50.
