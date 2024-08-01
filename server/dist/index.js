"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DBconnect_1 = __importDefault(require("./utils/DBconnect"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const project_route_1 = __importDefault(require("./routes/project.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
// Routes
app.use("/", auth_route_1.default);
app.use("/", project_route_1.default);
app.get("/", (req, res) => {
    res.send("TypeScript wiht express");
});
app.listen(port || 5000, () => {
    console.log(`http://localhost:${port}`);
    (0, DBconnect_1.default)();
});
