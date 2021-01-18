import DidPublicKey from './IDidDocumentPublicKey';
import IDidDocument from './IDidDocument';
import { Did } from './Did';
/**
 * Class for performing various DID document operations.
 */
export default class DidDocument {
    /**
     * Returns the DID within the key ID given.
     * @param keyId A fully-qualified key ID. e.g. 'did:example:abc#key1'
     * @example 'did:example:abc#key1' returns 'did:example:abc'
     */
    static getDidFromKeyId(keyId: string): Did;
    /** Url of the @context for this document */
    context: string;
    /** The DID to which this DID Document pertains. */
    id: Did;
    /** Array of public keys associated with the DID */
    publicKey: DidPublicKey[];
    /** The raw document returned by the resolver. */
    rawDocument: IDidDocument;
    constructor(json: IDidDocument);
    /**
     * Gets the matching public key for a given key id
     *
     * @param id fully qualified key id
     */
    getPublicKey(id: string): DidPublicKey | undefined;
    /**
     * Returns all of the service endpoints contained in this DID Document.
     */
    getServices(): import("./IDidDocumentServiceDescriptor").default[];
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType(type: string): import("./IDidDocumentServiceDescriptor").default[];
    /**
     * Parses the `publicKey` array in the DID document and ensures that the key IDs are
     * fully-qualified.
     *
     * @param publicKeyDefinitions The `publicKey` array from the DID document.
     */
    private parsePublicKeyDetails;
}
