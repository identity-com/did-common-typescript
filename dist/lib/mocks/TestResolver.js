"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A mock resolver designed to return whatever document you want
 */
class TestResolver {
    /**
     * Resolve a DID using the handleRequest function
     * @param did The DID to resolve
     */
    resolve(did) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.handleRequest) {
                throw new Error('TestResolver handler not set');
            }
            const document = yield this.handleRequest(did);
            return {
                didDocument: document
            };
        });
    }
    /** Calls handle whenever this resolver is requested to resolve a document. */
    setHandle(handle) {
        this.handleRequest = handle;
    }
    /** resets the resolvers resolve function */
    resetHandle() {
        this.handleRequest = undefined;
    }
}
exports.default = TestResolver;
//# sourceMappingURL=TestResolver.js.map