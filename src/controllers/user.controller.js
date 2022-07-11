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
exports.handleGetUser = exports.handleDeleteUser = exports.handleCreateUser = void 0;
var user_database_1 = require("../db/user.database");
var bcrypt_1 = require("../utils/bcrypt");
function handleCreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, email, password, passwordConfirmation, emailRejex, passwordRejex, hashedPassword, createdUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, email = _a.email, password = _a.password, passwordConfirmation = _a.passwordConfirmation;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    if (!password || !name || !email) {
                        return [2 /*return*/, res.status(400).json({ message: "Preencha todos os campos." })];
                    }
                    emailRejex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                    if (!emailRejex.test(email)) {
                        return [2 /*return*/, res.status(400).json({ message: "Informe um email válido." })];
                    }
                    passwordRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
                    if (!passwordRejex.test(password)) {
                        return [2 /*return*/, res.status(400).json({ message: "Informe uma senha válida." })];
                    }
                    if (password !== passwordConfirmation) {
                        return [2 /*return*/, res.status(400).json({ message: "As senhas devem ser iguais." })];
                    }
                    return [4 /*yield*/, (0, bcrypt_1.encryptPassword)(String(password))];
                case 2:
                    hashedPassword = _b.sent();
                    if (!hashedPassword) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "Algo deu errado ao criar sua conta." })];
                    }
                    return [4 /*yield*/, (0, user_database_1.createUser)({ name: name, email: email, hashedPassword: hashedPassword })];
                case 3:
                    createdUser = _b.sent();
                    return [2 /*return*/, res.sendStatus(201)];
                case 4:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.status(500).json({ error: error_1 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.handleCreateUser = handleCreateUser;
function handleDeleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jwtUser, id, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwtUser = req.user;
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, user_database_1.findUser)(id)];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    if (jwtUser.userId !== String(user._id)) {
                        return [2 /*return*/, res.sendStatus(401)];
                    }
                    return [4 /*yield*/, (0, user_database_1.deleteUser)(id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(204)];
                case 4:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.handleDeleteUser = handleDeleteUser;
function handleGetUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jwtUser, id, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwtUser = req.user;
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, user_database_1.findUser)(id)];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    if (jwtUser.userId !== String(user._id)) {
                        return [2 /*return*/, res.sendStatus(401)];
                    }
                    return [2 /*return*/, res.status(200).json({ name: user.name, email: user.email })];
                case 3:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleGetUser = handleGetUser;
