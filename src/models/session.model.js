"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var sessionSchema = new mongoose_1["default"].Schema({
    userId: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true }
}, {
    timestamps: true,
    collection: "sessions"
});
var SessionModel = mongoose_1["default"].model("Session", sessionSchema);
exports["default"] = SessionModel;
