"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
const serverless_1 = require("@neondatabase/serverless");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sql = (0, serverless_1.neon)(process.env.DB_URL);
