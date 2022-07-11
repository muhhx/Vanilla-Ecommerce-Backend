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
exports.handleDeleteCollection = exports.handleUpdateCollection = exports.handleCreateCollection = exports.handleGetCollections = void 0;
var collection_database_1 = require("../db/collection.database");
var products_database_1 = require("../db/products.database");
function handleGetCollections(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var collections, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, collection_database_1.getCollections)()];
                case 1:
                    collections = _a.sent();
                    return [2 /*return*/, res.status(200).json(collections)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.handleGetCollections = handleGetCollections;
function handleCreateCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, description, season, author, lookbook, cover, newCollection, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, description = _a.description, season = _a.season, author = _a.author, lookbook = _a.lookbook;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    if (!name || !description || !season || !author || lookbook.length === 0) {
                        return [2 /*return*/, res.sendStatus(400)];
                    }
                    if (lookbook.length < 3) {
                        return [2 /*return*/, res.sendStatus(400)];
                    }
                    cover = [lookbook[0].url, lookbook[1].url, lookbook[2].url];
                    return [4 /*yield*/, (0, collection_database_1.createCollection)({
                            name: name,
                            description: description,
                            season: season,
                            author: author,
                            lookbook: lookbook,
                            cover: cover
                        })];
                case 2:
                    newCollection = _b.sent();
                    return [2 /*return*/, res.status(201).json(newCollection)];
                case 3:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleCreateCollection = handleCreateCollection;
function handleUpdateCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, name, description, season, author, cover, homePage, collection, updatedCollection, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, name = _a.name, description = _a.description, season = _a.season, author = _a.author, cover = _a.cover, homePage = _a.homePage;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, (0, collection_database_1.findHomeCollection)()];
                case 2:
                    collection = _b.sent();
                    if (!collection && homePage === false) {
                        return [2 /*return*/, res
                                .status(400)
                                .json("Você precisa de pelomenos um produto na home page.")];
                    }
                    if (collection && homePage === false && String(collection._id) === id) {
                        return [2 /*return*/, res
                                .status(400)
                                .json("Você precisa de pelomenos um produto na home page.")];
                    }
                    if (!(collection && homePage === true && String(collection._id) !== id)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, collection_database_1.updateHomeCollection)(String(collection._id))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [4 /*yield*/, (0, collection_database_1.updateCollection)({ name: name, description: description, season: season, author: author, cover: cover, homePage: homePage }, id)];
                case 5:
                    updatedCollection = _b.sent();
                    return [2 /*return*/, res.status(200).json(updatedCollection)];
                case 6:
                    error_3 = _b.sent();
                    console.log(error_3);
                    return [2 /*return*/, res.sendStatus(500)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.handleUpdateCollection = handleUpdateCollection;
function handleDeleteCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, products, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, products_database_1.findProductsByCollection)(id)];
                case 2:
                    products = _a.sent();
                    if (products.length > 0) {
                        return [2 /*return*/, res
                                .status(405)
                                .json("Existem produtos com essa coleção. Delete eles ou apenas atualize as informações sobre esta coleção.")];
                    }
                    return [4 /*yield*/, (0, collection_database_1.deleteCollection)(id)];
                case 3:
                    response = _a.sent();
                    return [2 /*return*/, res.sendStatus(200)];
                case 4:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.handleDeleteCollection = handleDeleteCollection;
