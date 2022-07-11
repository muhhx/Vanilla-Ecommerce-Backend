"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.handleVerifySession = exports.handleRefreshSession = exports.handleDeleteSession = exports.handleCreateSession = void 0;
var session_database_1 = require("../db/session.database");
var user_database_1 = require("../db/user.database");
var bcrypt_1 = require("../utils/bcrypt");
var jwt_1 = require("../utils/jwt");
function handleCreateSession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, isCorrect, accessPrivateKey, accessToken, refreshPrivateKey, refreshToken, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    if (!email || !password) {
                        return [2 /*return*/, res.status(400).json({ message: "Preencha todos os campos." })];
                    }
                    return [4 /*yield*/, (0, user_database_1.findUserByEmail)(email)];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ message: "Email ou senha inválidos. " })];
                    }
                    return [4 /*yield*/, (0, bcrypt_1.comparePassword)(user.password, password)];
                case 3:
                    isCorrect = _b.sent();
                    if (!isCorrect) {
                        return [2 /*return*/, res.status(404).json({ message: "Email ou senha inválidos. " })];
                    }
                    accessPrivateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
                    accessToken = (0, jwt_1.createJWT)({ userId: user._id, role: user.role }, accessPrivateKey, "600s");
                    refreshPrivateKey = process.env
                        .JWT_REFRESH_TOKEN_PRIVATE_KEY;
                    refreshToken = (0, jwt_1.createJWT)({ userId: user._id, role: user.role }, refreshPrivateKey, "1d");
                    return [4 /*yield*/, (0, session_database_1.createSession)(String(user._id), refreshToken)];
                case 4:
                    _b.sent();
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24,
                        sameSite: "none",
                        secure: true
                    });
                    return [2 /*return*/, res.status(200).json({ userId: user._id, role: user.role })];
                case 5:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [2 /*return*/, res.status(500).json({ data: error_1 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.handleCreateSession = handleCreateSession;
function handleDeleteSession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, session, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, session_database_1.findSession)(id)];
                case 2:
                    session = _a.sent();
                    if (!session) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [4 /*yield*/, (0, session_database_1.deleteSession)(id)];
                case 3:
                    _a.sent();
                    res.cookie("accessToken", "", {
                        maxAge: 0,
                        httpOnly: true,
                        sameSite: "none",
                        secure: true
                    });
                    res.cookie("refreshToken", "", {
                        maxAge: 0,
                        httpOnly: true,
                        sameSite: "none",
                        secure: true
                    });
                    return [2 /*return*/, res.sendStatus(204)];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/, res.sendStatus(500)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.handleDeleteSession = handleDeleteSession;
function handleRefreshSession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var refreshToken, session, refreshTokenKey, decoded, user, accessTokenKey, accessToken, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refreshToken = req.cookies.refreshToken;
                    if (!refreshToken) {
                        return [2 /*return*/, res.sendStatus(400)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, session_database_1.findSessionByToken)(refreshToken)];
                case 2:
                    session = _a.sent();
                    if (!session) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    refreshTokenKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
                    return [4 /*yield*/, (0, jwt_1.verifyJWT)(refreshToken, refreshTokenKey)];
                case 3:
                    decoded = _a.sent();
                    if (!decoded) {
                        return [2 /*return*/, res.sendStatus(401)];
                    }
                    return [4 /*yield*/, (0, user_database_1.findUser)(decoded.userId)];
                case 4:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.sendStatus(500)];
                    }
                    accessTokenKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
                    accessToken = (0, jwt_1.createJWT)({ userId: user._id, role: user.role }, accessTokenKey, "600s");
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    res.send("Session/RefreshToken");
                    return [2 /*return*/];
            }
        });
    });
}
exports.handleRefreshSession = handleRefreshSession;
function handleVerifySession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = req.user;
            res.status(200).json(user);
            return [2 /*return*/];
        });
    });
}
exports.handleVerifySession = handleVerifySession;
