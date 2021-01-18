/**
 * Type definitions for DIDs
 */
/**
 * The scheme of a DID, which is always 'did'
 */
declare type Scheme = 'did';
/**
 * The DID method
 */
declare type Method = string;
/**
 * The method-specific identifier of the DID
 */
declare type Identifier = string;
/**
 * A DID (Decentralized Identifier) as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
export declare type Did = `${Scheme}:${Method}:${Identifier}`;
/**
 * An optional absolute URL path as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
declare type DidUrlPathAbempty = '' | `/${string}`;
/**
 * A URL fragment as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
export declare type DidUrlFragment = `#${string}`;
/**
 * A URL query as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
declare type DidUrlQuery = `#${string}`;
/**
 * A URL parameter string as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
declare type DidUrlParameterString = `;${string}`;
/**
 * A DID URL as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
export declare type DidUrl = `${Did}${DidUrlPathAbempty}${DidUrlFragment | DidUrlQuery | DidUrlParameterString | ''}`;
export {};
