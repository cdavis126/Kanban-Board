"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_js_1 = __importDefault(require("./auth-routes.js"));
const index_js_1 = __importDefault(require("./api/index.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_js_1.default);
// Security for Api routes with JWT authentication
router.use('/api', auth_js_1.authenticateToken, index_js_1.default);
exports.default = router;
