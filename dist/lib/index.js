"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitTestExports = exports.HttpResolver = exports.DidDocument = void 0;
const DidDocument_1 = __importDefault(require("./DidDocument"));
exports.DidDocument = DidDocument_1.default;
const HttpResolver_1 = __importDefault(require("./resolvers/HttpResolver"));
exports.HttpResolver = HttpResolver_1.default;
const TestResolver_1 = __importDefault(require("./mocks/TestResolver"));
exports.unitTestExports = {
    TestResolver: TestResolver_1.default
};
//# sourceMappingURL=index.js.map