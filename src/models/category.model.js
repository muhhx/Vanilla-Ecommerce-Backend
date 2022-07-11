"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true, unique: true }
}, {
    collection: "categories",
    timestamps: true
});
var CategoryModel = mongoose_1["default"].model("CategoryModel", categorySchema);
exports["default"] = CategoryModel;
