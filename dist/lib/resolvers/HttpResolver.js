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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DidDocument_1 = __importDefault(require("../DidDocument"));
/**
 * Resolves DID Documents using a remote HTTP interface.
 */
class HttpResolver {
    /**
     * Constructs a new HTTP resolver.
     *
     * @param urlOrOptions The endpoint to query (as a string), or else an instance of `HttpResolverOptions`.
     */
    constructor(urlOrOptions) {
        if (typeof urlOrOptions === 'string') {
            this.resolverUrl = urlOrOptions;
            this.fetchImplementation = this.getDefaultFetchImplementation();
        }
        else {
            this.resolverUrl = urlOrOptions.resolverUrl;
            this.fetchImplementation = urlOrOptions.fetch || this.getDefaultFetchImplementation();
        }
    }
    getDefaultFetchImplementation() {
        // tslint:disable-next-line
        if (typeof self === 'object' && 'fetch' in self) {
            return self.fetch.bind(self);
        }
        throw new Error('Please pass an implementation of fetch() to the HttpResolver.');
    }
    /**
     * Looks up a DID Document via HTTP.
     */
    resolve(did) {
        return __awaiter(this, void 0, void 0, function* () {
            const slash = this.resolverUrl.endsWith('/') ? '' : '/';
            const query = `${this.resolverUrl}${slash}1.0/identifiers/${did}`;
            const response = yield this.fetchImplementation(query);
            if (!response.ok) {
                console.log(`Universal Resolver has returned ${response.status}`);
                switch (response.status) {
                    case 404:
                        throw new Error(`Decentralized ID Document not found for ${did}`);
                    default:
                        throw new Error(`Universal Resolver reported an error: ${response.statusText}`);
                }
            }
            const didDocument = yield response.json();
            return {
                didDocument: new DidDocument_1.default(didDocument.document),
                metadata: didDocument.resolverMetadata
            };
        });
    }
}
exports.default = HttpResolver;
//# sourceMappingURL=HttpResolver.js.map