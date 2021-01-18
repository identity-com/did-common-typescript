import IDidResolver from '../IDidResolver';
import IDidResolveResult from '../IDidResolveResult';
/** Options for constructing an HttpResolver. */
export interface HttpResolverOptions {
    /** The URL of the resolver service to use. */
    resolverUrl: string;
    /**
     * An implementation of the Fetch API to be used. This parameter is optional when used in a
     * browser environment; if not specified, the resolver will use `window.fetch`.
     *
     * Ideally this would be specified as type `GlobalFetch['fetch']`, however this would require all
     * consuming projects to include `dom` in their `tsconfig.lib` property, which is not desirable.
     */
    fetch?: any;
}
/**
 * Resolves DID Documents using a remote HTTP interface.
 */
export default class HttpResolver implements IDidResolver {
    private resolverUrl;
    private fetchImplementation;
    /**
     * Constructs a new HTTP resolver.
     *
     * @param urlOrOptions The endpoint to query (as a string), or else an instance of `HttpResolverOptions`.
     */
    constructor(urlOrOptions: string | HttpResolverOptions);
    private getDefaultFetchImplementation;
    /**
     * Looks up a DID Document via HTTP.
     */
    resolve(did: string): Promise<IDidResolveResult>;
}
