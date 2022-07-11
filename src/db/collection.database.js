"use strict";
exports.__esModule = true;
exports.updateCollection = exports.updateHomeCollection = exports.findHomeCollection = exports.getCollections = exports.deleteCollection = exports.createCollection = void 0;
var collection_model_1 = require("../models/collection.model");
var createCollection = function (payload) {
    return collection_model_1["default"].create(payload);
};
exports.createCollection = createCollection;
var deleteCollection = function (collectionId) {
    return collection_model_1["default"].findByIdAndDelete({ _id: collectionId });
};
exports.deleteCollection = deleteCollection;
var getCollections = function () {
    return collection_model_1["default"].find();
};
exports.getCollections = getCollections;
var findHomeCollection = function () {
    return collection_model_1["default"].findOne({ homePage: true });
};
exports.findHomeCollection = findHomeCollection;
var updateHomeCollection = function (collectionId) {
    return collection_model_1["default"].findByIdAndUpdate({ _id: collectionId }, { homePage: false });
};
exports.updateHomeCollection = updateHomeCollection;
var updateCollection = function (payload, collectionId) {
    return collection_model_1["default"].findByIdAndUpdate({ _id: collectionId }, payload, {
        "new": true
    });
};
exports.updateCollection = updateCollection;
