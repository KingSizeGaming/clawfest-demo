var GameWrapper = (function (exports) {
    'use strict';

    var IntegrationLogic = (function () {
        function IntegrationLogic(gameWrapper, params) {
            var _this = this;
            this.configReady = new Promise(function (resolve) { return _this.configPrepared = resolve; });
            this.gameWrapper = gameWrapper;
            this.wrapperParams = params;
        }
        return IntegrationLogic;
    }());

    var __assign$8 = (undefined && undefined.__assign) || function () {
        __assign$8 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$8.apply(this, arguments);
    };
    function createElement(tag, id, classList, children) {
        if (id === void 0) { id = ''; }
        if (classList === void 0) { classList = []; }
        if (children === void 0) { children = []; }
        var el = document.createElement(tag);
        if (id) {
            el.id = id;
        }
        if (classList.length > 0) {
            classList.forEach(function (cl) { return el.classList.add(cl); });
        }
        if (children.length > 0) {
            children.forEach(function (child) { return el.appendChild(child); });
        }
        return el;
    }
    function createInputElement(type) {
        var el = createElement('input');
        el.type = type;
        return el;
    }
    function createEvent(type, data) {
        var event = new CustomEvent(type, {
            detail: { data: data },
            bubbles: true,
            cancelable: true
        });
        return event;
    }
    function getFractionConfig(value, trimFraction) {
        if (trimFraction === void 0) { trimFraction = false; }
        var config = {};
        var hasFraction = (value - Math.floor(value)) !== 0;
        if (trimFraction && !hasFraction) {
            config.minimumFractionDigits = 0;
            config.maximumFractionDigits = 0;
        }
        return config;
    }
    function replaceUnderscoreWithDash(val) {
        return val.replace(/_/g, '-');
    }
    function isTrue(value) {
        return value === true;
    }
    function isFalse(value) {
        return value === false;
    }
    function isString(value) {
        return typeof value === 'string';
    }
    function formatCurrency$1(value, options) {
        var _a;
        if (options && options.code) {
            var locale = replaceUnderscoreWithDash(options.locale);
            var trimFraction = (_a = options.trimFraction) !== null && _a !== void 0 ? _a : false;
            var config = __assign$8({ useGrouping: true }, getFractionConfig(value, trimFraction));
            if (!options.useCompactNotation) {
                config.style = 'currency';
                config.currency = options.code;
                config.currencyDisplay = options.display;
            }
            else {
                config.style = 'decimal';
                config.notation = 'compact';
                config.compactDisplay = 'short';
            }
            try {
                var formatted = value.toLocaleString(locale, config);
                if (options.isSocialCasinoMode) {
                    return formatted.replace('SOC', '');
                }
                return formatted;
            }
            catch (e) {
                if (e instanceof RangeError && config.currencyDisplay === 'narrowSymbol') {
                    config.currencyDisplay = 'symbol';
                    return value.toLocaleString(locale, config);
                }
                throw e;
            }
        }
        return value.toLocaleString();
    }
    function formatNumber$1(value, locale, trimFraction) {
        if (trimFraction === void 0) { trimFraction = false; }
        var fractionConfig = getFractionConfig(value, trimFraction);
        if (locale)
            locale = replaceUnderscoreWithDash(locale);
        return value.toLocaleString(locale, __assign$8({ style: 'decimal', useGrouping: true }, fractionConfig));
    }
    function isAppleWebView() {
        if (window.MSStream)
            return false;
        if (!/iPad|iPhone|iPod/.test(navigator.userAgent))
            return false;
        var isWebView = navigator.userAgent.indexOf("WKWebView") !== -1 ||
            (navigator.userAgent.indexOf("Safari") === -1 && !navigator.standalone) ||
            !window.indexedDB ||
            !window.statusbar.visible ||
            (window.webkit && window.messageHandlers);
        return isWebView;
    }
    function isLocallyDeployed() {
        return window.location.hostname.indexOf('localhost') !== -1 ||
            window.location.hostname.indexOf('127.0.0.1') !== -1;
    }
    function applyAppleWebViewFix() {
        if (isAppleWebView()) {
            window.addEventListener('focusout', function (e) {
                if (e.srcElement.tagName === 'INPUT') {
                    window.scrollTo(0, 0);
                }
            });
        }
    }
    function isNullString(value) {
        return value === undefined || value === null;
    }

    var __awaiter$8 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$8 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var CapabilitiesHost = (function () {
        function CapabilitiesHost() {
            this.plugins = {};
            this.eventDispatcher = document.createTextNode('');
        }
        CapabilitiesHost.prototype.on = function (event, handler) {
            this.eventDispatcher.addEventListener(event, handler);
        };
        CapabilitiesHost.prototype.off = function (event, handler) {
            this.eventDispatcher.removeEventListener(event, handler);
        };
        CapabilitiesHost.prototype.once = function (event, handler) {
            var _this = this;
            var callback = function (data) {
                _this.off(event, callback);
                handler(data);
            };
            this.on(event, callback);
        };
        CapabilitiesHost.prototype.dispatchEvent = function (event, data) {
            this.eventDispatcher.dispatchEvent(new CustomEvent(event, { detail: data }));
        };
        CapabilitiesHost.prototype.addPlugin = function (action, plugin) {
            if (!this.plugins[action])
                this.plugins[action] = [];
            this.plugins[action].push(plugin);
        };
        CapabilitiesHost.prototype.removePlugin = function (action, plugin) {
            var registeredPlugins = this.plugins[action];
            var index = registeredPlugins.indexOf(plugin);
            if (index > -1)
                registeredPlugins.splice(index, 1);
        };
        CapabilitiesHost.prototype.execPlugins = function (action, data) {
            return __awaiter$8(this, void 0, void 0, function () {
                var _i, _a, plugin, err_1;
                return __generator$8(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.plugins[action])
                                return [2, data];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, , 7]);
                            _i = 0, _a = this.plugins[action];
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3, 5];
                            plugin = _a[_i];
                            return [4, plugin(this, data)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3, 2];
                        case 5: return [3, 7];
                        case 6:
                            err_1 = _b.sent();
                            console.error("gromada-gamewrapper: unable to execute plugins for action - '".concat(action, "': "), err_1);
                            throw err_1;
                        case 7: return [2, data];
                    }
                });
            });
        };
        return CapabilitiesHost;
    }());

    var __extends$f = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Rgs = (function (_super) {
        __extends$f(Rgs, _super);
        function Rgs(config) {
            var _this = _super.call(this) || this;
            _this.cachedTicketData = {
                gameData: '',
                accountData: { balance: 0, currency: '' }
            };
            _this.useBonusFunds = false;
            _this.plugins = {
                'jwt-updated': [],
                'request-constructed': [],
            };
            var gameId = config.gameId, params = config.params, _a = config.rpcUrl, rpcUrl = _a === void 0 ? '/api/rpc' : _a, _b = config.gameService, gameService = _b === void 0 ? 'GameService' : _b;
            _this.jwt = params['jwt'];
            if (!_this.jwt) {
                _this.jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1');
            }
            _this.gameId = gameId;
            _this.walletId = params["nyxGameId"] || gameId;
            _this.rpcUrl = rpcUrl;
            _this.isPlayForFun = !!config.demo;
            if (typeof gameService === 'string') {
                _this.gameService = gameService;
            }
            else {
                _this.gameService = _this.isPlayForFun ? gameService.demo : gameService.real;
            }
            _this.accountService = _this.isPlayForFun ? 'PlayForFunAccountService' : 'AccountService';
            _this.ticketService = _this.isPlayForFun ? 'PlayForFunTicketService' : 'TicketService';
            _this.gambleService = _this.isPlayForFun ? 'PlayForFunGambleService' : 'GambleService';
            _this.jackpotService = 'JackpotService';
            _this.walletService = 'WalletDataService';
            _this.subscribeService = 'SubscribeService';
            _this.bonusService = 'BonusService';
            return _this;
        }
        Rgs.prototype.invoke = function (serviceName, methodName, args) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                        if (xmlHttp.status == 200) {
                            _this.jwt = xmlHttp.getResponseHeader('jwt')
                                || document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1')
                                || _this.jwt;
                            var pluginData_1 = {
                                jwt: _this.jwt,
                                methodName: methodName,
                            };
                            _this.execPlugins('jwt-updated', pluginData_1)
                                .then(function () {
                                _this.dispatchEvent('jwt', _this.jwt);
                                resolve(xmlHttp.responseText);
                            });
                        }
                        else if (xmlHttp.status === 0) {
                            reject({
                                error: 'networkError',
                                errorDetails: {
                                    details: '599 Unable to get response from server',
                                    status: 599,
                                    message: 'Unable to get response from server',
                                },
                            });
                        }
                        else {
                            reject({
                                error: 'networkError',
                                errorDetails: {
                                    details: "".concat(xmlHttp.status, " ").concat(xmlHttp.statusText),
                                    status: xmlHttp.status,
                                    message: xmlHttp.statusText,
                                },
                            });
                        }
                    }
                };
                xmlHttp.open('POST', _this.rpcUrl);
                xmlHttp.setRequestHeader('jwt', _this.jwt);
                var pluginData = {
                    xmlHttp: xmlHttp,
                    methodName: methodName,
                };
                _this.execPlugins('request-constructed', pluginData)
                    .then(function () {
                    xmlHttp.send(JSON.stringify({ serviceName: serviceName, methodName: methodName, arguments: args }));
                });
            });
        };
        Rgs.prototype.parseData = function (data) {
            var obj = JSON.parse(data);
            if (obj.error) {
                return Promise.reject(obj);
            }
            else {
                return obj.result;
            }
        };
        Rgs.prototype.getJwt = function () {
            return this.jwt;
        };
        Rgs.prototype.setJwt = function (jwt) {
            this.jwt = jwt;
        };
        Rgs.prototype.initGame = function () { throw new Error('not-implemented'); };
        Rgs.prototype.purchase = function () {
            throw new Error('not-implemented');
        };
        Rgs.prototype.feature = function () { throw new Error('not-implemented'); };
        Rgs.prototype.settle = function () { throw new Error('not-implemented'); };
        Rgs.prototype.getAccount = function () {
            return this.invoke(this.accountService, 'GetAccount', [this.gameId]).then(this.parseData);
        };
        Rgs.prototype.getTicket = function (ticketId) {
            return this.invoke(this.ticketService, 'GetTicket', [ticketId]).then(this.parseData);
        };
        Rgs.prototype.getUnsettledTicket = function () {
            return this.invoke(this.ticketService, 'GetUnsettledTicket', [this.gameId]).then(this.parseData);
        };
        Rgs.prototype.getTicketData = function (ticketId) {
            var _this = this;
            return this.invoke(this.ticketService, 'GetTicketData', [ticketId]).then(function (data) { return _this.parseGameData(data); });
        };
        Rgs.prototype.parseGameData = function (data) {
            var obj = JSON.parse(data);
            if (obj.error) {
                return Promise.reject(obj);
            }
            else {
                try {
                    var objData = JSON.parse(obj.result);
                    if (objData && objData.accountData) {
                        this.cachedTicketData.accountData.balance = objData.accountData.balance;
                        this.cachedTicketData.accountData.currency = objData.accountData.currency;
                        return objData.gameData;
                    }
                    return obj.result;
                }
                catch (_a) {
                    return obj.result;
                }
            }
        };
        Rgs.prototype.setTicketData = function (data, ticketId) {
            this.cachedTicketData.gameData = data;
            return this.setCachedTicketData(ticketId);
        };
        Rgs.prototype.setCachedTicketData = function (ticketId) {
            var data = JSON.stringify(this.cachedTicketData);
            return this.invoke(this.ticketService, 'SetTicketData', [ticketId, data]).then(this.parseData);
        };
        Rgs.prototype.getWalletData = function () {
            return this.invoke(this.walletService, 'GetWalletData', [this.walletId]).then(this.parseData);
        };
        Rgs.prototype.getGamble = function (ticketId) {
            return this.invoke(this.gambleService, 'GetGamble', [ticketId]).then(this.parseData);
        };
        Rgs.prototype.gamble = function (symbol, ticketId) {
            return this.invoke(this.gambleService, 'Gamble', [ticketId, symbol]).then(this.parseData);
        };
        Rgs.prototype.getJackpots = function () {
            return this.invoke(this.jackpotService, 'GetJackpots', [this.gameId]).then(this.parseData);
        };
        Rgs.prototype.getAllJackpots = function () {
            return this.invoke(this.jackpotService, 'GetAllJackpots', []).then(this.parseData);
        };
        Rgs.prototype.getJackpotWins = function (jackpotId, numberOfWins) {
            return this.invoke(this.jackpotService, 'GetWins', [jackpotId, numberOfWins]).then(this.parseData);
        };
        Rgs.prototype.getJackpotSubscriptionUrl = function () {
            return this.invoke(this.subscribeService, 'GetJackpotURL', [this.gameId]).then(this.parseData);
        };
        Rgs.prototype.getBonusOffer = function () {
            return this.invoke(this.bonusService, 'FindOffer', [this.gameId]).then(this.parseData);
        };
        Rgs.prototype.startUsingBonusFunds = function () {
            this.useBonusFunds = true;
        };
        Rgs.prototype.stopUsingBonusFunds = function () {
            this.useBonusFunds = false;
        };
        Rgs.prototype.isUsingBonusFunds = function () {
            return this.useBonusFunds;
        };
        Rgs.prototype.sendCustomRequest = function (service, method, args) {
            if (args === void 0) { args = []; }
            return this.invoke(service, method, args).then(this.parseData);
        };
        return Rgs;
    }(CapabilitiesHost));

    class InvalidTokenError extends Error {
    }
    InvalidTokenError.prototype.name = "InvalidTokenError";
    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
            let code = p.charCodeAt(0).toString(16).toUpperCase();
            if (code.length < 2) {
                code = "0" + code;
            }
            return "%" + code;
        }));
    }
    function base64UrlDecode(str) {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += "==";
                break;
            case 3:
                output += "=";
                break;
            default:
                throw new Error("base64 string is not of the correct length");
        }
        try {
            return b64DecodeUnicode(output);
        }
        catch (err) {
            return atob(output);
        }
    }
    function jwtDecode(token, options) {
        if (typeof token !== "string") {
            throw new InvalidTokenError("Invalid token specified: must be a string");
        }
        options || (options = {});
        const pos = options.header === true ? 0 : 1;
        const part = token.split(".")[pos];
        if (typeof part !== "string") {
            throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
        }
        let decoded;
        try {
            decoded = base64UrlDecode(part);
        }
        catch (e) {
            throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
        }
        try {
            return JSON.parse(decoded);
        }
        catch (e) {
            throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
        }
    }

    var __awaiter$7 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$7 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var messageArray = [];
    var messagesHandledPromise = Promise.resolve();
    var resolveMessagesHandled = function () { };
    var isResolved = true;
    function resetMessagesHandled() {
        messagesHandledPromise = new Promise(function (resolve) { return resolveMessagesHandled = resolve; });
        isResolved = false;
    }
    function getMessagesHandled() {
        return messagesHandledPromise;
    }
    function executeMessage(rgs, message) {
        var walletMessage = new WalletMessage(message);
        rgs.dispatchEvent('wallet-message', walletMessage);
        return walletMessage.resolved;
    }
    function executeMessageQueue(rgs) {
        return __awaiter$7(this, void 0, void 0, function () {
            var message;
            return __generator$7(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(messageArray.length > 0)) return [3, 2];
                        message = messageArray.shift();
                        return [4, executeMessage(rgs, message)];
                    case 1:
                        _a.sent();
                        return [3, 0];
                    case 2:
                        isResolved = true;
                        resolveMessagesHandled();
                        return [2];
                }
            });
        });
    }
    function startMessageQueueExecution(rgs) {
        executeMessageQueue(rgs);
        return messagesHandledPromise;
    }
    function handleWalletMessages(behavior, methodName) {
        return function (rgs, data) {
            return __awaiter$7(this, void 0, void 0, function () {
                var message, _a;
                return __generator$7(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            switch (methodName) {
                                case 'spin':
                                case 'purchase':
                                    resetMessagesHandled();
                                    break;
                            }
                            if (!WalletMessage.exists(data, rgs.getJwt())) return [3, 5];
                            return [4, rgs.rgs.getWalletData()];
                        case 1:
                            message = _b.sent();
                            if (!message) return [3, 5];
                            messageArray.push(message);
                            _a = behavior;
                            switch (_a) {
                                case 'postponeIfInRound': return [3, 2];
                                case 'postpone': return [3, 4];
                            }
                            return [3, 4];
                        case 2:
                            if (!isResolved)
                                return [3, 5];
                            resetMessagesHandled();
                            return [4, startMessageQueueExecution(rgs)];
                        case 3:
                            _b.sent();
                            return [3, 5];
                        case 4: return [3, 5];
                        case 5: return [2];
                    }
                });
            });
        };
    }
    var WalletMessage = (function () {
        function WalletMessage(msg) {
            var _this = this;
            this.resolved = new Promise(function (resolve) { return _this._resolve = resolve; });
            this.msg = msg;
        }
        WalletMessage.exists = function (data, jwt) {
            var _a, _b, _c;
            var jwtPayload = jwtDecode(jwt);
            var msgStatus = ((_a = data === null || data === void 0 ? void 0 : data.context) === null || _a === void 0 ? void 0 : _a.walletMessageAvailable) || ((_c = (_b = jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.player) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.walletMessageAvailable);
            return msgStatus === true || msgStatus === 'true';
        };
        WalletMessage.prototype.resolve = function () {
            this._resolve();
        };
        return WalletMessage;
    }());

    var __extends$e = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$7 = (undefined && undefined.__assign) || function () {
        __assign$7 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$7.apply(this, arguments);
    };
    var RgsAdapter = (function (_super) {
        __extends$e(RgsAdapter, _super);
        function RgsAdapter(config, RgsClass) {
            var _this = _super.call(this) || this;
            _this.types = [];
            _this.defaultStake = 0;
            _this.stakeList = [];
            _this.stakeOptions = [];
            _this.gambleOptions = [];
            _this.hasGamble = true;
            _this.isHistoryReplay = false;
            _this.plugins = {
                'get-account': [],
                'get-ticket': [],
                'get-gamble': [],
                'gamble': [],
                'get-jackpots': [],
                'get-all-jackpots': [],
                'get-jackpot-wins': [],
                'get-jackpot-url': [],
                'get-bonus-offer': [],
                'send-custom-request': [],
            };
            _this.realityCheck = false;
            _this.retryPurchase = function (reason, tryCount, args) { return Promise.reject(reason); };
            _this.configured = new Promise(function (resolve) {
                _this.resolveConfigured = function () { resolve(); _this.resolveConfigured = null; };
            });
            _this.gameConfig = config.gameConfig;
            _this.applyGameConfig();
            if (RgsClass) {
                _this.rgs = new RgsClass(config);
                var handleMessage = handleWalletMessages('postponeIfInRound');
                handleMessage(_this, null);
            }
            return _this;
        }
        RgsAdapter.prototype.getJwt = function () {
            return this.rgs.getJwt();
        };
        RgsAdapter.prototype.setJwt = function (jwt) {
            return this.rgs.setJwt(jwt);
        };
        RgsAdapter.prototype.createFinishPromise = function () {
            var _this = this;
            this.controlledFinishPromise = new Promise(function (resolve) { return _this.resolveFinish = resolve; });
        };
        RgsAdapter.prototype.is = function (type) {
            if (typeof type === 'string') {
                return this.types.indexOf(type) > -1;
            }
            return this instanceof type;
        };
        RgsAdapter.prototype.applyGameConfig = function () { };
        RgsAdapter.prototype.applyGameData = function (data) { };
        RgsAdapter.prototype.setRealityCheck = function (activate) {
            if (this.realityCheck && !activate) {
                RgsAdapter.blockRequests = false;
            }
            this.realityCheck = activate;
        };
        RgsAdapter.prototype.setGameMode = function (isHistoryReplay) {
            this.isHistoryReplay = isHistoryReplay;
        };
        RgsAdapter.prototype.getDefaultStake = function () {
            return this.defaultStake;
        };
        RgsAdapter.prototype.getAllStakes = function () {
            return this.stakeList;
        };
        RgsAdapter.prototype.getStakeOptions = function () {
            var _this = this;
            return this.stakeOptions.length > 0 && !this.isHistoryReplay ? this.stakeList.filter(function (el) { return _this.stakeOptions.indexOf(el) > -1; }) : this.stakeList;
        };
        RgsAdapter.prototype.limitStakes = function (limits) {
            this.stakeOptions = limits;
        };
        RgsAdapter.prototype.getLimits = function () {
            return { stakes: this.getStakeOptions() };
        };
        RgsAdapter.prototype.setLimits = function (limits) {
            if (limits.stakes) {
                this.limitStakes(limits.stakes);
            }
        };
        RgsAdapter.prototype.initGame = function () { throw new Error('not-implemented'); };
        RgsAdapter.prototype.purchase = function () {
            throw new Error('not-implemented');
        };
        RgsAdapter.prototype.feature = function () { throw new Error('not-implemented'); };
        RgsAdapter.prototype.settle = function () { throw new Error('not-implemented'); };
        RgsAdapter.prototype.getAccount = function () {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return this.rgs.getAccount()
                .then(function (data) { return _this.execPlugins('get-account', data); })
                .then(function (data) {
                if (data.balance) {
                    _this.rgs.cachedTicketData.accountData.balance = data.balance;
                    _this.rgs.cachedTicketData.accountData.currency = data.currency;
                }
                _this.dispatchEvent('account-data-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getTicket = function (ticketId) {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            return this.rgs.getTicket(ticketId)
                .then(function (data) {
                _this.ticketId = data.ticketId || data.game.ticketId;
                return data;
            })
                .then(function (data) { return _this.execPlugins('get-ticket', data); })
                .then(function (data) {
                _this.dispatchEvent('ticket-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getUnsettledTicket = function () {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return this.rgs.getUnsettledTicket()
                .then(function (data) {
                _this.ticketId = data ? data.ticketId : null;
                return data;
            })
                .then(function (data) { return _this.execPlugins('get-unsettled-ticket', data); })
                .then(function (data) {
                _this.dispatchEvent('unsettled-ticket-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getTicketData = function (ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            return this.rgs.getTicketData(ticketId)
                .then(function (data) {
                _this.dispatchEvent('ticket-data', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason, false);
            });
        };
        RgsAdapter.prototype.setTicketData = function (data, ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            data = typeof (data) === 'string' ? data : JSON.stringify(data);
            return this.rgs.setTicketData(data, ticketId)
                .then(function (data) {
                _this.dispatchEvent('ticket-data-set', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason, false);
            });
        };
        RgsAdapter.prototype.getWalletData = function () {
            var _this = this;
            return this.rgs.getWalletData()
                .catch(function (reason) {
                return _this.handleError(reason, false);
            });
        };
        RgsAdapter.prototype.getGambleOptions = function () {
            return this.gambleOptions;
        };
        RgsAdapter.prototype.getGamble = function (ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            return this.rgs.getGamble(ticketId)
                .then(function (data) { return _this.execPlugins('get-gamble', data); })
                .then(function (data) {
                _this.dispatchEvent('gamble-data-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.gamble = function (symbol, ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (!this.hasGamble) {
                var reason = { error: 'gambleSuspended' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            return this.rgs.gamble(symbol, ticketId)
                .then(function (data) { return _this.execPlugins('gamble', data); })
                .then(function (data) {
                _this.dispatchEvent('gamble-result', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getJackpots = function () {
            var _this = this;
            return this.rgs.getJackpots()
                .then(function (data) { return _this.execPlugins('get-jackpots', data); })
                .then(function (data) {
                _this.dispatchEvent('jackpots-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getAllJackpots = function () {
            var _this = this;
            return this.rgs.getAllJackpots()
                .then(function (data) { return _this.execPlugins('get-all-jackpots', data); })
                .then(function (data) {
                _this.dispatchEvent('jackpots-all-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getJackpotWins = function (jackpotId, numberOfWins) {
            var _this = this;
            return this.rgs.getJackpotWins(jackpotId, numberOfWins)
                .then(function (data) { return _this.execPlugins('get-jackpot-wins', data); })
                .then(function (data) {
                _this.dispatchEvent('jackpots-wins-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getJackpotSubscriptionUrl = function () {
            var _this = this;
            return this.rgs.getJackpotSubscriptionUrl()
                .then(function (data) { return _this.execPlugins('get-jackpot-url', data); })
                .then(function (data) {
                _this.dispatchEvent('jackpots-subscription-url-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.getBonusOffer = function () {
            var _this = this;
            return this.rgs.getBonusOffer()
                .then(function (data) { return _this.execPlugins('get-bonus-offer', data); })
                .then(function (data) {
                _this.dispatchEvent('bonus-offer-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsAdapter.prototype.sendCustomRequest = function (service, method, args) {
            var _this = this;
            return this.rgs.sendCustomRequest(service, method, args)
                .then(function (data) { return _this.execPlugins('send-custom-request', data); })
                .then(function (data) {
                _this.dispatchEvent('custom-request-response', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason, false);
            });
        };
        RgsAdapter.prototype.handleError = function (reason, blockReqs) {
            if (blockReqs === void 0) { blockReqs = true; }
            RgsAdapter.blockRequests = blockReqs;
            RgsAdapter.blockReason = reason.error;
            this.dispatchError(reason);
            return Promise.reject(reason);
        };
        RgsAdapter.prototype.dispatchEvent = function (event, data) {
            _super.prototype.dispatchEvent.call(this, event, data);
            _super.prototype.dispatchEvent.call(this, '*', { event: event, data: data });
        };
        RgsAdapter.prototype.dispatchError = function (reason) {
            this.dispatchEvent('error', reason);
        };
        RgsAdapter.prototype.tryRetryPurchase = function (reason, tryCount, args) {
            if (reason.error === 'remoteError' ||
                reason.error === 'communicationProblem' ||
                reason.error === 'unexpectedError') {
                return this.retryPurchase(reason, tryCount, args);
            }
            return Promise.reject(reason);
        };
        RgsAdapter.blockRequests = false;
        RgsAdapter.blockReason = 'no-reason';
        return RgsAdapter;
    }(CapabilitiesHost));
    var RgsMultiAdapter = (function (_super) {
        __extends$e(RgsMultiAdapter, _super);
        function RgsMultiAdapter(config, RgsAdapterClass) {
            var _this = _super.call(this, config) || this;
            _this.rgsMap = new Map();
            _this.subgameOptions = [];
            _this.updateActiveRgs = function (rgs, force) {
                if (rgs.ticketId || force) {
                    _this.ticketId = rgs.ticketId;
                    _this.hasGamble = rgs.hasGamble;
                    _this.activeAdapter = rgs;
                    _this.rgs = _this.metaRgs ? _this.metaRgs.rgs : rgs.rgs;
                }
            };
            _this.metaGameId = config.metaGameId;
            if (_this.metaGameId) {
                _this.metaRgs = new RgsAdapterClass(__assign$7(__assign$7({}, config), { gameId: _this.metaGameId }));
                _this.metaRgs.on('game-data-received', function () { return _this.updateActiveRgs(_this.metaRgs); });
                _this.metaRgs.on('unsettled-ticket-received', function () { return _this.updateActiveRgs(_this.metaRgs); });
                _this.metaRgs.on('*', function (_a) {
                    var event = _a.detail;
                    return _this.dispatchEvent(event.event, event.data);
                });
                _this.updateActiveRgs(_this.metaRgs, true);
            }
            var _loop_1 = function (gameId) {
                var rgs = new RgsAdapterClass(__assign$7(__assign$7({}, config), { gameId: gameId }));
                rgs.on('game-data-received', function () { return _this.updateActiveRgs(rgs); });
                rgs.on('unsettled-ticket-received', function () { return _this.updateActiveRgs(rgs); });
                rgs.on('ticket-purchased', function () { return _this.updateActiveRgs(rgs); });
                rgs.on('spin-done', function () { return _this.updateActiveRgs(rgs); });
                rgs.on('play-done', function () { return _this.updateActiveRgs(rgs); });
                rgs.on('ticket-settled', function () { return _this.ticketId = null; });
                rgs.on('*', function (_a) {
                    var event = _a.detail;
                    return _this.dispatchEvent(event.event, event.data);
                });
                rgs.rgs.on('jwt', function (event) { return _this.setJwt(event.detail); });
                this_1.rgsMap.set(gameId, rgs);
                if (!this_1.activeAdapter) {
                    this_1.activeAdapter = rgs;
                    this_1.rgs = rgs.rgs;
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = config.gameId; _i < _a.length; _i++) {
                var gameId = _a[_i];
                _loop_1(gameId);
            }
            return _this;
        }
        RgsMultiAdapter.prototype.applyGameConfig = function () {
            _super.prototype.applyGameConfig.call(this);
            if (this.gameConfig.bonusRoundsGameId) {
                this.bonusRoundsGameId = this.gameConfig.bonusRoundsGameId;
            }
        };
        RgsMultiAdapter.prototype.is = function (type) {
            var adapter = this.metaRgs || this.activeAdapter;
            return adapter.is(type);
        };
        RgsMultiAdapter.prototype.setJwt = function (jwt) {
            if (this.metaRgs)
                this.metaRgs.setJwt(jwt);
            this.rgsMap.forEach(function (rgs) { return rgs.setJwt(jwt); });
        };
        RgsMultiAdapter.prototype.setRealityCheck = function (activate) {
            _super.prototype.setRealityCheck.call(this, activate);
            if (this.metaRgs)
                this.metaRgs.setRealityCheck(activate);
            this.rgsMap.forEach(function (rgs) { return rgs.setRealityCheck(activate); });
        };
        RgsMultiAdapter.prototype.setGameMode = function (isHistoryReplay) {
            _super.prototype.setGameMode.call(this, isHistoryReplay);
            if (this.metaRgs)
                this.metaRgs.setGameMode(isHistoryReplay);
            this.rgsMap.forEach(function (rgs) { return rgs.setGameMode(isHistoryReplay); });
        };
        RgsMultiAdapter.prototype.getDefaultStake = function () {
            var adapter = this.metaRgs || this.activeAdapter;
            return adapter.getDefaultStake();
        };
        RgsMultiAdapter.prototype.getAllStakes = function () {
            var adapter = this.metaRgs || this.activeAdapter;
            return adapter.getAllStakes();
        };
        RgsMultiAdapter.prototype.getStakeOptions = function () {
            var adapter = this.metaRgs || this.activeAdapter;
            return adapter.getStakeOptions();
        };
        RgsMultiAdapter.prototype.limitStakes = function (limits) {
            _super.prototype.limitStakes.call(this, limits);
            if (this.metaRgs)
                this.metaRgs.limitStakes(limits);
            this.rgsMap.forEach(function (rgs) { return rgs.limitStakes(limits); });
        };
        RgsMultiAdapter.prototype.getAllSubgames = function () {
            return Array.from(this.rgsMap.keys());
        };
        RgsMultiAdapter.prototype.getSubgameOptions = function () {
            var _this = this;
            var subgames = this.getAllSubgames();
            return this.subgameOptions.length > 0 && !this.isHistoryReplay ? subgames.filter(function (id) { return _this.subgameOptions.indexOf(id) > -1; }) : subgames;
        };
        RgsMultiAdapter.prototype.setSubgameLimits = function (limits) {
            this.subgameOptions = limits;
        };
        RgsMultiAdapter.prototype.getLimits = function () {
            var adapter = this.metaRgs || this.activeAdapter;
            return __assign$7(__assign$7({}, adapter.getLimits()), { subgames: this.getSubgameOptions() });
        };
        RgsMultiAdapter.prototype.setLimits = function (limits) {
            _super.prototype.setLimits.call(this, limits);
            if (limits.subgames) {
                this.setSubgameLimits(limits.subgames);
            }
            if (this.metaRgs)
                this.metaRgs.setLimits(limits);
            this.rgsMap.forEach(function (rgs) { return rgs.setLimits(limits); });
        };
        RgsMultiAdapter.prototype.game = function (gameId) {
            return this.rgsMap.get(gameId);
        };
        RgsMultiAdapter.prototype.initGame = function () {
            var _this = this;
            if (this.metaGameId) {
                return this.metaRgs.initGame().then(function (data) {
                    var _a;
                    _this.rgsMap.forEach(function (rgs) { return rgs.applyGameData(data); });
                    (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                    return data;
                });
            }
            var promises = [];
            this.rgsMap.forEach(function (rgs) { return promises.push(rgs.initGame()); });
            return Promise.all(promises).then(function (dataArr) {
                var _a;
                (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                return dataArr.find(function (data) { return data.spin; }) || dataArr[0];
            });
        };
        RgsMultiAdapter.prototype.purchase = function () {
            throw new Error('Game ID not specified. Tried to call an RGS flow method on the whole group.');
        };
        RgsMultiAdapter.prototype.feature = function () { throw new Error('Game ID not specified. Tried to call an RGS flow method on the whole group.'); };
        RgsMultiAdapter.prototype.settle = function () { throw new Error('Game ID not specified. Tried to call an RGS flow method on the whole group.'); };
        RgsMultiAdapter.prototype.getTicket = function (ticketId) {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            return this.rgs.getTicket(ticketId)
                .then(function (data) {
                _this.updateOgsRgsMap(data);
                _this.dispatchEvent('ticket-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        RgsMultiAdapter.prototype.addRgsPluginToAllSubadapters = function (action, plugin) {
            if (this.metaRgs) {
                this.metaRgs.rgs.addPlugin(action, plugin);
            }
            this.rgsMap.forEach(function (rgs) { return rgs.rgs.addPlugin(action, plugin); });
        };
        RgsMultiAdapter.prototype.updateOgsRgsMap = function (data) {
            var _this = this;
            var ticketGameId = data.game.name;
            var gameIds = Array.from(this.rgsMap.keys());
            var gameId = gameIds.find(function (id) { return ticketGameId.includes(id); });
            var position = ticketGameId.lastIndexOf(gameId);
            if (position > 0) {
                var rootGameId_1 = ticketGameId.substring(0, position);
                var keys = gameIds.map(function (id) { return [id, rootGameId_1 + id]; });
                keys.forEach(function (_a) {
                    var oldKey = _a[0], newKey = _a[1];
                    _this.rgsMap.set(newKey, _this.rgsMap.get(oldKey));
                    _this.rgsMap.delete(oldKey);
                });
            }
        };
        return RgsMultiAdapter;
    }(RgsAdapter));

    var __extends$d = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$6 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var tryCount$2 = 0;
    var SimpleFlowAdapter = (function (_super) {
        __extends$d(SimpleFlowAdapter, _super);
        function SimpleFlowAdapter(config, RgsClass) {
            var _this = _super.call(this, config, RgsClass) || this;
            _this.nextAction = 'refresh';
            _this.plugins = {
                'refresh': [],
                'spin': [handleWalletMessages('postpone', 'spin')],
                'close': [handleWalletMessages('postpone')],
                'freespin': [],
                'setfreespin': [],
                'get-account': [handleWalletMessages('postponeIfInRound')],
                'get-ticket': [],
                'get-gamble': [],
                'gamble': [],
                'get-jackpots': [],
                'get-all-jackpots': [],
                'get-jackpot-wins': [],
                'get-jackpot-url': [],
                'get-bonus-offer': [],
                'send-custom-request': [],
            };
            _this.types.push('simple-flow');
            return _this;
        }
        SimpleFlowAdapter.prototype.applyGameConfig = function () {
            var _a, _b, _c, _d;
            _super.prototype.applyGameConfig.call(this);
            this.stakeList = this.gameConfig.stakeValues;
            this.defaultStake = this.gameConfig.defaultStake;
            this.hasGamble = (_b = (_a = this.gameConfig.gamble) === null || _a === void 0 ? void 0 : _a.hasGamble) !== null && _b !== void 0 ? _b : true;
            this.gambleOptions = (_d = (_c = this.gameConfig.gamble) === null || _c === void 0 ? void 0 : _c.prizeTable) !== null && _d !== void 0 ? _d : [];
        };
        SimpleFlowAdapter.prototype.applyGameData = function (data) {
            this.ticketId = data.game.ticketId;
            this.nextAction = data.game.nextAction;
        };
        SimpleFlowAdapter.prototype.initGame = function () {
            return this.refresh();
        };
        SimpleFlowAdapter.prototype.purchase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.spin.apply(this, args);
        };
        SimpleFlowAdapter.prototype.settle = function () {
            return this.close();
        };
        SimpleFlowAdapter.prototype.getTicket = function (ticketId) {
            var _this = this;
            return _super.prototype.getTicket.call(this, ticketId).then(function (ticket) {
                var _a;
                (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                return ticket;
            });
        };
        SimpleFlowAdapter.prototype.refresh = function () {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return this.rgs.refresh()
                .then(function (data) {
                var _a;
                _this.applyGameData(data);
                (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                return data;
            })
                .then(function (data) { return _this.execPlugins('refresh', data); })
                .then(function (data) {
                _this.dispatchEvent('game-data-received', data);
                return data;
            })
                .catch(function (reason) { return _this.handleError(reason); });
        };
        SimpleFlowAdapter.prototype.spin = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.nextAction !== 'spin') {
                console.warn("Calling 'spin', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.realityCheck) {
                RgsAdapter.blockRequests = true;
                RgsAdapter.blockReason = 'realityCheck';
                var reason = { error: 'realityCheck' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return getMessagesHandled()
                .then(function () {
                if (tryCount$2 === 0) {
                    _this.dispatchEvent('spin-started');
                    _this.createFinishPromise();
                    _this.dispatchEvent('close-promise-created', _this.resolveFinish);
                }
                tryCount$2++;
            })
                .then(function () {
                var _a;
                return (_a = _this.rgs).spin.apply(_a, args);
            })
                .catch(function (reason) { return _this.tryRetryPurchase(reason, tryCount$2, args); })
                .then(function (data) {
                tryCount$2 = 0;
                _this.ticketId = data.game.ticketId;
                _this.nextAction = data.game.nextAction;
                return data;
            })
                .then(function (data) { return _this.execPlugins('spin', data); })
                .then(function (data) {
                var _a;
                if (!WalletMessage.exists(data, _this.getJwt())) {
                    _this.resolveFinish();
                }
                _this.dispatchEvent('spin-done', data);
                if (_this.nextAction === "freespin") {
                    _this.dispatchEvent('free-spin-trigger', { freeSpinCount: (_a = data.freespin) === null || _a === void 0 ? void 0 : _a.spinsAwarded });
                }
                return data;
            })
                .catch(function (reason) {
                tryCount$2 = 0;
                _this.nextAction = 'refresh';
                return _this.handleError(reason, reason.error !== 'insufficientFunds');
            });
        };
        SimpleFlowAdapter.prototype.freeSpin = function () {
            var _a;
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.nextAction !== 'freespin') {
                console.log("Calling 'freespin', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            var ticketId = this.ticketId;
            if (args.length > 0) {
                var lastArg = args[args.length - 1];
                if (typeof (lastArg === 'string') && lastArg.length === this.ticketId.length) {
                    ticketId = args.pop();
                }
            }
            return (_a = this.rgs).freeSpin.apply(_a, __spreadArray([ticketId], args, false)).then(function (data) {
                _this.nextAction = data.game.nextAction;
                return data;
            })
                .then(function (data) { return _this.execPlugins('freespin', data); })
                .then(function (data) {
                var _a, _b;
                _this.dispatchEvent('free-spin-done', data);
                if ((_a = data.freespin) === null || _a === void 0 ? void 0 : _a.spinsRetrigger) {
                    _this.dispatchEvent('free-spin-trigger', { freeSpinCount: (_b = data.freespin) === null || _b === void 0 ? void 0 : _b.spinsRetrigger });
                }
                if (_this.nextAction === 'close') {
                    _this.dispatchEvent('free-spin-end');
                }
                return data;
            })
                .catch(function (reason) {
                _this.nextAction = 'refresh';
                return _this.handleError(reason);
            });
        };
        SimpleFlowAdapter.prototype.setFreeSpin = function (ticketIdOrFreespinType, freeSpinType) {
            var _this = this;
            if (this.nextAction !== 'setfreespin') {
                console.log("Calling 'setfreespin', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            var ticketId = this.ticketId;
            if (freeSpinType) {
                ticketId = ticketIdOrFreespinType;
            }
            else {
                freeSpinType = ticketIdOrFreespinType;
            }
            return this.rgs.setFreeSpin(ticketId, freeSpinType)
                .then(function (data) {
                _this.nextAction = data.game.nextAction;
                return data;
            })
                .then(function (data) { return _this.execPlugins('setfreespin', data); })
                .then(function (data) {
                _this.dispatchEvent('freespin-set', data);
                return data;
            })
                .catch(function (reason) {
                _this.nextAction = 'refresh';
                return _this.handleError(reason);
            });
        };
        SimpleFlowAdapter.prototype.close = function (ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            if (this.nextAction !== 'close') {
                console.log("Calling 'close', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            var rgsClosePromise = this.rgs.close(ticketId)
                .then(function (data) {
                _this.applyGameData(data);
                _this.ticketId = null;
                return data;
            })
                .then(function (data) { return __awaiter$6(_this, void 0, void 0, function () {
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.rgs.setCachedTicketData(ticketId)];
                        case 1:
                            _a.sent();
                            return [2, data];
                    }
                });
            }); })
                .then(function (data) { return _this.execPlugins('close', data); })
                .then(function (data) {
                _this.dispatchEvent('ticket-settled', data);
                return data;
            })
                .then(function (data) {
                if (_this.realityCheck) {
                    RgsAdapter.blockRequests = true;
                    RgsAdapter.blockReason = 'realityCheck';
                    _this.dispatchError({ error: 'realityCheck' });
                }
                return data;
            })
                .catch(function (reason) {
                _this.nextAction = 'refresh';
                return _this.handleError(reason);
            });
            var finishGameRoundPromise = Promise.all([rgsClosePromise, this.controlledFinishPromise]);
            finishGameRoundPromise.then(function () { return startMessageQueueExecution(_this); });
            return finishGameRoundPromise.then(function (result) { return result[0]; });
        };
        return SimpleFlowAdapter;
    }(RgsAdapter));
    var SimpleFlowRgs = (function (_super) {
        __extends$d(SimpleFlowRgs, _super);
        function SimpleFlowRgs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleFlowRgs.prototype.refresh = function () {
            return this.invoke(this.gameService, 'Refresh', [this.gameId]).then(this.parseData);
        };
        SimpleFlowRgs.prototype.getTicket = function (ticketId) {
            return this.invoke(this.gameService, 'GetTicket', [ticketId]).then(this.parseData);
        };
        SimpleFlowRgs.prototype.spin = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var methodName = this.isUsingBonusFunds() ? 'SpinUsingBonus' : 'Spin';
            return this.invoke(this.gameService, methodName, __spreadArray([this.gameId], args, true)).then(this.parseData);
        };
        SimpleFlowRgs.prototype.freeSpin = function (ticketId) {
            return this.invoke(this.gameService, 'FreeSpin', [ticketId]).then(this.parseData);
        };
        SimpleFlowRgs.prototype.setFreeSpin = function (ticketId, freeSpinType) {
            return this.invoke(this.gameService, 'SetFreeSpin', [ticketId, freeSpinType]).then(this.parseData);
        };
        SimpleFlowRgs.prototype.close = function (ticketId) {
            return this.invoke(this.gameService, 'Close', [ticketId]).then(this.parseData);
        };
        SimpleFlowRgs.prototype.getGame = function () {
            return this.invoke('GameService', 'GetGame', [this.gameId]).then(this.parseData);
        };
        return SimpleFlowRgs;
    }(Rgs));

    var __extends$c = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$6 = (undefined && undefined.__assign) || function () {
        __assign$6 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$6.apply(this, arguments);
    };
    var SlotAdapter = (function (_super) {
        __extends$c(SlotAdapter, _super);
        function SlotAdapter(config) {
            var _this = _super.call(this, config, SlotRgs) || this;
            _this.lineList = [];
            _this.lineOptions = [];
            _this.types.push('slot');
            return _this;
        }
        SlotAdapter.prototype.getGame = function () {
            return this.rgs.getGame();
        };
        SlotAdapter.prototype.applyGameConfig = function () {
            _super.prototype.applyGameConfig.call(this);
            var config = this.gameConfig;
            if (!config.betMode || !config.betMultipliers) {
                throw new Error('GameWrapper: bet multipliers and bet mode are required for a slot game.');
            }
            if (typeof config.betMode !== 'string') {
                throw new Error('GameWrapper: bet mode must be a string.');
            }
            if (typeof config.betMultipliers !== 'object') {
                throw new Error('GameWrapper: bet multipliers have incorrect format.');
            }
            for (var key in config.betMultipliers) {
                if (!Array.isArray(config.betMultipliers[key])) {
                    throw new Error('GameWrapper: bet multipliers have incorrect format.');
                }
            }
            switch (config.betMode) {
                case 'single-multiplier':
                    if (!config.betMultipliers.single || config.betMultipliers.single.length !== 1) {
                        throw new Error('GameWrapper: bet multipliers have incorrect format.');
                    }
                    break;
                default:
                    throw new Error('GameWrapper: unknown bet mode specified.');
            }
            this.betMode = config.betMode;
            this.betMultipliers = config.betMultipliers;
            this.defaultGameType = config.defaultGameType;
            switch (this.betMode) {
                case 'single-multiplier':
                    this.currentMultiplier = this.betMultipliers.single[0];
                    break;
            }
            this.lineList = config.lineCount || [config.defaultLineCount];
        };
        SlotAdapter.prototype.getCurrentMultiplier = function () {
            return this.currentMultiplier;
        };
        SlotAdapter.prototype.getDefaultGameType = function () {
            return this.defaultGameType;
        };
        SlotAdapter.prototype.getDefaultStake = function () {
            var defaultStake = _super.prototype.getDefaultStake.call(this);
            return defaultStake * this.currentMultiplier;
        };
        SlotAdapter.prototype.getDefaultLines = function () {
            return this.lineList[0];
        };
        SlotAdapter.prototype.getAllLines = function () {
            return this.lineList;
        };
        SlotAdapter.prototype.getLineOptions = function () {
            var _this = this;
            return this.lineOptions.length > 0 && !this.isHistoryReplay ? this.lineList.filter(function (el) { return _this.lineOptions.indexOf(el) > -1; }) : this.lineList;
        };
        SlotAdapter.prototype.setLineLimits = function (limits) {
            this.lineOptions = limits;
        };
        SlotAdapter.prototype.getLimits = function () {
            return __assign$6(__assign$6({}, _super.prototype.getLimits.call(this)), { lines: this.getLineOptions() });
        };
        SlotAdapter.prototype.setLimits = function (limits) {
            _super.prototype.setLimits.call(this, limits);
            if (limits.lines) {
                this.setLineLimits(limits.lines);
            }
        };
        return SlotAdapter;
    }(SimpleFlowAdapter));
    var SlotRgs = (function (_super) {
        __extends$c(SlotRgs, _super);
        function SlotRgs(config) {
            var service = {
                demo: 'PlayForFunSlotService',
                real: 'SlotService',
            };
            return _super.call(this, __assign$6(__assign$6({}, config), { gameService: service })) || this;
        }
        SlotRgs.prototype.spin = function (lineCount, gameType, betPerLine) {
            var methodName = this.isUsingBonusFunds() ? 'SpinUsingBonus' : 'Spin';
            return this.invoke(this.gameService, methodName, [this.gameId, lineCount, gameType, betPerLine]).then(this.parseData);
        };
        SlotRgs.prototype.getGame = function () {
            return this.invoke('GameService', 'GetGame', [this.gameId]).then(this.parseData);
        };
        SlotRgs.prototype.parseData = function (data) {
            var result = _super.prototype.parseData.call(this, data);
            if (result) {
                if (result.j)
                    result.jackpot = result.j;
                for (var _i = 0, _a = [result.spin, result.f, result.j]; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    if (!entry)
                        continue;
                    remapEntry(entry);
                }
                if (result.freespin) {
                    if (Array.isArray(result.freespin)) {
                        result.freespin.forEach(function (el) { return remapEntry(el); });
                    }
                    else {
                        remapEntry(result.freespin);
                    }
                }
            }
            return result;
        };
        return SlotRgs;
    }(SimpleFlowRgs));
    function remapEntry(entry) {
        if (entry.st !== undefined)
            entry.stops = entry.st;
        if (entry.g !== undefined)
            entry.grid = entry.g;
        if (entry.sS !== undefined)
            entry.secStops = entry.sS;
        if (entry.sG !== undefined)
            entry.secGrid = entry.sG;
        if (entry.tB !== undefined)
            entry.totalBet = entry.tB;
        if (entry.wM !== undefined)
            entry.wildMultiplier = entry.wM;
        if (entry.w !== undefined)
            entry.winnings = entry.w;
        if (entry.wA !== undefined)
            entry.winAmount = entry.wA;
        if (entry.sA !== undefined)
            entry.spinsAwarded = entry.sA;
        if (entry.sR !== undefined)
            entry.spinsRemaining = entry.sR;
        if (entry.sC !== undefined)
            entry.spinsCapped = entry.sC;
        if (entry.sRt !== undefined)
            entry.spinsRetrigger = entry.sRt;
        if (entry.t !== undefined)
            entry.trigger = entry.t;
        if (entry.rt !== undefined)
            entry.retrigger = entry.rt;
        if (entry.bT !== undefined)
            entry.betType = entry.bT;
        if (entry.lC !== undefined)
            entry.lineCount = entry.lC;
        if (entry.wC !== undefined)
            entry.winCapped = entry.wC;
        if (entry.wLA !== undefined)
            entry.wildListAwarded = entry.wLA;
        if (entry.f !== undefined)
            entry.feature = entry.f;
        if (entry.w !== undefined) {
            for (var _i = 0, _a = entry.w; _i < _a.length; _i++) {
                var w = _a[_i];
                w.symbol = w.s;
                w.payout = w.p;
                w.payline = w.pl;
                w.offset = w.o;
            }
        }
        if (entry.t !== undefined) {
            entry.t.symbol = entry.t.s;
            entry.t.offset = entry.t.o;
        }
        if (entry.rt !== undefined) {
            entry.rt.symbol = entry.rt.s;
            entry.rt.offset = entry.rt.o;
        }
    }

    function calculateBetLevel(totalBets, totalBetDivider) {
        var calculateBet = function (totalBet) {
            var stake = totalBet / totalBetDivider;
            return Math.round(stake * 1000) / 1000;
        };
        var bets = Array.isArray(totalBets) ? totalBets : [totalBets];
        var result = bets.map(calculateBet);
        return Array.isArray(bets) ? result : result[0];
    }
    function calculateTotalBets(rgs, totalBetDivider) {
        var stakeOptions = rgs.getStakeOptions();
        return stakeOptions.map(function (x) { return x * totalBetDivider; });
    }
    function isBetAvailable(rgs, bet) {
        if (rgs instanceof RgsMultiAdapter) {
            throw new Error('gromada-gamewrapper: isBetAvailable() must be used with sub-game adapter');
        }
        if (typeof bet === 'number') {
            return rgs.getStakeOptions().indexOf(bet) > -1;
        }
        return bet.map(function (stake) { return isBetAvailable(rgs, stake); }).reduce(function (acc, cur) { return acc && cur; }, true);
    }
    function getLimitsForBet(rgs, bet) {
        if (rgs instanceof RgsMultiAdapter) {
            throw new Error('gromada-gamewrapper: getLimitsForBet() must be used with sub-game adapter');
        }
        var stakes = Array.isArray(bet) ? bet : [bet];
        var result = { stakes: stakes };
        console.log('gromada-gamewrapper: Stake limits ', result);
        if (rgs.is(SlotAdapter)) {
            var slotRgs = rgs;
            var lineOptions = slotRgs.getLineOptions();
            if (lineOptions.length > 0) {
                result.lines = [Math.max.apply(Math, lineOptions)];
            }
            else {
                console.log('gromada-gamewrapper: Number of lines not configured.');
            }
        }
        return result;
    }

    var Strings = {
        OK: "OK",
        BALANCE: "Balance",
        BET: "Stake",
        WIN_AMOUNT: "Win",
        COINS: "Coins",
        COIN_STAKE: "Coin Stake",
        MODE_PLAY_FOR_FUN: "DEMO PLAY",
        MODE_HISTORY: "HISTORY REPLAY",
        MESSAGE_DIALOG_INFO: "Info",
        MESSAGE_DIALOG_ERROR: "Error",
        MESSAGE_DIALOG_LOBBY_TITLE: "Are you sure?",
        MESSAGE_DIALOG_TO_LOBBY: "To lobby",
        MESSAGE_DIALOG_TO_HISTORY: "View history",
        MESSAGE_DIALOG_REFRESH: "Return to game",
        MESSAGE_DIALOG_ADD_FUNDS: "Add funds",
        MESSAGE_DIALOG_RETRY_PURCHASE: "Retry purchase",
        PURCHASE_FAILED: "Transaction failed",
        PURCHASE_FAILED_INFO: "Unable to purchase ticket at this moment",
        INSUFFICIENT_FUNDS: "Insufficient funds",
        DEFAULT_ERROR_MSG: "A technical error occurred",
        ERROR_SESSION_TIMEOUT: "Error: Session timed out.",
        REALITY_CHECK: "Reality check",
        REALITY_CHECK_INFO: "You have been playing for {{minutes}} minutes",
        REALITY_CHECK_BUTTON: "To Lobby",
        REPLAY_STARTED: "You are about to see a replay.",
        REPLAY_FINISHED: "Replay finished.",
        BTN_AUTOPLAY: "AUTOPLAY",
        BTN_AUTOPLAY_SETTINGS: "Advanced settings",
        BTN_AUTOPLAY_RESET: "RESET",
        AUTOPLAY_TITLE: "Autoplay settings",
        AUTOPLAY_STOP_AUTOPLAY: "Stop Autoplay",
        AUTOPLAY_LOSS_LIMIT: "Loss limit",
        AUTOPLAY_WIN_LIMIT: "Win limit",
        AUTOPLAY_SINGLE_WIN_LIMIT: "Single win limit",
        AUTOPLAY_SPINS: "Number of spins",
        AUTOPLAY_INSTRUCTION: "Select to play",
        AUTOPLAY_STOP_ON_WIN: "On any win",
        AUTOPLAY_STOP_ON_JACKPOT: "Stop on Jackpot",
        AUTOPLAY_MSG_LOSS_LIMIT_LOW: "[Autoplay] Could not start",
        AUTOPLAY_MSG_LOSS_LIMIT_LOW_INFO: "Loss limit lower then current stake.",
        AUTOPLAY_MSG_LOSS_LIMIT_REQUIRED: "[Autoplay] Loss limit required",
        AUTOPLAY_MSG_LOSS_LIMIT_REQUIRED_INFO: "Loss limit must be set to start autoplay",
        AUTOPLAY_MSG_LOSS_LIMIT: "[Autoplay] Loss limit reached",
        AUTOPLAY_MSG_WIN_LIMIT: "[Autoplay] Win limit reached",
        AUTOPLAY_MSG_SINGLE_WIN_LIMIT: "[Autoplay] Single Win limit reached",
        AUTOPLAY_MSG_STOP_ON_WIN: "[Autoplay] Stopping on win",
        AUTOPLAY_MSG_STOP_ON_JACKPOT: "[Autoplay] Jackpot won",
        AUTOPLAY_MSG_SPINS_COMPLETE: "[Autoplay] All spins completed",
        AUTOPLAY_MSG_INSUFFICIENT_FUNDS: "[Autoplay] Stopped due to insufficient funds",
        AUTOPLAY_MSG_REALITY_CHECK: "[Autoplay] Stopped due to Reality Check",
        AUTOPLAY_MSG_STOP_ON_ERROR: "[Autoplay] Stopped due to a technical error",
        AUTOPLAY_MSG_DEFAULT: "[Autoplay] Stopped",
        MSG_RESUMING_GAME: "Resuming previous game",
        MSG_MAX_WIN: "Maximum winnings reached",
        MSG_YOU_WON: "You won: ",
        MSG_MAX_FREESPINS_TITLE: "Maximum free spins won",
        MSG_MAX_FREESPINS: "Remaining free spins: ",
        MSG_HIDE_TOOLBAR: "Hide Toolbar",
        MSG_TRANSACTION_FAILED: "Transaction failed. Reload to continue?",
        TITLE_SETTINGS: "Settings",
        SETTINGS_BET: "Bet",
        SETTINGS_GAME: "Game",
        SETTINGS_HISTORY: "History",
        SETTINGS_INFO: "Info",
        SETTINGS_SOUND_SWITCH: "Sound ON/OFF",
        SETTINGS_HAND_SWITCH: "Left Handed Play",
        CURRENCY_CODE: "",
        BONUS_ROUNDS: "Bonus Rounds",
        OFFER_SPENT: "The bonus offer has ended.",
        OFFER_UNAVAILABLE: "The bonus offer is no longer available.",
        BONUS_STARTED: "You’ve received bonus rounds!",
        BONUS_BACK: "Welcome back!",
        BONUS_REMAINING_ROUNDS: "Bonus rounds remaining",
        BONUS_USE_BEFORE: "Use them before: ",
        BONUS_INVALID_BET_LEVEL: "Invalid bet level for bonus rounds.",
        BONUS_ROUNDS_AVAILABLE: "Available stakes: ",
        BONUS_OFFER_TITLE: "You have bonus rounds available!",
        BONUS_OFFER_ACCEPT: "Play now",
        BONUS_OFFER_DECLINE: "Play later",
        BONUS_TOGGLE_OFF: "OFF",
        BONUS_TOGGLE_ON: "ON",
        BONUS_ROUNDS_ACTIVE: "Bonus Rounds: active",
        BONUS_ROUNDS_INACTIVE: "Bonus Rounds: inactive",
        LANGUAGE_NOT_SUPPORTED: "Language not supported.",
        JACKPOT_SUBSCRIPTION_FAILED: "Jackpot subscription failed.",
        INVALID_BET_LEVEL_FREEROUND: "Invalid Bet Level for Free Round",
        LOGIN_ERROR: "Login required",
        GAMING_LIMITS: "Responsible gaming limits reached. You have to exit game.",
        GAMING_SESSION_EXPIRED: "Responsible gaming session expired",
        ACCOUNT_BLOCKED: "Your account is blocked",
        CONNECTION_ERROR: "Network timeout, please check your internet connection and try again.",
        RGS_NO_MESSAGE_FOR_PLAYER: "No Message for Player.",
        RGS_ERROR_SESSION_ID: "Invalid session id.",
        RGS_ERROR_SITE_ID: "Invalid site id.",
        RGS_ERROR_GAME_ID: "Invalid game id.",
        RGS_ERROR_INACTIVE: "Inactive account.",
        RGS_ERROR_GENERIC: "Generic error.",
        RGS_ERROR_RETRIVING_DATA: "Retriving data failed.",
        RGS_ERROR_ACCOUNT_LOCKED: "Account locked.",
        RGS_ERROR_PLAYER_ID: "Invalid player id.",
        RGS_ERROR_INVALID_GAME_SESSION: "Invalid game session.",
        RGS_ERROR_COMMUNICATION_FAILURE: "Communication failure.",
        RGS_ERROR_PARAMETER_VALIDATION: "Parameter validation failed.",
        RGS_ERROR_DUPLICATE_BET_ID: "Duplicate bet id.",
        RGS_ERROR_DUPLICATE_CREDIT: "Duplicate credit.",
        RGS_ERROR_BET_NOT_FOUND: "Bet not found.",
        SUCCESS: "Error: Success.",
        REALITY_CHECK_HISTORY_BUTTON: "History",
        REALITY_CHECK_EXIT_BUTTON: "Exit",
    };

    var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var BonusRoundManager = (function () {
        function BonusRoundManager(gameWrapper, config, wrapperParams) {
            var _this = this;
            this.unsettledTicketExists = false;
            this.isUsingBonus = false;
            this.bonusDeferred = false;
            this.bonusOfferTracking = null;
            this.currentTotalBetDivider = 1;
            this.allowedTotalBets = [];
            this.toggleBonusUsage = function () {
                if (!_this.bonusInfo)
                    return;
                if (_this.unsettledTicketExists) {
                    console.log('gromada-gamewrapper: bonus toggle click ignored - spin in flight');
                    return;
                }
                if (_this.isUsingBonus) {
                    _this.isUsingBonus = false;
                    _this.bonusDeferred = true;
                    _this.clearBonusBetRestrictions();
                    _this.gameWrapper.dispatchEvent('bonus-rounds-disabled');
                    _this.getBonusOfferTracking().barVisible = false;
                    _this.updateBonusToggleButton();
                }
                else if (_this.bonusDeferred) {
                    _this.activateBonus();
                }
            };
            this.gameWrapper = gameWrapper;
            this.config = config;
            this.wrapperParams = wrapperParams;
        }
        BonusRoundManager.prototype.setUnsettledTicketExists = function (ticketExists) {
            this.unsettledTicketExists = ticketExists;
        };
        BonusRoundManager.prototype.registerRequestPlugin = function (rgs) {
            rgs.addPlugin('request-constructed', this.handleNewRequest.bind(this));
        };
        BonusRoundManager.prototype.handleNewRequest = function (host, data) {
            return __awaiter$5(this, void 0, void 0, function () {
                var methodName, xmlHttp;
                return __generator$5(this, function (_a) {
                    methodName = data.methodName;
                    xmlHttp = data.xmlHttp;
                    if (!this.isUsingBonus)
                        return [2];
                    if (methodName === 'Spin' || methodName === 'PurchaseTicket' || methodName === 'Play') {
                        this.addBonusHeader(xmlHttp);
                    }
                    return [2, Promise.resolve()];
                });
            });
        };
        BonusRoundManager.prototype.addBonusHeader = function (xmlHttp) {
            if (!this.bonusInfo || !this.bonusInfo.id || !this.bonusInfo.remainingRounds) {
                this.isUsingBonus = false;
                console.log('gromada-gamewrapper: bonus data missing');
                return;
            }
            console.log('gromada-gamewrapper: addBonusHeader()');
            var headerData = "".concat(this.bonusInfo.id);
            console.log("Untrusted data: ", JSON.stringify({ bonusId: headerData }));
            xmlHttp.setRequestHeader('RGS-Untrusted-Data', JSON.stringify({ bonusId: headerData }));
        };
        BonusRoundManager.prototype.resolveBonusRoundsAdapter = function () {
            var bonusRoundsAdapter = this.gameWrapper.rgs instanceof RgsMultiAdapter
                ? this.gameWrapper.rgs.game(this.gameWrapper.rgs.bonusRoundsGameId)
                : this.gameWrapper.rgs;
            this.bonusRoundsRgs = bonusRoundsAdapter.rgs;
            return bonusRoundsAdapter;
        };
        BonusRoundManager.prototype.initializeRgsConfigParams = function () {
            return __awaiter$5(this, void 0, void 0, function () {
                var bonusRoundsAdapter, slotRgs_1, error_1;
                var _this = this;
                return __generator$5(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.gameWrapper.rgs.configured];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            bonusRoundsAdapter = this.resolveBonusRoundsAdapter();
                            if (!bonusRoundsAdapter.is(SlotAdapter)) return [3, 4];
                            slotRgs_1 = bonusRoundsAdapter;
                            if (!(this.currentTotalBetDivider == 1)) return [3, 4];
                            return [4, slotRgs_1.getGame().then(function (result) {
                                    var _a, _b, _c, _d, _e;
                                    var lineCount = (_c = (_b = (_a = result.gameEngineConfiguration) === null || _a === void 0 ? void 0 : _a.lineCount) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null;
                                    var waysMultiplier = (_e = (_d = result.gameEngineConfiguration) === null || _d === void 0 ? void 0 : _d.waysMultiplier) !== null && _e !== void 0 ? _e : null;
                                    var betMultiplier = slotRgs_1.getCurrentMultiplier();
                                    _this.currentTotalBetDivider = (waysMultiplier ? waysMultiplier : lineCount) * betMultiplier;
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            this.allowedTotalBets = calculateTotalBets(bonusRoundsAdapter, this.currentTotalBetDivider);
                            return [3, 6];
                        case 5:
                            error_1 = _a.sent();
                            console.error('gromada-gamewrapper: unable to execute get game', error_1);
                            throw error_1;
                        case 6: return [2];
                    }
                });
            });
        };
        BonusRoundManager.prototype.findActiveBonus = function (bonuses) {
            var _this = this;
            var _a, _b;
            var now = Date.now();
            var isValidBonusData = function (bonus) {
                if (!bonus)
                    return false;
                if (!bonus.id)
                    return false;
                if (!bonus.betLevel) {
                    console.log('gromada-gamewrapper: Bet level missing', bonus.id);
                    return false;
                }
                if (!bonus.remainingRounds) {
                    console.log('gromada-gamewrapper: No remaining rounds left', bonus.id);
                    return false;
                }
                if (!bonus.totalRounds) {
                    console.log('gromada-gamewrapper: Total rounds missing', bonus.id);
                    return false;
                }
                if (bonus.endDateTime && new Date(bonus.endDateTime).getTime() <= now) {
                    console.log('gromada-gamewrapper: Bonus expired', bonus.id, bonus.endDateTime);
                    return false;
                }
                var allowed = Array.isArray(bonus.betLevel) ?
                    bonus.betLevel.every(function (v) { return _this.allowedTotalBets.includes(v); }) :
                    _this.allowedTotalBets.includes(bonus.betLevel);
                if (!allowed) {
                    console.log('gromada-gamewrapper: Invalid stake ', bonus.id, bonus.betLevel);
                    return false;
                }
                return true;
            };
            if (this.bonusInfo) {
                var updatedCurrentBonus = (_a = bonuses.find(function (b) { var _a; return b.id === ((_a = _this.bonusInfo) === null || _a === void 0 ? void 0 : _a.id); })) !== null && _a !== void 0 ? _a : null;
                if (isValidBonusData(updatedCurrentBonus)) {
                    this.bonusInfo = updatedCurrentBonus;
                }
                else {
                    this.bonusInfo = null;
                }
            }
            if (!this.bonusInfo) {
                this.bonusInfo = (_b = bonuses.find(function (b) { return isValidBonusData(b); })) !== null && _b !== void 0 ? _b : null;
            }
            if (this.bonusInfo) {
                console.log('gromada-gamewrapper: Bonus info data - ', this.bonusInfo);
                this.handleBonusRounds();
            }
        };
        BonusRoundManager.prototype.getBonusOfferTracking = function () {
            if (!this.bonusOfferTracking || this.bonusOfferTracking.id !== this.bonusInfo.id) {
                if (this.bonusOfferTracking) {
                    if (this.isUsingBonus) {
                        this.clearBonusBetRestrictions();
                    }
                    this.isUsingBonus = false;
                    this.bonusDeferred = false;
                    this.gameWrapper.dispatchEvent('bonus-rounds-disabled');
                    this.updateBonusToggleButton();
                }
                this.bonusOfferTracking = { id: this.bonusInfo.id, notified: false, barVisible: false };
            }
            return this.bonusOfferTracking;
        };
        BonusRoundManager.prototype.clearBonusBetRestrictions = function () {
            this.gameWrapper.setBetStops({ stakes: [], lines: [], denominations: [], subgames: [] });
            this.gameWrapper.autoplay.setEnabled(true);
        };
        BonusRoundManager.prototype.computeBonusLimits = function (bonusRoundsAdapter) {
            var rawBetLevel = this.bonusInfo.betLevel;
            if (!rawBetLevel) {
                console.log('gromada-gamewrpper: Bet level does not exists!');
                return null;
            }
            var betLevel = Array.isArray(rawBetLevel) ? rawBetLevel[0] : rawBetLevel;
            var totalBets = calculateBetLevel(rawBetLevel, this.currentTotalBetDivider);
            var limits = isBetAvailable(bonusRoundsAdapter, totalBets) ? getLimitsForBet(bonusRoundsAdapter, totalBets) : null;
            if (!limits) {
                console.error('gromada-gamewrapper: Invalid or unavailable bet level for bonus rounds: ', totalBets);
                this.gameWrapper.dispatchEvent('bonus-rounds-disabled');
                this.isUsingBonus = false;
                this.getBonusOfferTracking().barVisible = false;
                return null;
            }
            return { betLevel: betLevel, limits: limits };
        };
        BonusRoundManager.prototype.handleBonusRounds = function () {
            var _this = this;
            try {
                var bonusRoundsAdapter = this.resolveBonusRoundsAdapter();
                var bonusLimits = this.computeBonusLimits(bonusRoundsAdapter);
                if (!bonusLimits)
                    return;
                this.betLevel = bonusLimits.betLevel;
                this.availableLimits = bonusLimits.limits;
                var tracking = this.getBonusOfferTracking();
                if (tracking.notified) {
                    if (this.isUsingBonus) {
                        this.activateBonus();
                    }
                    else if (this.bonusDeferred) {
                        this.gameWrapper.ui.ready.then(function () { return _this.updateBonusToggleButton(); });
                    }
                    return;
                }
                tracking.notified = true;
                if (!this.config.enableBonusDeferral) {
                    this.activateBonus();
                    this.gameWrapper.ui.ready.then(function () { return _this.gameWrapper.ui.messageDialog.showBonusOffer(_this.bonusInfo, false); });
                    return;
                }
                var offerId_1 = this.bonusInfo.id;
                this.gameWrapper.pauseGame();
                this.gameWrapper.ui.ready.then(function () {
                    _this.gameWrapper.ui.messageDialog.showBonusOffer(_this.bonusInfo, true).then(function (accepted) {
                        var _a;
                        _this.gameWrapper.resumeGame();
                        if (((_a = _this.bonusInfo) === null || _a === void 0 ? void 0 : _a.id) !== offerId_1)
                            return;
                        if (accepted) {
                            _this.activateBonus();
                        }
                        else {
                            _this.declineBonusUsage();
                        }
                    });
                });
            }
            catch (error) {
                console.error('gromada-gamewrapper: unable to initialize bonus offer: ', error);
                throw error;
            }
        };
        BonusRoundManager.prototype.activateBonus = function () {
            var _this = this;
            if (!this.unsettledTicketExists) {
                this.startUsingBonus();
            }
            else {
                this.gameWrapper.rgs.once('ticket-settled', function () {
                    _this.unsettledTicketExists = false;
                    if (!_this.bonusInfo)
                        return;
                    _this.startUsingBonus();
                });
            }
        };
        BonusRoundManager.prototype.startUsingBonus = function () {
            var _this = this;
            this.isUsingBonus = true;
            this.bonusDeferred = false;
            this.gameWrapper.setBet(this.betLevel);
            this.gameWrapper.setBetStops(this.availableLimits);
            this.gameWrapper.autoplay.setEnabled(false);
            this.gameWrapper.ui.ready.then(function () {
                var _a;
                var tracking = _this.getBonusOfferTracking();
                if (!tracking.barVisible) {
                    _this.gameWrapper.dispatchEvent('bonus-rounds-enabled', (_a = _this.bonusInfo.remainingRounds) !== null && _a !== void 0 ? _a : 0);
                    tracking.barVisible = true;
                }
                else if (_this.bonusInfo.remainingRounds) {
                    _this.gameWrapper.dispatchEvent('bonus-rounds-updated', _this.bonusInfo.remainingRounds);
                }
                _this.updateBonusToggleButton();
            });
        };
        BonusRoundManager.prototype.declineBonusUsage = function () {
            var _this = this;
            this.isUsingBonus = false;
            this.bonusDeferred = true;
            this.gameWrapper.ui.ready.then(function () { return _this.updateBonusToggleButton(); });
        };
        BonusRoundManager.prototype.updateBonusToggleButton = function () {
            if (!this.config.enableBonusDeferral)
                return;
            var hasValidBonus = !!this.bonusInfo && !!this.bonusInfo.remainingRounds;
            var state = 'hidden';
            if (hasValidBonus && (this.isUsingBonus || this.bonusDeferred)) {
                state = this.isUsingBonus ? 'active' : 'deferred';
            }
            this.gameWrapper.dispatchEvent('bonus-toggle-state', state);
        };
        BonusRoundManager.prototype.finishBonusOffer = function (reason) {
            var _this = this;
            this.clearBonusBetRestrictions();
            var messageTitle;
            var messageText;
            switch (reason) {
                case 'bonusSpent':
                    messageTitle = Strings.OFFER_SPENT;
                    break;
                case 'bonusUnavailable':
                default:
                    messageTitle = Strings.OFFER_UNAVAILABLE;
                    break;
            }
            this.gameWrapper.ui.ready.then(function () {
                _this.gameWrapper.dispatchEvent('bonus-rounds-disabled');
                _this.gameWrapper.ui.showMessage({
                    title: messageTitle,
                    text: messageText
                });
            });
            this.isUsingBonus = false;
            this.bonusDeferred = false;
            this.bonusOfferTracking = null;
            this.bonusInfo = null;
            this.bonusRoundsRgs = null;
            this.updateBonusToggleButton();
        };
        BonusRoundManager.prototype.setEventHandlers = function () {
            var _this = this;
            this.gameWrapper.rgs.on('account-data-received', function (_a) {
                var _b;
                var detail = _a.detail;
                console.log('gromada-gamewrapper: \'account-data-received\' event', { data: detail });
                var bonus = (_b = detail === null || detail === void 0 ? void 0 : detail.walletData) === null || _b === void 0 ? void 0 : _b.bonus;
                if (!(bonus === null || bonus === void 0 ? void 0 : bonus.length)) {
                    console.log("gromada-gamewrapper: Regular round - No active bonus.");
                    return;
                }
                _this.initializeRgsConfigParams().then(function () { return _this.findActiveBonus(bonus); });
            });
            this.gameWrapper.on('bonus-toggle-click', function () { return _this.toggleBonusUsage(); });
            this.gameWrapper.rgs.once('game-data-received', function (_a) {
                var detail = _a.detail;
                if (_this.gameWrapper.rgs.is(SimpleFlowAdapter) && detail.game.nextAction !== 'spin') {
                    _this.setUnsettledTicketExists(true);
                }
            });
            this.gameWrapper.rgs.once('unsettled-ticket-received', function () {
                _this.setUnsettledTicketExists(true);
            });
            this.gameWrapper.rgs.on('spin-started', function () {
                _this.setUnsettledTicketExists(true);
                if (_this.isUsingBonus) {
                    var allowedStakes_1 = Array.isArray(_this.bonusInfo.betLevel) ? _this.bonusInfo.betLevel : [_this.bonusInfo.betLevel];
                    var currentStake = _this.gameWrapper.getBet();
                    if (!allowedStakes_1.includes(currentStake)) {
                        _this.gameWrapper.ui.ready.then(function () {
                            var messageTitle = Strings.BONUS_INVALID_BET_LEVEL;
                            var messageText = "".concat(Strings.BONUS_ROUNDS_AVAILABLE, " ").concat(allowedStakes_1.join(", "));
                            _this.gameWrapper.ui.showMessage({
                                title: messageTitle,
                                text: messageText
                            });
                        });
                    }
                }
            });
            this.gameWrapper.on('game-end', function () {
                _this.setUnsettledTicketExists(false);
                if (_this.isUsingBonus) {
                    if (!_this.bonusInfo || !_this.bonusInfo.remainingRounds) {
                        _this.finishBonusOffer('bonusSpent');
                    }
                }
            });
            this.gameWrapper.rgs.on('error', function (_a) {
                var _b;
                var detail = _a.detail;
                var reason = detail;
                if (_this.isUsingBonus) {
                    if (reason.error === 'remoteError' && ((_b = reason.errorDetails) === null || _b === void 0 ? void 0 : _b.details) === 'insufficientFunds') {
                        _this.finishBonusOffer('bonusUnavailable');
                    }
                }
            });
        };
        return BonusRoundManager;
    }());

    var __extends$b = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$5 = (undefined && undefined.__assign) || function () {
        __assign$5 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$5.apply(this, arguments);
    };
    var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var tryCount$1 = 0;
    var ScratchAdapter = (function (_super) {
        __extends$b(ScratchAdapter, _super);
        function ScratchAdapter(config) {
            var _this = _super.call(this, config, ScratchcardRgs) || this;
            _this.plugins = {
                'get-game': [],
                'get-unsettled-ticket': [],
                'purchase': [handleWalletMessages('postpone', 'purchase')],
                'settle': [handleWalletMessages('postpone')],
                'get-account': [handleWalletMessages('postponeIfInRound')],
                'get-ticket': [],
                'get-gamble': [],
                'gamble': [],
                'get-jackpots': [],
                'get-all-jackpots': [],
                'get-jackpot-wins': [],
                'get-jackpot-url': [],
                'get-bonus-offer': [],
                'send-custom-request': [],
            };
            _this.types.push('fixed-odds');
            return _this;
        }
        ScratchAdapter.prototype.applyGameData = function (data) {
            var _a, _b, _c, _d;
            this.stakeList = data.ticketPrice;
            this.defaultStake = this.stakeList[this.gameConfig.initialStakeIndex || 0];
            this.hasGamble = (_b = (_a = this.gameConfig.gamble) === null || _a === void 0 ? void 0 : _a.hasGamble) !== null && _b !== void 0 ? _b : true;
            this.gambleOptions = (_d = (_c = data.gambleFeature) === null || _c === void 0 ? void 0 : _c.prizeTable) !== null && _d !== void 0 ? _d : [];
        };
        ScratchAdapter.prototype.initGame = function () {
            return this.getGame();
        };
        ScratchAdapter.prototype.purchase = function (bet) {
            return this.purchaseTicket(bet);
        };
        ScratchAdapter.prototype.settle = function () {
            return this.settleTicket();
        };
        ScratchAdapter.prototype.getToken = function (tokenUrl, callback) {
            if (this.rgs.getToken) {
                return this.rgs.getToken(tokenUrl, callback);
            }
        };
        ScratchAdapter.prototype.getGame = function () {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            return this.rgs.getGame()
                .then(function (data) {
                var _a;
                _this.applyGameData(data);
                (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                return data;
            })
                .then(function (data) { return _this.execPlugins('get-game', data); })
                .then(function (data) {
                _this.dispatchEvent('game-data-received', data);
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
        };
        ScratchAdapter.prototype.purchaseTicket = function (bet) {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.realityCheck) {
                var reason = { error: 'realityCheck' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return getMessagesHandled()
                .then(function () {
                if (tryCount$1 === 0) {
                    _this.dispatchEvent('spin-started');
                    _this.createFinishPromise();
                    _this.dispatchEvent('close-promise-created', _this.resolveFinish);
                }
                tryCount$1++;
            })
                .then(function () { return _this.rgs.purchaseTicket(bet); })
                .catch(function (reason) { return _this.tryRetryPurchase(reason, tryCount$1, [bet]); })
                .then(function (data) {
                tryCount$1 = 0;
                _this.ticketId = data.ticketId;
                return data;
            })
                .then(function (data) { return _this.execPlugins('purchase', data); })
                .then(function (data) {
                if (!WalletMessage.exists(data, _this.getJwt())) {
                    _this.resolveFinish();
                }
                _this.dispatchEvent('ticket-purchased', data);
                return data;
            })
                .catch(function (reason) {
                tryCount$1 = 0;
                return _this.handleError(reason, reason.error !== 'insufficientFunds');
            });
        };
        ScratchAdapter.prototype.settleTicket = function (ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            var rgsSettlePromise = this.rgs.settleTicket(ticketId)
                .then(function (data) {
                _this.ticketId = null;
                return data;
            })
                .then(function (data) { return __awaiter$4(_this, void 0, void 0, function () {
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.rgs.setCachedTicketData(ticketId)];
                        case 1:
                            _a.sent();
                            return [2, data];
                    }
                });
            }); })
                .then(function (data) { return _this.execPlugins('settle', data); })
                .then(function (data) {
                _this.dispatchEvent('ticket-settled', data);
                return data;
            })
                .then(function (data) {
                if (_this.realityCheck) {
                    RgsAdapter.blockRequests = true;
                    RgsAdapter.blockReason = 'realityCheck';
                    _this.dispatchError({ error: 'realityCheck' });
                }
                return data;
            })
                .catch(function (reason) {
                return _this.handleError(reason);
            });
            var finishGameRoundPromise = Promise.all([rgsSettlePromise, this.controlledFinishPromise]);
            finishGameRoundPromise.then(function () { return startMessageQueueExecution(_this); });
            return finishGameRoundPromise.then(function (result) { return result[0]; });
        };
        return ScratchAdapter;
    }(RgsAdapter));
    var ScratchcardRgs = (function (_super) {
        __extends$b(ScratchcardRgs, _super);
        function ScratchcardRgs(config) {
            return _super.call(this, __assign$5(__assign$5({}, config), { gameService: 'GameService' })) || this;
        }
        ScratchcardRgs.prototype.getToken = function (tokenUrl, callback) {
            var _this = this;
            if (this.jwt) {
                var payload = JSON.parse(atob(this.jwt.split('.')[1]));
                if (payload.exp > Date.now() * 0.001) {
                    callback();
                    return;
                }
            }
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (readyStateEvent) {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var jwt_1 = xhr.getResponseHeader('jwt');
                    if (!jwt_1) {
                        var url = xhr.responseURL;
                        url && url.substring(url.indexOf('?'))
                            .split('&')
                            .forEach(function (item) {
                            if (item.indexOf('jwt') > -1) {
                                jwt_1 = item.split('=')[1];
                            }
                        });
                    }
                    _this.jwt = jwt_1 || _this.jwt;
                    callback();
                }
            };
            xhr.open('GET', tokenUrl, true);
            xhr.send(null);
        };
        ScratchcardRgs.prototype.getGame = function () {
            return this.invoke(this.gameService, 'GetGame', [this.gameId]).then(this.parseData);
        };
        ScratchcardRgs.prototype.getUnsettledTicket = function () {
            return this.invoke(this.ticketService, 'GetUnsettledTicket', [this.gameId]).then(this.parseData);
        };
        ScratchcardRgs.prototype.purchaseTicket = function (bet) {
            var methodName = this.isUsingBonusFunds() ? 'PurchaseUsingBonus' : 'PurchaseTicket';
            return this.invoke(this.ticketService, methodName, [this.gameId, bet]).then(this.parseData);
        };
        ScratchcardRgs.prototype.settleTicket = function (ticketId) {
            return this.invoke(this.ticketService, 'SettleTicket', [ticketId]).then(this.parseData);
        };
        return ScratchcardRgs;
    }(Rgs));

    var __extends$a = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$4 = (undefined && undefined.__assign) || function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
    };
    var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var DefaultIntegrationLogic = (function (_super) {
        __extends$a(DefaultIntegrationLogic, _super);
        function DefaultIntegrationLogic() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DefaultIntegrationLogic.prototype.init = function (config) {
            this.config = config;
            this.bonusRoundManager = this.createBonusRoundManager();
            this.setEventHandlers();
            this.configPrepared(this.config);
        };
        DefaultIntegrationLogic.prototype.createBonusRoundManager = function () {
            return new BonusRoundManager(this.gameWrapper, this.config, this.wrapperParams);
        };
        DefaultIntegrationLogic.prototype.applyCurrencyLocaleOverride = function (currencyCode) {
            var currency = this.gameWrapper.currency;
            if (currencyCode) {
                this.locale = this.wrapperParams.language;
                if (this.gameWrapper.currencyConfig && currencyCode in this.gameWrapper.currencyConfig) {
                    this.locale = this.gameWrapper.currencyConfig[currencyCode].locale || this.locale;
                }
                currency = {
                    code: currencyCode,
                    locale: this.locale
                };
            }
            return currency;
        };
        DefaultIntegrationLogic.prototype.formatCurrency = function (value, trimFraction, currencyCode) {
            var currency = this.applyCurrencyLocaleOverride(currencyCode);
            var formatCurrencyOptions = __assign$4(__assign$4({}, currency), { trimFraction: trimFraction, display: this.config.currencyDisplay, isSocialCasinoMode: this.config.isSocialCasinoMode, useCompactNotation: this.config.useCompactNotation });
            return formatCurrency$1(value, formatCurrencyOptions);
        };
        DefaultIntegrationLogic.prototype.formatNumber = function (value, trimFraction) {
            var locale = this.wrapperParams.language;
            return formatNumber$1(value, locale, trimFraction);
        };
        DefaultIntegrationLogic.prototype.updateLoadingProgress = function (progress) { };
        DefaultIntegrationLogic.prototype.muteSound = function (mute) { };
        DefaultIntegrationLogic.prototype.showInfoMessage = function (scenario, message) {
            return __awaiter$3(this, void 0, void 0, function () {
                return __generator$3(this, function (_a) {
                    throw new Error('Method not implemented.');
                });
            });
        };
        DefaultIntegrationLogic.prototype.handleRgsError = function (reason) {
            var _this = this;
            var _a;
            var type = reason.error;
            if (type === 'sessionTimeout') {
                this.gameWrapper.pauseGame();
                this.gameWrapper.state = 'error';
                this.gameWrapper.ui.messageDialog.showGameError(type, { title: Strings.ERROR_SESSION_TIMEOUT }, false)
                    .then(function () { return _this.gameWrapper.resumeGame(); });
            }
            else if (type === 'insufficientFunds') {
                this.gameWrapper.pauseGame();
                this.gameWrapper.state = 'error';
                var depositUrl = this.wrapperParams.depositUrl || this.wrapperParams.lobbyUrl || '';
                this.gameWrapper.ui.messageDialog.showInsufficientFunds(depositUrl)
                    .then(function () { return _this.gameWrapper.resumeGame(); });
            }
            else if (type === 'unsettledTicketExists') {
                this.gameWrapper.state = 'error';
                this.gameWrapper.ui.messageDialog.showTransactionFailed();
            }
            else if (type === 'requestBlocked') {
                return;
            }
            else if (type === 'realityCheck') {
                var realityCheck_1 = this.gameWrapper.realityCheck;
                this.gameWrapper.pauseGame();
                this.gameWrapper.ui.messageDialog.showRealityCheck(realityCheck_1.getUrl(), realityCheck_1.getMessage())
                    .then(function () {
                    realityCheck_1.resolve();
                    _this.gameWrapper.rgs.setRealityCheck(false);
                    _this.gameWrapper.resumeGame();
                });
            }
            else if (type === 'jackpotSubscriptionFailed') {
                this.gameWrapper.pauseGame();
                this.gameWrapper.state = 'error';
                this.gameWrapper.ui.messageDialog.showGameError(type, { title: Strings.DEFAULT_ERROR_MSG, text: Strings.JACKPOT_SUBSCRIPTION_FAILED }, true)
                    .then(function () { return _this.gameWrapper.resumeGame(); });
            }
            else {
                if (this.bonusRoundManager.isUsingBonus) {
                    if (type === 'remoteError' && ((_a = reason.errorDetails) === null || _a === void 0 ? void 0 : _a.details) === 'insufficientFunds')
                        return;
                }
                this.gameWrapper.pauseGame();
                this.gameWrapper.state = 'error';
                this.gameWrapper.ui.messageDialog.showGameError(type, { title: Strings.DEFAULT_ERROR_MSG }, true)
                    .then(function () { return _this.gameWrapper.resumeGame(); });
            }
        };
        DefaultIntegrationLogic.prototype.handleReplayStarted = function () {
            var _this = this;
            if (this.gameWrapper.ui) {
                this.gameWrapper.pauseGame();
                return this.gameWrapper.ui.messageDialog.showReplayStarted().then(function () { return _this.gameWrapper.resumeGame(); });
            }
        };
        DefaultIntegrationLogic.prototype.handleReplayFinished = function () {
            var _this = this;
            if (this.gameWrapper.ui) {
                this.gameWrapper.ui.messageDialog.showReplayFinished().then(function () {
                    _this.gameWrapper.updateGameMode();
                    _this.gameWrapper.ui.updateMode();
                });
            }
            else {
                this.gameWrapper.updateGameMode();
            }
        };
        DefaultIntegrationLogic.prototype.registerPlugins = function () {
            var rgsAdapter = this.gameWrapper.rgs;
            if (rgsAdapter.is(ScratchAdapter)) {
                rgsAdapter.addPlugin('purchase', this.handleContextBalanceUpdate.bind(this));
                rgsAdapter.addPlugin('settle', this.handleContextBalanceUpdate.bind(this));
            }
            if (this.bonusRoundManager) {
                var rgs = this.gameWrapper.rgs.rgs;
                this.bonusRoundManager.registerRequestPlugin(rgs);
            }
            var autoplay = this.gameWrapper.autoplay;
            autoplay.addPlugin('unexpected-error-on-spin', this.handleErrorInAutoplay.bind(this));
        };
        DefaultIntegrationLogic.prototype.handleContextBalanceUpdate = function (rgs, data) {
            var context = data.context;
            if (context.data) {
                var _a = context.data, balance = _a.currentBalance, currency = _a.currency;
                if (typeof balance === 'number') {
                    rgs.dispatchEvent('account-data-received', { balance: balance, currency: currency });
                }
            }
            return Promise.resolve();
        };
        DefaultIntegrationLogic.prototype.handleErrorInAutoplay = function (autoplay, data) {
            autoplay.stop('spin-error');
            return Promise.resolve();
        };
        DefaultIntegrationLogic.prototype.setEventHandlers = function () {
            var _this = this;
            console.log('gromada-gamewrapper: setEventHandlers()');
            this.gameWrapper.initialized.then(function () {
                _this.registerPlugins();
                _this.bonusRoundManager.setEventHandlers();
            });
        };
        return DefaultIntegrationLogic;
    }(IntegrationLogic));

    var Overlay = (function () {
        function Overlay() {
            this.activeElements = [];
            this.element = createElement('div', 'gw-overlay', ['hidden']);
        }
        Overlay.prototype.append = function () {
            var _a;
            var elements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                elements[_i] = arguments[_i];
            }
            (_a = this.element).append.apply(_a, elements);
            for (var _b = 0, elements_1 = elements; _b < elements_1.length; _b++) {
                var element = elements_1[_b];
                element.addEventListener('gw-show', this.show.bind(this, element));
                element.addEventListener('gw-hide', this.hide.bind(this, element));
            }
        };
        Overlay.prototype.show = function (child) {
            if (child) {
                if (this.activeElements.indexOf(child) === -1) {
                    this.activeElements.push(child);
                }
                child.classList.remove('hidden');
            }
            this.element.classList.remove('hidden');
        };
        Overlay.prototype.hide = function (child) {
            if (child) {
                var index = this.activeElements.indexOf(child);
                if (index > -1) {
                    this.activeElements.splice(index, 1);
                }
                child.classList.add('hidden');
                if (this.activeElements.length === 0) {
                    this.element.classList.add('hidden');
                }
            }
            else {
                this.element.classList.add('hidden');
            }
        };
        Overlay.prototype.switch = function (child) {
            if (this.activeElements.indexOf(child) > -1) {
                this.hide(child);
            }
            else {
                this.show(child);
            }
        };
        return Overlay;
    }());

    var TextUtil = (function () {
        function TextUtil() {
            this.updateables = new Map();
        }
        TextUtil.prototype.text = function (content) {
            if (typeof content === 'string') {
                return document.createTextNode(content);
            }
            var node = document.createTextNode(content());
            this.updateables.set(node, content);
            return node;
        };
        TextUtil.prototype.update = function (element) {
            var _this = this;
            element.childNodes.forEach(function (child) {
                if (child.nodeType === Node.TEXT_NODE) {
                    var content = _this.updateables.get(child);
                    if (content) {
                        child.nodeValue = content();
                    }
                }
            });
        };
        TextUtil.prototype.updateStrings = function () {
            this.updateables.forEach(function (content, element) {
                element.nodeValue = content();
            });
        };
        return TextUtil;
    }());

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global_1 =
      // eslint-disable-next-line no-undef
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      check(typeof self == 'object' && self) ||
      check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func
      (function () { return this; })() || Function('return this')();

    var fails = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails(function () {
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });

    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor$2 && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    var f$5 = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V);
      return !!descriptor && descriptor.enumerable;
    } : nativePropertyIsEnumerable;

    var objectPropertyIsEnumerable = {
    	f: f$5
    };

    var createPropertyDescriptor = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var toString = {}.toString;

    var classofRaw = function (it) {
      return toString.call(it).slice(8, -1);
    };

    var split = ''.split;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings



    var toIndexedObject = function (it) {
      return indexedObject(requireObjectCoercible(it));
    };

    var isObject = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var toPrimitive = function (input, PREFERRED_STRING) {
      if (!isObject(input)) return input;
      var fn, val;
      if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
      if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
      if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var hasOwnProperty = {}.hasOwnProperty;

    var has$1 = function (it, key) {
      return hasOwnProperty.call(it, key);
    };

    var document$3 = global_1.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document$3) && isObject(document$3.createElement);

    var documentCreateElement = function (it) {
      return EXISTS ? document$3.createElement(it) : {};
    };

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !descriptors && !fails(function () {
      return Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    var f$4 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPrimitive(P, true);
      if (ie8DomDefine) try {
        return nativeGetOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
      if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
    };

    var objectGetOwnPropertyDescriptor = {
    	f: f$4
    };

    var anObject = function (it) {
      if (!isObject(it)) {
        throw TypeError(String(it) + ' is not an object');
      } return it;
    };

    var nativeDefineProperty = Object.defineProperty;

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    var f$3 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (ie8DomDefine) try {
        return nativeDefineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var objectDefineProperty = {
    	f: f$3
    };

    var createNonEnumerableProperty = descriptors ? function (object, key, value) {
      return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var setGlobal = function (key, value) {
      try {
        createNonEnumerableProperty(global_1, key, value);
      } catch (error) {
        global_1[key] = value;
      } return value;
    };

    var SHARED = '__core-js_shared__';
    var store$1 = global_1[SHARED] || setGlobal(SHARED, {});

    var sharedStore = store$1;

    var functionToString = Function.toString;

    // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
    if (typeof sharedStore.inspectSource != 'function') {
      sharedStore.inspectSource = function (it) {
        return functionToString.call(it);
      };
    }

    var inspectSource = sharedStore.inspectSource;

    var WeakMap$1 = global_1.WeakMap;

    var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

    var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.8.3',
      mode: 'global',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });
    });

    var id = 0;
    var postfix = Math.random();

    var uid = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
    };

    var keys = shared('keys');

    var sharedKey = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    var hiddenKeys$1 = {};

    var WeakMap = global_1.WeakMap;
    var set$1, get, has;

    var enforce = function (it) {
      return has(it) ? get(it) : set$1(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (nativeWeakMap) {
      var store = sharedStore.state || (sharedStore.state = new WeakMap());
      var wmget = store.get;
      var wmhas = store.has;
      var wmset = store.set;
      set$1 = function (it, metadata) {
        metadata.facade = it;
        wmset.call(store, it, metadata);
        return metadata;
      };
      get = function (it) {
        return wmget.call(store, it) || {};
      };
      has = function (it) {
        return wmhas.call(store, it);
      };
    } else {
      var STATE = sharedKey('state');
      hiddenKeys$1[STATE] = true;
      set$1 = function (it, metadata) {
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return has$1(it, STATE) ? it[STATE] : {};
      };
      has = function (it) {
        return has$1(it, STATE);
      };
    }

    var internalState = {
      set: set$1,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };

    var redefine = createCommonjsModule(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(String).split('String');

    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var state;
      if (typeof value == 'function') {
        if (typeof key == 'string' && !has$1(value, 'name')) {
          createNonEnumerableProperty(value, 'name', key);
        }
        state = enforceInternalState(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
        }
      }
      if (O === global_1) {
        if (simple) O[key] = value;
        else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
    });
    });

    var path = global_1;

    var aFunction$1 = function (variable) {
      return typeof variable == 'function' ? variable : undefined;
    };

    var getBuiltIn = function (namespace, method) {
      return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
        : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
    };

    var ceil = Math.ceil;
    var floor = Math.floor;

    // `ToInteger` abstract operation
    // https://tc39.es/ecma262/#sec-tointeger
    var toInteger = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };

    var min$1 = Math.min;

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    var toLength = function (argument) {
      return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var max = Math.max;
    var min = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    var toAbsoluteIndex = function (index, length) {
      var integer = toInteger(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod$2 = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };

    var arrayIncludes = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod$2(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod$2(false)
    };

    var indexOf = arrayIncludes.indexOf;


    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (has$1(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    var hiddenKeys = enumBugKeys.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    var f$2 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys);
    };

    var objectGetOwnPropertyNames = {
    	f: f$2
    };

    var f$1 = Object.getOwnPropertySymbols;

    var objectGetOwnPropertySymbols = {
    	f: f$1
    };

    // all object keys, includes non-enumerable and symbols
    var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var copyConstructorProperties = function (target, source) {
      var keys = ownKeys(source);
      var defineProperty = objectDefineProperty.f;
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var replacement = /#|\.prototype\./;

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : typeof detection == 'function' ? fails(detection)
        : !!detection;
    };

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';

    var isForced_1 = isForced;

    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






    /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global_1;
      } else if (STATIC) {
        target = global_1[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global_1[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty(sourceProperty, 'sham', true);
        }
        // extend global
        redefine(target, key, sourceProperty, options);
      }
    };

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject = function (argument) {
      return Object(requireObjectCoercible(argument));
    };

    var correctPrototypeGetter = !fails(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var IE_PROTO$1 = sharedKey('IE_PROTO');
    var ObjectPrototype = Object.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
      O = toObject(O);
      if (has$1(O, IE_PROTO$1)) return O[IE_PROTO$1];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectPrototype : null;
    };

    var aPossiblePrototype = function (it) {
      if (!isObject(it) && it !== null) {
        throw TypeError("Can't set " + String(it) + ' as a prototype');
      } return it;
    };

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;
      try {
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter.call(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    var objectKeys = Object.keys || function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
      return O;
    };

    var html = getBuiltIn('document', 'documentElement');

    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO = sharedKey('IE_PROTO');

    var EmptyConstructor = function () { /* empty */ };

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''));
      activeXDocument.close();
      var temp = activeXDocument.parentWindow.Object;
      activeXDocument = null; // avoid memory leak
      return temp;
    };

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe');
      var JS = 'java' + SCRIPT + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    };

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument;
    var NullProtoObject = function () {
      try {
        /* global ActiveXObject */
        activeXDocument = document.domain && new ActiveXObject('htmlfile');
      } catch (error) { /* ignore */ }
      NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
      var length = enumBugKeys.length;
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return NullProtoObject();
    };

    hiddenKeys$1[IE_PROTO] = true;

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : objectDefineProperties(result, Properties);
    };

    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
      // Chrome 38 Symbol has incorrect toString conversion
      // eslint-disable-next-line no-undef
      return !String(Symbol());
    });

    var useSymbolAsUid = nativeSymbol
      // eslint-disable-next-line no-undef
      && !Symbol.sham
      // eslint-disable-next-line no-undef
      && typeof Symbol.iterator == 'symbol';

    var WellKnownSymbolsStore = shared('wks');
    var Symbol$1 = global_1.Symbol;
    var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

    var wellKnownSymbol = function (name) {
      if (!has$1(WellKnownSymbolsStore, name)) {
        if (nativeSymbol && has$1(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
        else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      } return WellKnownSymbolsStore[name];
    };

    var iterators = {};

    var ITERATOR$5 = wellKnownSymbol('iterator');
    var ArrayPrototype$1 = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod = function (it) {
      return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
    };

    var aFunction = function (it) {
      if (typeof it != 'function') {
        throw TypeError(String(it) + ' is not a function');
      } return it;
    };

    // optional / simple context binding
    var functionBindContext = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 0: return function () {
          return fn.call(that);
        };
        case 1: return function (a) {
          return fn.call(that, a);
        };
        case 2: return function (a, b) {
          return fn.call(that, a, b);
        };
        case 3: return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
      }
      return function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
    var test = {};

    test[TO_STRING_TAG$3] = 'z';

    var toStringTagSupport = String(test) === '[object z]';

    var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (error) { /* empty */ }
    };

    // getting tag from ES6+ `Object.prototype.toString`
    var classof = toStringTagSupport ? classofRaw : function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
    };

    var ITERATOR$4 = wellKnownSymbol('iterator');

    var getIteratorMethod = function (it) {
      if (it != undefined) return it[ITERATOR$4]
        || it['@@iterator']
        || iterators[classof(it)];
    };

    var iteratorClose = function (iterator) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) {
        return anObject(returnMethod.call(iterator)).value;
      }
    };

    var Result = function (stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };

    var iterate = function (iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
      var iterator, iterFn, index, length, result, next, step;

      var stop = function (condition) {
        if (iterator) iteratorClose(iterator);
        return new Result(true, condition);
      };

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        } return INTERRUPTED ? fn(value, stop) : fn(value);
      };

      if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = toLength(iterable.length); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && result instanceof Result) return result;
          } return new Result(false);
        }
        iterator = iterFn.call(iterable);
      }

      next = iterator.next;
      while (!(step = next.call(iterator)).done) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose(iterator);
          throw error;
        }
        if (typeof result == 'object' && result && result instanceof Result) return result;
      } return new Result(false);
    };

    var $AggregateError = function AggregateError(errors, message) {
      var that = this;
      if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
      if (objectSetPrototypeOf) {
        // eslint-disable-next-line unicorn/error-message
        that = objectSetPrototypeOf(new Error(undefined), objectGetPrototypeOf(that));
      }
      if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
      var errorsArray = [];
      iterate(errors, errorsArray.push, { that: errorsArray });
      createNonEnumerableProperty(that, 'errors', errorsArray);
      return that;
    };

    $AggregateError.prototype = objectCreate(Error.prototype, {
      constructor: createPropertyDescriptor(5, $AggregateError),
      message: createPropertyDescriptor(5, ''),
      name: createPropertyDescriptor(5, 'AggregateError')
    });

    // `AggregateError` constructor
    // https://tc39.es/ecma262/#sec-aggregate-error-constructor
    _export({ global: true }, {
      AggregateError: $AggregateError
    });

    // `Object.prototype.toString` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    var objectToString = toStringTagSupport ? {}.toString : function toString() {
      return '[object ' + classof(this) + ']';
    };

    // `Object.prototype.toString` method
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    if (!toStringTagSupport) {
      redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
    }

    var nativePromiseConstructor = global_1.Promise;

    var redefineAll = function (target, src, options) {
      for (var key in src) redefine(target, key, src[key], options);
      return target;
    };

    var defineProperty$3 = objectDefineProperty.f;



    var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

    var setToStringTag = function (it, TAG, STATIC) {
      if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
        defineProperty$3(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
      }
    };

    var SPECIES$3 = wellKnownSymbol('species');

    var setSpecies = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
      var defineProperty = objectDefineProperty.f;

      if (descriptors && Constructor && !Constructor[SPECIES$3]) {
        defineProperty(Constructor, SPECIES$3, {
          configurable: true,
          get: function () { return this; }
        });
      }
    };

    var anInstance = function (it, Constructor, name) {
      if (!(it instanceof Constructor)) {
        throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
      } return it;
    };

    var ITERATOR$3 = wellKnownSymbol('iterator');
    var SAFE_CLOSING = false;

    try {
      var called = 0;
      var iteratorWithReturn = {
        next: function () {
          return { done: !!called++ };
        },
        'return': function () {
          SAFE_CLOSING = true;
        }
      };
      iteratorWithReturn[ITERATOR$3] = function () {
        return this;
      };
      // eslint-disable-next-line no-throw-literal
      Array.from(iteratorWithReturn, function () { throw 2; });
    } catch (error) { /* empty */ }

    var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
      var ITERATION_SUPPORT = false;
      try {
        var object = {};
        object[ITERATOR$3] = function () {
          return {
            next: function () {
              return { done: ITERATION_SUPPORT = true };
            }
          };
        };
        exec(object);
      } catch (error) { /* empty */ }
      return ITERATION_SUPPORT;
    };

    var SPECIES$2 = wellKnownSymbol('species');

    // `SpeciesConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-speciesconstructor
    var speciesConstructor = function (O, defaultConstructor) {
      var C = anObject(O).constructor;
      var S;
      return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction(S);
    };

    var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

    var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

    var engineIsNode = classofRaw(global_1.process) == 'process';

    var location = global_1.location;
    var set = global_1.setImmediate;
    var clear = global_1.clearImmediate;
    var process$3 = global_1.process;
    var MessageChannel = global_1.MessageChannel;
    var Dispatch = global_1.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var defer, channel, port;

    var run = function (id) {
      // eslint-disable-next-line no-prototype-builtins
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };

    var runner = function (id) {
      return function () {
        run(id);
      };
    };

    var listener = function (event) {
      run(event.data);
    };

    var post = function (id) {
      // old engines have not location.origin
      global_1.postMessage(id + '', location.protocol + '//' + location.host);
    };

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set || !clear) {
      set = function setImmediate(fn) {
        var args = [];
        var i = 1;
        while (arguments.length > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          // eslint-disable-next-line no-new-func
          (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (engineIsNode) {
        defer = function (id) {
          process$3.nextTick(runner(id));
        };
      // Sphere (JS game engine) Dispatch API
      } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
          Dispatch.now(runner(id));
        };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
      } else if (MessageChannel && !engineIsIos) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = functionBindContext(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (
        global_1.addEventListener &&
        typeof postMessage == 'function' &&
        !global_1.importScripts &&
        location && location.protocol !== 'file:' &&
        !fails(post.bind(null, '.'))
      ) {
        defer = post;
        global_1.addEventListener('message', listener, false);
      // IE8-
      } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
        defer = function (id) {
          html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run(id);
          };
        };
      // Rest old browsers
      } else {
        defer = function (id) {
          setTimeout(runner(id), 0);
        };
      }
    }

    var task$1 = {
      set: set,
      clear: clear
    };

    var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var macrotask = task$1.set;




    var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
    var document$2 = global_1.document;
    var process$2 = global_1.process;
    var Promise$1 = global_1.Promise;
    // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
    var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global_1, 'queueMicrotask');
    var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

    var flush, head, last, notify$1, toggle, node, promise, then;

    // modern engines have queueMicrotask method
    if (!queueMicrotask) {
      flush = function () {
        var parent, fn;
        if (engineIsNode && (parent = process$2.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (error) {
            if (head) notify$1();
            else last = undefined;
            throw error;
          }
        } last = undefined;
        if (parent) parent.enter();
      };

      // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
      // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
      if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
        toggle = true;
        node = document$2.createTextNode('');
        new MutationObserver(flush).observe(node, { characterData: true });
        notify$1 = function () {
          node.data = toggle = !toggle;
        };
      // environments with maybe non-completely correct, but existent Promise
      } else if (Promise$1 && Promise$1.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise$1.resolve(undefined);
        then = promise.then;
        notify$1 = function () {
          then.call(promise, flush);
        };
      // Node.js without promises
      } else if (engineIsNode) {
        notify$1 = function () {
          process$2.nextTick(flush);
        };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
      } else {
        notify$1 = function () {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global_1, flush);
        };
      }
    }

    var microtask = queueMicrotask || function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify$1();
      } last = task;
    };

    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve);
      this.reject = aFunction(reject);
    };

    // 25.4.1.5 NewPromiseCapability(C)
    var f = function (C) {
      return new PromiseCapability(C);
    };

    var newPromiseCapability$1 = {
    	f: f
    };

    var promiseResolve = function (C, x) {
      anObject(C);
      if (isObject(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability$1.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };

    var hostReportErrors = function (a, b) {
      var console = global_1.console;
      if (console && console.error) {
        arguments.length === 1 ? console.error(a) : console.error(a, b);
      }
    };

    var perform = function (exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };

    var process$1 = global_1.process;
    var versions = process$1 && process$1.versions;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      version = match[0] + match[1];
    } else if (engineUserAgent) {
      match = engineUserAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = engineUserAgent.match(/Chrome\/(\d+)/);
        if (match) version = match[1];
      }
    }

    var engineV8Version = version && +version;

    var task = task$1.set;











    var SPECIES$1 = wellKnownSymbol('species');
    var PROMISE = 'Promise';
    var getInternalState$2 = internalState.get;
    var setInternalState$3 = internalState.set;
    var getInternalPromiseState = internalState.getterFor(PROMISE);
    var PromiseConstructor = nativePromiseConstructor;
    var TypeError$1 = global_1.TypeError;
    var document$1 = global_1.document;
    var process = global_1.process;
    var $fetch = getBuiltIn('fetch');
    var newPromiseCapability = newPromiseCapability$1.f;
    var newGenericPromiseCapability = newPromiseCapability;
    var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global_1.dispatchEvent);
    var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
    var UNHANDLED_REJECTION = 'unhandledrejection';
    var REJECTION_HANDLED = 'rejectionhandled';
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    var HANDLED = 1;
    var UNHANDLED = 2;
    var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

    var FORCED = isForced_1(PROMISE, function () {
      var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
      if (!GLOBAL_CORE_JS_PROMISE) {
        // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // We can't detect it synchronously, so just check versions
        if (engineV8Version === 66) return true;
        // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
        if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
      }
      // We can't use @@species feature detection in V8 since it causes
      // deoptimization and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
      // Detect correctness of subclassing with @@species support
      var promise = PromiseConstructor.resolve(1);
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$1] = FakePromise;
      return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
    });

    var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
    });

    // helpers
    var isThenable = function (it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };

    var notify = function (state, isReject) {
      if (state.notified) return;
      state.notified = true;
      var chain = state.reactions;
      microtask(function () {
        var value = state.value;
        var ok = state.state == FULFILLED;
        var index = 0;
        // variable length - can't use forEach
        while (chain.length > index) {
          var reaction = chain[index++];
          var handler = ok ? reaction.ok : reaction.fail;
          var resolve = reaction.resolve;
          var reject = reaction.reject;
          var domain = reaction.domain;
          var result, then, exited;
          try {
            if (handler) {
              if (!ok) {
                if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                state.rejection = HANDLED;
              }
              if (handler === true) result = value;
              else {
                if (domain) domain.enter();
                result = handler(value); // can throw
                if (domain) {
                  domain.exit();
                  exited = true;
                }
              }
              if (result === reaction.promise) {
                reject(TypeError$1('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (error) {
            if (domain && !exited) domain.exit();
            reject(error);
          }
        }
        state.reactions = [];
        state.notified = false;
        if (isReject && !state.rejection) onUnhandled(state);
      });
    };

    var dispatchEvent = function (name, promise, reason) {
      var event, handler;
      if (DISPATCH_EVENT) {
        event = document$1.createEvent('Event');
        event.promise = promise;
        event.reason = reason;
        event.initEvent(name, false, true);
        global_1.dispatchEvent(event);
      } else event = { promise: promise, reason: reason };
      if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
      else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
    };

    var onUnhandled = function (state) {
      task.call(global_1, function () {
        var promise = state.facade;
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
          result = perform(function () {
            if (engineIsNode) {
              process.emit('unhandledRejection', value, promise);
            } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
          if (result.error) throw result.value;
        }
      });
    };

    var isUnhandled = function (state) {
      return state.rejection !== HANDLED && !state.parent;
    };

    var onHandleUnhandled = function (state) {
      task.call(global_1, function () {
        var promise = state.facade;
        if (engineIsNode) {
          process.emit('rejectionHandled', promise);
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
      });
    };

    var bind = function (fn, state, unwrap) {
      return function (value) {
        fn(state, value, unwrap);
      };
    };

    var internalReject = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      state.value = value;
      state.state = REJECTED;
      notify(state, true);
    };

    var internalResolve = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      try {
        if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) {
          microtask(function () {
            var wrapper = { done: false };
            try {
              then.call(value,
                bind(internalResolve, wrapper, state),
                bind(internalReject, wrapper, state)
              );
            } catch (error) {
              internalReject(wrapper, error, state);
            }
          });
        } else {
          state.value = value;
          state.state = FULFILLED;
          notify(state, false);
        }
      } catch (error) {
        internalReject({ done: false }, error, state);
      }
    };

    // constructor polyfill
    if (FORCED) {
      // 25.4.3.1 Promise(executor)
      PromiseConstructor = function Promise(executor) {
        anInstance(this, PromiseConstructor, PROMISE);
        aFunction(executor);
        Internal.call(this);
        var state = getInternalState$2(this);
        try {
          executor(bind(internalResolve, state), bind(internalReject, state));
        } catch (error) {
          internalReject(state, error);
        }
      };
      // eslint-disable-next-line no-unused-vars
      Internal = function Promise(executor) {
        setInternalState$3(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: [],
          rejection: false,
          state: PENDING,
          value: undefined
        });
      };
      Internal.prototype = redefineAll(PromiseConstructor.prototype, {
        // `Promise.prototype.then` method
        // https://tc39.es/ecma262/#sec-promise.prototype.then
        then: function then(onFulfilled, onRejected) {
          var state = getInternalPromiseState(this);
          var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = engineIsNode ? process.domain : undefined;
          state.parent = true;
          state.reactions.push(reaction);
          if (state.state != PENDING) notify(state, false);
          return reaction.promise;
        },
        // `Promise.prototype.catch` method
        // https://tc39.es/ecma262/#sec-promise.prototype.catch
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      OwnPromiseCapability = function () {
        var promise = new Internal();
        var state = getInternalState$2(promise);
        this.promise = promise;
        this.resolve = bind(internalResolve, state);
        this.reject = bind(internalReject, state);
      };
      newPromiseCapability$1.f = newPromiseCapability = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
      };

      if (typeof nativePromiseConstructor == 'function') {
        nativeThen = nativePromiseConstructor.prototype.then;

        // wrap native Promise#then for native async functions
        redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // wrap fetch result
        if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
          // eslint-disable-next-line no-unused-vars
          fetch: function fetch(input /* , init */) {
            return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
          }
        });
      }
    }

    _export({ global: true, wrap: true, forced: FORCED }, {
      Promise: PromiseConstructor
    });

    setToStringTag(PromiseConstructor, PROMISE, false);
    setSpecies(PROMISE);

    PromiseWrapper = getBuiltIn(PROMISE);

    // statics
    _export({ target: PROMISE, stat: true, forced: FORCED }, {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      }
    });

    _export({ target: PROMISE, stat: true, forced: FORCED }, {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve(this, x);
      }
    });

    _export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          iterate(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    // `Promise.allSettled` method
    // https://tc39.es/ecma262/#sec-promise.allsettled
    _export({ target: 'Promise', stat: true }, {
      allSettled: function allSettled(iterable) {
        var C = this;
        var capability = newPromiseCapability$1.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var promiseResolve = aFunction(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = { status: 'fulfilled', value: value };
              --remaining || resolve(values);
            }, function (error) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = { status: 'rejected', reason: error };
              --remaining || resolve(values);
            });
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    var PROMISE_ANY_ERROR = 'No one promise resolved';

    // `Promise.any` method
    // https://tc39.es/ecma262/#sec-promise.any
    _export({ target: 'Promise', stat: true }, {
      any: function any(iterable) {
        var C = this;
        var capability = newPromiseCapability$1.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var promiseResolve = aFunction(C.resolve);
          var errors = [];
          var counter = 0;
          var remaining = 1;
          var alreadyResolved = false;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyRejected = false;
            errors.push(undefined);
            remaining++;
            promiseResolve.call(C, promise).then(function (value) {
              if (alreadyRejected || alreadyResolved) return;
              alreadyResolved = true;
              resolve(value);
            }, function (error) {
              if (alreadyRejected || alreadyResolved) return;
              alreadyRejected = true;
              errors[index] = error;
              --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
            });
          });
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
    var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
      nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
    });

    // `Promise.prototype.finally` method
    // https://tc39.es/ecma262/#sec-promise.prototype.finally
    _export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
      'finally': function (onFinally) {
        var C = speciesConstructor(this, getBuiltIn('Promise'));
        var isFunction = typeof onFinally == 'function';
        return this.then(
          isFunction ? function (x) {
            return promiseResolve(C, onFinally()).then(function () { return x; });
          } : onFinally,
          isFunction ? function (e) {
            return promiseResolve(C, onFinally()).then(function () { throw e; });
          } : onFinally
        );
      }
    });

    // patch native Promise.prototype for native async functions
    if (typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
      redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
    }

    // `String.prototype.{ codePointAt, at }` methods implementation
    var createMethod$1 = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = String(requireObjectCoercible($this));
        var position = toInteger(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = S.charCodeAt(position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size
          || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
            ? CONVERT_TO_STRING ? S.charAt(position) : first
            : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
      };
    };

    var stringMultibyte = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod$1(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod$1(true)
    };

    var ITERATOR$2 = wellKnownSymbol('iterator');
    var BUGGY_SAFARI_ITERATORS$1 = false;

    var returnThis$2 = function () { return this; };

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

    if ([].keys) {
      arrayIterator = [].keys();
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
      else {
        PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
      }
    }

    var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
    });

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    if (!has$1(IteratorPrototype$2, ITERATOR$2)) {
      createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$2, returnThis$2);
    }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype$2,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
    };

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





    var returnThis$1 = function () { return this; };

    var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
      setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
      iterators[TO_STRING_TAG] = returnThis$1;
      return IteratorConstructor;
    };

    var IteratorPrototype = iteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$1 = wellKnownSymbol('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis = function () { return this; };

    var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor(IteratorConstructor, NAME, next);

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
          case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
          case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
        } return function () { return new IteratorConstructor(this); };
      };

      var TO_STRING_TAG = NAME + ' Iterator';
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR$1]
        || IterablePrototype['@@iterator']
        || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (objectSetPrototypeOf) {
              objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
            } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
              createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis);
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
        }
      }

      // fix Array#{values, @@iterator}.name in V8 / FF
      if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return nativeIterator.call(this); };
      }

      // define iterator
      if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
        createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
      }
      iterators[NAME] = defaultIterator;

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
      }

      return methods;
    };

    var charAt = stringMultibyte.charAt;



    var STRING_ITERATOR = 'String Iterator';
    var setInternalState$2 = internalState.set;
    var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

    // `String.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState$2(this, {
        type: STRING_ITERATOR,
        string: String(iterated),
        index: 0
      });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    }, function next() {
      var state = getInternalState$1(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt(string, index);
      state.index += point.length;
      return { value: point, done: false };
    });

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    var UNSCOPABLES = wellKnownSymbol('unscopables');
    var ArrayPrototype = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] == undefined) {
      objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: objectCreate(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables = function (key) {
      ArrayPrototype[UNSCOPABLES][key] = true;
    };

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$1 = internalState.set;
    var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

    // `Array.prototype.entries` method
    // https://tc39.es/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.es/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.es/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.es/ecma262/#sec-createarrayiterator
    var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
      setInternalState$1(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: index, done: false };
      if (kind == 'values') return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.es/ecma262/#sec-createmappedargumentsobject
    iterators.Arguments = iterators.Array;

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');

    var ITERATOR = wellKnownSymbol('iterator');
    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var ArrayValues = es_array_iterator.values;

    for (var COLLECTION_NAME$1 in domIterables) {
      var Collection$1 = global_1[COLLECTION_NAME$1];
      var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
      if (CollectionPrototype$1) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype$1[ITERATOR] !== ArrayValues) try {
          createNonEnumerableProperty(CollectionPrototype$1, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype$1[ITERATOR] = ArrayValues;
        }
        if (!CollectionPrototype$1[TO_STRING_TAG]) {
          createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG, COLLECTION_NAME$1);
        }
        if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
            createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
          }
        }
      }
    }

    path.Promise;

    var freezing = !fails(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    });

    var internalMetadata = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;



    var METADATA = uid('meta');
    var id = 0;

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var setMetadata = function (it) {
      defineProperty(it, METADATA, { value: {
        objectID: 'O' + ++id, // object ID
        weakData: {}          // weak collections IDs
      } });
    };

    var fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has$1(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMetadata(it);
      // return object ID
      } return it[METADATA].objectID;
    };

    var getWeakData = function (it, create) {
      if (!has$1(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMetadata(it);
      // return the store of weak collections IDs
      } return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (freezing && meta.REQUIRED && isExtensible(it) && !has$1(it, METADATA)) setMetadata(it);
      return it;
    };

    var meta = module.exports = {
      REQUIRED: false,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    };

    hiddenKeys$1[METADATA] = true;
    });
    internalMetadata.REQUIRED;
    internalMetadata.fastKey;
    internalMetadata.getWeakData;
    internalMetadata.onFreeze;

    // makes subclassing work correct for wrapped built-ins
    var inheritIfRequired = function ($this, dummy, Wrapper) {
      var NewTarget, NewTargetPrototype;
      if (
        // it can work only with native `setPrototypeOf`
        objectSetPrototypeOf &&
        // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
        typeof (NewTarget = dummy.constructor) == 'function' &&
        NewTarget !== Wrapper &&
        isObject(NewTargetPrototype = NewTarget.prototype) &&
        NewTargetPrototype !== Wrapper.prototype
      ) objectSetPrototypeOf($this, NewTargetPrototype);
      return $this;
    };

    var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
      var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
      var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
      var ADDER = IS_MAP ? 'set' : 'add';
      var NativeConstructor = global_1[CONSTRUCTOR_NAME];
      var NativePrototype = NativeConstructor && NativeConstructor.prototype;
      var Constructor = NativeConstructor;
      var exported = {};

      var fixMethod = function (KEY) {
        var nativeMethod = NativePrototype[KEY];
        redefine(NativePrototype, KEY,
          KEY == 'add' ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value);
            return this;
          } : KEY == 'delete' ? function (key) {
            return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == 'get' ? function get(key) {
            return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == 'has' ? function has(key) {
            return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value);
            return this;
          }
        );
      };

      // eslint-disable-next-line max-len
      if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
        new NativeConstructor().entries().next();
      })))) {
        // create collection constructor
        Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
        internalMetadata.REQUIRED = true;
      } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
        var instance = new Constructor();
        // early implementations not supports chaining
        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
        // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
        var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
        // most early implementations doesn't supports iterables, most modern - not close it correctly
        // eslint-disable-next-line no-new
        var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
        // for early implementations -0 and +0 not the same
        var BUGGY_ZERO = !IS_WEAK && fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor();
          var index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

        if (!ACCEPT_ITERABLES) {
          Constructor = wrapper(function (dummy, iterable) {
            anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
            var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
            if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
            return that;
          });
          Constructor.prototype = NativePrototype;
          NativePrototype.constructor = Constructor;
        }

        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete');
          fixMethod('has');
          IS_MAP && fixMethod('get');
        }

        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

        // weak collections should not contains .clear method
        if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
      }

      exported[CONSTRUCTOR_NAME] = Constructor;
      _export({ global: true, forced: Constructor != NativeConstructor }, exported);

      setToStringTag(Constructor, CONSTRUCTOR_NAME);

      if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

      return Constructor;
    };

    var defineProperty$2 = objectDefineProperty.f;








    var fastKey = internalMetadata.fastKey;


    var setInternalState = internalState.set;
    var internalStateGetterFor = internalState.getterFor;

    var collectionStrong = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, CONSTRUCTOR_NAME);
          setInternalState(that, {
            type: CONSTRUCTOR_NAME,
            index: objectCreate(null),
            first: undefined,
            last: undefined,
            size: 0
          });
          if (!descriptors) that.size = 0;
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        });

        var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

        var define = function (that, key, value) {
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          var previous, index;
          // change existing entry
          if (entry) {
            entry.value = value;
          // create new entry
          } else {
            state.last = entry = {
              index: index = fastKey(key, true),
              key: key,
              value: value,
              previous: previous = state.last,
              next: undefined,
              removed: false
            };
            if (!state.first) state.first = entry;
            if (previous) previous.next = entry;
            if (descriptors) state.size++;
            else that.size++;
            // add to index
            if (index !== 'F') state.index[index] = entry;
          } return that;
        };

        var getEntry = function (that, key) {
          var state = getInternalState(that);
          // fast case
          var index = fastKey(key);
          var entry;
          if (index !== 'F') return state.index[index];
          // frozen object case
          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key == key) return entry;
          }
        };

        redefineAll(C.prototype, {
          // 23.1.3.1 Map.prototype.clear()
          // 23.2.3.2 Set.prototype.clear()
          clear: function clear() {
            var that = this;
            var state = getInternalState(that);
            var data = state.index;
            var entry = state.first;
            while (entry) {
              entry.removed = true;
              if (entry.previous) entry.previous = entry.previous.next = undefined;
              delete data[entry.index];
              entry = entry.next;
            }
            state.first = state.last = undefined;
            if (descriptors) state.size = 0;
            else that.size = 0;
          },
          // 23.1.3.3 Map.prototype.delete(key)
          // 23.2.3.4 Set.prototype.delete(value)
          'delete': function (key) {
            var that = this;
            var state = getInternalState(that);
            var entry = getEntry(that, key);
            if (entry) {
              var next = entry.next;
              var prev = entry.previous;
              delete state.index[entry.index];
              entry.removed = true;
              if (prev) prev.next = next;
              if (next) next.previous = prev;
              if (state.first == entry) state.first = next;
              if (state.last == entry) state.last = prev;
              if (descriptors) state.size--;
              else that.size--;
            } return !!entry;
          },
          // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
          // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
          forEach: function forEach(callbackfn /* , that = undefined */) {
            var state = getInternalState(this);
            var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
            var entry;
            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this);
              // revert to the last existing entry
              while (entry && entry.removed) entry = entry.previous;
            }
          },
          // 23.1.3.7 Map.prototype.has(key)
          // 23.2.3.7 Set.prototype.has(value)
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });

        redefineAll(C.prototype, IS_MAP ? {
          // 23.1.3.6 Map.prototype.get(key)
          get: function get(key) {
            var entry = getEntry(this, key);
            return entry && entry.value;
          },
          // 23.1.3.9 Map.prototype.set(key, value)
          set: function set(key, value) {
            return define(this, key === 0 ? 0 : key, value);
          }
        } : {
          // 23.2.3.1 Set.prototype.add(value)
          add: function add(value) {
            return define(this, value = value === 0 ? 0 : value, value);
          }
        });
        if (descriptors) defineProperty$2(C.prototype, 'size', {
          get: function () {
            return getInternalState(this).size;
          }
        });
        return C;
      },
      setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
        var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
        var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
        var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
        // add .keys, .values, .entries, [@@iterator]
        // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
        defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
          setInternalState(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: undefined
          });
        }, function () {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
          // get next entry
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            // or finish the iteration
            state.target = undefined;
            return { value: undefined, done: true };
          }
          // return step by kind
          if (kind == 'keys') return { value: entry.key, done: false };
          if (kind == 'values') return { value: entry.value, done: false };
          return { value: [entry.key, entry.value], done: false };
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        // add [@@species], 23.1.2.2, 23.2.2.2
        setSpecies(CONSTRUCTOR_NAME);
      }
    };
    collectionStrong.getConstructor;
    collectionStrong.setStrong;

    // `Map` constructor
    // https://tc39.es/ecma262/#sec-map-objects
    collection('Map', function (init) {
      return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong);

    path.Map;

    // `Set` constructor
    // https://tc39.es/ecma262/#sec-set-objects
    collection('Set', function (init) {
      return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong);

    path.Set;

    var nativeAssign = Object.assign;
    var defineProperty$1 = Object.defineProperty;

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    var objectAssign = !nativeAssign || fails(function () {
      // should have correct order of operations (Edge bug)
      if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$1({}, 'a', {
        enumerable: true,
        get: function () {
          defineProperty$1(this, 'b', {
            value: 3,
            enumerable: false
          });
        }
      }), { b: 2 })).b !== 1) return true;
      // should work with symbols and should have deterministic property order (V8 bug)
      var A = {};
      var B = {};
      // eslint-disable-next-line no-undef
      var symbol = Symbol();
      var alphabet = 'abcdefghijklmnopqrst';
      A[symbol] = 7;
      alphabet.split('').forEach(function (chr) { B[chr] = chr; });
      return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
    }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
      var T = toObject(target);
      var argumentsLength = arguments.length;
      var index = 1;
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      var propertyIsEnumerable = objectPropertyIsEnumerable.f;
      while (argumentsLength > index) {
        var S = indexedObject(arguments[index++]);
        var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while (length > j) {
          key = keys[j++];
          if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
        }
      } return T;
    } : nativeAssign;

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
      assign: objectAssign
    });

    path.Object.assign;

    // `Number.isNaN` method
    // https://tc39.es/ecma262/#sec-number.isnan
    _export({ target: 'Number', stat: true }, {
      isNaN: function isNaN(number) {
        // eslint-disable-next-line no-self-compare
        return number != number;
      }
    });

    path.Number.isNaN;

    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    var isArray = Array.isArray || function isArray(arg) {
      return classofRaw(arg) == 'Array';
    };

    var SPECIES = wellKnownSymbol('species');

    // `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    var arraySpeciesCreate = function (originalArray, length) {
      var C;
      if (isArray(originalArray)) {
        C = originalArray.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
        else if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
    };

    var push = [].push;

    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
    var createMethod = function (TYPE) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var IS_FILTER_OUT = TYPE == 7;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      return function ($this, callbackfn, that, specificCreate) {
        var O = toObject($this);
        var self = indexedObject(O);
        var boundFunction = functionBindContext(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var create = specificCreate || arraySpeciesCreate;
        var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
        var value, result;
        for (;length > index; index++) if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
              case 3: return true;              // some
              case 5: return value;             // find
              case 6: return index;             // findIndex
              case 2: push.call(target, value); // filter
            } else switch (TYPE) {
              case 4: return false;             // every
              case 7: push.call(target, value); // filterOut
            }
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };

    var arrayIteration = {
      // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      forEach: createMethod(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod(6),
      // `Array.prototype.filterOut` method
      // https://github.com/tc39/proposal-array-filtering
      filterOut: createMethod(7)
    };

    var arrayMethodIsStrict = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal
        method.call(null, argument || function () { throw 1; }, 1);
      });
    };

    var defineProperty = Object.defineProperty;
    var cache = {};

    var thrower = function (it) { throw it; };

    var arrayMethodUsesToLength = function (METHOD_NAME, options) {
      if (has$1(cache, METHOD_NAME)) return cache[METHOD_NAME];
      if (!options) options = {};
      var method = [][METHOD_NAME];
      var ACCESSORS = has$1(options, 'ACCESSORS') ? options.ACCESSORS : false;
      var argument0 = has$1(options, 0) ? options[0] : thrower;
      var argument1 = has$1(options, 1) ? options[1] : undefined;

      return cache[METHOD_NAME] = !!method && !fails(function () {
        if (ACCESSORS && !descriptors) return true;
        var O = { length: -1 };

        if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
        else O[1] = 1;

        method.call(O, argument0, argument1);
      });
    };

    var $forEach = arrayIteration.forEach;



    var STRICT_METHOD = arrayMethodIsStrict('forEach');
    var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

    // `Array.prototype.forEach` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
      return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    } : [].forEach;

    for (var COLLECTION_NAME in domIterables) {
      var Collection = global_1[COLLECTION_NAME];
      var CollectionPrototype = Collection && Collection.prototype;
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
        createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
      } catch (error) {
        CollectionPrototype.forEach = arrayForEach;
      }
    }

    /* eslint-disable no-prototype-builtins */
    var g =
      (typeof globalThis !== 'undefined' && globalThis) ||
      (typeof self !== 'undefined' && self) ||
      // eslint-disable-next-line no-undef
      (typeof global !== 'undefined' && global) ||
      {};

    var support = {
      searchParams: 'URLSearchParams' in g,
      iterable: 'Symbol' in g && 'iterator' in Symbol,
      blob:
        'FileReader' in g &&
        'Blob' in g &&
        (function() {
          try {
            new Blob();
            return true
          } catch (e) {
            return false
          }
        })(),
      formData: 'FormData' in g,
      arrayBuffer: 'ArrayBuffer' in g
    };

    function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    if (support.arrayBuffer) {
      var viewClasses = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
      ];

      var isArrayBufferView =
        ArrayBuffer.isView ||
        function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
        };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
        throw new TypeError('Invalid character in header field name: "' + name + '"')
      }
      return name.toLowerCase()
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value}
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator
        };
      }

      return iterator
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function(value, name) {
          this.append(name, value);
        }, this);
      } else if (Array.isArray(headers)) {
        headers.forEach(function(header) {
          if (header.length != 2) {
            throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length)
          }
          this.append(header[0], header[1]);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function(name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function(name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var oldValue = this.map[name];
      this.map[name] = oldValue ? oldValue + ', ' + value : value;
    };

    Headers.prototype['delete'] = function(name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function(name) {
      name = normalizeName(name);
      return this.has(name) ? this.map[name] : null
    };

    Headers.prototype.has = function(name) {
      return this.map.hasOwnProperty(normalizeName(name))
    };

    Headers.prototype.set = function(name, value) {
      this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function(callback, thisArg) {
      for (var name in this.map) {
        if (this.map.hasOwnProperty(name)) {
          callback.call(thisArg, this.map[name], name, this);
        }
      }
    };

    Headers.prototype.keys = function() {
      var items = [];
      this.forEach(function(value, name) {
        items.push(name);
      });
      return iteratorFor(items)
    };

    Headers.prototype.values = function() {
      var items = [];
      this.forEach(function(value) {
        items.push(value);
      });
      return iteratorFor(items)
    };

    Headers.prototype.entries = function() {
      var items = [];
      this.forEach(function(value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items)
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body._noBody) return
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'))
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function(resolve, reject) {
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = function() {
          reject(reader.error);
        };
      })
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
      var encoding = match ? match[1] : 'utf-8';
      reader.readAsText(blob, encoding);
      return promise
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }
      return chars.join('')
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0)
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer
      }
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function(body) {
        /*
          fetch-mock wraps the Response object in an ES6 Proxy to
          provide useful test harness features such as flush. However, on
          ES5 browsers without fetch or Proxy support pollyfills must be used;
          the proxy-pollyfill is unable to proxy an attribute unless it exists
          on the object before the Proxy is created. This change ensures
          Response.bodyUsed exists on the instance, while maintaining the
          semantic of setting Request.bodyUsed in the constructor before
          _initBody is called.
        */
        // eslint-disable-next-line no-self-assign
        this.bodyUsed = this.bodyUsed;
        this._bodyInit = body;
        if (!body) {
          this._noBody = true;
          this._bodyText = '';
        } else if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          // IE 10-11 can't handle a DataView body.
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          this._bodyText = body = Object.prototype.toString.call(body);
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob)
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]))
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob')
          } else {
            return Promise.resolve(new Blob([this._bodyText]))
          }
        };
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed
          } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            )
          } else {
            return Promise.resolve(this._bodyArrayBuffer)
          }
        } else if (support.blob) {
          return this.blob().then(readBlobAsArrayBuffer)
        } else {
          throw new Error('could not read as ArrayBuffer')
        }
      };

      this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      };

      if (support.formData) {
        this.formData = function() {
          return this.text().then(decode)
        };
      }

      this.json = function() {
        return this.text().then(JSON.parse)
      };

      return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method
    }

    function Request$1(input, options) {
      if (!(this instanceof Request$1)) {
        throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
      }

      options = options || {};
      var body = options.body;

      if (input instanceof Request$1) {
        if (input.bodyUsed) {
          throw new TypeError('Already read')
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        this.signal = input.signal;
        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = String(input);
      }

      this.credentials = options.credentials || this.credentials || 'same-origin';
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.signal = options.signal || this.signal || (function () {
        if ('AbortController' in g) {
          var ctrl = new AbortController();
          return ctrl.signal;
        }
      }());
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests')
      }
      this._initBody(body);

      if (this.method === 'GET' || this.method === 'HEAD') {
        if (options.cache === 'no-store' || options.cache === 'no-cache') {
          // Search for a '_' parameter in the query string
          var reParamSearch = /([?&])_=[^&]*/;
          if (reParamSearch.test(this.url)) {
            // If it already exists then set the value with the current time
            this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
          } else {
            // Otherwise add a new '_' parameter to the end with the current time
            var reQueryString = /\?/;
            this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
          }
        }
      }
    }

    Request$1.prototype.clone = function() {
      return new Request$1(this, {body: this._bodyInit})
    };

    function decode(body) {
      var form = new FormData();
      body
        .trim()
        .split('&')
        .forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
      return form
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
      // https://tools.ietf.org/html/rfc7230#section-3.2
      var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
      // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
      // https://github.com/github/fetch/issues/748
      // https://github.com/zloirock/core-js/issues/751
      preProcessedHeaders
        .split('\r')
        .map(function(header) {
          return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
        })
        .forEach(function(line) {
          var parts = line.split(':');
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(':').trim();
            try {
              headers.append(key, value);
            } catch (error) {
              console.warn('Response ' + error.message);
            }
          }
        });
      return headers
    }

    Body.call(Request$1.prototype);

    function Response(bodyInit, options) {
      if (!(this instanceof Response)) {
        throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
      }
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = options.status === undefined ? 200 : options.status;
      if (this.status < 200 || this.status > 599) {
        throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].")
      }
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
      this.headers = new Headers(options.headers);
      this.url = options.url || '';
      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function() {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      })
    };

    Response.error = function() {
      var response = new Response(null, {status: 200, statusText: ''});
      response.ok = false;
      response.status = 0;
      response.type = 'error';
      return response
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function(url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code')
      }

      return new Response(null, {status: status, headers: {location: url}})
    };

    var DOMException = g.DOMException;
    try {
      new DOMException();
    } catch (err) {
      DOMException = function(message, name) {
        this.message = message;
        this.name = name;
        var error = Error(message);
        this.stack = error.stack;
      };
      DOMException.prototype = Object.create(Error.prototype);
      DOMException.prototype.constructor = DOMException;
    }

    function fetch$1(input, init) {
      return new Promise(function(resolve, reject) {
        var request = new Request$1(input, init);

        if (request.signal && request.signal.aborted) {
          return reject(new DOMException('Aborted', 'AbortError'))
        }

        var xhr = new XMLHttpRequest();

        function abortXhr() {
          xhr.abort();
        }

        xhr.onload = function() {
          var options = {
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          // This check if specifically for when a user fetches a file locally from the file system
          // Only if the status is out of a normal range
          if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
            options.status = 200;
          } else {
            options.status = xhr.status;
          }
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          setTimeout(function() {
            resolve(new Response(body, options));
          }, 0);
        };

        xhr.onerror = function() {
          setTimeout(function() {
            reject(new TypeError('Network request failed'));
          }, 0);
        };

        xhr.ontimeout = function() {
          setTimeout(function() {
            reject(new TypeError('Network request timed out'));
          }, 0);
        };

        xhr.onabort = function() {
          setTimeout(function() {
            reject(new DOMException('Aborted', 'AbortError'));
          }, 0);
        };

        function fixUrl(url) {
          try {
            return url === '' && g.location.href ? g.location.href : url
          } catch (e) {
            return url
          }
        }

        xhr.open(request.method, fixUrl(request.url), true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else if (request.credentials === 'omit') {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr) {
          if (support.blob) {
            xhr.responseType = 'blob';
          } else if (
            support.arrayBuffer
          ) {
            xhr.responseType = 'arraybuffer';
          }
        }

        if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || (g.Headers && init.headers instanceof g.Headers))) {
          var names = [];
          Object.getOwnPropertyNames(init.headers).forEach(function(name) {
            names.push(normalizeName(name));
            xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
          });
          request.headers.forEach(function(value, name) {
            if (names.indexOf(name) === -1) {
              xhr.setRequestHeader(name, value);
            }
          });
        } else {
          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });
        }

        if (request.signal) {
          request.signal.addEventListener('abort', abortXhr);

          xhr.onreadystatechange = function() {
            // DONE (success or failure)
            if (xhr.readyState === 4) {
              request.signal.removeEventListener('abort', abortXhr);
            }
          };
        }

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      })
    }

    fetch$1.polyfill = true;

    if (!g.fetch) {
      g.fetch = fetch$1;
      g.Headers = Headers;
      g.Request = Request$1;
      g.Response = Response;
    }

    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('append')) {
                return;
            }
            Object.defineProperty(item, 'append', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function append() {
                    var argArr = Array.prototype.slice.call(arguments), docFrag = document.createDocumentFragment();
                    argArr.forEach(function (argItem) {
                        var isNode = argItem instanceof Node;
                        docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                    });
                    this.appendChild(docFrag);
                }
            });
        });
    })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
    (function () {
        if (typeof window.CustomEvent === "function")
            return false;
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();

    var pahoMqtt = createCommonjsModule(function (module, exports) {
    /*******************************************************************************
     * Copyright (c) 2013 IBM Corp.
     *
     * All rights reserved. This program and the accompanying materials
     * are made available under the terms of the Eclipse Public License v1.0
     * and Eclipse Distribution License v1.0 which accompany this distribution.
     *
     * The Eclipse Public License is available at
     *    http://www.eclipse.org/legal/epl-v10.html
     * and the Eclipse Distribution License is available at
     *   http://www.eclipse.org/org/documents/edl-v10.php.
     *
     * Contributors:
     *    Andrew Banks - initial API and implementation and initial documentation
     *******************************************************************************/


    // Only expose a single object name in the global namespace.
    // Everything must go through this module. Global Paho module
    // only has a single public function, client, which returns
    // a Paho client object given connection details.

    /**
     * Send and receive messages using web browsers.
     * <p>
     * This programming interface lets a JavaScript client application use the MQTT V3.1 or
     * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
     *
     * The function supported includes:
     * <ol>
     * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
     * <li>Specifying options that relate to the communications link with the server,
     * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
     * <li>Subscribing to and receiving messages from MQTT Topics.
     * <li>Publishing messages to MQTT Topics.
     * </ol>
     * <p>
     * The API consists of two main objects:
     * <dl>
     * <dt><b>{@link Paho.Client}</b></dt>
     * <dd>This contains methods that provide the functionality of the API,
     * including provision of callbacks that notify the application when a message
     * arrives from or is delivered to the messaging server,
     * or when the status of its connection to the messaging server changes.</dd>
     * <dt><b>{@link Paho.Message}</b></dt>
     * <dd>This encapsulates the payload of the message along with various attributes
     * associated with its delivery, in particular the destination to which it has
     * been (or is about to be) sent.</dd>
     * </dl>
     * <p>
     * The programming interface validates parameters passed to it, and will throw
     * an Error containing an error message intended for developer use, if it detects
     * an error with any parameter.
     * <p>
     * Example:
     *
     * <code><pre>
    var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess:onConnect});

    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("/World");
      var message = new Paho.MQTT.Message("Hello");
      message.destinationName = "/World";
      client.send(message);
    };
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0)
    	console.log("onConnectionLost:"+responseObject.errorMessage);
    };
    function onMessageArrived(message) {
      console.log("onMessageArrived:"+message.payloadString);
      client.disconnect();
    };
     * </pre></code>
     * @namespace Paho
     */

    /* jshint shadow:true */
    (function ExportLibrary(root, factory) {
    	{
    		module.exports = factory();
    	}
    })(commonjsGlobal, function LibraryFactory(){


    	var PahoMQTT = (function (global) {

    	// Private variables below, these are only visible inside the function closure
    	// which is used to define the module.
    	var version = "@VERSION@-@BUILDLEVEL@";

    	/**
    	 * @private
    	 */
    	var localStorage = global.localStorage || (function () {
    		var data = {};

    		return {
    			setItem: function (key, item) { data[key] = item; },
    			getItem: function (key) { return data[key]; },
    			removeItem: function (key) { delete data[key]; },
    		};
    	})();

    		/**
    	 * Unique message type identifiers, with associated
    	 * associated integer values.
    	 * @private
    	 */
    		var MESSAGE_TYPE = {
    			CONNECT: 1,
    			CONNACK: 2,
    			PUBLISH: 3,
    			PUBACK: 4,
    			PUBREC: 5,
    			PUBREL: 6,
    			PUBCOMP: 7,
    			SUBSCRIBE: 8,
    			SUBACK: 9,
    			UNSUBSCRIBE: 10,
    			UNSUBACK: 11,
    			PINGREQ: 12,
    			PINGRESP: 13,
    			DISCONNECT: 14
    		};

    		// Collection of utility methods used to simplify module code
    		// and promote the DRY pattern.

    		/**
    	 * Validate an object's parameter names to ensure they
    	 * match a list of expected variables name for this option
    	 * type. Used to ensure option object passed into the API don't
    	 * contain erroneous parameters.
    	 * @param {Object} obj - User options object
    	 * @param {Object} keys - valid keys and types that may exist in obj.
    	 * @throws {Error} Invalid option parameter found.
    	 * @private
    	 */
    		var validate = function(obj, keys) {
    			for (var key in obj) {
    				if (obj.hasOwnProperty(key)) {
    					if (keys.hasOwnProperty(key)) {
    						if (typeof obj[key] !== keys[key])
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
    					} else {
    						var errorStr = "Unknown property, " + key + ". Valid properties are:";
    						for (var validKey in keys)
    							if (keys.hasOwnProperty(validKey))
    								errorStr = errorStr+" "+validKey;
    						throw new Error(errorStr);
    					}
    				}
    			}
    		};

    		/**
    	 * Return a new function which runs the user function bound
    	 * to a fixed scope.
    	 * @param {function} User function
    	 * @param {object} Function scope
    	 * @return {function} User function bound to another scope
    	 * @private
    	 */
    		var scope = function (f, scope) {
    			return function () {
    				return f.apply(scope, arguments);
    			};
    		};

    		/**
    	 * Unique message type identifiers, with associated
    	 * associated integer values.
    	 * @private
    	 */
    		var ERROR = {
    			OK: {code:0, text:"AMQJSC0000I OK."},
    			CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
    			SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
    			UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
    			PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
    			INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},
    			CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
    			SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
    			SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
    			MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
    			UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
    			INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
    			INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
    			INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
    			UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
    			INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
    			INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
    			MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."},
    			BUFFER_FULL: {code:18, text:"AMQJS0018E Message buffer is full, maximum buffer size: {0}."},
    		};

    		/** CONNACK RC Meaning. */
    		var CONNACK_RC = {
    			0:"Connection Accepted",
    			1:"Connection Refused: unacceptable protocol version",
    			2:"Connection Refused: identifier rejected",
    			3:"Connection Refused: server unavailable",
    			4:"Connection Refused: bad user name or password",
    			5:"Connection Refused: not authorized"
    		};

    	/**
    	 * Format an error message text.
    	 * @private
    	 * @param {error} ERROR value above.
    	 * @param {substitutions} [array] substituted into the text.
    	 * @return the text with the substitutions made.
    	 */
    		var format = function(error, substitutions) {
    			var text = error.text;
    			if (substitutions) {
    				var field,start;
    				for (var i=0; i<substitutions.length; i++) {
    					field = "{"+i+"}";
    					start = text.indexOf(field);
    					if(start > 0) {
    						var part1 = text.substring(0,start);
    						var part2 = text.substring(start+field.length);
    						text = part1+substitutions[i]+part2;
    					}
    				}
    			}
    			return text;
    		};

    		//MQTT protocol and version          6    M    Q    I    s    d    p    3
    		var MqttProtoIdentifierv3 = [0x00,0x06,0x4d,0x51,0x49,0x73,0x64,0x70,0x03];
    		//MQTT proto/version for 311         4    M    Q    T    T    4
    		var MqttProtoIdentifierv4 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x04];

    		/**
    	 * Construct an MQTT wire protocol message.
    	 * @param type MQTT packet type.
    	 * @param options optional wire message attributes.
    	 *
    	 * Optional properties
    	 *
    	 * messageIdentifier: message ID in the range [0..65535]
    	 * payloadMessage:	Application Message - PUBLISH only
    	 * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
    	 * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
    	 * requestQoS:		array of QoS values [0..2]
    	 *
    	 * "Flag" properties
    	 * cleanSession:	true if present / false if absent (CONNECT)
    	 * willMessage:  	true if present / false if absent (CONNECT)
    	 * isRetained:		true if present / false if absent (CONNECT)
    	 * userName:		true if present / false if absent (CONNECT)
    	 * password:		true if present / false if absent (CONNECT)
    	 * keepAliveInterval:	integer [0..65535]  (CONNECT)
    	 *
    	 * @private
    	 * @ignore
    	 */
    		var WireMessage = function (type, options) {
    			this.type = type;
    			for (var name in options) {
    				if (options.hasOwnProperty(name)) {
    					this[name] = options[name];
    				}
    			}
    		};

    		WireMessage.prototype.encode = function() {
    		// Compute the first byte of the fixed header
    			var first = ((this.type & 0x0f) << 4);

    			/*
    		 * Now calculate the length of the variable header + payload by adding up the lengths
    		 * of all the component parts
    		 */

    			var remLength = 0;
    			var topicStrLength = [];
    			var destinationNameLength = 0;
    			var willMessagePayloadBytes;

    			// if the message contains a messageIdentifier then we need two bytes for that
    			if (this.messageIdentifier !== undefined)
    				remLength += 2;

    			switch(this.type) {
    			// If this a Connect then we need to include 12 bytes for its header
    			case MESSAGE_TYPE.CONNECT:
    				switch(this.mqttVersion) {
    				case 3:
    					remLength += MqttProtoIdentifierv3.length + 3;
    					break;
    				case 4:
    					remLength += MqttProtoIdentifierv4.length + 3;
    					break;
    				}

    				remLength += UTF8Length(this.clientId) + 2;
    				if (this.willMessage !== undefined) {
    					remLength += UTF8Length(this.willMessage.destinationName) + 2;
    					// Will message is always a string, sent as UTF-8 characters with a preceding length.
    					willMessagePayloadBytes = this.willMessage.payloadBytes;
    					if (!(willMessagePayloadBytes instanceof Uint8Array))
    						willMessagePayloadBytes = new Uint8Array(payloadBytes);
    					remLength += willMessagePayloadBytes.byteLength +2;
    				}
    				if (this.userName !== undefined)
    					remLength += UTF8Length(this.userName) + 2;
    				if (this.password !== undefined)
    					remLength += UTF8Length(this.password) + 2;
    				break;

    			// Subscribe, Unsubscribe can both contain topic strings
    			case MESSAGE_TYPE.SUBSCRIBE:
    				first |= 0x02; // Qos = 1;
    				for ( var i = 0; i < this.topics.length; i++) {
    					topicStrLength[i] = UTF8Length(this.topics[i]);
    					remLength += topicStrLength[i] + 2;
    				}
    				remLength += this.requestedQos.length; // 1 byte for each topic's Qos
    				// QoS on Subscribe only
    				break;

    			case MESSAGE_TYPE.UNSUBSCRIBE:
    				first |= 0x02; // Qos = 1;
    				for ( var i = 0; i < this.topics.length; i++) {
    					topicStrLength[i] = UTF8Length(this.topics[i]);
    					remLength += topicStrLength[i] + 2;
    				}
    				break;

    			case MESSAGE_TYPE.PUBREL:
    				first |= 0x02; // Qos = 1;
    				break;

    			case MESSAGE_TYPE.PUBLISH:
    				if (this.payloadMessage.duplicate) first |= 0x08;
    				first  = first |= (this.payloadMessage.qos << 1);
    				if (this.payloadMessage.retained) first |= 0x01;
    				destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
    				remLength += destinationNameLength + 2;
    				var payloadBytes = this.payloadMessage.payloadBytes;
    				remLength += payloadBytes.byteLength;
    				if (payloadBytes instanceof ArrayBuffer)
    					payloadBytes = new Uint8Array(payloadBytes);
    				else if (!(payloadBytes instanceof Uint8Array))
    					payloadBytes = new Uint8Array(payloadBytes.buffer);
    				break;
    			}

    			// Now we can allocate a buffer for the message

    			var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
    			var pos = mbi.length + 1;        // Offset of start of variable header
    			var buffer = new ArrayBuffer(remLength + pos);
    			var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

    			//Write the fixed header into the buffer
    			byteStream[0] = first;
    			byteStream.set(mbi,1);

    			// If this is a PUBLISH then the variable header starts with a topic
    			if (this.type == MESSAGE_TYPE.PUBLISH)
    				pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
    			// If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

    			else if (this.type == MESSAGE_TYPE.CONNECT) {
    				switch (this.mqttVersion) {
    				case 3:
    					byteStream.set(MqttProtoIdentifierv3, pos);
    					pos += MqttProtoIdentifierv3.length;
    					break;
    				case 4:
    					byteStream.set(MqttProtoIdentifierv4, pos);
    					pos += MqttProtoIdentifierv4.length;
    					break;
    				}
    				var connectFlags = 0;
    				if (this.cleanSession)
    					connectFlags = 0x02;
    				if (this.willMessage !== undefined ) {
    					connectFlags |= 0x04;
    					connectFlags |= (this.willMessage.qos<<3);
    					if (this.willMessage.retained) {
    						connectFlags |= 0x20;
    					}
    				}
    				if (this.userName !== undefined)
    					connectFlags |= 0x80;
    				if (this.password !== undefined)
    					connectFlags |= 0x40;
    				byteStream[pos++] = connectFlags;
    				pos = writeUint16 (this.keepAliveInterval, byteStream, pos);
    			}

    			// Output the messageIdentifier - if there is one
    			if (this.messageIdentifier !== undefined)
    				pos = writeUint16 (this.messageIdentifier, byteStream, pos);

    			switch(this.type) {
    			case MESSAGE_TYPE.CONNECT:
    				pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
    				if (this.willMessage !== undefined) {
    					pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
    					pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
    					byteStream.set(willMessagePayloadBytes, pos);
    					pos += willMessagePayloadBytes.byteLength;

    				}
    				if (this.userName !== undefined)
    					pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
    				if (this.password !== undefined)
    					pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
    				break;

    			case MESSAGE_TYPE.PUBLISH:
    				// PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
    				byteStream.set(payloadBytes, pos);

    				break;

    				//    	    case MESSAGE_TYPE.PUBREC:
    				//    	    case MESSAGE_TYPE.PUBREL:
    				//    	    case MESSAGE_TYPE.PUBCOMP:
    				//    	    	break;

    			case MESSAGE_TYPE.SUBSCRIBE:
    				// SUBSCRIBE has a list of topic strings and request QoS
    				for (var i=0; i<this.topics.length; i++) {
    					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
    					byteStream[pos++] = this.requestedQos[i];
    				}
    				break;

    			case MESSAGE_TYPE.UNSUBSCRIBE:
    				// UNSUBSCRIBE has a list of topic strings
    				for (var i=0; i<this.topics.length; i++)
    					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
    				break;
    				// Do nothing.
    			}

    			return buffer;
    		};

    		function decodeMessage(input,pos) {
    			var startingPos = pos;
    			var first = input[pos];
    			var type = first >> 4;
    			var messageInfo = first &= 0x0f;
    			pos += 1;


    			// Decode the remaining length (MBI format)

    			var digit;
    			var remLength = 0;
    			var multiplier = 1;
    			do {
    				if (pos == input.length) {
    					return [null,startingPos];
    				}
    				digit = input[pos++];
    				remLength += ((digit & 0x7F) * multiplier);
    				multiplier *= 128;
    			} while ((digit & 0x80) !== 0);

    			var endPos = pos+remLength;
    			if (endPos > input.length) {
    				return [null,startingPos];
    			}

    			var wireMessage = new WireMessage(type);
    			switch(type) {
    			case MESSAGE_TYPE.CONNACK:
    				var connectAcknowledgeFlags = input[pos++];
    				if (connectAcknowledgeFlags & 0x01)
    					wireMessage.sessionPresent = true;
    				wireMessage.returnCode = input[pos++];
    				break;

    			case MESSAGE_TYPE.PUBLISH:
    				var qos = (messageInfo >> 1) & 0x03;

    				var len = readUint16(input, pos);
    				pos += 2;
    				var topicName = parseUTF8(input, pos, len);
    				pos += len;
    				// If QoS 1 or 2 there will be a messageIdentifier
    				if (qos > 0) {
    					wireMessage.messageIdentifier = readUint16(input, pos);
    					pos += 2;
    				}

    				var message = new Message(input.subarray(pos, endPos));
    				if ((messageInfo & 0x01) == 0x01)
    					message.retained = true;
    				if ((messageInfo & 0x08) == 0x08)
    					message.duplicate =  true;
    				message.qos = qos;
    				message.destinationName = topicName;
    				wireMessage.payloadMessage = message;
    				break;

    			case  MESSAGE_TYPE.PUBACK:
    			case  MESSAGE_TYPE.PUBREC:
    			case  MESSAGE_TYPE.PUBREL:
    			case  MESSAGE_TYPE.PUBCOMP:
    			case  MESSAGE_TYPE.UNSUBACK:
    				wireMessage.messageIdentifier = readUint16(input, pos);
    				break;

    			case  MESSAGE_TYPE.SUBACK:
    				wireMessage.messageIdentifier = readUint16(input, pos);
    				pos += 2;
    				wireMessage.returnCode = input.subarray(pos, endPos);
    				break;
    			}

    			return [wireMessage,endPos];
    		}

    		function writeUint16(input, buffer, offset) {
    			buffer[offset++] = input >> 8;      //MSB
    			buffer[offset++] = input % 256;     //LSB
    			return offset;
    		}

    		function writeString(input, utf8Length, buffer, offset) {
    			offset = writeUint16(utf8Length, buffer, offset);
    			stringToUTF8(input, buffer, offset);
    			return offset + utf8Length;
    		}

    		function readUint16(buffer, offset) {
    			return 256*buffer[offset] + buffer[offset+1];
    		}

    		/**
    	 * Encodes an MQTT Multi-Byte Integer
    	 * @private
    	 */
    		function encodeMBI(number) {
    			var output = new Array(1);
    			var numBytes = 0;

    			do {
    				var digit = number % 128;
    				number = number >> 7;
    				if (number > 0) {
    					digit |= 0x80;
    				}
    				output[numBytes++] = digit;
    			} while ( (number > 0) && (numBytes<4) );

    			return output;
    		}

    		/**
    	 * Takes a String and calculates its length in bytes when encoded in UTF8.
    	 * @private
    	 */
    		function UTF8Length(input) {
    			var output = 0;
    			for (var i = 0; i<input.length; i++)
    			{
    				var charCode = input.charCodeAt(i);
    				if (charCode > 0x7FF)
    				{
    					// Surrogate pair means its a 4 byte character
    					if (0xD800 <= charCode && charCode <= 0xDBFF)
    					{
    						i++;
    						output++;
    					}
    					output +=3;
    				}
    				else if (charCode > 0x7F)
    					output +=2;
    				else
    					output++;
    			}
    			return output;
    		}

    		/**
    	 * Takes a String and writes it into an array as UTF8 encoded bytes.
    	 * @private
    	 */
    		function stringToUTF8(input, output, start) {
    			var pos = start;
    			for (var i = 0; i<input.length; i++) {
    				var charCode = input.charCodeAt(i);

    				// Check for a surrogate pair.
    				if (0xD800 <= charCode && charCode <= 0xDBFF) {
    					var lowCharCode = input.charCodeAt(++i);
    					if (isNaN(lowCharCode)) {
    						throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
    					}
    					charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;

    				}

    				if (charCode <= 0x7F) {
    					output[pos++] = charCode;
    				} else if (charCode <= 0x7FF) {
    					output[pos++] = charCode>>6  & 0x1F | 0xC0;
    					output[pos++] = charCode     & 0x3F | 0x80;
    				} else if (charCode <= 0xFFFF) {
    					output[pos++] = charCode>>12 & 0x0F | 0xE0;
    					output[pos++] = charCode>>6  & 0x3F | 0x80;
    					output[pos++] = charCode     & 0x3F | 0x80;
    				} else {
    					output[pos++] = charCode>>18 & 0x07 | 0xF0;
    					output[pos++] = charCode>>12 & 0x3F | 0x80;
    					output[pos++] = charCode>>6  & 0x3F | 0x80;
    					output[pos++] = charCode     & 0x3F | 0x80;
    				}
    			}
    			return output;
    		}

    		function parseUTF8(input, offset, length) {
    			var output = "";
    			var utf16;
    			var pos = offset;

    			while (pos < offset+length)
    			{
    				var byte1 = input[pos++];
    				if (byte1 < 128)
    					utf16 = byte1;
    				else
    				{
    					var byte2 = input[pos++]-128;
    					if (byte2 < 0)
    						throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
    					if (byte1 < 0xE0)             // 2 byte character
    						utf16 = 64*(byte1-0xC0) + byte2;
    					else
    					{
    						var byte3 = input[pos++]-128;
    						if (byte3 < 0)
    							throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
    						if (byte1 < 0xF0)        // 3 byte character
    							utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
    						else
    						{
    							var byte4 = input[pos++]-128;
    							if (byte4 < 0)
    								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
    							if (byte1 < 0xF8)        // 4 byte character
    								utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
    							else                     // longer encodings are not supported
    								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
    						}
    					}
    				}

    				if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
    				{
    					utf16 -= 0x10000;
    					output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
    					utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
    				}
    				output += String.fromCharCode(utf16);
    			}
    			return output;
    		}

    		/**
    	 * Repeat keepalive requests, monitor responses.
    	 * @ignore
    	 */
    		var Pinger = function(client, keepAliveInterval) {
    			this._client = client;
    			this._keepAliveInterval = keepAliveInterval*1000;
    			this.isReset = false;

    			var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

    			var doTimeout = function (pinger) {
    				return function () {
    					return doPing.apply(pinger);
    				};
    			};

    			/** @ignore */
    			var doPing = function() {
    				if (!this.isReset) {
    					this._client._trace("Pinger.doPing", "Timed out");
    					this._client._disconnected( ERROR.PING_TIMEOUT.code , format(ERROR.PING_TIMEOUT));
    				} else {
    					this.isReset = false;
    					this._client._trace("Pinger.doPing", "send PINGREQ");
    					this._client.socket.send(pingReq);
    					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
    				}
    			};

    			this.reset = function() {
    				this.isReset = true;
    				clearTimeout(this.timeout);
    				if (this._keepAliveInterval > 0)
    					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
    			};

    			this.cancel = function() {
    				clearTimeout(this.timeout);
    			};
    		};

    		/**
    	 * Monitor request completion.
    	 * @ignore
    	 */
    		var Timeout = function(client, timeoutSeconds, action, args) {
    			if (!timeoutSeconds)
    				timeoutSeconds = 30;

    			var doTimeout = function (action, client, args) {
    				return function () {
    					return action.apply(client, args);
    				};
    			};
    			this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

    			this.cancel = function() {
    				clearTimeout(this.timeout);
    			};
    		};

    	/**
    	 * Internal implementation of the Websockets MQTT V3.1 client.
    	 *
    	 * @name Paho.ClientImpl @constructor
    	 * @param {String} host the DNS nameof the webSocket host.
    	 * @param {Number} port the port number for that host.
    	 * @param {String} clientId the MQ client identifier.
    	 */
    		var ClientImpl = function (uri, host, port, path, clientId) {
    		// Check dependencies are satisfied in this browser.
    			if (!("WebSocket" in global && global.WebSocket !== null)) {
    				throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
    			}
    			if (!("ArrayBuffer" in global && global.ArrayBuffer !== null)) {
    				throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
    			}
    			this._trace("Paho.Client", uri, host, port, path, clientId);

    			this.host = host;
    			this.port = port;
    			this.path = path;
    			this.uri = uri;
    			this.clientId = clientId;
    			this._wsuri = null;

    			// Local storagekeys are qualified with the following string.
    			// The conditional inclusion of path in the key is for backward
    			// compatibility to when the path was not configurable and assumed to
    			// be /mqtt
    			this._localKey=host+":"+port+(path!="/mqtt"?":"+path:"")+":"+clientId+":";

    			// Create private instance-only message queue
    			// Internal queue of messages to be sent, in sending order.
    			this._msg_queue = [];
    			this._buffered_msg_queue = [];

    			// Messages we have sent and are expecting a response for, indexed by their respective message ids.
    			this._sentMessages = {};

    			// Messages we have received and acknowleged and are expecting a confirm message for
    			// indexed by their respective message ids.
    			this._receivedMessages = {};

    			// Internal list of callbacks to be executed when messages
    			// have been successfully sent over web socket, e.g. disconnect
    			// when it doesn't have to wait for ACK, just message is dispatched.
    			this._notify_msg_sent = {};

    			// Unique identifier for SEND messages, incrementing
    			// counter as messages are sent.
    			this._message_identifier = 1;

    			// Used to determine the transmission sequence of stored sent messages.
    			this._sequence = 0;


    			// Load the local state, if any, from the saved version, only restore state relevant to this client.
    			for (var key in localStorage)
    				if (   key.indexOf("Sent:"+this._localKey) === 0 || key.indexOf("Received:"+this._localKey) === 0)
    					this.restore(key);
    		};

    		// Messaging Client public instance members.
    		ClientImpl.prototype.host = null;
    		ClientImpl.prototype.port = null;
    		ClientImpl.prototype.path = null;
    		ClientImpl.prototype.uri = null;
    		ClientImpl.prototype.clientId = null;

    		// Messaging Client private instance members.
    		ClientImpl.prototype.socket = null;
    		/* true once we have received an acknowledgement to a CONNECT packet. */
    		ClientImpl.prototype.connected = false;
    		/* The largest message identifier allowed, may not be larger than 2**16 but
    		 * if set smaller reduces the maximum number of outbound messages allowed.
    		 */
    		ClientImpl.prototype.maxMessageIdentifier = 65536;
    		ClientImpl.prototype.connectOptions = null;
    		ClientImpl.prototype.hostIndex = null;
    		ClientImpl.prototype.onConnected = null;
    		ClientImpl.prototype.onConnectionLost = null;
    		ClientImpl.prototype.onMessageDelivered = null;
    		ClientImpl.prototype.onMessageArrived = null;
    		ClientImpl.prototype.traceFunction = null;
    		ClientImpl.prototype._msg_queue = null;
    		ClientImpl.prototype._buffered_msg_queue = null;
    		ClientImpl.prototype._connectTimeout = null;
    		/* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
    		ClientImpl.prototype.sendPinger = null;
    		/* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
    		ClientImpl.prototype.receivePinger = null;
    		ClientImpl.prototype._reconnectInterval = 1; // Reconnect Delay, starts at 1 second
    		ClientImpl.prototype._reconnecting = false;
    		ClientImpl.prototype._reconnectTimeout = null;
    		ClientImpl.prototype.disconnectedPublishing = false;
    		ClientImpl.prototype.disconnectedBufferSize = 5000;

    		ClientImpl.prototype.receiveBuffer = null;

    		ClientImpl.prototype._traceBuffer = null;
    		ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

    		ClientImpl.prototype.connect = function (connectOptions) {
    			var connectOptionsMasked = this._traceMask(connectOptions, "password");
    			this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

    			if (this.connected)
    				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
    			if (this.socket)
    				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

    			if (this._reconnecting) {
    			// connect() function is called while reconnect is in progress.
    			// Terminate the auto reconnect process to use new connect options.
    				this._reconnectTimeout.cancel();
    				this._reconnectTimeout = null;
    				this._reconnecting = false;
    			}

    			this.connectOptions = connectOptions;
    			this._reconnectInterval = 1;
    			this._reconnecting = false;
    			if (connectOptions.uris) {
    				this.hostIndex = 0;
    				this._doConnect(connectOptions.uris[0]);
    			} else {
    				this._doConnect(this.uri);
    			}

    		};

    		ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
    			this._trace("Client.subscribe", filter, subscribeOptions);

    			if (!this.connected)
    				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

                var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
                wireMessage.topics = filter.constructor === Array ? filter : [filter];
                if (subscribeOptions.qos === undefined)
                    subscribeOptions.qos = 0;
                wireMessage.requestedQos = [];
                for (var i = 0; i < wireMessage.topics.length; i++)
                    wireMessage.requestedQos[i] = subscribeOptions.qos;

    			if (subscribeOptions.onSuccess) {
    				wireMessage.onSuccess = function(grantedQos) {subscribeOptions.onSuccess({invocationContext:subscribeOptions.invocationContext,grantedQos:grantedQos});};
    			}

    			if (subscribeOptions.onFailure) {
    				wireMessage.onFailure = function(errorCode) {subscribeOptions.onFailure({invocationContext:subscribeOptions.invocationContext,errorCode:errorCode, errorMessage:format(errorCode)});};
    			}

    			if (subscribeOptions.timeout) {
    				wireMessage.timeOut = new Timeout(this, subscribeOptions.timeout, subscribeOptions.onFailure,
    					[{invocationContext:subscribeOptions.invocationContext,
    						errorCode:ERROR.SUBSCRIBE_TIMEOUT.code,
    						errorMessage:format(ERROR.SUBSCRIBE_TIMEOUT)}]);
    			}

    			// All subscriptions return a SUBACK.
    			this._requires_ack(wireMessage);
    			this._schedule_message(wireMessage);
    		};

    		/** @ignore */
    		ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
    			this._trace("Client.unsubscribe", filter, unsubscribeOptions);

    			if (!this.connected)
    				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

                var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
                wireMessage.topics = filter.constructor === Array ? filter : [filter];

    			if (unsubscribeOptions.onSuccess) {
    				wireMessage.callback = function() {unsubscribeOptions.onSuccess({invocationContext:unsubscribeOptions.invocationContext});};
    			}
    			if (unsubscribeOptions.timeout) {
    				wireMessage.timeOut = new Timeout(this, unsubscribeOptions.timeout, unsubscribeOptions.onFailure,
    					[{invocationContext:unsubscribeOptions.invocationContext,
    						errorCode:ERROR.UNSUBSCRIBE_TIMEOUT.code,
    						errorMessage:format(ERROR.UNSUBSCRIBE_TIMEOUT)}]);
    			}

    			// All unsubscribes return a SUBACK.
    			this._requires_ack(wireMessage);
    			this._schedule_message(wireMessage);
    		};

    		ClientImpl.prototype.send = function (message) {
    			this._trace("Client.send", message);

    			var wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
    			wireMessage.payloadMessage = message;

    			if (this.connected) {
    			// Mark qos 1 & 2 message as "ACK required"
    			// For qos 0 message, invoke onMessageDelivered callback if there is one.
    			// Then schedule the message.
    				if (message.qos > 0) {
    					this._requires_ack(wireMessage);
    				} else if (this.onMessageDelivered) {
    					this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
    				}
    				this._schedule_message(wireMessage);
    			} else {
    			// Currently disconnected, will not schedule this message
    			// Check if reconnecting is in progress and disconnected publish is enabled.
    				if (this._reconnecting && this.disconnectedPublishing) {
    				// Check the limit which include the "required ACK" messages
    					var messageCount = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
    					if (messageCount > this.disconnectedBufferSize) {
    						throw new Error(format(ERROR.BUFFER_FULL, [this.disconnectedBufferSize]));
    					} else {
    						if (message.qos > 0) {
    						// Mark this message as "ACK required"
    							this._requires_ack(wireMessage);
    						} else {
    							wireMessage.sequence = ++this._sequence;
    							// Add messages in fifo order to array, by adding to start
    							this._buffered_msg_queue.unshift(wireMessage);
    						}
    					}
    				} else {
    					throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
    				}
    			}
    		};

    		ClientImpl.prototype.disconnect = function () {
    			this._trace("Client.disconnect");

    			if (this._reconnecting) {
    			// disconnect() function is called while reconnect is in progress.
    			// Terminate the auto reconnect process.
    				this._reconnectTimeout.cancel();
    				this._reconnectTimeout = null;
    				this._reconnecting = false;
    			}

    			if (!this.socket)
    				throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

    			var wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

    			// Run the disconnected call back as soon as the message has been sent,
    			// in case of a failure later on in the disconnect processing.
    			// as a consequence, the _disconected call back may be run several times.
    			this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

    			this._schedule_message(wireMessage);
    		};

    		ClientImpl.prototype.getTraceLog = function () {
    			if ( this._traceBuffer !== null ) {
    				this._trace("Client.getTraceLog", new Date());
    				this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
    				for (var key in this._sentMessages)
    					this._trace("_sentMessages ",key, this._sentMessages[key]);
    				for (var key in this._receivedMessages)
    					this._trace("_receivedMessages ",key, this._receivedMessages[key]);

    				return this._traceBuffer;
    			}
    		};

    		ClientImpl.prototype.startTrace = function () {
    			if ( this._traceBuffer === null ) {
    				this._traceBuffer = [];
    			}
    			this._trace("Client.startTrace", new Date(), version);
    		};

    		ClientImpl.prototype.stopTrace = function () {
    			delete this._traceBuffer;
    		};

    		ClientImpl.prototype._doConnect = function (wsurl) {
    		// When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
    			if (this.connectOptions.useSSL) {
    				var uriParts = wsurl.split(":");
    				uriParts[0] = "wss";
    				wsurl = uriParts.join(":");
    			}
    			this._wsuri = wsurl;
    			this.connected = false;



    			if (this.connectOptions.mqttVersion < 4) {
    				this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
    			} else {
    				this.socket = new WebSocket(wsurl, ["mqtt"]);
    			}
    			this.socket.binaryType = "arraybuffer";
    			this.socket.onopen = scope(this._on_socket_open, this);
    			this.socket.onmessage = scope(this._on_socket_message, this);
    			this.socket.onerror = scope(this._on_socket_error, this);
    			this.socket.onclose = scope(this._on_socket_close, this);

    			this.sendPinger = new Pinger(this, this.connectOptions.keepAliveInterval);
    			this.receivePinger = new Pinger(this, this.connectOptions.keepAliveInterval);
    			if (this._connectTimeout) {
    				this._connectTimeout.cancel();
    				this._connectTimeout = null;
    			}
    			this._connectTimeout = new Timeout(this, this.connectOptions.timeout, this._disconnected,  [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
    		};


    		// Schedule a new message to be sent over the WebSockets
    		// connection. CONNECT messages cause WebSocket connection
    		// to be started. All other messages are queued internally
    		// until this has happened. When WS connection starts, process
    		// all outstanding messages.
    		ClientImpl.prototype._schedule_message = function (message) {
    			// Add messages in fifo order to array, by adding to start
    			this._msg_queue.unshift(message);
    			// Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
    			if (this.connected) {
    				this._process_queue();
    			}
    		};

    		ClientImpl.prototype.store = function(prefix, wireMessage) {
    			var storedMessage = {type:wireMessage.type, messageIdentifier:wireMessage.messageIdentifier, version:1};

    			switch(wireMessage.type) {
    			case MESSAGE_TYPE.PUBLISH:
    				if(wireMessage.pubRecReceived)
    					storedMessage.pubRecReceived = true;

    				// Convert the payload to a hex string.
    				storedMessage.payloadMessage = {};
    				var hex = "";
    				var messageBytes = wireMessage.payloadMessage.payloadBytes;
    				for (var i=0; i<messageBytes.length; i++) {
    					if (messageBytes[i] <= 0xF)
    						hex = hex+"0"+messageBytes[i].toString(16);
    					else
    						hex = hex+messageBytes[i].toString(16);
    				}
    				storedMessage.payloadMessage.payloadHex = hex;

    				storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
    				storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
    				if (wireMessage.payloadMessage.duplicate)
    					storedMessage.payloadMessage.duplicate = true;
    				if (wireMessage.payloadMessage.retained)
    					storedMessage.payloadMessage.retained = true;

    				// Add a sequence number to sent messages.
    				if ( prefix.indexOf("Sent:") === 0 ) {
    					if ( wireMessage.sequence === undefined )
    						wireMessage.sequence = ++this._sequence;
    					storedMessage.sequence = wireMessage.sequence;
    				}
    				break;

    			default:
    				throw Error(format(ERROR.INVALID_STORED_DATA, [prefix+this._localKey+wireMessage.messageIdentifier, storedMessage]));
    			}
    			localStorage.setItem(prefix+this._localKey+wireMessage.messageIdentifier, JSON.stringify(storedMessage));
    		};

    		ClientImpl.prototype.restore = function(key) {
    			var value = localStorage.getItem(key);
    			var storedMessage = JSON.parse(value);

    			var wireMessage = new WireMessage(storedMessage.type, storedMessage);

    			switch(storedMessage.type) {
    			case MESSAGE_TYPE.PUBLISH:
    				// Replace the payload message with a Message object.
    				var hex = storedMessage.payloadMessage.payloadHex;
    				var buffer = new ArrayBuffer((hex.length)/2);
    				var byteStream = new Uint8Array(buffer);
    				var i = 0;
    				while (hex.length >= 2) {
    					var x = parseInt(hex.substring(0, 2), 16);
    					hex = hex.substring(2, hex.length);
    					byteStream[i++] = x;
    				}
    				var payloadMessage = new Message(byteStream);

    				payloadMessage.qos = storedMessage.payloadMessage.qos;
    				payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
    				if (storedMessage.payloadMessage.duplicate)
    					payloadMessage.duplicate = true;
    				if (storedMessage.payloadMessage.retained)
    					payloadMessage.retained = true;
    				wireMessage.payloadMessage = payloadMessage;

    				break;

    			default:
    				throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
    			}

    			if (key.indexOf("Sent:"+this._localKey) === 0) {
    				wireMessage.payloadMessage.duplicate = true;
    				this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
    			} else if (key.indexOf("Received:"+this._localKey) === 0) {
    				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
    			}
    		};

    		ClientImpl.prototype._process_queue = function () {
    			var message = null;

    			// Send all queued messages down socket connection
    			while ((message = this._msg_queue.pop())) {
    				this._socket_send(message);
    				// Notify listeners that message was successfully sent
    				if (this._notify_msg_sent[message]) {
    					this._notify_msg_sent[message]();
    					delete this._notify_msg_sent[message];
    				}
    			}
    		};

    		/**
    	 * Expect an ACK response for this message. Add message to the set of in progress
    	 * messages and set an unused identifier in this message.
    	 * @ignore
    	 */
    		ClientImpl.prototype._requires_ack = function (wireMessage) {
    			var messageCount = Object.keys(this._sentMessages).length;
    			if (messageCount > this.maxMessageIdentifier)
    				throw Error ("Too many messages:"+messageCount);

    			while(this._sentMessages[this._message_identifier] !== undefined) {
    				this._message_identifier++;
    			}
    			wireMessage.messageIdentifier = this._message_identifier;
    			this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
    			if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
    				this.store("Sent:", wireMessage);
    			}
    			if (this._message_identifier === this.maxMessageIdentifier) {
    				this._message_identifier = 1;
    			}
    		};

    		/**
    	 * Called when the underlying websocket has been opened.
    	 * @ignore
    	 */
    		ClientImpl.prototype._on_socket_open = function () {
    		// Create the CONNECT message object.
    			var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
    			wireMessage.clientId = this.clientId;
    			this._socket_send(wireMessage);
    		};

    		/**
    	 * Called when the underlying websocket has received a complete packet.
    	 * @ignore
    	 */
    		ClientImpl.prototype._on_socket_message = function (event) {
    			this._trace("Client._on_socket_message", event.data);
    			var messages = this._deframeMessages(event.data);
    			for (var i = 0; i < messages.length; i+=1) {
    				this._handleMessage(messages[i]);
    			}
    		};

    		ClientImpl.prototype._deframeMessages = function(data) {
    			var byteArray = new Uint8Array(data);
    			var messages = [];
    			if (this.receiveBuffer) {
    				var newData = new Uint8Array(this.receiveBuffer.length+byteArray.length);
    				newData.set(this.receiveBuffer);
    				newData.set(byteArray,this.receiveBuffer.length);
    				byteArray = newData;
    				delete this.receiveBuffer;
    			}
    			try {
    				var offset = 0;
    				while(offset < byteArray.length) {
    					var result = decodeMessage(byteArray,offset);
    					var wireMessage = result[0];
    					offset = result[1];
    					if (wireMessage !== null) {
    						messages.push(wireMessage);
    					} else {
    						break;
    					}
    				}
    				if (offset < byteArray.length) {
    					this.receiveBuffer = byteArray.subarray(offset);
    				}
    			} catch (error) {
    				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
    				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
    				return;
    			}
    			return messages;
    		};

    		ClientImpl.prototype._handleMessage = function(wireMessage) {

    			this._trace("Client._handleMessage", wireMessage);

    			try {
    				switch(wireMessage.type) {
    				case MESSAGE_TYPE.CONNACK:
    					this._connectTimeout.cancel();
    					if (this._reconnectTimeout)
    						this._reconnectTimeout.cancel();

    					// If we have started using clean session then clear up the local state.
    					if (this.connectOptions.cleanSession) {
    						for (var key in this._sentMessages) {
    							var sentMessage = this._sentMessages[key];
    							localStorage.removeItem("Sent:"+this._localKey+sentMessage.messageIdentifier);
    						}
    						this._sentMessages = {};

    						for (var key in this._receivedMessages) {
    							var receivedMessage = this._receivedMessages[key];
    							localStorage.removeItem("Received:"+this._localKey+receivedMessage.messageIdentifier);
    						}
    						this._receivedMessages = {};
    					}
    					// Client connected and ready for business.
    					if (wireMessage.returnCode === 0) {

    						this.connected = true;
    						// Jump to the end of the list of uris and stop looking for a good host.

    						if (this.connectOptions.uris)
    							this.hostIndex = this.connectOptions.uris.length;

    					} else {
    						this._disconnected(ERROR.CONNACK_RETURNCODE.code , format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
    						break;
    					}

    					// Resend messages.
    					var sequencedMessages = [];
    					for (var msgId in this._sentMessages) {
    						if (this._sentMessages.hasOwnProperty(msgId))
    							sequencedMessages.push(this._sentMessages[msgId]);
    					}

    					// Also schedule qos 0 buffered messages if any
    					if (this._buffered_msg_queue.length > 0) {
    						var msg = null;
    						while ((msg = this._buffered_msg_queue.pop())) {
    							sequencedMessages.push(msg);
    							if (this.onMessageDelivered)
    								this._notify_msg_sent[msg] = this.onMessageDelivered(msg.payloadMessage);
    						}
    					}

    					// Sort sentMessages into the original sent order.
    					var sequencedMessages = sequencedMessages.sort(function(a,b) {return a.sequence - b.sequence;} );
    					for (var i=0, len=sequencedMessages.length; i<len; i++) {
    						var sentMessage = sequencedMessages[i];
    						if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
    							var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:sentMessage.messageIdentifier});
    							this._schedule_message(pubRelMessage);
    						} else {
    							this._schedule_message(sentMessage);
    						}
    					}

    					// Execute the connectOptions.onSuccess callback if there is one.
    					// Will also now return if this connection was the result of an automatic
    					// reconnect and which URI was successfully connected to.
    					if (this.connectOptions.onSuccess) {
    						this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
    					}

    					var reconnected = false;
    					if (this._reconnecting) {
    						reconnected = true;
    						this._reconnectInterval = 1;
    						this._reconnecting = false;
    					}

    					// Execute the onConnected callback if there is one.
    					this._connected(reconnected, this._wsuri);

    					// Process all queued messages now that the connection is established.
    					this._process_queue();
    					break;

    				case MESSAGE_TYPE.PUBLISH:
    					this._receivePublish(wireMessage);
    					break;

    				case MESSAGE_TYPE.PUBACK:
    					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
    					// If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
    					if (sentMessage) {
    						delete this._sentMessages[wireMessage.messageIdentifier];
    						localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
    						if (this.onMessageDelivered)
    							this.onMessageDelivered(sentMessage.payloadMessage);
    					}
    					break;

    				case MESSAGE_TYPE.PUBREC:
    					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
    					// If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
    					if (sentMessage) {
    						sentMessage.pubRecReceived = true;
    						var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:wireMessage.messageIdentifier});
    						this.store("Sent:", sentMessage);
    						this._schedule_message(pubRelMessage);
    					}
    					break;

    				case MESSAGE_TYPE.PUBREL:
    					var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
    					localStorage.removeItem("Received:"+this._localKey+wireMessage.messageIdentifier);
    					// If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
    					if (receivedMessage) {
    						this._receiveMessage(receivedMessage);
    						delete this._receivedMessages[wireMessage.messageIdentifier];
    					}
    					// Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
    					var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier:wireMessage.messageIdentifier});
    					this._schedule_message(pubCompMessage);


    					break;

    				case MESSAGE_TYPE.PUBCOMP:
    					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
    					delete this._sentMessages[wireMessage.messageIdentifier];
    					localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
    					if (this.onMessageDelivered)
    						this.onMessageDelivered(sentMessage.payloadMessage);
    					break;

    				case MESSAGE_TYPE.SUBACK:
    					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
    					if (sentMessage) {
    						if(sentMessage.timeOut)
    							sentMessage.timeOut.cancel();
    						// This will need to be fixed when we add multiple topic support
    						if (wireMessage.returnCode[0] === 0x80) {
    							if (sentMessage.onFailure) {
    								sentMessage.onFailure(wireMessage.returnCode);
    							}
    						} else if (sentMessage.onSuccess) {
    							sentMessage.onSuccess(wireMessage.returnCode);
    						}
    						delete this._sentMessages[wireMessage.messageIdentifier];
    					}
    					break;

    				case MESSAGE_TYPE.UNSUBACK:
    					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
    					if (sentMessage) {
    						if (sentMessage.timeOut)
    							sentMessage.timeOut.cancel();
    						if (sentMessage.callback) {
    							sentMessage.callback();
    						}
    						delete this._sentMessages[wireMessage.messageIdentifier];
    					}

    					break;

    				case MESSAGE_TYPE.PINGRESP:
    				/* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
    					this.sendPinger.reset();
    					break;

    				case MESSAGE_TYPE.DISCONNECT:
    				// Clients do not expect to receive disconnect packets.
    					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
    					break;

    				default:
    					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
    				}
    			} catch (error) {
    				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
    				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
    				return;
    			}
    		};

    		/** @ignore */
    		ClientImpl.prototype._on_socket_error = function (error) {
    			if (!this._reconnecting) {
    				this._disconnected(ERROR.SOCKET_ERROR.code , format(ERROR.SOCKET_ERROR, [error.data]));
    			}
    		};

    		/** @ignore */
    		ClientImpl.prototype._on_socket_close = function () {
    			if (!this._reconnecting) {
    				this._disconnected(ERROR.SOCKET_CLOSE.code , format(ERROR.SOCKET_CLOSE));
    			}
    		};

    		/** @ignore */
    		ClientImpl.prototype._socket_send = function (wireMessage) {

    			if (wireMessage.type == 1) {
    				var wireMessageMasked = this._traceMask(wireMessage, "password");
    				this._trace("Client._socket_send", wireMessageMasked);
    			}
    			else this._trace("Client._socket_send", wireMessage);

    			this.socket.send(wireMessage.encode());
    			/* We have proved to the server we are alive. */
    			this.sendPinger.reset();
    		};

    		/** @ignore */
    		ClientImpl.prototype._receivePublish = function (wireMessage) {
    			switch(wireMessage.payloadMessage.qos) {
    			case "undefined":
    			case 0:
    				this._receiveMessage(wireMessage);
    				break;

    			case 1:
    				var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier:wireMessage.messageIdentifier});
    				this._schedule_message(pubAckMessage);
    				this._receiveMessage(wireMessage);
    				break;

    			case 2:
    				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
    				this.store("Received:", wireMessage);
    				var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier:wireMessage.messageIdentifier});
    				this._schedule_message(pubRecMessage);

    				break;

    			default:
    				throw Error("Invaild qos=" + wireMessage.payloadMessage.qos);
    			}
    		};

    		/** @ignore */
    		ClientImpl.prototype._receiveMessage = function (wireMessage) {
    			if (this.onMessageArrived) {
    				this.onMessageArrived(wireMessage.payloadMessage);
    			}
    		};

    		/**
    	 * Client has connected.
    	 * @param {reconnect} [boolean] indicate if this was a result of reconnect operation.
    	 * @param {uri} [string] fully qualified WebSocket URI of the server.
    	 */
    		ClientImpl.prototype._connected = function (reconnect, uri) {
    		// Execute the onConnected callback if there is one.
    			if (this.onConnected)
    				this.onConnected(reconnect, uri);
    		};

    		/**
    	 * Attempts to reconnect the client to the server.
       * For each reconnect attempt, will double the reconnect interval
       * up to 128 seconds.
    	 */
    		ClientImpl.prototype._reconnect = function () {
    			this._trace("Client._reconnect");
    			if (!this.connected) {
    				this._reconnecting = true;
    				this.sendPinger.cancel();
    				this.receivePinger.cancel();
    				if (this._reconnectInterval < 128)
    					this._reconnectInterval = this._reconnectInterval * 2;
    				if (this.connectOptions.uris) {
    					this.hostIndex = 0;
    					this._doConnect(this.connectOptions.uris[0]);
    				} else {
    					this._doConnect(this.uri);
    				}
    			}
    		};

    		/**
    	 * Client has disconnected either at its own request or because the server
    	 * or network disconnected it. Remove all non-durable state.
    	 * @param {errorCode} [number] the error number.
    	 * @param {errorText} [string] the error text.
    	 * @ignore
    	 */
    		ClientImpl.prototype._disconnected = function (errorCode, errorText) {
    			this._trace("Client._disconnected", errorCode, errorText);

    			if (errorCode !== undefined && this._reconnecting) {
    				//Continue automatic reconnect process
    				this._reconnectTimeout = new Timeout(this, this._reconnectInterval, this._reconnect);
    				return;
    			}

    			this.sendPinger.cancel();
    			this.receivePinger.cancel();
    			if (this._connectTimeout) {
    				this._connectTimeout.cancel();
    				this._connectTimeout = null;
    			}

    			// Clear message buffers.
    			this._msg_queue = [];
    			this._buffered_msg_queue = [];
    			this._notify_msg_sent = {};

    			if (this.socket) {
    			// Cancel all socket callbacks so that they cannot be driven again by this socket.
    				this.socket.onopen = null;
    				this.socket.onmessage = null;
    				this.socket.onerror = null;
    				this.socket.onclose = null;
    				if (this.socket.readyState === 1)
    					this.socket.close();
    				delete this.socket;
    			}

    			if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length-1) {
    			// Try the next host.
    				this.hostIndex++;
    				this._doConnect(this.connectOptions.uris[this.hostIndex]);
    			} else {

    				if (errorCode === undefined) {
    					errorCode = ERROR.OK.code;
    					errorText = format(ERROR.OK);
    				}

    				// Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
    				if (this.connected) {
    					this.connected = false;
    					// Execute the connectionLostCallback if there is one, and we were connected.
    					if (this.onConnectionLost) {
    						this.onConnectionLost({errorCode:errorCode, errorMessage:errorText, reconnect:this.connectOptions.reconnect, uri:this._wsuri});
    					}
    					if (errorCode !== ERROR.OK.code && this.connectOptions.reconnect) {
    					// Start automatic reconnect process for the very first time since last successful connect.
    						this._reconnectInterval = 1;
    						this._reconnect();
    						return;
    					}
    				} else {
    				// Otherwise we never had a connection, so indicate that the connect has failed.
    					if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
    						this._trace("Failed to connect V4, dropping back to V3");
    						this.connectOptions.mqttVersion = 3;
    						if (this.connectOptions.uris) {
    							this.hostIndex = 0;
    							this._doConnect(this.connectOptions.uris[0]);
    						} else {
    							this._doConnect(this.uri);
    						}
    					} else if(this.connectOptions.onFailure) {
    						this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext, errorCode:errorCode, errorMessage:errorText});
    					}
    				}
    			}
    		};

    		/** @ignore */
    		ClientImpl.prototype._trace = function () {
    		// Pass trace message back to client's callback function
    			if (this.traceFunction) {
    				var args = Array.prototype.slice.call(arguments);
    				for (var i in args)
    				{
    					if (typeof args[i] !== "undefined")
    						args.splice(i, 1, JSON.stringify(args[i]));
    				}
    				var record = args.join("");
    				this.traceFunction ({severity: "Debug", message: record	});
    			}

    			//buffer style trace
    			if ( this._traceBuffer !== null ) {
    				for (var i = 0, max = arguments.length; i < max; i++) {
    					if ( this._traceBuffer.length == this._MAX_TRACE_ENTRIES ) {
    						this._traceBuffer.shift();
    					}
    					if (i === 0) this._traceBuffer.push(arguments[i]);
    					else if (typeof arguments[i] === "undefined" ) this._traceBuffer.push(arguments[i]);
    					else this._traceBuffer.push("  "+JSON.stringify(arguments[i]));
    				}
    			}
    		};

    		/** @ignore */
    		ClientImpl.prototype._traceMask = function (traceObject, masked) {
    			var traceObjectMasked = {};
    			for (var attr in traceObject) {
    				if (traceObject.hasOwnProperty(attr)) {
    					if (attr == masked)
    						traceObjectMasked[attr] = "******";
    					else
    						traceObjectMasked[attr] = traceObject[attr];
    				}
    			}
    			return traceObjectMasked;
    		};

    		// ------------------------------------------------------------------------
    		// Public Programming interface.
    		// ------------------------------------------------------------------------

    		/**
    	 * The JavaScript application communicates to the server using a {@link Paho.Client} object.
    	 * <p>
    	 * Most applications will create just one Client object and then call its connect() method,
    	 * however applications can create more than one Client object if they wish.
    	 * In this case the combination of host, port and clientId attributes must be different for each Client object.
    	 * <p>
    	 * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
    	 * (even though the underlying protocol exchange might be synchronous in nature).
    	 * This means they signal their completion by calling back to the application,
    	 * via Success or Failure callback functions provided by the application on the method in question.
    	 * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
    	 * of the script that made the invocation.
    	 * <p>
    	 * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
    	 * that are defined on the {@link Paho.Client} object.
    	 * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
    	 *
    	 * @name Paho.Client
    	 *
    	 * @constructor
    	 *
    	 * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
    	 * @param {number} port - the port number to connect to - only required if host is not a URI
    	 * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
    	 * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
    	 *
    	 * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
    	 * @property {number} port - <i>read only</i> the server's port.
    	 * @property {string} path - <i>read only</i> the server's path.
    	 * @property {string} clientId - <i>read only</i> used when connecting to the server.
    	 * @property {function} onConnectionLost - called when a connection has been lost.
    	 *                            after a connect() method has succeeded.
    	 *                            Establish the call back used when a connection has been lost. The connection may be
    	 *                            lost because the client initiates a disconnect or because the server or network
    	 *                            cause the client to be disconnected. The disconnect call back may be called without
    	 *                            the connectionComplete call back being invoked if, for example the client fails to
    	 *                            connect.
    	 *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
    	 *                            <ol>
    	 *                            <li>errorCode
    	 *                            <li>errorMessage
    	 *                            </ol>
    	 * @property {function} onMessageDelivered - called when a message has been delivered.
    	 *                            All processing that this Client will ever do has been completed. So, for example,
    	 *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
    	 *                            and the message has been removed from persistent storage before this callback is invoked.
    	 *                            Parameters passed to the onMessageDelivered callback are:
    	 *                            <ol>
    	 *                            <li>{@link Paho.Message} that was delivered.
    	 *                            </ol>
    	 * @property {function} onMessageArrived - called when a message has arrived in this Paho.client.
    	 *                            Parameters passed to the onMessageArrived callback are:
    	 *                            <ol>
    	 *                            <li>{@link Paho.Message} that has arrived.
    	 *                            </ol>
    	 * @property {function} onConnected - called when a connection is successfully made to the server.
    	 *                                  after a connect() method.
    	 *                                  Parameters passed to the onConnected callback are:
    	 *                                  <ol>
    	 *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
    	 *                                  <li>URI (string) - The URI used to connect to the server.</li>
    	 *                                  </ol>
    	 * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
    	 *                                            in the event that the connection to the server is lost.
    	 * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
    	 *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
    	 * @property {function} trace - called whenever trace is called. TODO
    	 */
    		var Client = function (host, port, path, clientId) {

    			var uri;

    			if (typeof host !== "string")
    				throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

    			if (arguments.length == 2) {
    			// host: must be full ws:// uri
    			// port: clientId
    				clientId = port;
    				uri = host;
    				var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
    				if (match) {
    					host = match[4]||match[2];
    					port = parseInt(match[7]);
    					path = match[8];
    				} else {
    					throw new Error(format(ERROR.INVALID_ARGUMENT,[host,"host"]));
    				}
    			} else {
    				if (arguments.length == 3) {
    					clientId = path;
    					path = "/mqtt";
    				}
    				if (typeof port !== "number" || port < 0)
    					throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
    				if (typeof path !== "string")
    					throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

    				var ipv6AddSBracket = (host.indexOf(":") !== -1 && host.slice(0,1) !== "[" && host.slice(-1) !== "]");
    				uri = "ws://"+(ipv6AddSBracket?"["+host+"]":host)+":"+port+path;
    			}

    			var clientIdLength = 0;
    			for (var i = 0; i<clientId.length; i++) {
    				var charCode = clientId.charCodeAt(i);
    				if (0xD800 <= charCode && charCode <= 0xDBFF)  {
    					i++; // Surrogate pair.
    				}
    				clientIdLength++;
    			}
    			if (typeof clientId !== "string" || clientIdLength > 65535)
    				throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

    			var client = new ClientImpl(uri, host, port, path, clientId);

    			//Public Properties
    			Object.defineProperties(this,{
    				"host":{
    					get: function() { return host; },
    					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
    				},
    				"port":{
    					get: function() { return port; },
    					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
    				},
    				"path":{
    					get: function() { return path; },
    					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
    				},
    				"uri":{
    					get: function() { return uri; },
    					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
    				},
    				"clientId":{
    					get: function() { return client.clientId; },
    					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
    				},
    				"onConnected":{
    					get: function() { return client.onConnected; },
    					set: function(newOnConnected) {
    						if (typeof newOnConnected === "function")
    							client.onConnected = newOnConnected;
    						else
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnected, "onConnected"]));
    					}
    				},
    				"disconnectedPublishing":{
    					get: function() { return client.disconnectedPublishing; },
    					set: function(newDisconnectedPublishing) {
    						client.disconnectedPublishing = newDisconnectedPublishing;
    					}
    				},
    				"disconnectedBufferSize":{
    					get: function() { return client.disconnectedBufferSize; },
    					set: function(newDisconnectedBufferSize) {
    						client.disconnectedBufferSize = newDisconnectedBufferSize;
    					}
    				},
    				"onConnectionLost":{
    					get: function() { return client.onConnectionLost; },
    					set: function(newOnConnectionLost) {
    						if (typeof newOnConnectionLost === "function")
    							client.onConnectionLost = newOnConnectionLost;
    						else
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
    					}
    				},
    				"onMessageDelivered":{
    					get: function() { return client.onMessageDelivered; },
    					set: function(newOnMessageDelivered) {
    						if (typeof newOnMessageDelivered === "function")
    							client.onMessageDelivered = newOnMessageDelivered;
    						else
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
    					}
    				},
    				"onMessageArrived":{
    					get: function() { return client.onMessageArrived; },
    					set: function(newOnMessageArrived) {
    						if (typeof newOnMessageArrived === "function")
    							client.onMessageArrived = newOnMessageArrived;
    						else
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
    					}
    				},
    				"trace":{
    					get: function() { return client.traceFunction; },
    					set: function(trace) {
    						if(typeof trace === "function"){
    							client.traceFunction = trace;
    						}else {
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
    						}
    					}
    				},
    			});

    			/**
    		 * Connect this Messaging client to its server.
    		 *
    		 * @name Paho.Client#connect
    		 * @function
    		 * @param {object} connectOptions - Attributes used with the connection.
    		 * @param {number} connectOptions.timeout - If the connect has not succeeded within this
    		 *                    number of seconds, it is deemed to have failed.
    		 *                    The default is 30 seconds.
    		 * @param {string} connectOptions.userName - Authentication username for this connection.
    		 * @param {string} connectOptions.password - Authentication password for this connection.
    		 * @param {Paho.Message} connectOptions.willMessage - sent by the server when the client
    		 *                    disconnects abnormally.
    		 * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
    		 *                    there is no activity for this number of seconds.
    		 *                    The default value of 60 seconds is assumed if not set.
    		 * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
    		 *                    persistent state is deleted on successful connect.
    		 * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
    		 * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
    		 * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
    		 *                    has been received from the server.
    		 * A single response object parameter is passed to the onSuccess callback containing the following fields:
    		 * <ol>
    		 * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
    		 * </ol>
    	 * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
    		 * A single response object parameter is passed to the onFailure callback containing the following fields:
    		 * <ol>
    		 * <li>invocationContext as passed in to the onFailure method in the connectOptions.
    		 * <li>errorCode a number indicating the nature of the error.
    		 * <li>errorMessage text describing the error.
    		 * </ol>
    	 * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
    		 * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
    		 * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
    		 * one of then succeeds.
    	 * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
    		 * is not used.
    	 * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
    	 * to the server if the connection is lost.
    	 *<ul>
    	 *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
    	 * connection is lost.</li>
    	 *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
    	 * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
    	 * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
    	 *</ul>
    	 * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
    	 *<ul>
    	 *<li>3 - MQTT V3.1</li>
    	 *<li>4 - MQTT V3.1.1</li>
    	 *</ul>
    	 * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
    	 * selected MQTT Version or will fail to connect.
    	 * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
    	 * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
    	 * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
    	 * the hosts array will be converted to uris and will overwrite this property.
    		 * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
    		 * or disconnected before calling connect for a second or subsequent time.
    		 */
    			this.connect = function (connectOptions) {
    				connectOptions = connectOptions || {} ;
    				validate(connectOptions,  {timeout:"number",
    					userName:"string",
    					password:"string",
    					willMessage:"object",
    					keepAliveInterval:"number",
    					cleanSession:"boolean",
    					useSSL:"boolean",
    					invocationContext:"object",
    					onSuccess:"function",
    					onFailure:"function",
    					hosts:"object",
    					ports:"object",
    					reconnect:"boolean",
    					mqttVersion:"number",
    					mqttVersionExplicit:"boolean",
    					uris: "object"});

    				// If no keep alive interval is set, assume 60 seconds.
    				if (connectOptions.keepAliveInterval === undefined)
    					connectOptions.keepAliveInterval = 60;

    				if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
    					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
    				}

    				if (connectOptions.mqttVersion === undefined) {
    					connectOptions.mqttVersionExplicit = false;
    					connectOptions.mqttVersion = 4;
    				} else {
    					connectOptions.mqttVersionExplicit = true;
    				}

    				//Check that if password is set, so is username
    				if (connectOptions.password !== undefined && connectOptions.userName === undefined)
    					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]));

    				if (connectOptions.willMessage) {
    					if (!(connectOptions.willMessage instanceof Message))
    						throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
    					// The will message must have a payload that can be represented as a string.
    					// Cause the willMessage to throw an exception if this is not the case.
    					connectOptions.willMessage.stringPayload = null;

    					if (typeof connectOptions.willMessage.destinationName === "undefined")
    						throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
    				}
    				if (typeof connectOptions.cleanSession === "undefined")
    					connectOptions.cleanSession = true;
    				if (connectOptions.hosts) {

    					if (!(connectOptions.hosts instanceof Array) )
    						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
    					if (connectOptions.hosts.length <1 )
    						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

    					var usingURIs = false;
    					for (var i = 0; i<connectOptions.hosts.length; i++) {
    						if (typeof connectOptions.hosts[i] !== "string")
    							throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
    						if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
    							if (i === 0) {
    								usingURIs = true;
    							} else if (!usingURIs) {
    								throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
    							}
    						} else if (usingURIs) {
    							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
    						}
    					}

    					if (!usingURIs) {
    						if (!connectOptions.ports)
    							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
    						if (!(connectOptions.ports instanceof Array) )
    							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
    						if (connectOptions.hosts.length !== connectOptions.ports.length)
    							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

    						connectOptions.uris = [];

    						for (var i = 0; i<connectOptions.hosts.length; i++) {
    							if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
    								throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
    							var host = connectOptions.hosts[i];
    							var port = connectOptions.ports[i];

    							var ipv6 = (host.indexOf(":") !== -1);
    							uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
    							connectOptions.uris.push(uri);
    						}
    					} else {
    						connectOptions.uris = connectOptions.hosts;
    					}
    				}

    				client.connect(connectOptions);
    			};

    			/**
    		 * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
    		 *
    		 * @name Paho.Client#subscribe
    		 * @function
    		 * @param {string} filter describing the destinations to receive messages from.
    		 * <br>
    		 * @param {object} subscribeOptions - used to control the subscription
    		 *
    		 * @param {number} subscribeOptions.qos - the maximum qos of any publications sent
    		 *                                  as a result of making this subscription.
    		 * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
    		 *                                  or onFailure callback.
    		 * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
    		 *                                  has been received from the server.
    		 *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
    		 *                                  <ol>
    		 *                                  <li>invocationContext if set in the subscribeOptions.
    		 *                                  </ol>
    		 * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
    		 *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
    		 *                                  <ol>
    		 *                                  <li>invocationContext - if set in the subscribeOptions.
    		 *                                  <li>errorCode - a number indicating the nature of the error.
    		 *                                  <li>errorMessage - text describing the error.
    		 *                                  </ol>
    		 * @param {number} subscribeOptions.timeout - which, if present, determines the number of
    		 *                                  seconds after which the onFailure calback is called.
    		 *                                  The presence of a timeout does not prevent the onSuccess
    		 *                                  callback from being called when the subscribe completes.
    		 * @throws {InvalidState} if the client is not in connected state.
    		 */
    			this.subscribe = function (filter, subscribeOptions) {
    				if (typeof filter !== "string" && filter.constructor !== Array)
    					throw new Error("Invalid argument:"+filter);
    				subscribeOptions = subscribeOptions || {} ;
    				validate(subscribeOptions,  {qos:"number",
    					invocationContext:"object",
    					onSuccess:"function",
    					onFailure:"function",
    					timeout:"number"
    				});
    				if (subscribeOptions.timeout && !subscribeOptions.onFailure)
    					throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
    				if (typeof subscribeOptions.qos !== "undefined" && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
    					throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
    				client.subscribe(filter, subscribeOptions);
    			};

    		/**
    		 * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
    		 *
    		 * @name Paho.Client#unsubscribe
    		 * @function
    		 * @param {string} filter - describing the destinations to receive messages from.
    		 * @param {object} unsubscribeOptions - used to control the subscription
    		 * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
    											  or onFailure callback.
    		 * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
    		 *                                    A single response object parameter is passed to the
    		 *                                    onSuccess callback containing the following fields:
    		 *                                    <ol>
    		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
    		 *                                    </ol>
    		 * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
    		 *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
    		 *                                    <ol>
    		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
    		 *                                    <li>errorCode - a number indicating the nature of the error.
    		 *                                    <li>errorMessage - text describing the error.
    		 *                                    </ol>
    		 * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
    		 *                                    after which the onFailure callback is called. The presence of
    		 *                                    a timeout does not prevent the onSuccess callback from being
    		 *                                    called when the unsubscribe completes
    		 * @throws {InvalidState} if the client is not in connected state.
    		 */
    			this.unsubscribe = function (filter, unsubscribeOptions) {
    				if (typeof filter !== "string" && filter.constructor !== Array)
    					throw new Error("Invalid argument:"+filter);
    				unsubscribeOptions = unsubscribeOptions || {} ;
    				validate(unsubscribeOptions,  {invocationContext:"object",
    					onSuccess:"function",
    					onFailure:"function",
    					timeout:"number"
    				});
    				if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
    					throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
    				client.unsubscribe(filter, unsubscribeOptions);
    			};

    			/**
    		 * Send a message to the consumers of the destination in the Message.
    		 *
    		 * @name Paho.Client#send
    		 * @function
    		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
    		 * 					   - If it is the only parameter, used as Paho.Message object.
    		 * @param {String|ArrayBuffer} payload - The message data to be sent.
    		 * @param {number} qos The Quality of Service used to deliver the message.
    		 * 		<dl>
    		 * 			<dt>0 Best effort (default).
    		 *     			<dt>1 At least once.
    		 *     			<dt>2 Exactly once.
    		 * 		</dl>
    		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
    		 *                     to both current and future subscriptions.
    		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
    		 *                     A received message has the retained boolean set to true if the message was published
    		 *                     with the retained boolean set to true
    		 *                     and the subscrption was made after the message has been published.
    		 * @throws {InvalidState} if the client is not connected.
    		 */
    			this.send = function (topic,payload,qos,retained) {
    				var message ;

    				if(arguments.length === 0){
    					throw new Error("Invalid argument."+"length");

    				}else if(arguments.length == 1) {

    					if (!(topic instanceof Message) && (typeof topic !== "string"))
    						throw new Error("Invalid argument:"+ typeof topic);

    					message = topic;
    					if (typeof message.destinationName === "undefined")
    						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
    					client.send(message);

    				}else {
    				//parameter checking in Message object
    					message = new Message(payload);
    					message.destinationName = topic;
    					if(arguments.length >= 3)
    						message.qos = qos;
    					if(arguments.length >= 4)
    						message.retained = retained;
    					client.send(message);
    				}
    			};

    			/**
    		 * Publish a message to the consumers of the destination in the Message.
    		 * Synonym for Paho.Mqtt.Client#send
    		 *
    		 * @name Paho.Client#publish
    		 * @function
    		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
    		 * 					   - If it is the only parameter, used as Paho.Message object.
    		 * @param {String|ArrayBuffer} payload - The message data to be published.
    		 * @param {number} qos The Quality of Service used to deliver the message.
    		 * 		<dl>
    		 * 			<dt>0 Best effort (default).
    		 *     			<dt>1 At least once.
    		 *     			<dt>2 Exactly once.
    		 * 		</dl>
    		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
    		 *                     to both current and future subscriptions.
    		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
    		 *                     A received message has the retained boolean set to true if the message was published
    		 *                     with the retained boolean set to true
    		 *                     and the subscrption was made after the message has been published.
    		 * @throws {InvalidState} if the client is not connected.
    		 */
    			this.publish = function(topic,payload,qos,retained) {
    				var message ;

    				if(arguments.length === 0){
    					throw new Error("Invalid argument."+"length");

    				}else if(arguments.length == 1) {

    					if (!(topic instanceof Message) && (typeof topic !== "string"))
    						throw new Error("Invalid argument:"+ typeof topic);

    					message = topic;
    					if (typeof message.destinationName === "undefined")
    						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
    					client.send(message);

    				}else {
    					//parameter checking in Message object
    					message = new Message(payload);
    					message.destinationName = topic;
    					if(arguments.length >= 3)
    						message.qos = qos;
    					if(arguments.length >= 4)
    						message.retained = retained;
    					client.send(message);
    				}
    			};

    			/**
    		 * Normal disconnect of this Messaging client from its server.
    		 *
    		 * @name Paho.Client#disconnect
    		 * @function
    		 * @throws {InvalidState} if the client is already disconnected.
    		 */
    			this.disconnect = function () {
    				client.disconnect();
    			};

    			/**
    		 * Get the contents of the trace log.
    		 *
    		 * @name Paho.Client#getTraceLog
    		 * @function
    		 * @return {Object[]} tracebuffer containing the time ordered trace records.
    		 */
    			this.getTraceLog = function () {
    				return client.getTraceLog();
    			};

    			/**
    		 * Start tracing.
    		 *
    		 * @name Paho.Client#startTrace
    		 * @function
    		 */
    			this.startTrace = function () {
    				client.startTrace();
    			};

    			/**
    		 * Stop tracing.
    		 *
    		 * @name Paho.Client#stopTrace
    		 * @function
    		 */
    			this.stopTrace = function () {
    				client.stopTrace();
    			};

    			this.isConnected = function() {
    				return client.connected;
    			};
    		};

    		/**
    	 * An application message, sent or received.
    	 * <p>
    	 * All attributes may be null, which implies the default values.
    	 *
    	 * @name Paho.Message
    	 * @constructor
    	 * @param {String|ArrayBuffer} payload The message data to be sent.
    	 * <p>
    	 * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
    	 * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
    	 * <p>
    	 * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
    	 *                    (for messages about to be sent) or the name of the destination from which the message has been received.
    	 *                    (for messages received by the onMessage function).
    	 * <p>
    	 * @property {number} qos The Quality of Service used to deliver the message.
    	 * <dl>
    	 *     <dt>0 Best effort (default).
    	 *     <dt>1 At least once.
    	 *     <dt>2 Exactly once.
    	 * </dl>
    	 * <p>
    	 * @property {Boolean} retained If true, the message is to be retained by the server and delivered
    	 *                     to both current and future subscriptions.
    	 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
    	 *                     A received message has the retained boolean set to true if the message was published
    	 *                     with the retained boolean set to true
    	 *                     and the subscrption was made after the message has been published.
    	 * <p>
    	 * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
    	 *                     This is only set on messages received from the server.
    	 *
    	 */
    		var Message = function (newPayload) {
    			var payload;
    			if (   typeof newPayload === "string" ||
    		newPayload instanceof ArrayBuffer ||
    		(ArrayBuffer.isView(newPayload) && !(newPayload instanceof DataView))
    			) {
    				payload = newPayload;
    			} else {
    				throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
    			}

    			var destinationName;
    			var qos = 0;
    			var retained = false;
    			var duplicate = false;

    			Object.defineProperties(this,{
    				"payloadString":{
    					enumerable : true,
    					get : function () {
    						if (typeof payload === "string")
    							return payload;
    						else
    							return parseUTF8(payload, 0, payload.length);
    					}
    				},
    				"payloadBytes":{
    					enumerable: true,
    					get: function() {
    						if (typeof payload === "string") {
    							var buffer = new ArrayBuffer(UTF8Length(payload));
    							var byteStream = new Uint8Array(buffer);
    							stringToUTF8(payload, byteStream, 0);

    							return byteStream;
    						} else {
    							return payload;
    						}
    					}
    				},
    				"destinationName":{
    					enumerable: true,
    					get: function() { return destinationName; },
    					set: function(newDestinationName) {
    						if (typeof newDestinationName === "string")
    							destinationName = newDestinationName;
    						else
    							throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
    					}
    				},
    				"qos":{
    					enumerable: true,
    					get: function() { return qos; },
    					set: function(newQos) {
    						if (newQos === 0 || newQos === 1 || newQos === 2 )
    							qos = newQos;
    						else
    							throw new Error("Invalid argument:"+newQos);
    					}
    				},
    				"retained":{
    					enumerable: true,
    					get: function() { return retained; },
    					set: function(newRetained) {
    						if (typeof newRetained === "boolean")
    							retained = newRetained;
    						else
    							throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
    					}
    				},
    				"topic":{
    					enumerable: true,
    					get: function() { return destinationName; },
    					set: function(newTopic) {destinationName=newTopic;}
    				},
    				"duplicate":{
    					enumerable: true,
    					get: function() { return duplicate; },
    					set: function(newDuplicate) {duplicate=newDuplicate;}
    				}
    			});
    		};

    		// Module contents.
    		return {
    			Client: Client,
    			Message: Message
    		};
    	// eslint-disable-next-line no-nested-ternary
    	})(typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    	return PahoMQTT;
    });
    });

    function GameWrapperError(message) {
        this.message = message;
        this.stack = (new Error()).stack;
    }
    GameWrapperError.prototype = Object.create(Error.prototype);
    GameWrapperError.prototype.name = "GameWrapperError";

    var __extends$9 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var DummyAdapter = (function (_super) {
        __extends$9(DummyAdapter, _super);
        function DummyAdapter() {
            var _this = _super.call(this, { gameId: '', gameConfig: {}, params: {} }) || this;
            _this.realityCheck = false;
            _this.configured = Promise.reject("Trying to use RGS before GameWrapper was initialized.");
            _this.configured.catch(function () { });
            return _this;
        }
        DummyAdapter.prototype.getJwt = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.setRealityCheck = function (activate) {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.setGameMode = function (history) {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getGame = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getStakeOptions = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getDefaultStake = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.limitStakes = function (limits) {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getAccount = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getTicket = function (ticketId) {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getUnsettledTicket = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.purchaseTicket = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getTicketData = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.setTicketData = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.settleTicket = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.refresh = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.spin = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.freeSpin = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.close = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getGamble = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.gamble = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.sendCustomRequest = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getJackpots = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getAllJackpots = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        DummyAdapter.prototype.getJackpotWins = function () {
            throw new Error("Trying to use RGS before GameWrapper was initialized.");
        };
        return DummyAdapter;
    }(RgsAdapter));

    var __extends$8 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$3 = (undefined && undefined.__assign) || function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var KenoAdapter = (function (_super) {
        __extends$8(KenoAdapter, _super);
        function KenoAdapter(config) {
            var _this = _super.call(this, config, KenoRgs) || this;
            _this.denominationList = [];
            _this.denominationOptions = [];
            _this.types.push('keno');
            return _this;
        }
        KenoAdapter.prototype.applyGameConfig = function () {
            _super.prototype.applyGameConfig.call(this);
            this.denominationList = this.gameConfig.denomValues;
        };
        KenoAdapter.prototype.getAllDenominations = function () {
            return this.denominationList;
        };
        KenoAdapter.prototype.getDenominationOptions = function () {
            var _this = this;
            return this.denominationOptions.length > 0 && !this.isHistoryReplay
                ? this.denominationList.filter(function (el) { return _this.denominationOptions.indexOf(el) > -1; })
                : this.denominationList;
        };
        KenoAdapter.prototype.setDenominationLimits = function (limits) {
            this.denominationOptions = limits;
        };
        KenoAdapter.prototype.getLimits = function () {
            return __assign$3(__assign$3({}, _super.prototype.getLimits.call(this)), { denominations: this.getDenominationOptions() });
        };
        KenoAdapter.prototype.setLimits = function (limits) {
            _super.prototype.setLimits.call(this, limits);
            if (limits.denominations) {
                this.setDenominationLimits(limits.denominations);
            }
        };
        return KenoAdapter;
    }(SimpleFlowAdapter));
    var KenoRgs = (function (_super) {
        __extends$8(KenoRgs, _super);
        function KenoRgs(config) {
            var service = {
                demo: 'PlayForFunKenoService',
                real: 'KenoService'
            };
            return _super.call(this, __assign$3(__assign$3({}, config), { gameService: service })) || this;
        }
        KenoRgs.prototype.spin = function (bet, selectedNumbers) {
            var methodName = this.isUsingBonusFunds() ? 'SpinUsingBonus' : 'Spin';
            return this.invoke(this.gameService, methodName, [this.gameId, bet, selectedNumbers]).then(this.parseData);
        };
        KenoRgs.prototype.freeSpin = function (ticketId, selectedNumbers) {
            return this.invoke(this.gameService, 'FreeSpin', [ticketId, selectedNumbers]).then(this.parseData);
        };
        return KenoRgs;
    }(SimpleFlowRgs));

    var __extends$7 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$2 = (undefined && undefined.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var CardsAdapter = (function (_super) {
        __extends$7(CardsAdapter, _super);
        function CardsAdapter(config) {
            var _this = _super.call(this, config, CardsRgs) || this;
            _this.types.push('cards');
            return _this;
        }
        CardsAdapter.prototype.execute = function (commands) {
            return this.rgs.execute(commands);
        };
        CardsAdapter.prototype.getPreviousTickets = function () {
            return this.rgs.getPreviousTickets();
        };
        CardsAdapter.prototype.getGame = function () {
            return this.rgs.getGame();
        };
        return CardsAdapter;
    }(SimpleFlowAdapter));
    var CardsRgs = (function (_super) {
        __extends$7(CardsRgs, _super);
        function CardsRgs(config) {
            var service = {
                demo: 'PlayForFunCardsService',
                real: 'CardsService'
            };
            return _super.call(this, __assign$2(__assign$2({}, config), { gameService: service })) || this;
        }
        CardsRgs.prototype.spin = function (bet, selectedCards) {
            var methodName = this.isUsingBonusFunds() ? 'SpinUsingBonus' : 'Spin';
            return this.invoke(this.gameService, methodName, [this.gameId, bet, selectedCards]).then(this.parseData);
        };
        CardsRgs.prototype.freeSpin = function (ticketId, selectedCards) {
            return this.invoke(this.gameService, 'FreeSpin', [ticketId, selectedCards]).then(this.parseData);
        };
        CardsRgs.prototype.execute = function (commands) {
            return this.invoke(this.gameService, 'Execute', [this.gameId, commands]).then(this.parseData);
        };
        CardsRgs.prototype.getPreviousTickets = function () {
            return this.invoke(this.gameService, 'GetPreviousTickets', [this.gameId]).then(this.parseData);
        };
        CardsRgs.prototype.getGame = function () {
            return this.invoke('GameService', 'GetGame', [this.gameId]).then(this.parseData);
        };
        return CardsRgs;
    }(SimpleFlowRgs));

    var __extends$6 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var tryCount = 0;
    var TableGameAdapter = (function (_super) {
        __extends$6(TableGameAdapter, _super);
        function TableGameAdapter(config) {
            var _this = _super.call(this, config, TableGameRgs) || this;
            _this.nextAction = 'refresh';
            _this.plugins = {
                'refresh': [],
                'play': [handleWalletMessages('postpone', 'play')],
                'move': [handleWalletMessages('postpone', 'move')],
                'close': [handleWalletMessages('postpone')],
                'get-account': [handleWalletMessages('postponeIfInRound')],
                'get-ticket': [],
                'get-gamble': [],
                'gamble': [],
                'get-jackpots': [],
                'get-all-jackpots': [],
                'get-jackpot-wins': [],
                'get-jackpot-url': [],
                'get-bonus-offer': [],
                'send-custom-request': [],
            };
            _this.types.push('table-game');
            return _this;
        }
        TableGameAdapter.prototype.applyGameConfig = function () {
            _super.prototype.applyGameConfig.call(this);
            this.stakeList = this.gameConfig.stakeValues;
            this.defaultStake = this.gameConfig.defaultStake;
        };
        TableGameAdapter.prototype.applyGameData = function (data) {
            this.ticketId = data.game.ticketId;
            this.nextAction = data.game.nextAction;
        };
        TableGameAdapter.prototype.initGame = function () {
            return this.refresh();
        };
        TableGameAdapter.prototype.purchase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.play(args[0], args[1], args[2]);
        };
        TableGameAdapter.prototype.settle = function () {
            return this.close(this.ticketId);
        };
        TableGameAdapter.prototype.getGame = function () {
            var _this = this;
            return this.rgs.getGame().then(function (data) {
                var _a;
                if (Array.isArray(data.ticketPrice)) {
                    _this.stakeList = data.ticketPrice;
                }
                if (typeof ((_a = data.clientConfiguration) === null || _a === void 0 ? void 0 : _a.defaultBet) === 'number') {
                    _this.defaultStake = data.clientConfiguration.defaultBet;
                }
                return data;
            });
        };
        TableGameAdapter.prototype.getTicket = function (ticketId) {
            var _this = this;
            return _super.prototype.getTicket.call(this, ticketId).then(function (ticket) {
                var _a;
                (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                return ticket;
            });
        };
        TableGameAdapter.prototype.isRecoverableFlowError = function (reason) {
            return reason.error === 'moveAvailable' || reason.error === 'noMoveAvailable';
        };
        TableGameAdapter.prototype.refresh = function () {
            var _this = this;
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return this.rgs.refresh()
                .then(function (data) {
                var _a;
                _this.applyGameData(data);
                (_a = _this.resolveConfigured) === null || _a === void 0 ? void 0 : _a.call(_this);
                return data;
            })
                .then(function (data) { return _this.execPlugins('refresh', data); })
                .then(function (data) {
                _this.dispatchEvent('game-data-received', data);
                return data;
            })
                .catch(function (reason) { return _this.handleError(reason); });
        };
        TableGameAdapter.prototype.play = function (betType, bet, playerSelection) {
            var _this = this;
            if (playerSelection === void 0) { playerSelection = null; }
            if (this.nextAction !== 'play') {
                console.warn("Calling 'play', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.realityCheck) {
                RgsAdapter.blockRequests = true;
                RgsAdapter.blockReason = 'realityCheck';
                var reason = { error: 'realityCheck' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return getMessagesHandled()
                .then(function () {
                if (tryCount === 0) {
                    _this.dispatchEvent('spin-started');
                    _this.createFinishPromise();
                    _this.dispatchEvent('close-promise-created', _this.resolveFinish);
                }
                tryCount++;
            })
                .then(function () { return _this.rgs.play(betType, bet, playerSelection); })
                .catch(function (reason) { return _this.tryRetryPurchase(reason, tryCount, [betType, bet, playerSelection]); })
                .then(function (data) {
                tryCount = 0;
                _this.ticketId = data.game.ticketId;
                _this.nextAction = data.game.nextAction;
                return data;
            })
                .then(function (data) { return _this.execPlugins('play', data); })
                .then(function (data) {
                if (!WalletMessage.exists(data, _this.getJwt())) {
                    _this.resolveFinish();
                }
                _this.dispatchEvent('play-done', data);
                return data;
            })
                .catch(function (reason) {
                tryCount = 0;
                if (_this.isRecoverableFlowError(reason)) {
                    return _this.refresh();
                }
                _this.nextAction = 'refresh';
                return _this.handleError(reason, reason.error !== 'insufficientFunds');
            });
        };
        TableGameAdapter.prototype.move = function (playerSelection, ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            if (this.nextAction !== 'move') {
                console.warn("Calling 'move', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            return this.rgs.move(ticketId, playerSelection)
                .then(function (data) {
                _this.nextAction = data.game.nextAction;
                return data;
            })
                .then(function (data) { return _this.execPlugins('move', data); })
                .then(function (data) {
                _this.dispatchEvent('move-done', data);
                return data;
            })
                .catch(function (reason) {
                if (_this.isRecoverableFlowError(reason)) {
                    return _this.refresh();
                }
                _this.nextAction = 'refresh';
                return _this.handleError(reason);
            });
        };
        TableGameAdapter.prototype.close = function (ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = this.ticketId; }
            if (this.nextAction !== 'close') {
                console.warn("Calling 'close', but next action is ".concat(this.nextAction));
            }
            if (RgsAdapter.blockRequests) {
                var reason = { error: 'requestBlocked' };
                this.dispatchError(reason);
                return Promise.reject(reason);
            }
            if (this.isHistoryReplay) {
                return Promise.reject({ error: 'historyReplay' });
            }
            var settledDataPromise = this.rgs.close(ticketId)
                .then(function (data) {
                _this.applyGameData(data);
                _this.ticketId = null;
                return data;
            })
                .then(function (data) { return __awaiter$2(_this, void 0, void 0, function () {
                return __generator$2(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.rgs.setCachedTicketData(ticketId)];
                        case 1:
                            _a.sent();
                            return [2, data];
                    }
                });
            }); })
                .then(function (data) { return _this.execPlugins('close', data); })
                .then(function (data) {
                _this.dispatchEvent('ticket-settled', data);
                return data;
            })
                .then(function (data) {
                if (_this.realityCheck) {
                    RgsAdapter.blockRequests = true;
                    RgsAdapter.blockReason = 'realityCheck';
                    _this.dispatchError({ error: 'realityCheck' });
                }
                return data;
            });
            var finishGameRoundPromise = Promise.all([settledDataPromise, this.controlledFinishPromise]);
            finishGameRoundPromise.then(function () { return startMessageQueueExecution(_this); });
            return finishGameRoundPromise
                .then(function (result) { return result[0]; })
                .catch(function (reason) {
                if (_this.isRecoverableFlowError(reason)) {
                    return _this.refresh();
                }
                _this.nextAction = 'refresh';
                return _this.handleError(reason);
            });
        };
        return TableGameAdapter;
    }(RgsAdapter));
    var TableGameRgs = (function (_super) {
        __extends$6(TableGameRgs, _super);
        function TableGameRgs(config) {
            var service = {
                demo: 'PlayForFunTableGameService',
                real: 'TableGameService',
            };
            return _super.call(this, __assign$1(__assign$1({}, config), { gameService: service })) || this;
        }
        TableGameRgs.prototype.refresh = function () {
            return this.invoke(this.gameService, 'Refresh', [this.gameId]).then(this.parseData);
        };
        TableGameRgs.prototype.getTicket = function (ticketId) {
            return this.invoke(this.gameService, 'GetTicket', [ticketId]).then(this.parseData);
        };
        TableGameRgs.prototype.play = function (betType, bet, playerSelection) {
            if (playerSelection === void 0) { playerSelection = null; }
            var methodName = this.isUsingBonusFunds() ? 'PlayUsingBonus' : 'Play';
            return this.invoke(this.gameService, methodName, [this.gameId, betType, bet, playerSelection]).then(this.parseData);
        };
        TableGameRgs.prototype.move = function (ticketId, playerSelection) {
            return this.invoke(this.gameService, 'Move', [ticketId, playerSelection]).then(this.parseData);
        };
        TableGameRgs.prototype.close = function (ticketId) {
            return this.invoke(this.gameService, 'Close', [ticketId]).then(this.parseData);
        };
        TableGameRgs.prototype.getGame = function () {
            return this.invoke('GameService', 'GetGame', [this.gameId]).then(this.parseData);
        };
        return TableGameRgs;
    }(Rgs));

    var __extends$5 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var RealityCheck = (function (_super) {
        __extends$5(RealityCheck, _super);
        function RealityCheck(intervalSeconds, remainingSeconds, elapsedSeconds, url, historyUrl) {
            var _this = _super.call(this) || this;
            _this.startTime = 0;
            _this.startTime = Date.now() - elapsedSeconds * 1000;
            _this.url = url;
            _this.historyUrl = historyUrl;
            _this.intervalSeconds = intervalSeconds;
            if (intervalSeconds < 0) {
                console.error('Invalid reality check interval. Reality check will be disabled.');
            }
            if (Number.isNaN(remainingSeconds)) {
                remainingSeconds = intervalSeconds - elapsedSeconds;
            }
            remainingSeconds = Math.max(0, remainingSeconds);
            setTimeout(_this.doRealityCheck.bind(_this, remainingSeconds), remainingSeconds * 1000);
            return _this;
        }
        RealityCheck.prototype.getUrl = function () {
            return this.url;
        };
        RealityCheck.prototype.getHistoryUrl = function () {
            return this.historyUrl;
        };
        RealityCheck.prototype.getMessage = function () {
            var elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            var minutes = Math.round(elapsedTime / 60);
            return Strings.REALITY_CHECK_INFO.replace('{{minutes}}', "".concat(minutes));
        };
        RealityCheck.prototype.resolve = function () {
            this.dispatchEvent('reality-check-resolved');
            if (this.intervalSeconds > 0) {
                setTimeout(this.doRealityCheck.bind(this), this.intervalSeconds * 1000);
            }
        };
        RealityCheck.prototype.doRealityCheck = function () {
            this.dispatchEvent('reality-check');
        };
        return RealityCheck;
    }(CapabilitiesHost));

    var __extends$4 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var MAX_PRECISION = 3;
    var Autoplay = (function (_super) {
        __extends$4(Autoplay, _super);
        function Autoplay(wrapper) {
            var _this = _super.call(this) || this;
            _this.spinsLeft = 0;
            _this.isActive = false;
            _this.wonAmount = 0;
            _this.totalWonAmount = 0;
            _this.lossAmount = 0;
            _this.isJackpotWin = false;
            _this.plugins = {
                'unexpected-error-on-spin': [],
            };
            _this.wrapper = wrapper;
            var spinRequestInProgress = false;
            wrapper.rgs.on('spin-started', function () { return spinRequestInProgress = true; });
            wrapper.rgs.on('spin-done', function (_a) {
                var data = _a.detail;
                spinRequestInProgress = false;
                if (_this.isActive) {
                    if (data.game.action === 'spin') {
                        --_this.spinsLeft;
                    }
                    _this.isJackpotWin = data.j && data.j.length > 0;
                }
            });
            wrapper.rgs.on('ticket-purchased', function () { return --_this.spinsLeft; });
            wrapper.rgs.on('ticket-settled', function (data) { return getMessagesHandled().then(function () { return requestAnimationFrame(function () {
                var _a, _b;
                if (_this.isActive) {
                    var gameData = data.detail.game || data.detail;
                    _this.wonAmount = (_a = gameData.totalWin) !== null && _a !== void 0 ? _a : gameData.winAmount;
                    _this.totalWonAmount += _this.wonAmount;
                    var bet = (_b = gameData.totalBet) !== null && _b !== void 0 ? _b : gameData.ticketPrice;
                    _this.lossAmount = _this.lossAmount + bet - _this.wonAmount;
                    var precision = bet < 10 ? MAX_PRECISION : 0;
                    var factor = Math.pow(10, precision);
                    if (_this.settings.stopOnJackpot && _this.isJackpotWin) {
                        _this.stop('stop-on-jackpot');
                    }
                    else if (Math.round(_this.settings.singleWinLimit * factor) <= Math.round(_this.wonAmount * factor)) {
                        _this.stop('single-winlimit-reached');
                    }
                    else if (Math.round(_this.settings.winLimit * factor) <= Math.round(_this.totalWonAmount * factor)) {
                        _this.stop('winlimit-reached');
                    }
                    else if (_this.settings.stopOnWin && Math.round(_this.wonAmount * factor) > 0) {
                        _this.stop('stop-on-win');
                    }
                    else if (_this.spinsLeft <= 0) {
                        _this.stop('spins-complete');
                    }
                    else if (Math.round(_this.settings.lossLimit * factor) < Math.round((_this.lossAmount + bet) * factor)) {
                        _this.stop('losslimit-reached');
                    }
                    else if (_this.settings.stopFromLobby) {
                        _this.settings.stopFromLobby = false;
                    }
                    else {
                        _this.dispatchEvent('autoplay-next', _this.spinsLeft);
                    }
                }
            }); }); });
            wrapper.rgs.on('error', function (event) { return __awaiter$1(_this, void 0, void 0, function () {
                var reason, pluginData;
                return __generator$1(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reason = event.detail;
                            if (!this.isActive) return [3, 3];
                            if (reason.error === 'realityCheck') {
                                this.stop('reality-check');
                                return [2];
                            }
                            if (!spinRequestInProgress) return [3, 3];
                            if (!(reason.error === 'insufficientFunds')) return [3, 1];
                            this.stop('insufficient-funds');
                            return [3, 3];
                        case 1:
                            pluginData = { reason: reason };
                            return [4, this.execPlugins('unexpected-error-on-spin', pluginData)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            }); });
            return _this;
        }
        Autoplay.prototype.start = function (settings) {
            if (this.wrapper.rgs.is(TableGameAdapter)) {
                throw new GameWrapperError('Autoplay is not supported for `table-game` gameType.');
            }
            if (!settings.lossLimit) {
                settings.lossLimit = Infinity;
            }
            if (!settings.winLimit) {
                settings.winLimit = Infinity;
            }
            if (!settings.singleWinLimit) {
                settings.singleWinLimit = Infinity;
            }
            if (!settings.stopOnWin) {
                settings.stopOnWin = false;
            }
            if (!settings.stopOnJackpot) {
                settings.stopOnJackpot = false;
            }
            if (!this.validateSettings(settings)) {
                return;
            }
            this.wonAmount = 0;
            this.lossAmount = 0;
            this.totalWonAmount = 0;
            this.isJackpotWin = false;
            this.spinsLeft = settings.spins;
            this.isActive = true;
            this.settings = Object.assign({}, settings);
            this.dispatchEvent('autoplay-started', settings);
        };
        Autoplay.prototype.stop = function (reason) {
            if (reason === void 0) { reason = ''; }
            this.wonAmount = 0;
            this.lossAmount = 0;
            this.totalWonAmount = 0;
            this.spinsLeft = 0;
            this.settings = null;
            this.isActive = false;
            this.dispatchEvent('autoplay-stopped', reason);
        };
        Autoplay.prototype.validateSettings = function (settings) {
            var _a, _b;
            if (settings.lossLimit < this.wrapper.getBet()) {
                this.dispatchEvent('losslimit-too-low');
                return false;
            }
            if (settings.lossLimit === Infinity && ((_b = (_a = this.wrapper.config) === null || _a === void 0 ? void 0 : _a.autoplay) === null || _b === void 0 ? void 0 : _b.requireLossLimit)) {
                this.dispatchEvent('losslimit-required');
                return false;
            }
            if (!settings.spins || settings.spins < 1) {
                this.dispatchEvent('invalid-spin-count');
                return false;
            }
            return true;
        };
        Autoplay.prototype.setEnabled = function (value) {
            this.dispatchEvent('set-enabled', value);
        };
        return Autoplay;
    }(CapabilitiesHost));

    var animTap = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!-- Created with Keyshape -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 180 180\" text-rendering=\"geometricPrecision\" shape-rendering=\"geometricPrecision\" opacity=\"1\" style=\"background: rgba(0,0,0,0.00); white-space: pre;\">\n    <style>\n@keyframes a0_t { 0% { transform: translate(34.7418px,34.4901px) scale(1,1); } 42.1052% { transform: translate(34.7418px,34.4901px) scale(1,1); animation-timing-function: cubic-bezier(0,0,0.434481,0.524877); } 50% { transform: translate(34.7418px,34.4901px) scale(1.1,1.1); animation-timing-function: cubic-bezier(0.311727,0.522625,0.683177,1); } 55.2631% { transform: translate(34.7418px,34.4901px) scale(1,1); animation-timing-function: cubic-bezier(0.42,0,1,1); } 100% { transform: translate(34.7418px,34.4901px) scale(2,2); } }\n@keyframes a0_o { 0% { opacity: 0; } 39.4737% { opacity: 0; } 42.1053% { opacity: 1; animation-timing-function: cubic-bezier(0,0,0.58,1); } 55.2632% { opacity: 1; animation-timing-function: cubic-bezier(0.42,0,1,1); } 100% { opacity: 0; } }\n@keyframes a2_t { 0% { transform: translate(102px,106px); } 18.421% { transform: translate(102px,106px); animation-timing-function: cubic-bezier(0.42,0,1,1); } 42.1052% { transform: translate(95.5601px,94.079px); animation-timing-function: cubic-bezier(0,0,0.58,1); } 55.2631% { transform: translate(95.5601px,94.079px); } 78.9473% { transform: translate(102px,106px); } 100% { transform: translate(102px,106px); } }\n@keyframes a3_t { 0% { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.42,0,1,1); } 78.9473% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }\n@keyframes a1_t { 0% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); } 18.421% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); animation-timing-function: cubic-bezier(0.42,0,1,1); } 42.1052% { transform: scale(0.18,0.18) translate(-30.87px,-22.69px); animation-timing-function: cubic-bezier(0,0,0.58,1); } 55.2631% { transform: scale(0.18,0.18) translate(-30.87px,-22.69px); } 78.9473% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); } 100% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); } }\n    </style>\n    <g transform=\"translate(92.4525,96.4054) scale(0.98,0.98) translate(-37.2444,-41.0262)\">\n        <ellipse rx=\"24.5\" ry=\"24.5\" fill=\"#ffffff\" stroke=\"none\" opacity=\"0\" transform=\"translate(34.7418,34.4901)\" style=\"animation: 1.267s linear infinite both a0_t, 1.267s linear infinite both a0_o;\"/>\n    </g>\n    <g style=\"animation: 1.267s linear infinite both a2_t;\">\n        <g style=\"animation: 1.267s linear infinite both a3_t;\">\n            <g transform=\"translate(102,106) scale(0.2,0.2) translate(-30.87,-22.69)\" style=\"animation: 1.267s linear infinite both a1_t;\">\n                <path class=\"st0\" d=\"M71,154.5C57.9,132.1,45.3,110.6,32.7,89C23.1,72.5,13.3,56,3.8,39.5C-5.6,23.2,3.2,3.1,20.9,0.3C30.9,-1.3,41.5,4.3,47.1,14C53.4,24.8,59.7,35.5,66,46.2C75.6,33.2,85.5,31.6,100.5,38.6C110.4,19.7,128.8,21.6,141.2,32.9C146.1,24.3,153.4,19.8,163.4,21.2C172.9,22.5,179.6,27.9,184.4,36.3C200.1,63.5,216.4,90.4,232.1,117.7C240.6,132.5,245,148.7,244.2,166C243.6,178,239.4,187.9,228.1,193.9C218.9,198.8,209.8,204.1,200.9,209.6C191.7,215.3,183.1,221.8,173.9,227.4C162.3,234.4,149.6,237.4,136.1,236C128.3,235.2,121.9,231.5,116.3,226.3C96,208,72.1,198.6,44.9,196.9C36.5,196.4,28,194.9,20.1,192.1C2.6,185.8,-0.3,166.7,14.1,154.9C22.2,148.3,31.4,145.4,42,148.1C51.3,150.4,60.7,152.2,71,154.5Z\" fill=\"#FFFFFF\"/>\n                <path d=\"M86.6,106.3C79.5,94.3,72.7,82.6,66,71C55.7,53.5,45.6,35.9,35.2,18.4C31.1,11.5,25.4,10,18.7,13.7C12,17.4,9.8,24.3,13.3,31.1C14,32.4,14.7,33.7,15.5,35C36.8,71.3,58,107.7,79.3,144C84.6,153.1,89.9,162.3,95.7,172.2C93.5,171.9,92.2,171.7,90.9,171.4C73.2,167.5,55.5,163.6,37.8,159.7C30.9,158.2,23.2,161.5,19.7,167.3C15.9,173.6,17.4,178.7,24.3,181.2C27.9,182.5,31.7,183.4,35.4,183.8C42,184.5,48.8,183.9,55.3,185C81.4,189.4,105.3,198.8,124.8,217.4C130.8,223.1,138.1,225.1,146.4,224.1C155.5,223,163.8,219.7,171.5,214.8C180.3,209.2,188.7,202.9,197.6,197.3C206.3,191.8,215.4,186.8,224.3,181.7C228.6,179.2,231.4,175.5,232.1,170.7C232.7,166,233.1,161.1,232.6,156.3C231.3,144,226.9,132.7,220.7,122.1C209.5,102.8,198.2,83.6,186.9,64.4C181.9,55.9,177.1,47.4,171.9,39.1C167.3,31.8,159.4,30.6,153.8,36.1C149.8,40,149.1,45.6,152.3,51.2C156.2,58.1,160.3,64.9,164.4,72C160.8,74.1,157.6,76.1,154,78.3C152.6,76.1,151.4,74.1,150.2,72.2C144.2,62.2,138.5,52.1,132.3,42.2C127.1,33.9,117.2,34,112.5,42.4C110,46.8,110.8,51.4,113.2,55.7C117.6,63.3,122,70.8,126.5,78.7C122.7,80.9,119.4,82.9,115.8,85C112.5,79.3,109.4,74.1,106.4,69C103.3,63.7,100.2,58.3,97.1,53.1C93.1,46.5,87.8,44.6,82.1,47.6C75.8,50.9,73.5,57.6,76.6,64.2C78.3,67.6,80.4,70.8,82.3,74.2C87.2,82.8,92.2,91.4,97.2,100.2C93.4,102.2,90.3,104.1,86.6,106.3Z\"/>\n            </g>\n        </g>\n    </g>\n</svg>";

    var animSwipe = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!-- Created with Keyshape -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 180 180\" text-rendering=\"geometricPrecision\" shape-rendering=\"geometricPrecision\" style=\"background: rgba(0,0,0,0.00); white-space: pre;\">\n    <style>\n@keyframes a0_t { 0% { transform: translate(88.3898px,119.762px) scale(1,1); } 14.2886% { transform: translate(88.3898px,119.762px) scale(1,1); } 61.2369% { transform: translate(88.3898px,39.762px) scale(1,1); } 71.4431% { transform: translate(88.3898px,39.762px) scale(1,1); } 100% { transform: translate(88.389801px,119.704865px) scale(1,1); } }\n@keyframes a0_o { 0% { opacity: 0; } 14.2886% { opacity: 0; } 22.4536% { opacity: 1; } 61.237% { opacity: 1; } 71.4431% { opacity: 0; } 100% { opacity: 0; } }\n@keyframes a2_t { 0% { transform: translate(92px,120px); } 14.2886% { transform: translate(92px,120px); } 61.2369% { transform: translate(92px,40px); } 71.4431% { transform: translate(92px,40px); animation-timing-function: cubic-bezier(0.411748,0,0.97716,0.960895); } 100% { transform: translate(92px,119.901978px); } }\n@keyframes a1_t { 0% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); } 14.2886% { transform: scale(0.18,0.179693) translate(-30.87px,-22.69px); } 61.2369% { transform: scale(0.18,0.18) translate(-30.87px,-22.69px); } 71.4431% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); } 100% { transform: scale(0.2,0.2) translate(-30.87px,-22.69px); } }\n    </style>\n    <ellipse rx=\"24.5\" ry=\"24.5\" fill=\"#ffffff\" stroke=\"none\" opacity=\"0\" transform=\"translate(88.3898,119.762)\" style=\"animation: 1.633s linear infinite both a0_t, 1.633s linear infinite both a0_o;\"/>\n    <g style=\"animation: 1.633s linear infinite both a2_t;\">\n        <g transform=\"translate(92,120) scale(0.2,0.2) translate(-30.87,-22.69)\" style=\"animation: 1.633s linear infinite both a1_t;\">\n            <path class=\"st0\" d=\"M71,154.5C57.9,132.1,45.3,110.6,32.7,89C23.1,72.5,13.3,56,3.8,39.5C-5.6,23.2,3.2,3.1,20.9,0.3C30.9,-1.3,41.5,4.3,47.1,14C53.4,24.8,59.7,35.5,66,46.2C75.6,33.2,85.5,31.6,100.5,38.6C110.4,19.7,128.8,21.6,141.2,32.9C146.1,24.3,153.4,19.8,163.4,21.2C172.9,22.5,179.6,27.9,184.4,36.3C200.1,63.5,216.4,90.4,232.1,117.7C240.6,132.5,245,148.7,244.2,166C243.6,178,239.4,187.9,228.1,193.9C218.9,198.8,209.8,204.1,200.9,209.6C191.7,215.3,183.1,221.8,173.9,227.4C162.3,234.4,149.6,237.4,136.1,236C128.3,235.2,121.9,231.5,116.3,226.3C96,208,72.1,198.6,44.9,196.9C36.5,196.4,28,194.9,20.1,192.1C2.6,185.8,-0.3,166.7,14.1,154.9C22.2,148.3,31.4,145.4,42,148.1C51.3,150.4,60.7,152.2,71,154.5Z\" fill=\"#FFFFFF\"/>\n            <path d=\"M86.6,106.3C79.5,94.3,72.7,82.6,66,71C55.7,53.5,45.6,35.9,35.2,18.4C31.1,11.5,25.4,10,18.7,13.7C12,17.4,9.8,24.3,13.3,31.1C14,32.4,14.7,33.7,15.5,35C36.8,71.3,58,107.7,79.3,144C84.6,153.1,89.9,162.3,95.7,172.2C93.5,171.9,92.2,171.7,90.9,171.4C73.2,167.5,55.5,163.6,37.8,159.7C30.9,158.2,23.2,161.5,19.7,167.3C15.9,173.6,17.4,178.7,24.3,181.2C27.9,182.5,31.7,183.4,35.4,183.8C42,184.5,48.8,183.9,55.3,185C81.4,189.4,105.3,198.8,124.8,217.4C130.8,223.1,138.1,225.1,146.4,224.1C155.5,223,163.8,219.7,171.5,214.8C180.3,209.2,188.7,202.9,197.6,197.3C206.3,191.8,215.4,186.8,224.3,181.7C228.6,179.2,231.4,175.5,232.1,170.7C232.7,166,233.1,161.1,232.6,156.3C231.3,144,226.9,132.7,220.7,122.1C209.5,102.8,198.2,83.6,186.9,64.4C181.9,55.9,177.1,47.4,171.9,39.1C167.3,31.8,159.4,30.6,153.8,36.1C149.8,40,149.1,45.6,152.3,51.2C156.2,58.1,160.3,64.9,164.4,72C160.8,74.1,157.6,76.1,154,78.3C152.6,76.1,151.4,74.1,150.2,72.2C144.2,62.2,138.5,52.1,132.3,42.2C127.1,33.9,117.2,34,112.5,42.4C110,46.8,110.8,51.4,113.2,55.7C117.6,63.3,122,70.8,126.5,78.7C122.7,80.9,119.4,82.9,115.8,85C112.5,79.3,109.4,74.1,106.4,69C103.3,63.7,100.2,58.3,97.1,53.1C93.1,46.5,87.8,44.6,82.1,47.6C75.8,50.9,73.5,57.6,76.6,64.2C78.3,67.6,80.4,70.8,82.3,74.2C87.2,82.8,92.2,91.4,97.2,100.2C93.4,102.2,90.3,104.1,86.6,106.3Z\"/>\n        </g>\n    </g>\n</svg>";

    var animFullscreen = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!-- Created with Keyshape -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"1920\" viewBox=\"0 0 960 1920\" width=\"960\" fill=\"none\" stroke=\"none\" style=\"background: rgba(0,0,0,0.00);\">\n    <title>Animation</title>\n    <style>\n@keyframes iphoneFrame_t { 0% { transform: translate(480px,960px) scale(0.7,0.7) translate(-480.33px,-960.22px); } 4.6511% { transform: translate(480px,960px) scale(1.1,1.1) translate(-480.33px,-960.22px); animation-timing-function: cubic-bezier(0,0,1,1); } 6.9767% { transform: translate(480px,960px) scale(1,1) translate(-480.33px,-960.22px); } 100% { transform: translate(480px,960px) scale(1,1) translate(-480.33px,-960.22px); } }\n@keyframes iphoneFrame_o { 0% { opacity: 0; } 4.6512% { opacity: 0.99; } 6.9767% { opacity: 0.99; } 100% { opacity: 0.99; } }\n@keyframes bottomBar_t { 0% { transform: translate(94.07px,1594.959994px); } 6.9767% { transform: translate(94.07px,1594.959994px); } 11.6279% { transform: translate(94.07px,1479.849994px); } 15.1162% { transform: translate(94.070004px,1498.850046px); } 100% { transform: translate(94.070004px,1498.850046px); } }\n@keyframes bottomBar_o { 0% { opacity: 0; } 6.9767% { opacity: 0; } 11.6279% { opacity: 1; } 100% { opacity: 1; } }\n@keyframes aA_t { 0% { transform: translate(235.785004px,1673.940055px) scale(1,1) translate(-36.06px,-22.53px); } 6.9767% { transform: translate(235.785004px,1673.940055px) scale(1,1) translate(-36.06px,-22.53px); } 11.6279% { transform: translate(235.785004px,1566.163154px) scale(1,1) translate(-36.06px,-22.53px); } 15.1162% { transform: translate(235.785004px,1583.755005px) scale(1,1) translate(-36.06px,-22.53px); } 23.2558% { transform: translate(235.785004px,1583.755005px) scale(1,1) translate(-36.06px,-22.53px); } 31.3953% { transform: translate(235.785004px,1583.755005px) scale(1.3,1.3) translate(-36.06px,-22.53px); } 39.5348% { transform: translate(235.785004px,1583.755005px) scale(1,1) translate(-36.06px,-22.53px); } 100% { transform: translate(235.785004px,1583.755005px) scale(1,1) translate(-36.06px,-22.53px); } }\n@keyframes aA_o { 0% { opacity: 0; } 6.9767% { opacity: 0; } 11.6279% { opacity: 1; } 100% { opacity: 1; } }\n@keyframes arow_t { 0% { transform: translate(-246.965px,429.88px); } 15.1162% { transform: translate(-246.965px,429.88px); } 19.7674% { transform: translate(-246.965px,458.12px); } 34.8837% { transform: translate(-246.965px,458.12px); } 40.6976% { transform: translate(-246.965px,458.12px); } 100% { transform: translate(-246.965px,458.12px); } }\n@keyframes arow_o { 0% { opacity: 0; } 15.1163% { opacity: 0; } 19.7674% { opacity: 1; } 34.8837% { opacity: 1; } 40.6977% { opacity: 0; } 100% { opacity: 0; } }\n@keyframes hideToolbar-2_t { 0% { transform: translate(157.835px,1542.995005px); } 50% { transform: translate(157.835px,1542.995005px); } 58.1395% { transform: translate(157.835px,1313.228157px); } 61.6279% { transform: translate(157.835px,1348px); } 100% { transform: translate(157.835px,1348px); } }\n@keyframes hideToolbar-2_v { 0% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n@keyframes hideToolbar-2_o { 0% { opacity: 0; } 15.1163% { opacity: 0; } 50% { opacity: 0; } 58.1395% { opacity: 1; } 61.6279% { opacity: 1; } 100% { opacity: 1; } }\n@keyframes hideToolbarIcon_t { 0% { transform: translate(741.414978px,1584.879995px) scale(1,1) translate(-24.615px,-24.925px); } 50% { transform: translate(741.414978px,1584.879995px) scale(1,1) translate(-24.615px,-24.925px); } 58.1395% { transform: translate(741.415px,1370.001636px) scale(1,1) translate(-24.615px,-24.925px); } 61.6279% { transform: translate(741.415px,1404px) scale(1,1) translate(-24.615px,-24.925px); } 66.279% { transform: translate(741.415px,1404px) scale(1,1) translate(-24.615px,-24.925px); } 70.9302% { transform: translate(741.415px,1404px) scale(1.3,1.3) translate(-24.615px,-24.925px); } 76.7441% { transform: translate(741.415px,1404px) scale(1,1) translate(-24.615px,-24.925px); } 100% { transform: translate(741.415px,1404px) scale(1,1) translate(-24.615px,-24.925px); } }\n@keyframes hideToolbarIcon_v { 0% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n@keyframes hideToolbarIcon_o { 0% { opacity: 0; } 50% { opacity: 0; } 58.1395% { opacity: 1; } 100% { opacity: 1; } }\n@keyframes arow-2_t { 0% { transform: translate(256.131219px,285px); } 61.6279% { transform: translate(256.131219px,285px); } 66.279% { transform: translate(256.131219px,316px); } 100% { transform: translate(256.131219px,316px); } }\n@keyframes arow-2_o { 0% { opacity: 0; } 61.6279% { opacity: 0; } 66.2791% { opacity: 1; } 76.7442% { opacity: 1; } 82.5581% { opacity: 0; } 100% { opacity: 0; } }\n@keyframes a0_t { 0% { transform: translate(239.828575px,1582.665706px) scale(0.6,0.6); } 39.5348% { transform: translate(239.828575px,1582.665706px) scale(0.6,0.6); } 44.186% { transform: translate(239.828575px,1582.665706px) scale(1,1); } 54.6511% { transform: translate(239.828575px,1582.665706px) scale(2,2); } 100% { transform: translate(239.828575px,1582.665706px) scale(2,2); } }\n@keyframes a0_o { 0% { opacity: 0; } 39.5349% { opacity: 0; } 44.186% { opacity: 0.8; } 54.6512% { opacity: 0; } 100% { opacity: 0; } }\n@keyframes a0_f { 0% { fill: #e54747; } 39.5349% { fill: #e54747; } 100% { fill: #e54747; } }\n@keyframes a1_t { 0% { transform: translate(741.414978px,1404.773543px) scale(0.6,0.6); } 82.5581% { transform: translate(741.414978px,1404.773543px) scale(0.6,0.6); } 87.2093% { transform: translate(741.414978px,1404.773543px) scale(1,1); } 97.6744% { transform: translate(741.414978px,1404.773543px) scale(2,2); } 100% { transform: translate(741.414978px,1404.773543px) scale(2,2); } }\n@keyframes a1_o { 0% { opacity: 0; } 82.5581% { opacity: 0; } 87.2093% { opacity: 0.8; } 97.6744% { opacity: 0; } 100% { opacity: 0; } }\n@keyframes a1_f { 0% { fill: #e54747; } 82.5581% { fill: #e54747; } 100% { fill: #e54747; } }\n@keyframes hideToolbar_t { 0% { transform: translate(190.48999px,1597.128675px); } 50% { transform: translate(190.48999px,1597.128675px); } 58.1395% { transform: translate(190.48999px,1383.314549px); } 61.6279% { transform: translate(190.48999px,1416.24867px); } 100% { transform: translate(190.49px,1416.25px); } }\n@keyframes hideToolbar_o { 0% { opacity: 0; } 50% { opacity: 0; } 58.1395% { opacity: 1; } 100% { opacity: 1; } }\n    </style>\n    <path id=\"iphoneFrame\" class=\"cls-1\" d=\"M781.31,168.66L179.36,168.66C122.209,168.726,75.8961,215.039,75.83,272.19L75.83,1648.26C75.8961,1705.41,122.211,1751.72,179.36,1751.78L781.31,1751.78C838.455,1751.71,884.764,1705.41,884.83,1648.26L884.83,272.19C884.764,215.043,838.457,168.732,781.31,168.66ZM856.78,1648.26C856.78,1668.27,848.828,1687.47,834.675,1701.62C820.521,1715.77,801.325,1723.72,781.31,1723.72L179.36,1723.72C159.345,1723.72,140.149,1715.77,125.995,1701.62C111.842,1687.47,103.89,1668.27,103.89,1648.26L103.89,272.19C103.89,230.509,137.679,196.72,179.36,196.72L262.41,196.72C267.057,197.909,270.487,201.844,271.03,206.61L271.03,213C271.03,237.439,290.841,257.25,315.28,257.25L644.94,257.25C656.676,257.25,667.931,252.588,676.229,244.289C684.528,235.991,689.19,224.736,689.19,213L689.19,206.46C689.774,201.744,693.187,197.868,697.79,196.69L781.31,196.69C822.991,196.69,856.78,230.479,856.78,272.16Z\" fill=\"#fff\" opacity=\"0\" transform=\"translate(480,960) scale(0.7,0.7) translate(-480.33,-960.22)\" style=\"animation: 3.44s linear infinite both iphoneFrame_t, 3.44s linear infinite both iphoneFrame_o;\"/>\n    <g id=\"bottomBar\" opacity=\"0\" transform=\"translate(481.035,1717.03) translate(-386.965,-122.075)\" style=\"animation: 3.44s linear infinite both bottomBar_t, 3.44s linear infinite both bottomBar_o;\">\n        <path id=\"bottomBar-2\" class=\"cls-1\" d=\"M103.45,1267.09L103.45,1440.72C103.45,1459.43,110.884,1477.37,124.115,1490.6C137.347,1503.82,155.292,1511.25,174,1511.24L806.86,1511.24C845.807,1511.24,877.38,1479.67,877.38,1440.72L877.38,1267.09ZM816.93,1379C816.93,1394.61,804.273,1407.27,788.66,1407.27L199.87,1407.27C184.257,1407.27,171.6,1394.61,171.6,1379L171.6,1323.54C171.6,1307.93,184.257,1295.27,199.87,1295.27L788.66,1295.27C804.273,1295.27,816.93,1307.93,816.93,1323.54Z\" fill=\"#fff\" transform=\"translate(386.965,122.075) translate(-490.415,-1389.17)\"/>\n        <path id=\"refreshIcon\" class=\"cls-1\" d=\"M777.48,1353.67C776.404,1353.67,775.504,1354.49,775.41,1355.56C774.468,1367.68,764.095,1376.87,751.955,1376.34C739.814,1375.82,730.272,1365.77,730.379,1353.61C730.485,1341.46,740.202,1331.58,752.35,1331.27C752.499,1331.26,752.644,1331.32,752.752,1331.42C752.859,1331.53,752.92,1331.67,752.92,1331.82L752.92,1338.82C752.922,1339.63,753.365,1340.38,754.076,1340.77C754.787,1341.16,755.654,1341.13,756.34,1340.7L769.7,1331.35C770.347,1330.94,770.738,1330.23,770.738,1329.47C770.738,1328.7,770.347,1327.99,769.7,1327.58L756.35,1318.36C755.665,1317.93,754.798,1317.9,754.088,1318.29C753.378,1318.68,752.938,1319.43,752.94,1320.24L752.94,1326.58C752.943,1326.73,752.886,1326.87,752.782,1326.98C752.679,1327.08,752.538,1327.14,752.39,1327.14C738.114,1327.52,726.695,1339.12,726.546,1353.4C726.397,1367.68,737.57,1379.52,751.835,1380.2C766.1,1380.88,778.345,1370.15,779.55,1355.92C779.601,1355.34,779.405,1354.77,779.011,1354.34C778.617,1353.91,778.062,1353.67,777.48,1353.67Z\" fill=\"#fff\" opacity=\"1\" transform=\"translate(649.601,82.0326) translate(-753.051,-1349.12)\"/>\n    </g>\n    <g id=\"aA\" opacity=\"0\" transform=\"translate(235.785,1673.94) translate(-36.06,-22.53)\" style=\"animation: 3.44s linear infinite both aA_t, 3.44s linear infinite both aA_o;\">\n        <path id=\"a\" class=\"cls-1\" d=\"M465.53,982.53L463.24,975.24L452.69,975.24L450.4,982.53L443.94,982.53L454.37,952.53L461.76,952.53L472.21,982.53ZM457.89,958.24L454,970.54L461.85,970.54L458,958.24Z\" fill=\"#fff\" transform=\"translate(14.135,30.06) translate(-458.075,-967.53)\"/>\n        <path id=\"A\" class=\"cls-1\" d=\"M506,982.53L502.6,971.6L486.77,971.6L483.33,982.53L473.65,982.53L489.3,937.47L500.38,937.47L516.06,982.53ZM494.54,946.09L488.77,964.54L500.54,964.54L494.76,946.09Z\" fill=\"#fff\" transform=\"translate(50.915,22.53) translate(-494.855,-960)\"/>\n    </g>\n    <path id=\"arow\" class=\"cls-1\" d=\"M513.5,965.35L480,1007L446.5,965.32L466.11,965.32L466.11,913L493.89,913L493.89,965.38Z\" fill-rule=\"evenodd\" fill=\"#fff\" opacity=\"0\" transform=\"translate(233.035,1389.88) translate(-480,-960)\" style=\"animation: 3.44s linear infinite both arow_t, 3.44s linear infinite both arow_o;\"/>\n    <g id=\"hideToolbar-2\" opacity=\"0\" visibility=\"visible\" transform=\"translate(480.5,1599) translate(-322.665,-56)\" style=\"animation: 3.44s linear infinite both hideToolbar-2_t, 3.44s linear infinite forwards hideToolbar-2_v, 3.44s linear infinite both hideToolbar-2_o;\">\n        <rect class=\"cls-1\" width=\"645.33\" height=\"112\" rx=\"28.27\" fill=\"#fff\" transform=\"translate(322.665,56) translate(-322.665,-56)\"/>\n    </g>\n    <g id=\"hideToolbarIcon\" opacity=\"0\" visibility=\"visible\" transform=\"translate(741.415,1584.88) translate(-24.615,-24.925)\" style=\"animation: 3.44s linear infinite both hideToolbarIcon_t, 3.44s linear infinite forwards hideToolbarIcon_v, 3.44s linear infinite both hideToolbarIcon_o;\">\n        <rect width=\"20.89\" height=\"5.28\" rx=\"2.64\" fill=\"#000000\" transform=\"translate(10.445,2.64) translate(-10.445,-2.64)\"/>\n        <rect width=\"20.89\" height=\"5.28\" rx=\"2.64\" fill=\"#000000\" transform=\"translate(948.55,-447.25) rotate(90) translate(447.61,943.24)\"/>\n        <rect width=\"26.88\" height=\"5.28\" rx=\"2.64\" fill=\"#000000\" transform=\"translate(352.39,-988.65) rotate(45) translate(455.12,945.64)\"/>\n        <rect width=\"20.89\" height=\"5.28\" rx=\"2.64\" fill=\"#000000\" transform=\"translate(532.96,1029.5) rotate(-180) translate(483.73,979.65)\"/>\n        <rect width=\"20.89\" height=\"5.28\" rx=\"2.64\" fill=\"#000000\" transform=\"translate(-927.56,540.99) rotate(-90) translate(491.5,971.48)\"/>\n        <rect width=\"26.88\" height=\"5.28\" rx=\"2.64\" fill=\"#000000\" transform=\"translate(-303.56,1071.26) rotate(-135) translate(478,969.08)\"/>\n    </g>\n    <path id=\"arow-2\" class=\"cls-1\" d=\"M513.5,965.35L480,1007L446.5,965.32L466.11,965.32L466.11,913L493.89,913L493.89,965.38Z\" fill-rule=\"evenodd\" fill=\"#fff\" opacity=\"0\" transform=\"translate(736.131,1245) translate(-480,-960)\" style=\"animation: 3.44s linear infinite both arow-2_t, 3.44s linear infinite both arow-2_o;\"/>\n    <ellipse rx=\"80.6749\" ry=\"80.6749\" fill=\"#e54747\" stroke=\"none\" opacity=\"0\" transform=\"translate(239.829,1582.67) scale(0.6,0.6)\" style=\"animation: 3.44s linear infinite both a0_t, 3.44s linear infinite both a0_o, 3.44s linear infinite both a0_f;\"/>\n    <ellipse rx=\"80.6749\" ry=\"80.6749\" fill=\"#e54747\" stroke=\"none\" opacity=\"0\" transform=\"translate(741.415,1404.77) scale(0.6,0.6)\" style=\"animation: 3.44s linear infinite both a1_t, 3.44s linear infinite both a1_o, 3.44s linear infinite both a1_f;\"/>\n    <g id=\"textwrapper\" style=\"transform: translate(190.49px,1597.13px);animation: 3.44s linear infinite both hideToolbar_t;\">\n    <text id=\"hideToolbar\" fill=\"#000000\" font-size=\"40\" color=\"black\" font-family=\"sans-serif\" letter-spacing=\"0\" word-spacing=\"0\" stroke=\"none\" font-weight=\"700\" opacity=\"0\" style=\"line-height: 16px; animation: 3.44s linear infinite both hideToolbar_o;fill: black;opacity: 1;letter-spacing: 1px;word-spacing: 1px;\"></text>\n    </g>\n</svg>";

    var __extends$3 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    function isBodyScroll(element) {
        return element === document.body
            || ((element.clientHeight >= element.scrollHeight || getComputedStyle(element).overflow.indexOf('auto') === -1 && getComputedStyle(element).overflow.indexOf('scroll') === -1)
                && isBodyScroll(element.parentElement));
    }
    var Fullscreen = (function (_super) {
        __extends$3(Fullscreen, _super);
        function Fullscreen(element, config) {
            var _this = _super.call(this) || this;
            _this.active = false;
            _this.swipeUp = true;
            var fConfig = { android: true, ios: true };
            if (typeof (config) === "object") {
                fConfig = config;
            }
            var contentWrapper = element ? element : document.getElementById('gamewrapper');
            _this.overlay = createElement('div', 'fs-overlay');
            contentWrapper.appendChild(_this.overlay);
            var requestFullscreen = contentWrapper.requestFullscreen || contentWrapper.webkitRequestFullScreen || contentWrapper.mozRequestFullScreen;
            var isWebView = /Version\/\d+.|; ?wv/i.test(navigator.userAgent);
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                var isIpad = navigator.userAgent.indexOf('iPad') > -1;
                if (!isIpad) {
                    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('CriOS') == -1) {
                        setupAppleFullscreenSafari(_this, contentWrapper, true);
                    }
                    else {
                        setupAppleFullscreen(_this, contentWrapper, fConfig.ios);
                    }
                }
            }
            else if (requestFullscreen && !isWebView) {
                setupRequestFullscreen(_this, contentWrapper, fConfig.android);
            }
            else if (!isWebView) {
                console.warn('Could not set up fullscreen');
            }
            return _this;
        }
        Fullscreen.prototype.setState = function (isActive) {
            if (this.active != isActive) {
                this.dispatchEvent('change', isActive);
                this.active = isActive;
            }
        };
        Fullscreen.prototype.isActive = function () {
            return this.active;
        };
        Fullscreen.prototype.setSwipeUpDone = function () {
            this.swipeUp = false;
        };
        Fullscreen.prototype.isSwipeUp = function () {
            return this.swipeUp;
        };
        return Fullscreen;
    }(CapabilitiesHost));
    function setupRequestFullscreen(fs, contentWrapper, tap) {
        if (tap !== false)
            fs.overlay.insertAdjacentHTML('beforeend', animTap);
        var switchFullscreenOverlay = function () {
            var isFullscreen = (document.fullscreenElement != null || document.webkitIsFullScreen || document.mozFullScreen);
            if (isFullscreen) {
                fs.overlay.classList.remove('fs-tap');
                contentWrapper.classList.add('fullscreen');
            }
            else if (tap !== false) {
                fs.overlay.classList.add('fs-tap');
                contentWrapper.classList.remove('fullscreen');
            }
        };
        var activateFullscreen = function () {
            var requestFullscreen = contentWrapper.requestFullscreen || contentWrapper.webkitRequestFullScreen || contentWrapper.mozRequestFullScreen;
            requestFullscreen.call(contentWrapper, { navigationUI: 'hide' })
                .then(function () { return fs.setState(true); });
        };
        document.addEventListener('fullscreenchange', switchFullscreenOverlay);
        document.addEventListener('webkitfullscreenchange', switchFullscreenOverlay);
        document.addEventListener('mozfullscreenchange', switchFullscreenOverlay);
        document.addEventListener('fullscreenerror', function () { return fs.overlay.removeEventListener('click', activateFullscreen); });
        document.addEventListener('webkitfullscreenerror', function () { return fs.overlay.removeEventListener('click', activateFullscreen); });
        document.addEventListener('mozfullscreenerror', function () { return fs.overlay.removeEventListener('click', activateFullscreen); });
        document.addEventListener('touchmove', function (e) { return e.preventDefault(); });
        window.addEventListener('resize', switchFullscreenOverlay, false);
        fs.overlay.addEventListener('click', activateFullscreen, false);
        switchFullscreenOverlay();
    }
    function setupAppleFullscreen(fs, contentWrapper, swipe) {
        var SCROLL_DELAY = 400;
        var iphoneXheight = 812;
        var statusbarHeight = screen.availHeight >= iphoneXheight ? 44 : 20;
        var titlebarHeight = 44;
        var bottomBarHeight = screen.availHeight >= iphoneXheight ? 83 : 49;
        var extender = createElement('div', 'fs-extender');
        extender.style.position = 'absolute';
        extender.style.visibility = 'hidden';
        extender.style.top = '0px';
        extender.style.bottom = '0px';
        extender.style.width = '100vw';
        extender.style.height = '200vh';
        extender.style.zIndex = '100';
        document.body.appendChild(extender);
        document.body.appendChild(createElement('div', 'ios-resize-fixer'));
        if (swipe !== false)
            fs.overlay.insertAdjacentHTML('beforeend', animSwipe);
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('fxios') > -1;
        var updateView = function () {
            if (isFirefox) {
                return;
            }
            var isLandscape = window.innerWidth > window.innerHeight;
            var availHeight = isLandscape ? Math.min(screen.availWidth, screen.availHeight) : Math.max(screen.availWidth, screen.availHeight);
            var diff = availHeight - window.innerHeight;
            var isMinimalView;
            if (document.activeElement.tagName === 'INPUT') {
                isMinimalView = true;
            }
            else if (isLandscape) {
                isMinimalView = (diff < titlebarHeight);
            }
            else {
                isMinimalView = (diff < statusbarHeight + titlebarHeight + bottomBarHeight);
            }
            if (isMinimalView) {
                fs.overlay.classList.remove('fs-swipe');
                contentWrapper.classList.add('fullscreen');
                document.body.style.overflowY = null;
                fs.setState(true);
            }
            else {
                if (swipe !== false && fs.isSwipeUp()) {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, SCROLL_DELAY);
                    fs.overlay.classList.add('fs-swipe');
                    contentWrapper.classList.remove('fullscreen');
                    fs.setSwipeUpDone();
                    document.body.style.overflowY = 'scroll';
                    fs.setState(false);
                }
            }
        };
        window.addEventListener('resize', updateView);
        window.addEventListener('focusin', function (e) {
            if (!fs.isActive() && e.srcElement.tagName === 'INPUT') {
                updateView();
            }
        });
        window.addEventListener('focusout', function () {
            if (!fs.isActive()) {
                updateView();
            }
        });
        var firstMove = false;
        document.addEventListener('touchstart', function (e) {
            firstMove = true;
        });
        document.addEventListener('touchmove', function (e) {
            if (firstMove && fs.isActive() && !isFirefox && isBodyScroll(e.target)) {
                e.preventDefault();
            }
            else if (e.scale && e.scale !== 1) {
                e.preventDefault();
            }
            firstMove = false;
        }, { passive: false });
        updateView();
        setTimeout(updateView, 700);
    }
    function setupAppleFullscreenSafari(fs, contentWrapper, tap) {
        if (tap !== false)
            fs.overlay.insertAdjacentHTML('beforeend', animFullscreen);
        var hideToolbar = document.getElementById('hideToolbar');
        hideToolbar.textContent = Strings.MSG_HIDE_TOOLBAR;
        var switchFullscreenOverlay = function () {
            var isFullscreen = (document.fullscreenElement != null || document.webkitIsFullScreen || document.mozFullScreen);
            if (isFullscreen) {
                fs.overlay.classList.remove('fs-safari');
                contentWrapper.classList.add('fullscreen');
                hideFullscreenSafari();
            }
            else if (tap !== false) {
                fs.overlay.classList.add('fs-safari');
                contentWrapper.classList.remove('fullscreen');
            }
        };
        switchFullscreenOverlay();
        var hideFullscreenSafari = function () {
            var animateElem = document.getElementById('fs-overlay');
            animateElem.style.display = 'none';
        };
        window.addEventListener('resize', hideFullscreenSafari);
        document.addEventListener('touchend', hideFullscreenSafari);
    }

    function setupRotationOverlay(orientation, container) {
        if (container === void 0) { container = document.body; }
        var rotateOverlay = createElement('div', 'gw-rotation-overlay');
        var style = createElement('style');
        style.type = 'text/css';
        style.textContent = "\n        @media (orientation: ".concat(orientation, ") {\n            #gw-rotation-overlay { display: none }\n        }\n    ");
        container.appendChild(rotateOverlay);
        document.body.appendChild(style);
    }

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    function postMessage$1(message) {
        return window.parent.postMessage(JSON.stringify(message), '*');
    }
    var WindowMessaging = (function (_super) {
        __extends$2(WindowMessaging, _super);
        function WindowMessaging(config) {
            var _this = _super.call(this) || this;
            _this.config = { allowedEvents: [] };
            if (config) {
                _this.config = config;
            }
            if (!_this.config.boolean) {
                _this.config.boolean = {};
            }
            if (!_this.config.boolean.true) {
                _this.config.boolean.true = 'true';
            }
            if (!_this.config.boolean.false) {
                _this.config.boolean.false = 'false';
            }
            if (window.parent) {
                _this.origin = window.location.origin;
                window.addEventListener('message', function (msg) {
                    if (msg.source !== window.parent) {
                        return;
                    }
                    try {
                        var parsed = JSON.parse(msg.data);
                        if (config.allowedEvents.indexOf(parsed.name) > -1) {
                            var msg_1 = _this.map(parsed);
                            _this.dispatchEvent(msg_1.name, msg_1.data);
                        }
                    }
                    catch (e) { }
                }, false);
            }
            return _this;
        }
        WindowMessaging.prototype.map = function (message) {
            var map = this.config.maps && this.config.maps[message.name];
            if (map) {
                var name_1 = map.name || message.name;
                var data = {};
                for (var key in message.data) {
                    data[map.data[key] || key] = message.data[key];
                }
                message.name = name_1;
                message.data = data;
            }
            return message;
        };
        WindowMessaging.prototype.sendGameReady = function (isReady) {
            if (isReady === void 0) { isReady = true; }
            postMessage$1(this.map({
                name: 'gameReady',
                data: { isReady: isReady }
            }));
        };
        WindowMessaging.prototype.sendGameStart = function (stake) {
            postMessage$1(this.map({
                name: 'gameStart',
                data: { amountBet: stake }
            }));
        };
        WindowMessaging.prototype.sendGameEnd = function (wonAmount) {
            postMessage$1(this.map({
                name: 'gameEnd',
                data: { amountWon: wonAmount }
            }));
        };
        WindowMessaging.prototype.sendFreeSpinTrigger = function (freeSpinCount) {
            postMessage$1(this.map({
                name: 'freeSpinTrigger',
                data: { freeSpinCount: freeSpinCount }
            }));
        };
        WindowMessaging.prototype.sendFreeSpinEnd = function () {
            postMessage$1(this.map({
                name: 'freeSpinEnd',
                data: undefined
            }));
        };
        WindowMessaging.prototype.sendBonusStart = function () {
            postMessage$1(this.map({
                name: 'bonusStart',
                data: undefined
            }));
        };
        WindowMessaging.prototype.sendBonusEnd = function (wonAmount, totalBonusWonAmount) {
            postMessage$1(this.map({
                name: 'bonusEnd',
                data: {
                    bonusAmountWon: wonAmount,
                    totalBonusAmountWon: totalBonusWonAmount
                }
            }));
        };
        WindowMessaging.prototype.sendAccountData = function (data) {
            postMessage$1(this.map({
                name: 'accountData',
                data: data
            }));
        };
        WindowMessaging.prototype.sendOutOfFunds = function (attemptedStake) {
            postMessage$1(this.map({
                name: 'outOfCoins',
                data: { amountBet: attemptedStake }
            }));
        };
        WindowMessaging.prototype.sendErrorMessage = function (error) {
            postMessage$1(this.map({
                name: 'error',
                data: { error: error }
            }));
        };
        WindowMessaging.prototype.sendCustomMessage = function (name, data) {
            postMessage$1(this.map({
                name: name,
                data: data
            }));
        };
        WindowMessaging.prototype.sendToLobby = function (detail) {
            postMessage$1(this.map({
                name: 'toLobby',
                data: { detail: detail }
            }));
        };
        WindowMessaging.prototype.parseBoolean = function (value) {
            if (value === this.config.boolean.true)
                return true;
            if (value === this.config.boolean.false)
                return false;
            return undefined;
        };
        return WindowMessaging;
    }(CapabilitiesHost));
    function attach(wrapper, config) {
        if (!wrapper) {
            wrapper = window.GameWrapper;
        }
        var messaging = new WindowMessaging(config);
        wrapper.messaging = messaging;
        wrapper.on('game-ready', function () { return messaging.sendGameReady(); });
        wrapper.rgs.on('account-data-received', function (_a) {
            var data = _a.detail;
            return messaging.sendAccountData(data);
        });
        wrapper.rgs.on('spin-done', function () { return messaging.sendGameStart(wrapper.getBet()); });
        wrapper.rgs.on('ticket-purchased', function () { return messaging.sendGameStart(wrapper.getBet()); });
        wrapper.rgs.on('play-done', function () { return messaging.sendGameStart(wrapper.getBet()); });
        wrapper.on('game-end', function (event) { return messaging.sendGameEnd(event.detail.wonAmount); });
        wrapper.rgs.on('free-spin-trigger', function (event) { return messaging.sendFreeSpinTrigger(event.detail.freeSpinCount); });
        wrapper.rgs.on('free-spin-end', function () { return messaging.sendFreeSpinEnd(); });
        wrapper.on('game-bonus-start', function () { return messaging.sendBonusStart(); });
        wrapper.on('game-bonus-end', function (event) { return messaging.sendBonusEnd(event.detail.wonAmount, event.detail.total); });
        wrapper.on('to-lobby', function (event) { return messaging.sendToLobby(event.detail); });
        wrapper.rgs.on('error', function (event) {
            var reason = event.detail;
            var type = reason.error;
            if (type === 'insufficientFunds') {
                messaging.sendOutOfFunds(wrapper.getBet());
                return;
            }
            messaging.sendErrorMessage(type);
        });
        messaging.on('betStops', function (event) { return wrapper.setBetStops(event.detail); });
        messaging.on('volume', function (event) { return wrapper.ui.setVolume(event.detail.volume); });
        messaging.on('updatePlayer', function () { return wrapper.rgs.getAccount(); });
        messaging.on('stopAutoSpin', function () { return wrapper.autoplay.stop('window-message'); });
        messaging.on('turboMode', function (event) { return wrapper.ui.setTurbo(messaging.parseBoolean(event.detail.mode)); });
        return messaging;
    }

    var fetchOrigin = '';
    var fetchDirectory;
    function initHelper(isCdnSupportEnabled) {
        var cdnPrefix = 'content-';
        var internalPrefix = 'b2b-';
        var currentProtocol = window.location.protocol;
        var currentHostname = window.location.hostname;
        var currentPathname = window.location.pathname;
        fetchDirectory = currentPathname.substr(0, currentPathname.lastIndexOf('/'));
        if (isLocallyDeployed() || isCdnSupportEnabled === false)
            return;
        var fetchHostname = currentHostname;
        if (currentHostname.indexOf(internalPrefix) > -1) {
            fetchHostname = fetchHostname.replace(internalPrefix, '');
        }
        fetchHostname = cdnPrefix + fetchHostname;
        fetchOrigin = "".concat(currentProtocol, "//").concat(fetchHostname);
    }
    function makeCdnUrl(origUrl) {
        if (fetchOrigin === '' || /:\/\//.test(origUrl))
            return origUrl;
        if (origUrl.length > 0 && origUrl[0] === '/') {
            return "".concat(fetchOrigin).concat(origUrl);
        }
        else {
            return "".concat(fetchOrigin).concat(fetchDirectory, "/").concat(origUrl);
        }
    }
    function fetchFromCdn(input, init) {
        if (fetchOrigin === '')
            return fetch(input, init);
        var oldUrl;
        var newInit;
        if (typeof input === 'string') {
            oldUrl = input;
            newInit = init;
        }
        else {
            oldUrl = input.url;
            newInit = new Request(input, init);
        }
        var newUrl = makeCdnUrl(oldUrl);
        return fetch(newUrl, newInit);
    }

    var componentCreator;
    function setComponentCreator(creator) {
        componentCreator = creator;
    }
    function defaultCreateComponents$1(gameWrapper, params) {
        var _a = componentCreator(gameWrapper, params), integration = _a.integration, uiClass = _a.uiClass;
        gameWrapper.integration = integration;
        gameWrapper.uiClass = uiClass;
        return { integration: integration, uiClass: uiClass };
    }

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var PahoMQTT = pahoMqtt;
    var VERSION = '5.10.0';
    var BUILD_DATE = '2026-08-28T13:14:54Z';
    var actions = {
        autoplay: Function,
        play: Function,
        turbo: Function,
    };
    var MAX_PURCHASE_ATTEMPTS = 3;
    exports.fullscreen = void 0;
    var params = {};
    window.location.search.substring(1).split('&').forEach(function (entry) {
        var item = entry.split('=');
        params[item[0]] = decodeURIComponent(item[1]);
    });
    if (!params['language']) {
        params['language'] = 'en';
    }
    else {
        params['language'] = params['language'].toLowerCase();
    }
    var selectApi = function (config) {
        switch (config.gameType) {
            case 'fixed-odds':
            case 'scratchcard':
                return ScratchcardRgs;
            case 'slot':
                return SlotRgs;
            case 'keno':
                return KenoRgs;
            case 'cards':
                return CardsRgs;
            case 'table-game':
                return TableGameRgs;
            default:
                throw new Error('Unknown game type: ' + config.gameType);
        }
    };
    function setApiSelector(func) {
        selectApi = func;
    }
    function getApiSelector() {
        return selectApi;
    }
    function getParam(option) {
        return params[option];
    }
    var GameWrapper$1 = (function (_super) {
        __extends$1(GameWrapper, _super);
        function GameWrapper(config, overrides) {
            var _this = _super.call(this) || this;
            _this.langPath = 'gamewrapper/lang';
            _this.jurisdictionPath = "gamewrapper/jurisdiction";
            _this.languageConfig = "language-config.json";
            _this.rgs = new DummyAdapter();
            _this.state = 'active';
            _this.stake = 0;
            _this.winAmount = 0;
            _this.netAmount = 0;
            _this.initialized = new Promise(function (resolve) { return _this._resolveInitialized = resolve; });
            _this.ready = new Promise(function (resolve) { return _this._resolveReady = resolve; });
            _this.jurisdictionReady = Promise.resolve();
            _this.unsupportedLanguage = false;
            _this.enableLangAttribute = true;
            _this.pauseQueue = 0;
            _this.lobbyLanguage = params['language'];
            _this.getLanguageMap();
            _this.documentLanguage = params['language'];
            defaultCreateComponents$1(_this, params);
            if (config) {
                _this.setup(config, overrides);
            }
            return _this;
        }
        GameWrapper.prototype.setup = function (config, overrides) {
            return __awaiter(this, void 0, void 0, function () {
                var versionedConfigResourceUrl, versionedLocationResourceUrl, lobbys, r, lobbyURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!config) {
                                throw new Error('gromada-gamewrapper: either a config object or a path to config is required for initialization.');
                            }
                            if (!(typeof (config) === 'string')) return [3, 2];
                            versionedConfigResourceUrl = this.getVersionedResource(config);
                            return [4, fetch(versionedConfigResourceUrl).then(function (response) { return response.json(); })];
                        case 1:
                            config = (_a.sent());
                            _a.label = 2;
                        case 2:
                            if (!config.rsiLobbyRestriction) return [3, 4];
                            versionedLocationResourceUrl = this.getVersionedResource('locations.json');
                            return [4, fetch(versionedLocationResourceUrl).then(function (response) { return response.json(); })];
                        case 3:
                            lobbys = _a.sent();
                            r = document.referrer;
                            lobbyURL = r.startsWith(lobbys["dev"]) || r.startsWith(lobbys["uat"]) || r.startsWith(lobbys["prod"]);
                            if (!lobbyURL) {
                                console.error('gromada-gamewrapper: permission denied, try to launch game from lobby');
                                throw new Error('gromada-gamewrapper: permission denied, try to launch game from lobby');
                            }
                            _a.label = 4;
                        case 4:
                            Object.assign(config, overrides);
                            this.validateConfig(config);
                            this.envSetup(config);
                            return [2, this.initIntegration(config)];
                    }
                });
            });
        };
        GameWrapper.prototype.validateConfig = function (config) {
            if (!config.gameConfig) {
                throw new Error('gromada-gamewrapper: \'gameConfig\' must be present in the wrapper configuration!');
            }
            if ('freeRoundsGameId' in config.gameConfig) {
                console.warn('gromada-gamewrapper: \'freeRoundsGameId\' parameter is deprecated - use \'bonusRoundsGameId\' instead');
                var gameConfig = config.gameConfig;
                gameConfig.bonusRoundsGameId = config.gameConfig['freeRoundsGameId'];
            }
            if ('initalStakeIndex' in config.gameConfig) {
                console.warn('gromada-gamewrapper: \'initalStakeIndex\' has a spelling error - use \'initialStakeIndex\' instead');
                var gameConfig = config.gameConfig;
                gameConfig.initialStakeIndex = config.gameConfig['initalStakeIndex'];
            }
        };
        GameWrapper.prototype.getLanguageMap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var versionedLanguageConfigResourceUrl, languageResourceUrl, versionedLanguageResourceUrl, response;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            versionedLanguageConfigResourceUrl = this.getVersionedResource(this.languageConfig);
                            return [4, fetch(versionedLanguageConfigResourceUrl).then(function (response) {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                }).then(function (languageConfig) {
                                    var langConf = languageConfig;
                                    if (langConf) {
                                        if (langConf.langPath) {
                                            _this.langPath = langConf.langPath;
                                        }
                                        if (langConf.langMap) {
                                            _this.languageMap = langConf.langMap;
                                        }
                                        if (langConf.enableLangAttribute) {
                                            _this.enableLangAttribute = langConf.enableLangAttribute;
                                        }
                                    }
                                })];
                        case 1:
                            _a.sent();
                            if (this.languageMap) {
                                if (this.languageMap[params['language']]) {
                                    params['language'] = this.languageMap[params['language']];
                                }
                            }
                            languageResourceUrl = this.langPath + "/" + params['language'] + ".json";
                            versionedLanguageResourceUrl = this.getVersionedResource(languageResourceUrl);
                            return [4, fetch(versionedLanguageResourceUrl)];
                        case 2:
                            response = _a.sent();
                            if (!response.ok) {
                                this.unsupportedLanguage = true;
                                params['language'] = 'en';
                            }
                            return [2];
                    }
                });
            });
        };
        GameWrapper.prototype.envSetup = function (config) {
            initHelper(config.isCdnSupportEnabled);
        };
        GameWrapper.prototype.initIntegration = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.integration.init(config);
                            return [4, this.integration.configReady];
                        case 1:
                            config = _a.sent();
                            return [2, this.applySetup(config)];
                    }
                });
            });
        };
        GameWrapper.prototype.loadJurisdiction = function (jurisdictionCode) {
            var _this = this;
            if (!jurisdictionCode) {
                return Promise.resolve();
            }
            var resourceUrl = this.jurisdictionPath + "/" + jurisdictionCode + ".json";
            var versionedJurisdictionPathResourceUrl = this.getVersionedResource(resourceUrl);
            return fetch(versionedJurisdictionPathResourceUrl, {
                method: "GET",
                mode: "cors"
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error loading jurisdiction data: ".concat(response.status, " ").concat(response.statusText));
            })
                .then(function (jurisdiction) {
                _this.gameJurisdiction = jurisdiction;
                if (jurisdiction && jurisdiction.gameConfig) {
                    var jurisdictionGameConfig_1 = jurisdiction.gameConfig;
                    if (!_this.config.gameConfig) {
                        Object.assign(_this.config, { gameConfig: {} });
                    }
                    var _loop_1 = function (jurisdictionOption) {
                        if (jurisdictionOption === "maxAutoplayOption") {
                            if (_this.config.gameConfig["autoplayOptions"]) {
                                _this.config.gameConfig["autoplayOptions"] =
                                    _this.config.gameConfig["autoplayOptions"].filter(function (x) {
                                        return x <= jurisdictionGameConfig_1[jurisdictionOption];
                                    });
                            }
                        }
                        else {
                            _this.config.gameConfig[jurisdictionOption] = jurisdictionGameConfig_1[jurisdictionOption];
                        }
                    };
                    for (var jurisdictionOption in jurisdictionGameConfig_1) {
                        _loop_1(jurisdictionOption);
                    }
                }
                var jurisdictionWrapperConfig = jurisdiction.wrapperConfig;
                if (jurisdiction && jurisdictionWrapperConfig) {
                    for (var jurisdictionElement in jurisdictionWrapperConfig) {
                        switch (jurisdictionElement) {
                            case "additional":
                                var jurisdictionWrapperConfigAdditional = jurisdictionWrapperConfig['additional'];
                                if (jurisdictionWrapperConfigAdditional) {
                                    if (jurisdictionWrapperConfigAdditional['gameName'] == false || jurisdictionWrapperConfigAdditional['title'] == false) {
                                        _this.ui && _this.ui.showElementsTopBar(false, 'game-title');
                                    }
                                    var uiElements = ['clock', 'date'];
                                    for (var _i = 0, uiElements_1 = uiElements; _i < uiElements_1.length; _i++) {
                                        var uiElement = uiElements_1[_i];
                                        if (jurisdictionWrapperConfigAdditional[uiElement] !== undefined) {
                                            _this.ui && _this.ui.showElementsTopBar(jurisdictionWrapperConfigAdditional[uiElement], uiElement);
                                        }
                                    }
                                }
                                break;
                            case "ui":
                                var jurisdictionWrapperConfigUi = jurisdictionWrapperConfig['ui'];
                                if (jurisdictionWrapperConfigUi) {
                                    var jurisdictionUiBottomBar = jurisdictionWrapperConfigUi['bottomBar'];
                                    if (jurisdictionUiBottomBar) {
                                        if (_this.config) {
                                            if (!_this.config.ui)
                                                _this.config.ui = {};
                                            if (!_this.config.ui.bottomBar)
                                                _this.config.ui.bottomBar = {};
                                            for (var bottomBarOption in jurisdictionUiBottomBar) {
                                                _this.config.ui.bottomBar[bottomBarOption] = jurisdictionUiBottomBar[bottomBarOption];
                                                _this.ui && _this.ui.showElementsBottomBar(jurisdictionUiBottomBar[bottomBarOption], bottomBarOption);
                                            }
                                        }
                                    }
                                    var jurisdictionUiTopBar = jurisdictionWrapperConfigUi['topBar'];
                                    if (jurisdictionUiTopBar) {
                                        if (_this.config) {
                                            if (!_this.config.ui)
                                                _this.config.ui = {};
                                            if (!_this.config.ui.topBar)
                                                _this.config.ui.topBar = {};
                                            for (var topBarOption in jurisdictionUiTopBar) {
                                                _this.config.ui.topBar[topBarOption] = jurisdictionUiTopBar[topBarOption];
                                                _this.ui && _this.ui.showElementsTopBar(jurisdictionUiTopBar[topBarOption], topBarOption);
                                            }
                                        }
                                    }
                                }
                                break;
                            default:
                                if (_this.config) {
                                    _this.config[jurisdictionElement] = jurisdictionWrapperConfig[jurisdictionElement];
                                }
                                break;
                        }
                    }
                }
                _this.ui && _this.ui.updateStrings();
            })
                .catch(function (error) {
                console.warn(error.message);
                console.warn('No jurisdiction ' + jurisdictionCode + '.json found, default config in use.');
            });
        };
        GameWrapper.prototype.applySetup = function (config) {
            var _this = this;
            this.config = config;
            this.jurisdictionReady = this.loadJurisdiction(params['jurisdiction']);
            var jwt = params['jwt'] || document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1') || undefined;
            if (jwt) {
                var payload = JSON.parse(atob(jwt.split('.')[1]));
                try {
                    for (var key in payload.player.data) {
                        params[key] = payload.player.data[key];
                    }
                }
                catch (e) { }
            }
            params['language'] = params['language'] ? params['language'] : 'en';
            config.params = params;
            var promises = [this.initialized, this.jurisdictionReady];
            var languageResourceUrl = "".concat(this.langPath, "/").concat(params['language'], ".json");
            var versionedLanguageResourceUrl = this.getVersionedResource(languageResourceUrl);
            promises.push(fetchFromCdn(versionedLanguageResourceUrl)
                .then(function (response) {
                if (_this.unsupportedLanguage) {
                    _this.ui.showMessage({ title: Strings.LANGUAGE_NOT_SUPPORTED });
                }
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error loading language data: ".concat(response.status, " ").concat(response.statusText));
            })
                .then(function (language) {
                Object.assign(Strings, language.strings);
                _this.ui && _this.ui.updateStrings();
            })
                .catch(function (error) {
                console.warn(error.message);
                console.warn('Using fallback language data');
            }));
            if (params.currency) {
                this.setCurrency(params.currency.toUpperCase());
            }
            var currencyPath = config.currencyData;
            var versionedCurrencyPathResourceUrl = this.getVersionedResource(currencyPath);
            if (versionedCurrencyPathResourceUrl) {
                promises.push(fetchFromCdn(versionedCurrencyPathResourceUrl)
                    .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Error loading currency data: ".concat(response.status, " ").concat(response.statusText));
                })
                    .then(function (data) {
                    _this.currencyConfig = data;
                    if (_this.currency) {
                        _this.setCurrency(_this.currency.code);
                    }
                    else if (params.currency) {
                        _this.setCurrency(params.currency.toUpperCase());
                    }
                    return data;
                })
                    .catch(function (error) {
                    console.warn(error.message);
                    console.warn('Using fallback currency data');
                }));
            }
            if (params.ticketId) {
                this.gameMode = 'history';
                if (!params['playMode']) {
                    params['playMode'] = 'H';
                }
            }
            else {
                this.updateGameMode();
            }
            params['_gameMode'] = this.gameMode;
            if (!config.gameId && params['gameId']) {
                config.gameId = params['gameId'];
            }
            if (!config.gameId) {
                throw new GameWrapperError('`gameId` not set, but it is mandatory.');
            }
            if (!config.gameType) {
                throw new GameWrapperError('`gameType` not set, but it is mandatory.');
            }
            var rgsConfig = {
                gameConfig: this.config.gameConfig,
                gameId: config.gameId,
                params: config.params,
                rpcUrl: config.rpcUrl,
                demo: this.gameMode === 'demo',
            };
            if (config.metaGameId) {
                var rgsMultiConfig = rgsConfig;
                rgsMultiConfig.metaGameId = config.metaGameId;
            }
            var isScratchcard = config.gameType === 'scratchcard' || config.gameType === 'fixed-odds';
            var rgsClass;
            if (isScratchcard) {
                rgsClass = ScratchAdapter;
            }
            else if (config.gameType === 'slot') {
                rgsClass = SlotAdapter;
            }
            else if (config.gameType === 'keno') {
                rgsClass = KenoAdapter;
            }
            else if (config.gameType === 'cards') {
                rgsClass = CardsAdapter;
            }
            else if (config.gameType === 'table-game') {
                rgsClass = TableGameAdapter;
                config.ui = config.ui || {};
                config.ui.autoplay = false;
            }
            else {
                throw new GameWrapperError('Invalid `gameType`');
            }
            if (Array.isArray(rgsConfig.gameId)) {
                this.rgs = new RgsMultiAdapter(rgsConfig, rgsClass);
            }
            else {
                this.rgs = new rgsClass(rgsConfig);
            }
            this.rgs.setGameMode(this.isHistoryGameMode());
            this.autoplay = new Autoplay(this);
            this.gameName = config.gameName
                || config.metaGameId
                || (Array.isArray(config.gameId) ? config.gameId[0] : config.gameId);
            if (config.content) {
                this.ui = new this.uiClass(config.content, config.container, this, config.ui);
                this.ui.attachRgs(this.rgs, params);
                this.ui.setTitle(this.gameName);
                this.ui.ready.then(function () { _this.startTime = Date.now(); });
                var isMobile = navigator.userAgent.search('Mobi') > -1;
                if (isMobile && config.fullscreen !== false && !exports.fullscreen) {
                    var fsElement_1;
                    if (config.fullscreenContent) {
                        if (typeof config.fullscreenContent === 'string') {
                            fsElement_1 = document.querySelector(config.fullscreenContent);
                        }
                        else {
                            fsElement_1 = config.fullscreenContent;
                        }
                    }
                    else {
                        fsElement_1 = document.body;
                    }
                    if (config.fullscreenAfterLoad === false) {
                        exports.fullscreen = new Fullscreen(fsElement_1, config.fullscreen);
                    }
                    else {
                        this.ui.ready.then(function () { return exports.fullscreen = new Fullscreen(fsElement_1, config.fullscreen); });
                    }
                }
                if (config.forceOrientation) {
                    setupRotationOverlay(config.forceOrientation, this.ui.element);
                }
            }
            this.rgs.on('game-data-received', function (_a) {
                var _b;
                var data = _a.detail;
                if (data) {
                    var stake = (!Array.isArray(data.ticketPrice) && data.ticketPrice)
                        || ((_b = data.game) === null || _b === void 0 ? void 0 : _b.totalBet)
                        || _this.stake
                        || _this.rgs.getDefaultStake();
                    _this.setBet(stake);
                }
            });
            this.rgs.on('unsettled-ticket-received', function (event) {
                if (event.detail) {
                    _this.setBet(event.detail.ticketPrice);
                }
            });
            var onRoundUpdate = function (event) {
                if (event.detail) {
                    _this.setBet(event.detail.game.totalBet);
                    _this.winAmount = event.detail.game.totalWin || 0;
                }
            };
            this.rgs.on('spin-started', function () { return _this.winAmount = 0; });
            this.rgs.on('spin-done', onRoundUpdate);
            this.rgs.on('free-spin-done', onRoundUpdate);
            this.rgs.on('play-done', onRoundUpdate);
            this.rgs.on('ticket-purchased', function (event) { return _this.winAmount = event.detail.prize.winAmount; });
            this.rgs.on('replay-started', function (event) {
                var _a, _b;
                _this.winAmount = (_b = (_a = event.detail.winAmount) !== null && _a !== void 0 ? _a : event.detail.game.totalWin) !== null && _b !== void 0 ? _b : 0;
            });
            this.rgs.on('ticket-settled', function (event) {
                var _a, _b, _c;
                _this.winAmount = (_b = (_a = event.detail.winAmount) !== null && _a !== void 0 ? _a : event.detail.game.totalWin) !== null && _b !== void 0 ? _b : 0;
                var bet = (_c = event.detail.ticketPrice) !== null && _c !== void 0 ? _c : event.detail.game.totalBet;
                _this.netAmount += _this.winAmount - bet;
                _this.dispatchEvent('game-end', { wonAmount: _this.winAmount });
            });
            this.rgs.on('gamble-result', function (event) {
                var _a, _b;
                if ((_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.history) === null || _b === void 0 ? void 0 : _b.wA) {
                    _this.winAmount = event.detail.wA;
                }
            });
            this.rgs.on('error', function (event) {
                var reason = event.detail;
                if (reason.error === 'insufficientFunds') {
                    if (_this.autoplay.isActive) {
                        _this.autoplay.stop('insufficient-funds');
                    }
                }
            });
            if (jwt && this.gameMode !== 'history') {
                this.rgs.getAccount().then(function (data) { return _this.setCurrency(data.currency); });
            }
            if (getParam('realityRemainingSecs') || getParam('realityIntervalSecs')) {
                this.realityCheck = new RealityCheck(parseInt(getParam('realityIntervalSecs'), 10), parseInt(getParam('realityRemainingSecs'), 10), parseInt(getParam('realityElapsedSecs'), 10) || 0, getParam('realityUrl') || getParam('lobbyUrl'), getParam('realityHistoryUrl') || "");
                this.realityCheck.on('reality-check', function () { return _this.rgs.setRealityCheck(true); });
            }
            if (this.gameMode === 'history') {
                var accountData_1 = { balance: 0 };
                var baseBalance_1 = 0;
                this.rgs.on('ticket-received', function () {
                    _this.rgs.getTicketData(_this.rgs.ticketId).then(function () {
                        accountData_1 = _this.rgs.rgs.cachedTicketData.accountData;
                        baseBalance_1 = accountData_1.balance;
                        if (accountData_1.currency) {
                            _this.rgs.dispatchEvent('account-data-received', accountData_1);
                        }
                    });
                });
                this.rgs.on('replay-ended', function () {
                    if (accountData_1.currency) {
                        var win = _this.getWinAmount() || 0;
                        _this.rgs.dispatchEvent('account-data-received', __assign(__assign({}, accountData_1), { balance: baseBalance_1 + win }));
                    }
                });
            }
            if (config.postMessage) {
                var postMessageConfig = (typeof (config.postMessage) !== 'boolean') ? config.postMessage : undefined;
                var postMessage_1 = attach(this, postMessageConfig);
                postMessage_1.on('resume', this.unpause.bind(this));
            }
            if (config.enableJackpotNotifications) {
                this.subscribeToJackpotNotifications();
            }
            this._resolveInitialized();
            var ready = Promise.all(promises);
            ready.then(function () { return _this._resolveReady(); });
            ready.then(function () { return _this.dispatchEvent('gw-ready'); });
            return this.ready;
        };
        GameWrapper.prototype.init = function (config) {
            return this.setup(config);
        };
        GameWrapper.prototype.getConfig = function () {
            return JSON.parse(JSON.stringify(this.config));
        };
        GameWrapper.prototype.getGameConfig = function () {
            return JSON.parse(JSON.stringify(this.config.gameConfig));
        };
        GameWrapper.prototype.setCurrency = function (currencyCode) {
            if (isNullString(currencyCode)) {
                return;
            }
            var locale = getParam('language') ? getParam('language') : 'en';
            if (this.currencyConfig && currencyCode in this.currencyConfig) {
                locale = this.currencyConfig[currencyCode].locale || locale;
            }
            if (this.config.isSocialCasinoMode && currencyCode.toUpperCase() === 'SOC') {
                currencyCode = "";
            }
            this.currency = {
                code: currencyCode,
                locale: locale
            };
            Strings.CURRENCY_CODE = this.currency.code;
            this.ui && this.ui.updateStrings();
        };
        GameWrapper.prototype.formatCurrency = function (value, trimFraction, currencyCode) {
            return this.integration.formatCurrency(value, trimFraction, currencyCode);
        };
        GameWrapper.prototype.formatNumber = function (value, trimFraction) {
            return this.integration.formatNumber(value, trimFraction);
        };
        GameWrapper.prototype.setName = function (name) {
            this.gameName = name;
            this.ui.setTitle(name);
        };
        GameWrapper.prototype.setBetStops = function (betConfig) {
            var _this = this;
            var limits = __assign({}, betConfig);
            this.rgs.setLimits(limits);
            this.rgs.configured.then(function () {
                _this.dispatchEvent('set-stake-limits', _this.rgs.getLimits());
                if (limits.defaultStake)
                    _this.setBet(limits.defaultStake);
            });
        };
        GameWrapper.prototype.getBet = function () {
            return this.stake;
        };
        GameWrapper.prototype.setBet = function (bet) {
            if (this.stake != bet) {
                this.dispatchEvent('stake-change', { stake: bet });
            }
            this.stake = bet;
        };
        GameWrapper.prototype.getWinAmount = function () {
            return this.winAmount;
        };
        GameWrapper.prototype.getNetAmount = function () {
            return this.netAmount;
        };
        GameWrapper.prototype.gameReady = function () {
            var _this = this;
            this.rgs.configured.then(function () { return _this.dispatchEvent('game-ready'); });
        };
        GameWrapper.prototype.pauseGame = function () {
            this.pauseQueue++;
            this.state = 'paused';
            this.dispatchEvent('game-pause');
            this.ui && this.ui.dispatchEvent('game-pause');
        };
        GameWrapper.prototype.resumeGame = function () {
            this.pauseQueue--;
            if (this.pauseQueue <= 0) {
                this.pauseQueue = 0;
                this.state = 'active';
                this.dispatchEvent('game-resume');
                this.ui && this.ui.dispatchEvent('game-resume');
            }
        };
        GameWrapper.prototype.unpause = function () {
            this.resumeGame();
        };
        GameWrapper.prototype.startReplay = function (ticketId) {
            var _this = this;
            if (ticketId === void 0) { ticketId = ''; }
            if (!ticketId) {
                ticketId = getParam('ticketId');
            }
            return this.integration.handleReplayStarted()
                .then(function () {
                _this.gameMode = 'history';
                _this.rgs.setGameMode(true);
                return _this.rgs.getTicket(ticketId);
            })
                .then(function (data) {
                var _a;
                var bet = (_a = data.ticketPrice) !== null && _a !== void 0 ? _a : data.game.totalBet;
                _this.setBet(bet);
                _this.rgs.dispatchEvent('replay-started', data);
                return data;
            });
        };
        GameWrapper.prototype.endReplay = function () {
            this.integration.handleReplayFinished();
            this.rgs.setGameMode(this.isHistoryGameMode());
            this.rgs.dispatchEvent('replay-ended');
        };
        GameWrapper.prototype.isDemoGameMode = function () {
            return this.gameMode === 'demo';
        };
        GameWrapper.prototype.isHistoryGameMode = function () {
            return this.gameMode === 'history';
        };
        GameWrapper.prototype.getGameMode = function () {
            var key = getParam('playMode');
            if (!!key) {
                switch (key) {
                    case 'M':
                        return 'realmoney';
                    case 'D':
                        return 'demo';
                    case 'H':
                        return 'history';
                }
            }
            else {
                key = getParam('isPlayForFun');
                return key === 'true' ? 'demo' : 'realmoney';
            }
        };
        GameWrapper.prototype.updateGameMode = function () {
            this.gameMode = this.getGameMode();
        };
        GameWrapper.prototype.getElapsedTime = function () {
            var elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            var seconds = (elapsedTime % 60) || 0;
            var minutes = (Math.floor(elapsedTime / 60) % 60) || 0;
            var hours = (Math.floor(elapsedTime / 3600) % 24) || 0;
            return { hours: hours, minutes: minutes, seconds: seconds };
        };
        GameWrapper.prototype.getJurisdiction = function () {
            return this.gameJurisdiction;
        };
        GameWrapper.prototype.subscribeToJackpotNotifications = function () {
            return __awaiter(this, void 0, void 0, function () {
                var currentJwt, reconnectIntervals, maxAttempts, reconnectAttempt, subscriptionData, _a, client, connectOptions;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            currentJwt = this.rgs.getJwt();
                            if (!currentJwt)
                                return [2];
                            reconnectIntervals = this.config.jackpotReconnectIntervals || [1000, 1000, 5000, 10000, 20000];
                            maxAttempts = reconnectIntervals.length;
                            reconnectAttempt = 0;
                            if (!Array.isArray(this.config.gameId)) return [3, 2];
                            return [4, this.rgs.rgsMap.get(this.config.gameId[this.config.gameId.length - 1]).getJackpotSubscriptionUrl()];
                        case 1:
                            _a = _b.sent();
                            return [3, 4];
                        case 2: return [4, this.rgs.getJackpotSubscriptionUrl()];
                        case 3:
                            _a = _b.sent();
                            _b.label = 4;
                        case 4:
                            subscriptionData = _a;
                            client = new PahoMQTT.Client(subscriptionData.url, subscriptionData.clientId);
                            connectOptions = {
                                useSSL: true,
                                timeout: 3,
                                mqttVersion: 4,
                                onSuccess: function () {
                                    console.log('gromada-gamewrapper: jackpot subscription connection succeeded');
                                    for (var _i = 0, _a = subscriptionData.topics; _i < _a.length; _i++) {
                                        var topic = _a[_i];
                                        client.subscribe(topic.value);
                                    }
                                },
                                onFailure: function (reason) {
                                    console.warn("gromada-gamewrapper: jackpot subscription connection failed: ".concat(reason.errorMessage, " Code: ").concat(reason.errorCode));
                                    if (reason.errorCode !== 0) {
                                        if (reconnectAttempt >= maxAttempts) {
                                            var reason_1 = { error: 'jackpotSubscriptionFailed' };
                                            _this.rgs.dispatchEvent('error', reason_1);
                                        }
                                        else {
                                            console.warn("gromada-gamewrapper: jackpot subscription attempt ".concat(reconnectAttempt + 1, " with delay ").concat(reconnectIntervals[reconnectAttempt] / 1000, "s"));
                                            setTimeout(function () { return client.connect(connectOptions); }, reconnectIntervals[reconnectAttempt]);
                                            reconnectAttempt++;
                                        }
                                    }
                                },
                            };
                            client.onConnectionLost = function (reason) {
                                console.log("gromada-gamewrapper: jackpot subscription connection lost: ".concat(reason.errorMessage, " Code: ").concat(reason.errorCode));
                                if (reason.errorCode !== 0) {
                                    reconnectAttempt = 0;
                                    client.connect(connectOptions);
                                }
                            };
                            client.onMessageArrived = function (message) {
                                if (_this.rgs.isHistoryReplay)
                                    return;
                                if (message.destinationName.indexOf('pool') > -1) {
                                    console.log("gromada-gamewrapper: pool jackpot notification message arrived", { message: message });
                                    _this.rgs.dispatchEvent('jackpots-pool-message', message.payloadString);
                                    return;
                                }
                                if (message.destinationName.indexOf('win') > -1) {
                                    console.log("gromada-gamewrapper: win jackpot notification message arrived", { message: message });
                                    _this.rgs.dispatchEvent('jackpots-win-message', message.payloadString);
                                    return;
                                }
                                console.warn('gromada-gamewrapper: received jackpot notification message of unknown type', { message: message });
                            };
                            client.connect(connectOptions);
                            return [2];
                    }
                });
            });
        };
        GameWrapper.prototype.getVersionedResource = function (resourceUrl, version) {
            if (resourceUrl === void 0) { resourceUrl = ''; }
            var timestamp = new Date().getTime();
            version = version || timestamp;
            return resourceUrl + '?v=' + version;
        };
        return GameWrapper;
    }(CapabilitiesHost));

    var MessageQueue = (function () {
        function MessageQueue() {
            this.queue = [];
        }
        MessageQueue.prototype.queueMessage = function (messageHandler) {
            var _this = this;
            if (!this.queuePromise) {
                this.queuePromise = messageHandler()
                    .then(function () { return new Promise(_this.processQueue.bind(_this)); })
                    .then(function () { return _this.queuePromise = null; });
            }
            else {
                this.queue.push(messageHandler);
            }
            return this.queuePromise;
        };
        MessageQueue.prototype.processQueue = function (resolve) {
            var _this = this;
            if (this.queue.length > 0) {
                var next = this.queue.shift();
                resolve(next().then(function () { return new Promise(_this.processQueue.bind(_this)); }));
            }
            else {
                resolve();
            }
        };
        return MessageQueue;
    }());

    var ALL_MESSAGES = [
        'error',
        'info',
        'lobby',
        'insufficient-funds',
        'retry-purchase',
        'reality-check',
        'bonus-offer',
        'history-replay',
        'history-replay-start',
        'history-replay-end'
    ];
    function resolveNextFrame() {
        return new Promise(function (resolve) { return requestAnimationFrame(resolve); });
    }
    function rejectNextFrame() {
        return new Promise(function (resolve, reject) { return requestAnimationFrame(reject); });
    }
    var MessageDialog = (function () {
        function MessageDialog(gameWrapper, config) {
            var _this = this;
            this.dialog = null;
            this.exclude = [];
            this.messageQueue = new MessageQueue();
            this.showLobbyButton = true;
            this.hide = function () {
                _this.dialog.classList.add('hidden');
                _this.dialog.dispatchEvent(createEvent('gw-hide'));
            };
            this.goToLobbyAction = function (msg) {
                var url = params.lobbyUrl;
                url ? _this.goToUrlHandler(url) : _this.gameWrapper.dispatchEvent('to-lobby', msg);
            };
            this.goToUrlHandler = function (url) {
                if (url === void 0) { url = ''; }
                window.top.location.href = url;
            };
            this.gameWrapper = gameWrapper;
            if (config === false) {
                return;
            }
            config = config;
            if (config && config.include) {
                this.exclude = ALL_MESSAGES.filter(function (el) { return config.include.indexOf(el) === -1; });
            }
            else if (config && config.exclude) {
                this.exclude = config.exclude.slice();
            }
            this.showLobbyButton = !config || config.showLobbyButton !== false;
            this.dialog = createElement('div');
            this.dialog.id = 'messageDialog';
            var btn1 = createElement('button');
            btn1.classList.add('btn');
            btn1.classList.add('btn-primary');
            var btn2 = createElement('button');
            btn2.classList.add('btn');
            btn2.classList.add('btn-secondary');
            var btn3 = createElement('button');
            btn3.classList.add('btn');
            btn3.classList.add('btn-third');
            this.dialog.append(createElement('div', '', ['gw-subtitle'], [
                createElement('span', '', ['gw-icon', 'gw-message-icon']),
                createElement('h3'),
            ]), createElement('h1'), createElement('p'), createElement('div', '', ['btn-container'], [
                btn1,
                btn2,
                btn3
            ]));
            this.hide();
        }
        MessageDialog.prototype.displayMessage = function (message, primaryAction, secondaryAction, thirdAction) {
            var _this = this;
            if (primaryAction === void 0) { primaryAction = null; }
            if (secondaryAction === void 0) { secondaryAction = null; }
            if (thirdAction === void 0) { thirdAction = null; }
            if (!this.dialog) {
                return Promise.resolve();
            }
            return this.messageQueue.queueMessage(function () { return new Promise(function (resolve, reject) {
                _this.dialog.querySelector('h1').innerText = message.title || '';
                _this.dialog.querySelector('h3').innerText = message.subtitle || '';
                _this.dialog.querySelector('p').innerText = message.text || '';
                var icon = _this.dialog.querySelector('.gw-message-icon');
                icon.classList.remove('gw-ico-info', 'gw-ico-error');
                if (message.subtitle === Strings.MESSAGE_DIALOG_INFO) {
                    icon.classList.add('gw-ico-info');
                }
                else if (message.subtitle === Strings.MESSAGE_DIALOG_ERROR) {
                    icon.classList.add('gw-ico-error');
                }
                var btnPrimary = _this.dialog.querySelector('.btn-primary');
                if (primaryAction) {
                    btnPrimary.classList.remove('hidden');
                    btnPrimary.innerText = primaryAction.name;
                    btnPrimary.onclick = function () { primaryAction.action(); resolve(); };
                }
                else {
                    btnPrimary.classList.add('hidden');
                }
                var btnSecondary = _this.dialog.querySelector('.btn-secondary');
                if (secondaryAction) {
                    btnSecondary.classList.remove('hidden');
                    btnSecondary.innerText = secondaryAction.name;
                    btnSecondary.onclick = function () { secondaryAction.action(); resolve(); };
                }
                else {
                    btnSecondary.classList.add('hidden');
                }
                var btnThird = _this.dialog.querySelector('.btn-third');
                if (thirdAction) {
                    btnThird.classList.remove('hidden');
                    btnThird.innerText = thirdAction.name;
                    btnThird.onclick = function () { thirdAction.action(); resolve(); };
                }
                else {
                    btnThird.classList.add('hidden');
                }
                _this.dialog.classList.remove('hidden');
                _this.dialog.dispatchEvent(createEvent('gw-show'));
            }); });
        };
        MessageDialog.prototype.displayError = function (errorData, message, primaryAction, secondaryAction) {
            if (secondaryAction === void 0) { secondaryAction = null; }
            if (errorData) {
                console.error("gromada-gamewrapper: " + JSON.stringify(errorData));
            }
            message.subtitle = message.subtitle || Strings.MESSAGE_DIALOG_ERROR;
            return this.displayMessage(message, primaryAction, secondaryAction);
        };
        MessageDialog.prototype.showGameError = function (errorData, message, canReturnToGame) {
            var _this = this;
            if (canReturnToGame === void 0) { canReturnToGame = false; }
            if (this.exclude.indexOf('error') > -1) {
                return rejectNextFrame();
            }
            var refreshAction = { name: Strings.MESSAGE_DIALOG_REFRESH, action: function () { return window.location.reload(); } };
            var lobbyAction = { name: Strings.MESSAGE_DIALOG_TO_LOBBY, action: function () { return _this.goToLobbyAction(errorData); } };
            var primaryAction = canReturnToGame ? refreshAction : null;
            var secondaryAction = this.showLobbyButton ? lobbyAction : null;
            return this.displayError(errorData, message, primaryAction, secondaryAction);
        };
        MessageDialog.prototype.showInfoMessage = function (message) {
            if (this.exclude.indexOf('info') > -1) {
                return resolveNextFrame();
            }
            message.subtitle = message.subtitle || Strings.MESSAGE_DIALOG_INFO;
            var confirmAction = { name: Strings.OK, action: this.hide };
            return this.displayMessage(message, confirmAction);
        };
        MessageDialog.prototype.showLobbyConfirmation = function () {
            if (this.exclude.indexOf('lobby') > -1) {
                return resolveNextFrame();
            }
            var backToGame = { name: Strings.MESSAGE_DIALOG_REFRESH, action: this.hide };
            var goToLobby = { name: Strings.MESSAGE_DIALOG_TO_LOBBY, action: this.goToLobbyAction };
            var message = { title: Strings.MESSAGE_DIALOG_LOBBY_TITLE, subtitle: Strings.MESSAGE_DIALOG_INFO };
            return this.displayMessage(message, backToGame, goToLobby);
        };
        MessageDialog.prototype.showInsufficientFunds = function (depositUrl) {
            var _this = this;
            if (this.exclude.indexOf('insufficient-funds') > -1) {
                return resolveNextFrame();
            }
            var message = { title: Strings.INSUFFICIENT_FUNDS, subtitle: Strings.MESSAGE_DIALOG_INFO };
            var addFunds = depositUrl
                ? { name: Strings.MESSAGE_DIALOG_ADD_FUNDS, action: function () { return _this.goToUrlHandler(depositUrl); } }
                : null;
            var confirmAction = { name: Strings.OK, action: this.hide };
            return this.displayMessage(message, confirmAction, addFunds);
        };
        MessageDialog.prototype.showRetryPurchase = function () {
            var _this = this;
            if (this.exclude.indexOf('retry-purchase') > -1) {
                return rejectNextFrame();
            }
            var message = { title: Strings.PURCHASE_FAILED, subtitle: Strings.MESSAGE_DIALOG_ERROR, text: Strings.PURCHASE_FAILED_INFO };
            var primaryAction = { name: Strings.MESSAGE_DIALOG_RETRY_PURCHASE, action: function () { retryPurchase = true; _this.hide(); } };
            var goToLobby = this.showLobbyButton ?
                { name: Strings.MESSAGE_DIALOG_TO_LOBBY, action: this.goToLobbyAction } :
                null;
            var retryPurchase = false;
            return this.displayMessage(message, primaryAction, goToLobby)
                .then(function (value) {
                if (retryPurchase) {
                    return value;
                }
                return Promise.reject('purchase-failed');
            });
        };
        MessageDialog.prototype.showRealityCheck = function (realityUrl, realityInfo, realityHistoryUrl) {
            var _this = this;
            if (this.exclude.indexOf('reality-check') > -1) {
                return rejectNextFrame();
            }
            var backToGame = { name: Strings.MESSAGE_DIALOG_REFRESH, action: this.hide };
            var realityAction = { name: Strings.REALITY_CHECK_BUTTON, action: function () { return _this.goToUrlHandler(realityUrl); } };
            var realityHistoryAction = { name: Strings.REALITY_CHECK_HISTORY_BUTTON, action: function () { return _this.goToUrlHandler(realityHistoryUrl); } };
            var message = { title: Strings.REALITY_CHECK, subtitle: Strings.MESSAGE_DIALOG_INFO, text: realityInfo };
            if (realityHistoryUrl) {
                return this.displayMessage(message, backToGame, realityAction, realityHistoryAction);
            }
            else {
                return this.displayMessage(message, backToGame, realityAction);
            }
        };
        MessageDialog.prototype.showBonusOffer = function (bonusInfo, requireDecision) {
            var _this = this;
            if (this.exclude.indexOf('bonus-offer') > -1) {
                return Promise.resolve(true);
            }
            var text = "".concat(Strings.BONUS_REMAINING_ROUNDS, ": ").concat(bonusInfo.remainingRounds, "/").concat(bonusInfo.totalRounds);
            if (bonusInfo.endDateTime) {
                text += "\n".concat(Strings.BONUS_USE_BEFORE, " ").concat(new Date(bonusInfo.endDateTime).toLocaleDateString());
            }
            var title = requireDecision
                ? Strings.BONUS_OFFER_TITLE
                : (bonusInfo.remainingRounds === bonusInfo.totalRounds ? Strings.BONUS_STARTED : Strings.BONUS_BACK);
            var message = { title: title, subtitle: Strings.MESSAGE_DIALOG_INFO, text: text };
            if (!requireDecision) {
                return this.displayMessage(message, { name: Strings.OK, action: this.hide }).then(function () { return true; });
            }
            var accepted = false;
            var accept = { name: Strings.BONUS_OFFER_ACCEPT, action: function () { accepted = true; _this.hide(); } };
            var decline = { name: Strings.BONUS_OFFER_DECLINE, action: this.hide };
            return this.displayMessage(message, accept, decline).then(function () { return accepted; });
        };
        MessageDialog.prototype.showTransactionFailed = function () {
            var message = { title: Strings.MSG_TRANSACTION_FAILED };
            return this.displayMessage(message, { name: Strings.OK, action: this.hide }).then(function () { window.location.reload(); });
        };
        MessageDialog.prototype.showReplayStarted = function () {
            if (this.exclude.indexOf('history-replay') > -1 || this.exclude.indexOf('history-replay-start') > -1) {
                return rejectNextFrame();
            }
            var message = { title: Strings.REPLAY_STARTED, subtitle: Strings.MESSAGE_DIALOG_INFO };
            return this.displayMessage(message, { name: Strings.OK, action: this.hide });
        };
        MessageDialog.prototype.showReplayFinished = function () {
            var _this = this;
            if (this.exclude.indexOf('history-replay') > -1 || this.exclude.indexOf('history-replay-end') > -1) {
                return rejectNextFrame();
            }
            var message = { title: Strings.REPLAY_FINISHED, subtitle: Strings.MESSAGE_DIALOG_INFO };
            var goToHistory = params.historyUrl ?
                { name: Strings.MESSAGE_DIALOG_TO_HISTORY, action: function () { return _this.goToUrlHandler(params.historyUrl); } } :
                null;
            var goToLobby = this.showLobbyButton && params.lobbyUrl ?
                { name: Strings.MESSAGE_DIALOG_TO_LOBBY, action: this.goToLobbyAction } :
                null;
            var primaryAction = goToHistory || goToLobby;
            var secondaryAction = goToHistory ? goToLobby : null;
            return this.displayMessage(message, primaryAction, secondaryAction);
        };
        return MessageDialog;
    }());

    var Selector = (function () {
        function Selector(id, pageSize, numValues) {
            if (pageSize === void 0) { pageSize = 3; }
            if (numValues === void 0) { numValues = 3; }
            var _this = this;
            this.position = 0;
            this.element = document.createElement('div');
            this.element.id = id;
            var pgDown = document.createElement('div');
            pgDown.id = "".concat(id, "-pgdown");
            pgDown.classList.add('gw-selector-pgdown');
            pgDown.classList.add('gw-selector-control');
            var pgUp = document.createElement('div');
            pgUp.id = "".concat(id, "-pgup");
            pgUp.classList.add('gw-selector-pgup');
            pgUp.classList.add('gw-selector-control');
            var selector = document.createElement('div');
            selector.id = "".concat(id, "-select");
            var values = document.createElement('div');
            values.id = "".concat(id, "-values");
            values.classList.add('gw-selector-values');
            for (var i = 0; i < numValues; ++i) {
                var btn = document.createElement('button');
                btn.classList.add('gw-selector-value');
                btn.classList.add("".concat(id, "-value-").concat(i + 1));
                values.appendChild(btn);
            }
            selector.appendChild(values);
            var updateButtons = function () {
                if (_this.position === 0) {
                    pgDown.classList.add('gw-disabled');
                }
                else {
                    pgDown.classList.remove('gw-disabled');
                }
                if (_this.position === Math.ceil(values.childElementCount / pageSize) - 1) {
                    pgUp.classList.add('gw-disabled');
                }
                else {
                    pgUp.classList.remove('gw-disabled');
                }
            };
            pgDown.addEventListener('click', function () {
                if (_this.position > 0) {
                    --_this.position;
                }
                values.style.transform = "translateX(".concat(-_this.position * 100, "%)");
                updateButtons();
            });
            pgUp.addEventListener('click', function () {
                var maxPos = (Math.ceil(values.childElementCount / pageSize) - 1);
                if (_this.position < maxPos) {
                    ++_this.position;
                }
                values.style.transform = "translateX(".concat(-_this.position * 100, "%)");
                updateButtons();
            });
            this.element.appendChild(pgDown);
            this.element.appendChild(selector);
            this.element.appendChild(pgUp);
            this.items = values.childNodes;
            updateButtons();
        }
        return Selector;
    }());

    var textUtil$2 = new TextUtil();
    var LimitSelector = (function () {
        function LimitSelector(id, labelText, currencySymbol) {
            var _this = this;
            this.value = Infinity;
            this.element = createElement('div', id, ['gw-autoplay-selector']);
            this.checkbox = createElement('span', '', ['gw-selector-checkbox']);
            this.checkbox.addEventListener('click', function () {
                if (_this.value === Infinity || !_this.value) {
                    _this.value = 1;
                    if (_this.transformValue) {
                        _this.value = _this.transformValue(_this.value);
                    }
                    _this.textbox.value = _this.value.toString();
                }
                else {
                    _this.value = Infinity;
                    _this.textbox.value = '';
                }
                _this.updateView();
            });
            this.textbox = createInputElement('number');
            this.textbox.id = "".concat(id, "-value");
            this.textbox.classList.add('gw-selector-value');
            this.textbox.step = '1';
            this.textbox.addEventListener('wheel', function (event) { return event.preventDefault(); });
            this.textbox.addEventListener('input', function (event) {
                var el = event.srcElement;
                var val = el.value;
                if (el.validity.valid) {
                    _this.value = Math.max(0, parseInt(val, 10));
                }
                el.value = _this.value === Infinity ? '' : _this.value.toString();
                _this.updateView();
            });
            this.textbox.addEventListener('change', function (event) {
                if (_this.transformValue) {
                    _this.value = _this.transformValue(_this.value);
                }
                var el = event.srcElement;
                el.value = _this.value === Infinity ? '' : _this.value.toString();
                _this.updateView();
            });
            this.element.append(this.checkbox, createElement('h3', '', ['gw-slider-label'], [textUtil$2.text(labelText)]), createElement('span', '', ['gw-selector-currency'], [textUtil$2.text(function () { return currencySymbol; })]), this.textbox);
            this.updateView();
        }
        LimitSelector.prototype.getValue = function () {
            return this.value;
        };
        LimitSelector.prototype.updateView = function () {
            if (this.value === Infinity || !this.value) {
                this.checkbox.classList.remove('gw-active');
            }
            else {
                this.checkbox.classList.add('gw-active');
            }
        };
        LimitSelector.prototype.updateCurrency = function (newCurrency) {
            var currencySpan = this.element.querySelector('.gw-selector-currency');
            if (currencySpan) {
                currencySpan.textContent = newCurrency;
            }
        };
        LimitSelector.prototype.updateStrings = function () {
            textUtil$2.updateStrings();
        };
        LimitSelector.prototype.reset = function () {
            this.checkbox.classList.remove("gw-active");
            this.textbox.value = '';
            this.value = Infinity;
        };
        return LimitSelector;
    }());

    var _autoplay;
    var onAnyWin;
    var lossLimits;
    var winLimits;
    var singleWinLimits;
    var stopOnJackpotCheckbox;
    var textUtil$1 = new TextUtil();
    var AutoplayDialog = (function () {
        function AutoplayDialog(autoplay) {
            var _this = this;
            var _a, _b, _c;
            _autoplay = autoplay;
            this.element = createElement('div', 'gw-autoplay', ['hidden']);
            this.autoCloseBtn = createElement('div', '', ['gw-icon', 'gw-btn-close']);
            this.autoCloseBtn.addEventListener('click', function () {
                _this.hide();
            });
            this.element.addEventListener('scroll', this.updateCloseButton.bind(this));
            window.addEventListener('resize', function () {
                if (!_this.element.classList.contains('hidden')) {
                    _this.updateCloseButton();
                }
            });
            this.element.appendChild(createElement('div', 'gw-autoplay-header', [], [
                createElement('h3', 'gw-autoplay-title', [], [textUtil$1.text(function () { return Strings.AUTOPLAY_TITLE; })]),
                this.autoCloseBtn
            ]));
            this.autoSettingsBtn = createElement('button', '', ['gw-btn-auto-settings'], [
                textUtil$1.text(function () { return Strings.BTN_AUTOPLAY_SETTINGS; })
            ]);
            this.autoSettingsBtn.addEventListener('click', function () { return _this.showAdvancedSettings(); });
            this.autoOptions = createElement('div', 'gw-auto-settings', ['hidden']);
            var stopAutoplay = createElement('h2', '', ['gw-slider-label'], [textUtil$1.text(function () { return Strings.AUTOPLAY_STOP_AUTOPLAY; })]);
            var stopAutoplayDiv = createElement('div', 'gw-stop-autoplay', ['gw-autoplay-selector'], [
                stopAutoplay
            ]);
            onAnyWin = createElement('span', '', ['gw-selector-checkbox']);
            var onAnyWinString = createElement('h3', '', ['gw-slider-label'], [textUtil$1.text(function () { return Strings.AUTOPLAY_STOP_ON_WIN; })]);
            var onAnyWinDiv = createElement('div', 'gw-auto-stop-on-any-win', ['gw-autoplay-selector'], [
                onAnyWin,
                onAnyWinString
            ]);
            onAnyWin.addEventListener('click', function () {
                onAnyWin.classList.contains("gw-active") ? onAnyWin.classList.remove('gw-active') : onAnyWin.classList.add('gw-active');
            });
            var currencySymbol = this.getCurrencySymbol(autoplay.wrapper.currency);
            lossLimits = new LimitSelector('gw-auto-loss-limits', function () { return Strings.AUTOPLAY_LOSS_LIMIT; }, currencySymbol);
            winLimits = new LimitSelector('gw-auto-win-limits', function () { return Strings.AUTOPLAY_WIN_LIMIT; }, currencySymbol);
            singleWinLimits = new LimitSelector('gw-auto-single-win-limits', function () { return Strings.AUTOPLAY_SINGLE_WIN_LIMIT; }, currencySymbol);
            lossLimits.transformValue = function (value) {
                if (value < autoplay.wrapper.getBet()) {
                    value = autoplay.wrapper.getBet();
                }
                return value;
            };
            stopOnJackpotCheckbox = createInputElement('checkbox');
            this.resetBtn = createElement('button', '', ['gw-btn-auto-settings'], [
                textUtil$1.text(function () { return Strings.BTN_AUTOPLAY_RESET; })
            ]);
            this.autoOptions.append(stopAutoplayDiv, onAnyWinDiv, lossLimits.element, winLimits.element, singleWinLimits.element, this.resetBtn, createElement('div', '', ['gw-auto-switches'], [
                createElement('div', 'gw-auto-jackpot', [], [
                    createElement('h3', '', [], [
                        textUtil$1.text(function () { return Strings.AUTOPLAY_STOP_ON_JACKPOT; })
                    ]),
                    createElement('label', '', ['gw-switch'], [
                        stopOnJackpotCheckbox,
                        createElement('span', '', ['gw-checkbox-slider'])
                    ])
                ])
            ]));
            this.resetBtn.addEventListener('click', function () {
                _this.resetValues();
            });
            if (!((_b = (_a = autoplay.wrapper.config) === null || _a === void 0 ? void 0 : _a.autoplay) === null || _b === void 0 ? void 0 : _b.stopOnJackpot)) {
                this.autoOptions.querySelector('#gw-auto-jackpot').style.display = 'none';
            }
            var numValues = (_c = _autoplay.wrapper.getGameConfig().autoplayOptions) === null || _c === void 0 ? void 0 : _c.length;
            this.spinSlider = new Selector('gw-auto-spins', 3, numValues);
            this.spinSlider.items.forEach(function (item) {
                item.addEventListener('click', function () { return _this.start(parseInt(item.dataset.spins, 10)); });
            });
            this.element.append(createElement('div', 'gw-autoplay-content', [], [
                this.autoSettingsBtn,
                this.autoOptions,
                createElement('h3', '', ['gw-separator'], [textUtil$1.text(function () { return Strings.AUTOPLAY_SPINS; })]),
                this.spinSlider.element,
                createElement('h3', '', ['gw-highlight'], [textUtil$1.text(function () { return Strings.AUTOPLAY_INSTRUCTION; })]),
            ]));
            _autoplay.on('autoplay-started', this.hide.bind(this));
        }
        AutoplayDialog.prototype.resetValues = function () {
            lossLimits.reset();
            winLimits.reset();
            singleWinLimits.reset();
            onAnyWin.classList.remove('gw-active');
        };
        AutoplayDialog.prototype.start = function (spinCount) {
            _autoplay.start({
                spins: spinCount,
                lossLimit: lossLimits.getValue(),
                winLimit: winLimits.getValue(),
                singleWinLimit: singleWinLimits.getValue(),
                stopOnWin: onAnyWin.classList.contains("gw-active"),
                stopOnJackpot: stopOnJackpotCheckbox.checked
            });
        };
        AutoplayDialog.prototype.attachRgs = function (rgs) {
            var _this = this;
            var setupDialog = function (event) {
                var config = rgs.gameConfig;
                if (config.autoplayOptions) {
                    for (var i = 0; i < _this.spinSlider.items.length; ++i) {
                        var item = _this.spinSlider.items[i];
                        var spinCount = config.autoplayOptions[i];
                        if (spinCount) {
                            item.innerText = "".concat(spinCount);
                            item.dataset.spins = "".concat(spinCount);
                            item.classList.remove('hidden');
                        }
                        else {
                            item.dataset.spins = '';
                            item.classList.add('hidden');
                        }
                    }
                }
            };
            rgs.on('game-data-received', setupDialog);
            rgs.on('ticket-received', setupDialog);
        };
        AutoplayDialog.prototype.switchVisibility = function () {
            if (this.element.classList.contains('hidden')) {
                this.show();
            }
            else {
                this.hide();
            }
        };
        AutoplayDialog.prototype.show = function () {
            var _a, _b;
            this.element.classList.remove('hidden');
            this.updateCloseButton();
            var wrapperConfig = _autoplay.wrapper.config;
            var hideAdvancedAutoplay = (_a = wrapperConfig === null || wrapperConfig === void 0 ? void 0 : wrapperConfig.autoplay) === null || _a === void 0 ? void 0 : _a.hideAdvancedAutoplay;
            var showAdvancedSettings = (_b = wrapperConfig === null || wrapperConfig === void 0 ? void 0 : wrapperConfig.autoplay) === null || _b === void 0 ? void 0 : _b.requireLossLimit;
            if (hideAdvancedAutoplay) {
                this.hideAdvancedAutoplayButton();
            }
            else if (showAdvancedSettings) {
                this.showAdvancedSettings();
            }
            this.element.dispatchEvent(createEvent('dialog-opened'));
        };
        AutoplayDialog.prototype.hideAdvancedAutoplayButton = function () {
            this.autoSettingsBtn.classList.add('hidden');
        };
        AutoplayDialog.prototype.showAdvancedSettings = function () {
            if (!this.optionsShown) {
                this.autoOptions.classList.remove('hidden');
                this.updateCloseButton();
                this.optionsShown = true;
            }
            else {
                this.autoOptions.classList.add('hidden');
                this.updateCloseButton();
                this.optionsShown = false;
            }
        };
        AutoplayDialog.prototype.hide = function () {
            this.resetValues();
            this.element.classList.add('hidden');
            this.element.dispatchEvent(createEvent('dialog-closed'));
        };
        AutoplayDialog.prototype.updateCloseButton = function () {
            if (this.element.scrollHeight - this.element.scrollTop <= this.element.clientHeight) {
                this.autoCloseBtn.classList.remove('gw-scroll');
            }
            else {
                this.autoCloseBtn.classList.add('gw-scroll');
            }
        };
        AutoplayDialog.prototype.updateStrings = function () {
            textUtil$1.updateStrings();
            this.updateCurrency(_autoplay.wrapper.currency);
            lossLimits.updateStrings();
            winLimits.updateStrings();
            singleWinLimits.updateStrings();
        };
        AutoplayDialog.prototype.getCurrencySymbol = function (currency) {
            var currencyFormated = Strings.CURRENCY_CODE;
            if ((currency === null || currency === void 0 ? void 0 : currency.locale) && (currency === null || currency === void 0 ? void 0 : currency.code)) {
                var locale = currency.locale.replace(/_/g, '-');
                var currencyFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: currency.code });
                var parts = currencyFormat.formatToParts(1);
                var currencyObject = parts.find(function (obj) { return obj.type === "currency"; });
                if (currencyObject) {
                    currencyFormated = currencyObject.value;
                }
            }
            return currencyFormated;
        };
        AutoplayDialog.prototype.updateCurrency = function (currency) {
            var currencySymbol = this.getCurrencySymbol(currency);
            lossLimits.updateCurrency(currencySymbol);
            winLimits.updateCurrency(currencySymbol);
            singleWinLimits.updateCurrency(currencySymbol);
        };
        return AutoplayDialog;
    }());

    var Splash = (function () {
        function Splash(config) {
            this.loader = {
                logo: undefined,
                progressBar: undefined,
                percentLabel: undefined,
                progress: 0,
            };
            this.config = config;
            this.createSplash();
        }
        Splash.prototype.createSplash = function () {
            this.splash = createElement('div', 'gw-splash');
            if (!this.config || this.config.logo !== false) {
                this.loader.logo = this.splash.appendChild(createElement('div', '', ['gw-splash-logo']));
            }
            if (!this.config || this.config.progressBar !== false) {
                var progressBar = this.splash.appendChild(createElement('div', '', ['gw-splash-progress-bar']));
                this.loader.progressBar = progressBar.appendChild(createElement('div', '', ['gw-splash-progress-fill']));
                this.loader.percentLabel = this.splash.appendChild(createElement('div', '', ['gw-splash-percent-label']));
            }
            this.loader.progress = 0;
        };
        Splash.prototype.setLoaderProgress = function (progress, percentage) {
            this.loader.progress = progress;
            if (this.loader.percentLabel) {
                this.loader.percentLabel.innerText = "".concat(percentage, "%");
            }
            if (this.loader.progressBar) {
                this.loader.progressBar.style.width = "".concat(percentage, "%");
            }
        };
        Splash.prototype.hide = function () {
            if (this.splash) {
                this.splash.style.display = 'none';
            }
        };
        Splash.prototype.getProgress = function () {
            return typeof (this.loader.progress) === 'number' ? this.loader.progress : 1;
        };
        return Splash;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var internalAssetsLoaded = false;
    var INTERNAL_ASSET_RATIO = 0.1;
    var textUtil = new TextUtil();
    var WrapperUI = (function (_super) {
        __extends(WrapperUI, _super);
        function WrapperUI(content, parent, gameWrapper, config) {
            if (parent === void 0) { parent = 'body'; }
            if (config === void 0) { config = {}; }
            var _this = _super.call(this) || this;
            _this.isWinCapped = false;
            _this.isReady = false;
            _this.turbo = false;
            _this.isBonusRoundsEnabled = false;
            _this.isSoundMuted = false;
            _this.demoShowsModeOnly = false;
            _this.ready = new Promise(function (resolve) { return _this.once('ui-ready', resolve); });
            _this.gameWrapper = gameWrapper;
            _this.element = createElement('div', 'gamewrapper');
            if (_this.gameWrapper.enableLangAttribute) {
                _this.element.lang = _this.gameWrapper.documentLanguage;
            }
            var view = createElement('div', 'gw-view');
            _this.element.appendChild(view);
            if (isString(content)) {
                content = document.querySelector(content);
            }
            var game = createElement('div', 'gw-game');
            game.appendChild(content);
            if (!isFalse(config.splash)) {
                _this.splash = new Splash(config.splash);
            }
            if (!isFalse(config.topBar)) {
                _this.topBar = _this.setupTopBar(config.topBar);
                _this.topBar && _this.topBar.classList.add('hidden');
            }
            _this.overlay = new Overlay();
            if (isTrue(config.help)) {
                _this.helpDialog = _this.setupHelp();
                _this.overlay.append(_this.helpDialog);
            }
            _this.messageDialog = new MessageDialog(gameWrapper, gameWrapper.getConfig().messages);
            _this.overlay.append(_this.messageDialog.dialog);
            if (!isFalse(config.autoplay)) {
                _this.autoplayDialog = _this.setupAutoplayDialog();
            }
            if (!isFalse(config.bottomBar)) {
                _this.bottomBar = _this.setupBottomBar(config.bottomBar);
                _this.bottomBar && _this.bottomBar.classList.add('hidden');
            }
            if (!isFalse(config.bonusToggleButton)) {
                var bonusToggleHeading = createElement('span', '', ['gw-bonus-toggle-heading']);
                bonusToggleHeading.innerText = Strings.BONUS_ROUNDS;
                var bonusToggleOffLabel = createElement('span', '', ['gw-bonus-toggle-state-label', 'gw-bonus-toggle-off']);
                bonusToggleOffLabel.innerText = Strings.BONUS_TOGGLE_OFF;
                var bonusToggleOnLabel = createElement('span', '', ['gw-bonus-toggle-state-label', 'gw-bonus-toggle-on']);
                bonusToggleOnLabel.innerText = Strings.BONUS_TOGGLE_ON;
                var bonusToggleThumb = createElement('span', '', ['gw-bonus-toggle-switch-thumb']);
                var bonusToggleTrack = createElement('span', '', ['gw-bonus-toggle-switch-track'], [bonusToggleThumb]);
                var bonusToggleRow = createElement('span', '', ['gw-bonus-toggle-row'], [bonusToggleOffLabel, bonusToggleTrack, bonusToggleOnLabel]);
                _this.bonusToggleBtn = createElement('div', 'gw-bonus-toggle-btn', ['hidden'], [bonusToggleHeading, bonusToggleRow]);
                _this.bonusToggleBtn.setAttribute('role', 'button');
                _this.bonusToggleBtn.setAttribute('tabindex', '0');
                if (!isFalse(config.bottomBar)) {
                    _this.bonusToggleBtn.classList.add('gw-bonus-toggle-btn-above-bottom-bar');
                }
                var requestBonusToggle_1 = function () { return _this.gameWrapper.dispatchEvent('bonus-toggle-click'); };
                _this.bonusToggleBtn.addEventListener('click', requestBonusToggle_1);
                _this.bonusToggleBtn.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        requestBonusToggle_1();
                    }
                });
                _this.bonusToggleBtnContainer = createElement('div', 'gw-bonus-toggle-btn-container', [], [_this.bonusToggleBtn]);
                gameWrapper.on('bonus-toggle-state', function (_a) {
                    var detail = _a.detail;
                    var state = detail;
                    _this.bonusToggleBtn.classList.toggle('hidden', state === 'hidden');
                    _this.bonusToggleBtn.classList.toggle('gw-bonus-toggle-active', state === 'active');
                    _this.bonusToggleBtn.setAttribute('aria-pressed', String(state === 'active'));
                    _this.bonusToggleBtn.setAttribute('aria-label', state === 'active' ? Strings.BONUS_ROUNDS_ACTIVE : Strings.BONUS_ROUNDS_INACTIVE);
                });
            }
            gameWrapper.on('stake-change', function (event) { return _this.updateBetLabels(event.detail.stake); });
            var betSettings, settingsNav;
            _this.settingsDialog = createElement('div', 'gw-settings', ['hidden'], [
                createElement('h2', '', ['gw-title'], [
                    textUtil.text(function () { return Strings.TITLE_SETTINGS; })
                ]),
                createElement('div', '', ['gw-nav'], [
                    settingsNav = createElement('ul', '', [], [
                        createElement('li', '', ['gw-nav-btn', 'gw-btn-bet', 'gw-active'], [
                            textUtil.text(function () { return Strings.SETTINGS_BET; })
                        ]),
                        createElement('li', '', ['gw-nav-btn', 'gw-btn-game'], [
                            textUtil.text(function () { return Strings.SETTINGS_GAME; })
                        ]),
                        createElement('li', '', ['gw-nav-btn', 'gw-btn-history', 'hidden'], [
                            textUtil.text(function () { return Strings.SETTINGS_HISTORY; })
                        ]),
                        createElement('li', '', ['gw-nav-btn', 'gw-btn-info'], [
                            textUtil.text(function () { return Strings.SETTINGS_INFO; })
                        ])
                    ])
                ]),
                createElement('div', '', ['gw-settings-content'], [
                    betSettings = createElement('div', 'gw-settings-bet'),
                    createElement('div', 'gw-settings-game', ['hidden'], [
                        createElement('div', '', ['gw-switch-snd'], [
                            createElement('h3', '', [], [
                                textUtil.text(function () { return Strings.SETTINGS_SOUND_SWITCH; })
                            ]),
                            createElement('label', '', ['gw-switch'], [
                                createInputElement('checkbox'),
                                createElement('span', '', ['gw-checkbox-slider'])
                            ]),
                        ]),
                        createElement('div', '', ['gw-switch-hand'], [
                            createElement('h3', '', [], [
                                textUtil.text(function () { return Strings.SETTINGS_HAND_SWITCH; })
                            ]),
                            createElement('label', '', ['gw-switch'], [
                                createInputElement('checkbox'),
                                createElement('span', '', ['gw-checkbox-slider'])
                            ]),
                        ]),
                    ]),
                    createElement('div', 'gw-settings-history', ['hidden']),
                    createElement('div', 'gw-settings-info', ['hidden'])
                ]),
            ]);
            var betSelector = new Selector('gw-bet', 10, 30);
            betSelector.element.classList.add('gw-bet-selector');
            betSettings.appendChild(betSelector.element);
            var settingScreens = _this.settingsDialog.querySelector('.gw-settings-content').children;
            var activeSettings = _this.settingsDialog.querySelector('.gw-settings-content :not(.hidden)');
            settingsNav.childNodes.forEach(function (el, index) {
                el.addEventListener('click', function (event) {
                    var target = event.target;
                    if (!target.classList.contains('gw-active')) {
                        settingsNav.childNodes.forEach(function (el) {
                            el.classList.remove('gw-active');
                        });
                        target.classList.add('gw-active');
                        activeSettings.classList.add('hidden');
                        activeSettings = settingScreens[index];
                        activeSettings.classList.remove('hidden');
                    }
                });
            });
            view.append.apply(view, ([
                game,
                _this.splash ? _this.splash.splash : undefined,
                _this.settingsDialog,
                _this.topBar,
                _this.autoplayDialog ? _this.autoplayDialog.element : undefined,
                _this.bottomBar,
                _this.overlay.element,
                _this.bonusToggleBtnContainer
            ].filter(function (el) { return !!el; })));
            setInterval(function () {
                var clocks = view.querySelectorAll('.gw-clock');
                var dates = view.querySelectorAll('.gw-date');
                var stopwatches = view.querySelectorAll('.gw-elapsedTime');
                var time = new Date();
                if (clocks.length) {
                    var hours_1 = time.getHours().toString().padStart(2, '0');
                    var minutes_1 = time.getMinutes().toString().padStart(2, '0');
                    clocks.forEach(function (clock) { return clock.innerText = "".concat(hours_1, ":").concat(minutes_1); });
                }
                if (dates.length) {
                    var day_1 = time.getDate();
                    var month_1 = (time.getMonth() + 1).toString().padStart(2, '0');
                    var year_1 = time.getFullYear();
                    dates.forEach(function (date) { return date.innerText = "".concat(day_1, ".").concat(month_1, ".").concat(year_1); });
                }
                if (stopwatches.length) {
                    var elapsedTime = _this.gameWrapper.getElapsedTime();
                    var timeStr_1 = "".concat(elapsedTime.hours, "h:").concat(elapsedTime.minutes, "m:").concat(elapsedTime.seconds, "s");
                    stopwatches.forEach(function (s) { return s.innerText = timeStr_1; });
                }
            }, 1000);
            if (isString(parent)) {
                parent = document.querySelector(parent);
            }
            parent.appendChild(_this.element);
            applyAppleWebViewFix();
            gameWrapper.ready.then(function () {
                internalAssetsLoaded = true;
                var progress = _this.splash == null ? 1 : _this.splash.getProgress();
                _this.setLoaderProgress(progress);
            });
            return _this;
        }
        WrapperUI.prototype.setupTopBar = function (config) {
            var _this = this;
            this.topBar = createElement('div', 'gw-top-bar');
            var topBarTools = createElement('div', 'gw-top-bar-tools');
            var topBarLobbyButtton = createElement('div', '', ['gw-icon', 'gw-btn-lobby', 'gw-mobile', 'gw-btnLobby']);
            topBarLobbyButtton.addEventListener('click', function () {
                _this.pauseGame();
                _this.messageDialog.showLobbyConfirmation().then(function () { return _this.resumeGame.call(_this); });
            });
            topBarTools.append(topBarLobbyButtton);
            if (config && isFalse(config.btnLobby)) {
                topBarLobbyButtton.classList.add('hidden');
            }
            this.topBarSoundButton = createElement('div', '', ['gw-icon', 'gw-btn-sfx', 'gw-mobile', 'gw-btnSound']);
            this.topBarSoundButton.addEventListener('click', function () {
                _this.changeSoundStatus(_this.isSoundMuted);
                _this.gameWrapper.integration.muteSound(_this.isSoundMuted);
            });
            topBarTools.append(this.topBarSoundButton);
            if (config && isFalse(config.btnSound)) {
                this.topBarSoundButton.classList.add('hidden');
            }
            this.topBar.append(topBarTools);
            this.gameTitle = this.topBar.appendChild(createElement('div', '', ['gw-game-title', 'gw-title']));
            if (config && isFalse(config.title)) {
                this.showElementsTopBar(false, 'game-title');
            }
            this.date = this.topBar.appendChild(createElement('div', '', ['gw-date', 'hidden']));
            if (config && isTrue(config.date)) {
                this.showElementsTopBar(true, 'date');
            }
            this.clock = this.topBar.appendChild(createElement('div', '', ['gw-clock']));
            if (config && isFalse(config.clock)) {
                this.showElementsTopBar(false, 'clock');
            }
            var elapsedTime = this.topBar.appendChild(createElement('div', '', ['gw-elapsedTime', 'hidden']));
            if (config && isTrue(config.elapsedTime) && !this.gameWrapper.isHistoryGameMode()) {
                elapsedTime.classList.remove('hidden');
            }
            var topBarMenuButton = this.topBar.appendChild(createElement('button', '', ['gw-icon', 'gw-btn-menu', 'gw-mobile', 'gw-btnMenu']));
            topBarMenuButton.addEventListener('click', function () {
                if (topBarMenuButton.classList.contains('gw-active')) {
                    topBarMenuButton.classList.remove('gw-active');
                    _this.settingsDialog && _this.settingsDialog.classList.add('hidden');
                }
                else {
                    topBarMenuButton.classList.add('gw-active');
                    _this.settingsDialog && _this.settingsDialog.classList.remove('hidden');
                }
            });
            if (config && isFalse(config.btnMenu)) {
                topBarMenuButton.classList.add('hidden');
            }
            return this.topBar;
        };
        WrapperUI.prototype.setupHelp = function () {
            var helpDialog = createElement('div', 'gw-help');
            var versionedHelpResourceUrl = this.gameWrapper.getVersionedResource('help.html');
            fetchFromCdn(versionedHelpResourceUrl)
                .then(function (response) { return response.ok ? response.text() : Promise.reject(response); })
                .then(function (content) { return helpDialog.innerHTML = content; })
                .catch(function (response) { return console.warn('Could not fetch help. ', response); });
            helpDialog.classList.add('hidden');
            return helpDialog;
        };
        WrapperUI.prototype.setupAutoplayDialog = function () {
            var _this = this;
            this.autoplayDialog = new AutoplayDialog(this.gameWrapper.autoplay);
            this.autoplayDialog.element.addEventListener('dialog-opened', function () { return _this.dispatchEvent('autoplay-dialog-opened'); });
            this.autoplayDialog.element.addEventListener('dialog-closed', function () { return _this.dispatchEvent('autoplay-dialog-closed'); });
            this.gameWrapper.autoplay.on('losslimit-too-low', function () { return _this.showMessage({ title: Strings.AUTOPLAY_MSG_LOSS_LIMIT_LOW, text: Strings.AUTOPLAY_MSG_LOSS_LIMIT_LOW_INFO }); });
            this.gameWrapper.autoplay.on('losslimit-required', function () { return _this.showMessage({ title: Strings.AUTOPLAY_MSG_LOSS_LIMIT_REQUIRED, text: Strings.AUTOPLAY_MSG_LOSS_LIMIT_REQUIRED_INFO }); });
            this.gameWrapper.autoplay.on('autoplay-stopped', function (event) {
                var _a, _b;
                var message;
                var stopConfimation;
                switch (event.detail) {
                    case 'losslimit-reached':
                        message = Strings.AUTOPLAY_MSG_LOSS_LIMIT;
                        break;
                    case 'winlimit-reached':
                        message = Strings.AUTOPLAY_MSG_WIN_LIMIT;
                        break;
                    case 'single-winlimit-reached':
                        message = Strings.AUTOPLAY_SINGLE_WIN_LIMIT;
                        break;
                    case 'stop-on-win':
                        message = Strings.AUTOPLAY_MSG_STOP_ON_WIN;
                        break;
                    case 'stop-on-jackpot':
                        message = Strings.AUTOPLAY_MSG_STOP_ON_JACKPOT;
                        break;
                    case 'spins-complete':
                        message = Strings.AUTOPLAY_MSG_SPINS_COMPLETE;
                        stopConfimation = true;
                        break;
                    case 'insufficient-funds':
                        message = Strings.AUTOPLAY_MSG_INSUFFICIENT_FUNDS;
                        break;
                    case 'reality-check':
                        message = Strings.AUTOPLAY_MSG_REALITY_CHECK;
                        break;
                    case 'spin-error':
                        message = Strings.AUTOPLAY_MSG_STOP_ON_ERROR;
                        break;
                    case 'responsible-gaming':
                        return;
                    default:
                        message = Strings.AUTOPLAY_MSG_DEFAULT;
                        stopConfimation = true;
                }
                if (stopConfimation && isFalse((_b = (_a = _this.gameWrapper.config.autoplay) === null || _a === void 0 ? void 0 : _a.stopConfirmation) === null || _b === void 0 ? void 0 : _b.valueOf()))
                    return;
                _this.pauseGame();
                _this.messageDialog.showInfoMessage({ title: message }).then(function () { return _this.resumeGame.call(_this); });
            });
            return this.autoplayDialog;
        };
        WrapperUI.prototype.changeSoundStatus = function (soundOn) {
            var _a, _b, _c, _d;
            if (soundOn) {
                this.dispatchEvent('sound-unmute');
                (_a = this.bottomBarSoundButton) === null || _a === void 0 ? void 0 : _a.classList.remove('gw-btn-sfx-off');
                (_b = this.topBarSoundButton) === null || _b === void 0 ? void 0 : _b.classList.remove('gw-btn-sfx-off');
            }
            else {
                this.dispatchEvent('sound-mute');
                (_c = this.bottomBarSoundButton) === null || _c === void 0 ? void 0 : _c.classList.add('gw-btn-sfx-off');
                (_d = this.topBarSoundButton) === null || _d === void 0 ? void 0 : _d.classList.add('gw-btn-sfx-off');
            }
            this.isSoundMuted = !soundOn;
        };
        WrapperUI.prototype.setupBottomBar = function (config) {
            var _this = this;
            var _a;
            this.bottomBar = createElement('div', 'gw-bottom-bar');
            var tools = createElement('div', 'gw-tools');
            var menuItem = createElement('li', '', ['gw-button', 'gw-mobile', 'gw-btnMenu'], [
                createElement('div', '', ['gw-icon', 'gw-btn-menu'])
            ]);
            if (config && isFalse(config.btnMenu)) {
                menuItem.classList.add('hidden');
            }
            var lobbyButton = createElement('div', '', ['gw-icon', 'gw-btn-lobby']);
            lobbyButton.addEventListener('click', function () {
                _this.pauseGame();
                _this.messageDialog.showLobbyConfirmation().then(function () { return _this.resumeGame.call(_this); });
            });
            var lobbyItem = createElement('li', '', ['gw-button', 'gw-mobile', 'gw-btnLobby'], [lobbyButton]);
            if (config && isFalse(config.btnLobby)) {
                lobbyItem.classList.add('hidden');
            }
            var helpButton = createElement('div', '', ['gw-icon', 'gw-btn-help']);
            helpButton.addEventListener('click', function () { return _this.overlay.switch(_this.helpDialog); });
            var helpItem = createElement('li', '', ['gw-button', 'gw-btnHelp'], [helpButton]);
            if (!this.helpDialog || (config && isFalse(config.btnHelp))) {
                helpItem.classList.add('hidden');
            }
            this.autoButton = createElement('div', '', ['gw-icon', 'gw-btn-auto'], [textUtil.text(function () { return Strings.BTN_AUTOPLAY; })]);
            this.autoButton.addEventListener('click', function () { return _this.autoplayDialog.switchVisibility(); });
            var autoItem = createElement('li', '', ['gw-button', 'gw-text', 'gw-btnAutoplay'], [this.autoButton]);
            if (!this.autoplayDialog || (config && isFalse(config.btnAutoplay))) {
                autoItem.classList.add('hidden');
            }
            this.bottomBarSoundButton = createElement('div', '', ['gw-icon', 'gw-btn-sfx']);
            this.bottomBarSoundButton.addEventListener('click', function () {
                _this.changeSoundStatus(_this.isSoundMuted);
                _this.gameWrapper.integration.muteSound(_this.isSoundMuted);
            });
            var volumeSlider = createElement('div', '', ['gw-slider-container', 'hidden']);
            volumeSlider.appendChild(createElement('div', '', ['gw-slider-sfx']));
            var soundItem = createElement('li', '', ['gw-button', 'gw-mobile', 'gw-btnSound'], [this.bottomBarSoundButton, volumeSlider]);
            if (config && isFalse(config.btnSound)) {
                soundItem.classList.add('hidden');
            }
            var list = createElement('ul');
            [menuItem, lobbyItem, soundItem, helpItem, autoItem].forEach(function (it) { return list.appendChild(it); });
            tools.appendChild(list);
            this.infoBar = createElement('div', 'gw-bar-info');
            this.balanceLabel = createElement('span', '', ['value']);
            var balanceItem = createElement('li', '', ['gw-balance', 'gw-lblBalance'], [
                textUtil.text(function () { return "".concat(Strings.BALANCE, ": "); }),
                this.balanceLabel
            ]);
            if (config && isFalse(config.lblBalance)) {
                balanceItem.classList.add('hidden');
            }
            this.netLabel = createElement('span', '', ['value']);
            var netAmountItem = createElement('li', '', ['gw-lblNetAmount', 'hidden'], [
                textUtil.text(function () { return "NET: "; }),
                this.netLabel
            ]);
            if (config && isTrue(config.lblNetAmount) && !this.gameWrapper.isHistoryGameMode()) {
                netAmountItem.classList.remove('hidden');
            }
            this.bonusRoundsLabel = createElement('span', '', ['value']);
            this.bonusRoundsItem = createElement('li', '', ['gw-bonus-rounds', 'hidden', 'gw-lblBonusRounds'], [
                textUtil.text(function () { return "".concat(Strings.BONUS_ROUNDS, ": "); }),
                this.bonusRoundsLabel
            ]);
            this.betLabel = createElement('span', '', ['value']);
            var betItem = createElement('li', '', ['gw-stake', 'gw-lblBet'], [
                textUtil.text(function () { return "".concat(Strings.BET, ": "); }),
                this.betLabel
            ]);
            if (config && isFalse(config.lblBet)) {
                betItem.classList.add('hidden');
            }
            this.winAmountLabel = createElement('span', '', ['value']);
            var winAmountItem = createElement('li', '', ['gw-win-amount', 'gw-lblWinAmount'], [
                textUtil.text(function () { return "".concat(Strings.WIN_AMOUNT, ": "); }),
                this.winAmountLabel
            ]);
            if (config && isFalse(config.lblWinAmount)) {
                winAmountItem.classList.add('hidden');
            }
            if (!(config && isFalse(config.lblCoinBalance))) {
                createElement('span', '', ['value']);
            }
            if (!(config && isFalse(config.lblCoinStake))) {
                createElement('span', '', ['value']);
            }
            this.modeLabel = createElement('div', '', ['gw-play-mode', 'gw-lblGameMode'], [
                textUtil.text(function () {
                    if (_this.gameWrapper.isDemoGameMode()) {
                        return Strings.MODE_PLAY_FOR_FUN;
                    }
                    else if (_this.gameWrapper.isHistoryGameMode()) {
                        return Strings.MODE_HISTORY;
                    }
                    return '';
                })
            ]);
            if (config && isFalse(config.lblGameMode)) {
                this.modeLabel.classList.add('hidden');
            }
            var infoItems = [balanceItem, netAmountItem, this.bonusRoundsItem, betItem, winAmountItem];
            var elapsedTime = createElement('div', '', ['gw-elapsedTime', 'hidden']);
            if (config && isTrue(config.elapsedTime) && !this.gameWrapper.isHistoryGameMode()) {
                elapsedTime.classList.remove('hidden');
            }
            infoItems.push(elapsedTime);
            this.demoShowsModeOnly = (_a = config === null || config === void 0 ? void 0 : config.demoShowsModeOnly) !== null && _a !== void 0 ? _a : false;
            var showModeOnly = this.gameWrapper.isDemoGameMode() && this.demoShowsModeOnly;
            var infoContent;
            if (showModeOnly) {
                infoContent = [
                    createElement('ul', '', [], this.modeLabel ? [createElement('li', '', [], [this.modeLabel])] : [])
                ];
            }
            else {
                infoContent = [createElement('ul', '', [], infoItems)];
                if (this.modeLabel) {
                    infoContent.push(this.modeLabel);
                }
            }
            this.infoBar.append(createElement('div', 'gw-info-content', [], infoContent));
            this.updateMode();
            this.bottomBar.append(tools, this.infoBar);
            var providerLogo = createElement('div', 'gw-provider', ['gw-provider-logo', 'gw-providerLogo'], []);
            if (config && isFalse(config.providerLogo)) {
                providerLogo.classList.add('hidden');
            }
            this.bottomBar.append(providerLogo);
            return this.bottomBar;
        };
        WrapperUI.prototype.attachRgs = function (rgs, params) {
            var _this = this;
            var wrapperReady = this.gameWrapper.ready;
            this.autoplayDialog && this.autoplayDialog.attachRgs(rgs);
            rgs.on('account-data-received', function (event) {
                var lastAccountData = event.detail;
                wrapperReady.then(function () {
                    if (_this.balanceLabel) {
                        _this.balanceLabel.innerText = _this.gameWrapper.formatCurrency(lastAccountData.balance, true, lastAccountData.currency);
                    }
                });
            });
            rgs.on('game-data-received', function (event) { return wrapperReady.then(function () {
                var isResumedRound = (rgs.is(SimpleFlowAdapter) && event.detail.game.nextAction !== 'spin')
                    || (rgs.is(TableGameAdapter) && event.detail.game.nextAction !== 'play');
                if (isResumedRound) {
                    _this.showMessage({ title: Strings.MSG_RESUMING_GAME });
                    _this.updateNetAmount();
                    _this.isWinCapped = (event.detail.spin && event.detail.spin.winCapped) ||
                        (event.detail.freespin && event.detail.freespin.winCapped);
                }
            }); });
            rgs.on('unsettled-ticket-received', function (event) { return wrapperReady.then(function () {
                if (event.detail) {
                    _this.updateNetAmount();
                    _this.showMessage({ title: Strings.MSG_RESUMING_GAME });
                }
            }); });
            rgs.on('spin-started', function () { return wrapperReady.then(function () {
                _this.clearWinAmount();
            }); });
            var onSpinDone = function (event) {
                _this.isWinCapped = _this.isWinCapped ||
                    (event.detail.spin && event.detail.spin.winCapped) ||
                    (event.detail.freespin && event.detail.freespin.winCapped);
                var isFreespinCapped = event.detail.freespin && event.detail.freespin.spinsCapped;
                if (isFreespinCapped) {
                    _this.showMessage({
                        title: Strings.MSG_MAX_FREESPINS_TITLE,
                        subtitle: Strings.MSG_MAX_FREESPINS + event.detail.freespin.spinsRemaining
                    });
                }
            };
            rgs.on('spin-done', onSpinDone);
            rgs.on('free-spin-done', onSpinDone);
            rgs.on('replay-started', function (event) { return wrapperReady.then(function () {
                _this.autoButton && _this.autoButton.classList.add('hidden');
                if (_this.winAmountLabel) {
                    _this.winAmountLabel.innerText = _this.gameWrapper.formatCurrency(0);
                }
            }); });
            rgs.on('replay-ended', function () {
                _this.autoButton && _this.autoButton.classList.remove('hidden');
                _this.updateWinAmount();
            });
            rgs.on('ticket-settled', function (event) { return wrapperReady.then(function () {
                _this.updateWinAmount();
                _this.updateNetAmount();
                if (_this.isWinCapped) {
                    _this.showMessage({
                        title: Strings.MSG_MAX_WIN,
                        subtitle: Strings.MSG_YOU_WON + _this.gameWrapper.formatCurrency(_this.gameWrapper.getWinAmount())
                    });
                }
                _this.isWinCapped = false;
            }); });
            rgs.retryPurchase = function (reason, tryCount, args) {
                if (tryCount < MAX_PURCHASE_ATTEMPTS) {
                    return _this.messageDialog.showRetryPurchase().then(function () { return rgs.purchase.apply(rgs, args); });
                }
                return Promise.reject(reason);
            };
            this.gameWrapper.on('bonus-rounds-enabled', function (_a) {
                var detail = _a.detail;
                var remainingBonusRounds = detail;
                _this.isBonusRoundsEnabled = true;
                if (_this.bonusRoundsLabel) {
                    _this.bonusRoundsLabel.innerText = remainingBonusRounds.toString();
                    _this.bonusRoundsItem.classList.remove('hidden');
                }
            });
            this.gameWrapper.on('bonus-rounds-updated', function (_a) {
                var detail = _a.detail;
                var remainingBonusRounds = detail;
                if (_this.bonusRoundsLabel) {
                    _this.bonusRoundsLabel.innerText = remainingBonusRounds.toString();
                }
            });
            this.gameWrapper.on('bonus-rounds-disabled', function () {
                _this.isBonusRoundsEnabled = false;
                if (_this.bonusRoundsLabel) {
                    _this.bonusRoundsLabel.innerText = '0';
                    _this.bonusRoundsItem.classList.add('hidden');
                }
            });
            rgs.on('error', function (event) { return wrapperReady.then(function () {
                var reason = event.detail;
                _this.gameWrapper.integration.handleRgsError(reason);
            }); });
        };
        WrapperUI.prototype.pauseGame = function () {
            this.gameWrapper.pauseGame();
        };
        WrapperUI.prototype.resumeGame = function () {
            this.gameWrapper.resumeGame();
        };
        WrapperUI.prototype.updateMode = function () {
            this.modeLabel && textUtil.update(this.modeLabel);
            if (this.gameWrapper.isDemoGameMode()) {
                if (!this.demoShowsModeOnly) {
                    this.infoBar && this.infoBar.classList.add('animate');
                }
            }
            else if (this.gameWrapper.isHistoryGameMode()) {
                this.autoButton && this.autoButton.classList.add('hidden');
                this.infoBar && this.infoBar.classList.add('animate');
            }
            else {
                if (this.modeLabel) {
                    this.modeLabel.style.display = 'none';
                }
                this.infoBar && this.infoBar.classList.remove('animate');
            }
        };
        WrapperUI.prototype.setTitle = function (name) {
            if (this.gameTitle) {
                this.gameTitle.innerText = name;
            }
            document.title = name;
        };
        WrapperUI.prototype.updateStrings = function () {
            textUtil.updateStrings();
            this.updateBetLabels(this.gameWrapper.getBet());
            this.autoplayDialog && this.autoplayDialog.updateStrings();
        };
        WrapperUI.prototype.setLoaderProgress = function (progress) {
            var totalProgress = internalAssetsLoaded ? progress : progress * (1 - INTERNAL_ASSET_RATIO);
            var percentage = Math.round(totalProgress * 100);
            if (this.splash) {
                this.splash.setLoaderProgress(progress, percentage);
            }
            if (totalProgress >= 1) {
                this.hideSplash();
            }
            this.gameWrapper.integration.updateLoadingProgress(totalProgress);
        };
        WrapperUI.prototype.hideSplash = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            var fireReady = function () {
                if (_this.isReady)
                    return;
                if (_this.splash) {
                    _this.splash.hide();
                }
                _this.topBar && _this.topBar.classList.remove('hidden');
                _this.bottomBar && _this.bottomBar.classList.remove('hidden');
                _this.dispatchEvent('ui-ready');
                _this.isReady = true;
            };
            if (force)
                fireReady();
            return this.gameWrapper.ready.then(fireReady);
        };
        WrapperUI.prototype.updateBet = function (bet) {
            this.gameWrapper.setBet(bet);
        };
        WrapperUI.prototype.updateBetLabels = function (bet) {
            if (this.betLabel) {
                this.betLabel.innerText = this.gameWrapper.formatCurrency(bet);
            }
            this.clearWinAmount();
        };
        WrapperUI.prototype.clearWinAmount = function () {
            if (this.winAmountLabel) {
                this.winAmountLabel.innerText = '';
            }
        };
        WrapperUI.prototype.updateWinAmount = function () {
            if (this.winAmountLabel) {
                this.winAmountLabel.innerText = this.gameWrapper.formatCurrency(this.gameWrapper.getWinAmount());
            }
        };
        WrapperUI.prototype.updateNetAmount = function () {
            if (this.netLabel) {
                this.netLabel.innerText = this.gameWrapper.formatCurrency(this.gameWrapper.getNetAmount());
            }
        };
        WrapperUI.prototype.showAutoplayDialog = function () {
            this.autoplayDialog && this.autoplayDialog.show();
        };
        WrapperUI.prototype.goToLobby = function () {
            var _this = this;
            this.pauseGame();
            return this.messageDialog.showLobbyConfirmation().then(function () { return _this.resumeGame.call(_this); });
        };
        WrapperUI.prototype.showMessage = function (message) {
            var _this = this;
            if (isString(message)) {
                message = { title: message };
            }
            this.pauseGame();
            this.messageDialog.showInfoMessage(message).then(function () { return _this.resumeGame.call(_this); });
        };
        WrapperUI.prototype.muteSound = function (mute) {
            this.isSoundMuted = mute;
            if (mute) {
                this.bottomBarSoundButton && this.bottomBarSoundButton.classList.add('gw-btn-sfx-off');
                this.topBarSoundButton && this.topBarSoundButton.classList.add('gw-btn-sfx-off');
            }
            else {
                this.bottomBarSoundButton && this.bottomBarSoundButton.classList.remove('gw-btn-sfx-off');
                this.topBarSoundButton && this.topBarSoundButton.classList.remove('gw-btn-sfx-off');
            }
            this.gameWrapper.integration.muteSound(this.isSoundMuted);
        };
        WrapperUI.prototype.setVolume = function (volume) {
            this.dispatchEvent('sound-set-volume', volume);
        };
        WrapperUI.prototype.setTurbo = function (turbo) {
            if (this.turbo !== turbo) {
                this.turbo = turbo;
                this.dispatchEvent('set-turbo', turbo);
            }
        };
        WrapperUI.prototype.showElementsTopBar = function (show, className) {
            var prefix = 'gw-';
            var targetDiv;
            targetDiv = this.topBar.getElementsByClassName(prefix + className)[0];
            if (targetDiv) {
                if (show) {
                    targetDiv.classList.remove('hidden');
                }
                else {
                    targetDiv.classList.add('hidden');
                }
            }
        };
        WrapperUI.prototype.showElementsBottomBar = function (show, className) {
            var prefix = 'gw-';
            var targetDiv;
            targetDiv = this.bottomBar.getElementsByClassName(prefix + className)[0];
            if (targetDiv) {
                if (show) {
                    targetDiv.classList.remove('hidden');
                }
                else {
                    targetDiv.classList.add('hidden');
                }
            }
        };
        return WrapperUI;
    }(CapabilitiesHost));

    function defaultCreateComponents(gameWrapper, params) {
        return {
            integration: new DefaultIntegrationLogic(gameWrapper, params),
            uiClass: WrapperUI,
        };
    }

    setComponentCreator(defaultCreateComponents);

    var GameWrapper = GameWrapper$1;
    var instance = new GameWrapper();
    var initialized = instance.initialized;
    var ready = instance.ready;
    exports.rgs = instance.rgs;
    exports.autoplay = instance.autoplay;
    exports.ui = instance.ui;
    exports.realityCheck = instance.realityCheck;
    exports.state = instance._state = instance.state;
    Object.defineProperty(instance, 'state', {
        get: function () { return instance._state; },
        set: function (val) { instance._state = val; exports.state = val; }
    });
    exports.gameMode = instance._gameMode = instance.gameMode;
    Object.defineProperty(instance, 'gameMode', {
        get: function () { return instance._gameMode; },
        set: function (val) { instance._gameMode = val; exports.gameMode = val; }
    });
    var setup = function (config, overrides) {
        instance.initialized.then(function () {
            exports.rgs = instance.rgs;
            exports.autoplay = instance.autoplay;
            exports.ui = instance.ui;
            exports.realityCheck = instance.realityCheck;
        });
        return instance.setup(config, overrides);
    };
    var init = function (config) {
        return setup(config);
    };
    var getConfig = instance.getConfig.bind(instance);
    var getGameConfig = instance.getGameConfig.bind(instance);
    var setCurrency = instance.setCurrency.bind(instance);
    var formatCurrency = instance.formatCurrency.bind(instance);
    var formatNumber = instance.formatNumber.bind(instance);
    var setName = instance.setName.bind(instance);
    var getBet = instance.getBet.bind(instance);
    var setBet = instance.setBet.bind(instance);
    var startReplay = instance.startReplay.bind(instance);
    var endReplay = instance.endReplay.bind(instance);
    var getNetAmount = instance.getNetAmount.bind(instance);
    var getElapsedTime = instance.getElapsedTime.bind(instance);
    var getJurisdiction = instance.getJurisdiction.bind(instance);
    var getWinAmount = instance.getWinAmount.bind(instance);
    var gameReady = instance.gameReady.bind(instance);
    var on = instance.on.bind(instance);
    var once = instance.once.bind(instance);
    var off = instance.off.bind(instance);

    exports.BUILD_DATE = BUILD_DATE;
    exports.GameWrapper = GameWrapper;
    exports.MAX_PURCHASE_ATTEMPTS = MAX_PURCHASE_ATTEMPTS;
    exports.VERSION = VERSION;
    exports.actions = actions;
    exports["default"] = GameWrapper$1;
    exports.endReplay = endReplay;
    exports.formatCurrency = formatCurrency;
    exports.formatNumber = formatNumber;
    exports.gameReady = gameReady;
    exports.getApiSelector = getApiSelector;
    exports.getBet = getBet;
    exports.getConfig = getConfig;
    exports.getElapsedTime = getElapsedTime;
    exports.getGameConfig = getGameConfig;
    exports.getJurisdiction = getJurisdiction;
    exports.getNetAmount = getNetAmount;
    exports.getParam = getParam;
    exports.getWinAmount = getWinAmount;
    exports.init = init;
    exports.initialized = initialized;
    exports.instance = instance;
    exports.off = off;
    exports.on = on;
    exports.once = once;
    exports.params = params;
    exports.ready = ready;
    exports.setApiSelector = setApiSelector;
    exports.setBet = setBet;
    exports.setCurrency = setCurrency;
    exports.setName = setName;
    exports.setup = setup;
    exports.startReplay = startReplay;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
