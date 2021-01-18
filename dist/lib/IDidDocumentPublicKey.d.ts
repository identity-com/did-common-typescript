import { Did, DidUrl, DidUrlFragment } from './Did';
/**
 * Interface defining a public key definition entry in a DID Document.
 *
 * See: https://w3c-ccg.github.io/did-spec/#public-keys
 *
 * @interface
 */
export default interface IDidDocumentPublicKey {
    /**
     * Identifier of this public key,
     * This can be fully qualified
     * e.g. did:example:entity.id#keys-1
     * or a fragment e.g. #keys-1 or keys-1
     * The DidDocument constructor will ensure this
     * gets converted to the fully-qualified version.
     */
    id: DidUrl | DidUrlFragment | string;
    /** The type of this public key, as defined in: https://w3c-ccg.github.io/ld-cryptosuite-registry/ */
    type: string;
    /** The DID of the controller of this key. */
    controller: Did;
    /** The value of the public key in PEM format. Only one value field will be present. */
    publicKeyPem?: string;
    /** The value of the public key in JWK format. Only one value field will be present. */
    publicKeyJwk?: object;
    /** The value of the public key in hex format. Only one value field will be present. */
    publicKeyHex?: string;
    /** The value of the public key in Base64 format. Only one value field will be present. */
    publicKeyBase64?: string;
    /** The value of the public key in Base58 format. Only one value field will be present. */
    publicKeyBase58?: string;
    /** The value of the public key in Multibase format. Only one value field will be present. */
    publicKeyMultibase?: string;
}
