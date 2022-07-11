"use strict";
exports.__esModule = true;
var multer = require("multer");
var storage = multer.memoryStorage();
var fileFilter = function (req, file, cb) {
    var allowedMimetypes = ["image/jpeg", "image/pjpeg", "image/png"];
    var mimetype = file.mimetype;
    if (allowedMimetypes.includes(mimetype)) {
        cb(null, true);
    }
    else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
};
var uploader = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 }
});
var multerMiddleware = uploader.array("File");
exports["default"] = multerMiddleware;
