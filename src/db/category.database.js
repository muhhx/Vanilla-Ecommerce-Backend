"use strict";
exports.__esModule = true;
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
var category_model_1 = require("../models/category.model");
var createCategory = function (name) {
    return category_model_1["default"].create({
        name: name
    });
};
exports.createCategory = createCategory;
var getCategories = function () {
    return category_model_1["default"].find({}, { _id: 1, name: 1 });
};
exports.getCategories = getCategories;
var updateCategory = function (categoryId, newName) {
    return category_model_1["default"].findByIdAndUpdate(categoryId, { name: newName });
};
exports.updateCategory = updateCategory;
var deleteCategory = function (categoryId) {
    return category_model_1["default"].findByIdAndDelete({ _id: categoryId });
};
exports.deleteCategory = deleteCategory;
