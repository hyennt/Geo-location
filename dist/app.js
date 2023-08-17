"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geo = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'db_va',
    dialect: 'postgres',
    username: 'psql',
    password: '123456',
    host: 'localhost',
    port: 5432,
});
const sequelize_typescript_2 = require("sequelize-typescript");
let Geo = exports.Geo = class Geo extends sequelize_typescript_2.Model {
};
__decorate([
    sequelize_typescript_2.PrimaryKey,
    sequelize_typescript_2.AutoIncrement,
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.INTEGER),
    __metadata("design:type", Number)
], Geo.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Geo.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Geo.prototype, "roadName", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.DOUBLE),
    __metadata("design:type", Number)
], Geo.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.DOUBLE),
    __metadata("design:type", Number)
], Geo.prototype, "longtitude", void 0);
exports.Geo = Geo = __decorate([
    (0, sequelize_typescript_2.Table)({ tableName: 'geo' })
], Geo);
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
sequelize.sync({ force: true });
function startServer() {
    server.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}
startServer();
//# sourceMappingURL=app.js.map