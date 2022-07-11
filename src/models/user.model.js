"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    role: { type: String, "enum": ["user", "admin"], "default": "user" },
    password: { type: String, required: true, select: false }
}, {
    timestamps: true,
    collection: "users"
});
var UserModel = mongoose_1["default"].model("User", userSchema);
exports["default"] = UserModel;
