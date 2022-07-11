"use strict";
exports.__esModule = true;
exports.updateProduct = exports.deleteProduct = exports.findProductsByCollection = exports.findProductsByCategory = exports.findProductsByCartId = exports.findProduct = exports.findProducts = exports.createProduct = void 0;
var product_model_1 = require("../models/product.model");
var createProduct = function (name, description, price, gender, categoryId, collectionId, options) {
    return product_model_1["default"].create({
        name: name,
        description: description,
        price: price,
        thumb: options[0].images[0].url,
        gender: ["all", gender],
        categoryId: categoryId,
        collectionId: collectionId,
        options: options
    });
};
exports.createProduct = createProduct;
var findProducts = function () {
    return product_model_1["default"].find();
};
exports.findProducts = findProducts;
var findProduct = function (_id) {
    return product_model_1["default"].findById(_id);
};
exports.findProduct = findProduct;
var findProductsByCartId = function (cartIds) {
    return product_model_1["default"].find({ _id: { $in: cartIds } });
};
exports.findProductsByCartId = findProductsByCartId;
var findProductsByCategory = function (categoryId) {
    return product_model_1["default"].find({ categoryId: { $eq: categoryId } });
};
exports.findProductsByCategory = findProductsByCategory;
var findProductsByCollection = function (collectionId) {
    return product_model_1["default"].find({ collectionId: { $eq: collectionId } });
};
exports.findProductsByCollection = findProductsByCollection;
var deleteProduct = function (productId) {
    return product_model_1["default"].findByIdAndDelete(productId);
};
exports.deleteProduct = deleteProduct;
var updateProduct = function (productId, payload) {
    return product_model_1["default"].findByIdAndUpdate(productId, payload);
};
exports.updateProduct = updateProduct;
