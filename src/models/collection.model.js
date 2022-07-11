"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var collectionSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    season: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: [String], required: true },
    lookbook: {
        type: [
            {
                url: { type: String, required: true },
                key: { type: String, required: true }
            },
        ],
        required: true
    },
    homePage: { type: Boolean, "default": false }
}, {
    collection: "collections",
    timestamps: true
});
var CollectionModel = mongoose_1["default"].model("CollectionModel", collectionSchema);
exports["default"] = CollectionModel;
