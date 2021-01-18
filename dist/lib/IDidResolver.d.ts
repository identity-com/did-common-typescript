import IDidResolveResult from './IDidResolveResult';
import { Did } from './Did';
/**
 * Interface for performing various DID lookup operations.
 *
 * @interface
 */
export default interface IDidResolver {
    /**
     * Gets a DID Document given a fully qualified DID
     * @param did A fully qualified DID
     * @return A {@link DidDocument} object
     */
    resolve(did: Did): Promise<IDidResolveResult>;
}
