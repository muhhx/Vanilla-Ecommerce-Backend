"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var favoriteSchema = new mongoose_1["default"].Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true }
}, {
    collection: "favorites",
    timestamps: true
});
var FavoriteModel = mongoose_1["default"].model("FavoriteModel", favoriteSchema);
exports["default"] = FavoriteModel;
