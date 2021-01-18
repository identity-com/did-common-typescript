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
const fetch_mock_1 = __importDefault(require("fetch-mock"));
const HttpResolver_1 = __importDefault(require("../../lib/resolvers/HttpResolver"));
const exampleUrl = 'http://example.com';
const exampleDid = 'did:test:example.id';
const exampleDocument = {
    '@context': 'https://w3id.org/did/v1',
    'id': exampleDid
};
describe('HttpResolver', () => {
    describe('constructor', () => {
        it('should use the default fetch implementation when passed a resolver url', () => {
            global.self = {
                fetch: () => 'testing'
            };
            const resolver = new HttpResolver_1.default(exampleUrl);
            expect(resolver['resolverUrl']).toEqual(exampleUrl);
            expect(resolver['fetchImplementation']).toBeDefined();
            expect(resolver['fetchImplementation']('https://example.com')).toEqual('testing');
            delete global.self;
        });
        it('should use the default fetch implementation when passed HttpResolverOptions that specified a fetch instance', () => {
            const httpResolverOptions = {
                fetch: () => 'custom'
            };
            const resolver = new HttpResolver_1.default(httpResolverOptions);
            expect(resolver['fetchImplementation']).toBeDefined();
            expect(resolver['fetchImplementation']('https://example.com')).toEqual('custom');
        });
        it('should use the default fetch implementation when passed HttpResolverOptions that does not specify a fetch instance', () => {
            global.self = {
                fetch: () => 'testing'
            };
            const httpResolverOptions = {};
            const resolver = new HttpResolver_1.default(httpResolverOptions);
            expect(resolver['fetchImplementation']).toBeDefined();
            expect(resolver['fetchImplementation']('https://example.com')).toEqual('testing');
            delete global.self;
        });
        it('should throw an error if no default implementation exists', () => {
            try {
                const resolver = new HttpResolver_1.default(exampleUrl);
                fail('Not expected to get here: ' + resolver);
            }
            catch (e) {
                expect(e.message).toEqual('Please pass an implementation of fetch() to the HttpResolver.');
            }
        });
    });
    describe('resolve', () => {
        let resolver;
        let mock;
        beforeEach(() => {
            mock = fetch_mock_1.default.sandbox();
            resolver = new HttpResolver_1.default({
                resolverUrl: exampleUrl,
                fetch: mock
            });
        });
        it('should not add slash to resolver URL that a trailing slash.', () => __awaiter(void 0, void 0, void 0, function* () {
            const resolverWithTrailingSlash = new HttpResolver_1.default({
                resolverUrl: 'http://example.com/',
                fetch: mock
            });
            mock.mock(`${exampleUrl}/1.0/identifiers/${exampleDid}`, JSON.stringify({
                document: exampleDocument,
                resolverMetadata: {}
            }));
            let response = yield resolverWithTrailingSlash.resolve(exampleDid);
            expect(response.didDocument.id).toEqual(exampleDid);
        }));
        it('should return a valid DID document.', () => __awaiter(void 0, void 0, void 0, function* () {
            mock.mock(`${exampleUrl}/1.0/identifiers/${exampleDid}`, JSON.stringify({
                document: exampleDocument,
                resolverMetadata: {}
            }));
            let response = yield resolver.resolve(exampleDid);
            expect(response.didDocument.id).toEqual(exampleDid);
        }));
        it('should throw an appropriate error for a 404 response.', () => __awaiter(void 0, void 0, void 0, function* () {
            mock.mock(`${exampleUrl}/1.0/identifiers/${exampleDid}`, 404);
            try {
                yield resolver.resolve(exampleDid);
                fail('Should not reach here.');
            }
            catch (e) {
                expect(e.message).toContain('not found');
            }
        }));
        it('should throw an appropriate error for a miscellaneous error response.', () => __awaiter(void 0, void 0, void 0, function* () {
            mock.mock(`${exampleUrl}/1.0/identifiers/${exampleDid}`, 500);
            try {
                yield resolver.resolve(exampleDid);
                fail('Should not reach here.');
            }
            catch (e) {
                expect(e.message).toContain('reported an error');
            }
        }));
    });
});
//# sourceMappingURL=HttpResolver.spec.js.map