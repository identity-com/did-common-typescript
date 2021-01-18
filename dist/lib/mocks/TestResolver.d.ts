import IDidResolver from '../IDidResolver';
import IDidResolveResult from '../IDidResolveResult';
import DidDocument from '../DidDocument';
/**
 * A mock resolver designed to return whatever document you want
 */
export default class TestResolver implements IDidResolver {
    /** Function called when requested */
    private handleRequest?;
    /**
     * Resolve a DID using the handleRequest function
     * @param did The DID to resolve
     */
    resolve(did: string): Promise<IDidResolveResult>;
    /** Calls handle whenever this resolver is requested to resolve a document. */
    setHandle(handle: (did: string) => Promise<DidDocument>): void;
    /** resets the resolvers resolve function */
    resetHandle(): void;
}
