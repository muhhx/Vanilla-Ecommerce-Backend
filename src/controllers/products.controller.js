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
exports.handleUpdateProduct = exports.handleDeleteProduct = exports.handleCreateProduct = exports.handleGetProduct = exports.handleGetProducts = void 0;
var products_database_1 = require("../db/products.database");
function handleGetProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, products_database_1.findProducts)()];
                case 1:
                    products = _a.sent();
                    return [2 /*return*/, res.status(200).json(products)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.handleGetProducts = handleGetProducts;
function handleGetProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, products_database_1.findProduct)(id)];
                case 2:
                    product = _a.sent();
                    if (!product) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [2 /*return*/, res.status(200).json(product)];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleGetProduct = handleGetProduct;
function handleCreateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, description, price, gender, categoryId, collectionId, options, product, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, description = _a.description, price = _a.price, gender = _a.gender, categoryId = _a.categoryId, collectionId = _a.collectionId, options = _a.options;
                    if (!name ||
                        !description ||
                        !price ||
                        !gender ||
                        !categoryId ||
                        !collectionId) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "Por favor, preencha todos os campos." })];
                    }
                    if (options.length === 0) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "Crie no mínimo uma opção para o produto." })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, products_database_1.createProduct)(name, description, Number(price), gender, categoryId, collectionId, options)];
                case 2:
                    product = _b.sent();
                    return [2 /*return*/, res.status(201).json(product)];
                case 3:
                    error_3 = _b.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleCreateProduct = handleCreateProduct;
function handleDeleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, products_database_1.deleteProduct)(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(204)];
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleDeleteProduct = handleDeleteProduct;
function handleUpdateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, name, description, display, isSoldOut, isNewProduct, price, discountPrice, hasDiscount, gender, categoryId, collectionId, thumb, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, name = _a.name, description = _a.description, display = _a.display, isSoldOut = _a.isSoldOut, isNewProduct = _a.isNewProduct, price = _a.price, discountPrice = _a.discountPrice, hasDiscount = _a.hasDiscount, gender = _a.gender, categoryId = _a.categoryId, collectionId = _a.collectionId, thumb = _a.thumb;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, products_database_1.updateProduct)(id, {
                            name: name,
                            description: description,
                            display: display,
                            isSoldOut: isSoldOut,
                            isNewProduct: isNewProduct,
                            price: price,
                            discountPrice: discountPrice,
                            hasDiscount: hasDiscount,
                            gender: !gender ? undefined : ["all", gender],
                            categoryId: categoryId,
                            collectionId: collectionId,
                            thumb: thumb
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.sendStatus(200)];
                case 3:
                    error_5 = _b.sent();
                    return [2 /*return*/, res.sendStatus(500)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleUpdateProduct = handleUpdateProduct;
