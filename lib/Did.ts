/**
 * Type definitions for DIDs
 */

/**
 * The scheme of a DID, which is always 'did'
 */
type Scheme = 'did';

/**
 * The DID method
 */
type Method = string;

/**
 * The method-specific identifier of the DID
 */
type Identifier = string;

/**
 * A DID (Decentralized Identifier) as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
export type Did = `${Scheme}:${Method}:${Identifier}`;

/**
 * An optional absolute URL path as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
type DidUrlPathAbempty = '' | `/${string}`;

/**
 * A URL fragment as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
export type DidUrlFragment = `#${string}`;

/**
 * A URL query as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
type DidUrlQuery = `#${string}`;

/**
 * A URL parameter string as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
type DidUrlParameterString = `;${string}`;

/**
 * A DID URL as defined by
 * https://www.w3.org/TR/did-core/#did-url-syntax
 */
export type DidUrl = `${Did}${DidUrlPathAbempty}${DidUrlFragment | DidUrlQuery | DidUrlParameterString | ''}`;
