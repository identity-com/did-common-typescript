"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for performing various DID document operations.
 */
class DidDocument {
    constructor(json) {
        for (let field of ['@context', 'id']) {
            if (!(field in json)) {
                throw new Error(`${field} is required`);
            }
        }
        this.rawDocument = json;
        this.context = json['@context'];
        this.id = json.id;
        this.publicKey = this.parsePublicKeyDetails(json.publicKey || []);
    }
    /**
     * Returns the DID within the key ID given.
     * @param keyId A fully-qualified key ID. e.g. 'did:example:abc#key1'
     * @example 'did:example:abc#key1' returns 'did:example:abc'
     */
    static getDidFromKeyId(keyId) {
        const didLength = keyId.indexOf('#');
        const did = keyId.substr(0, didLength);
        return did;
    }
    /**
     * Gets the matching public key for a given key id
     *
     * @param id fully qualified key id
     */
    getPublicKey(id) {
        return (this.publicKey).find(item => item.id === id);
    }
    /**
     * Returns all of the service endpoints contained in this DID Document.
     */
    getServices() {
        return this.rawDocument.service || [];
    }
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType(type) {
        return this.getServices().filter(service => service.type === type);
    }
    /**
     * Parses the `publicKey` array in the DID document and ensures that the key IDs are
     * fully-qualified.
     *
     * @param publicKeyDefinitions The `publicKey` array from the DID document.
     */
    parsePublicKeyDetails(publicKeyDefinitions) {
        return publicKeyDefinitions.map(key => {
            let id = key.id;
            if (!id.includes('#')) {
                id = `${this.id}#${id}`;
            }
            else if (id.indexOf('#') === 0) {
                id = this.id + id;
            }
            return Object.assign({}, key, { id });
        });
    }
}
exports.default = DidDocument;
//# sourceMappingURL=DidDocument.js.map