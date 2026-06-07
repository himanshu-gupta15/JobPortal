"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = void 0;
const errorHandler_ts_1 = __importDefault(require("./errorHandler.ts"));
const TryCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (error) {
        if (error instanceof errorHandler_ts_1.default) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.TryCatch = TryCatch;
