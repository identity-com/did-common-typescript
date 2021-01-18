import DidDocument from '../lib/DidDocument';
import IDidDocument from '../lib/IDidDocument';
import { IDidDocumentServiceDescriptor } from '../lib';
import { Did, DidUrl } from '../lib/Did';

const did: Did = 'did:example:me.id';
const baseDocument: IDidDocument = {
  '@context': 'https://w3id.org/did/v1',
  'id': did
};

const exampleDid: Did = 'did:example:123456789abcdefghi';

/**
 * Helper to return a DID document with certain fields added/changed.
 */
const adjustBaseDocument = (fields: Partial<IDidDocument>) => {
  return new DidDocument(Object.assign({}, baseDocument, fields));
};

describe('DidDocument', () => {
  describe('getDidFromKeyId', () => {
    it('should return the correct DID from a correctly formatted key ID.', () => {
      const keyId = 'did:example:abc#key1';
      const did = DidDocument.getDidFromKeyId(keyId);
      expect(did).toEqual('did:example:abc');
    });
  });

  describe('constructor', () => {
    it(`should convert valid decentralized identifiers`, () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid,
        'publicKey': []
      };
      let document = new DidDocument(json);
      expect(document).toBeDefined();
      expect(document.id).toEqual(exampleDid);
    });

    it('should throw for missing ids', () => {
      const json = {
        '@context': 'https://w3id.org/did/v1',
        'publicKey': []
      };

      const throws = () => {
        console.log(new DidDocument(json as any));
      };

      expect(throws).toThrowError();
    });

    it('should throw for missing @context', () => {

      const json = {
        id: exampleDid,
        publicKey: []
      };

      const throws = () => {
        console.log(new DidDocument(json as any));
      };

      expect(throws).toThrowError();
    });

    it('should allow missing publicKey', () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid
      };
      let document = new DidDocument(json);
      expect(document).toBeDefined();
      expect(document.id).toEqual(exampleDid);
    });

    it('should return public keys', () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid,
        'publicKey': [{
          id: `${exampleDid}#keys-1`,
          controller: exampleDid,
          type: 'test',
          publicKeyPem: '-----BEGIN PUBLIC KEY-----\r\n-----END PUBLIC KEY-----\r\n\r\n'
        },
          {
            id: `${exampleDid}#keys-2`,
            controller: exampleDid,
            type: 'test',
            publicKeyBase64: 'DEADBEEF'
          }]
      };

      const document = new DidDocument(json);

      expect(document).toBeDefined();
      expect(document.id).toEqual(exampleDid);
      expect(document.publicKey).toBeDefined();
      const keys = document.publicKey;
      if (!keys) {
        return;
      }
      expect(keys.length).toEqual(2);
      expect(keys[0].id).toEqual(`${exampleDid}#keys-1`);
      expect(keys[0].type).toEqual('test');
      expect((keys[0] as any)['publicKeyPem']).toBeDefined();
      expect(keys[1].id).toEqual(`${exampleDid}#keys-2`);
      expect(keys[1].controller).toBeDefined();
      expect(keys[1].controller).toEqual(exampleDid);
      expect(keys[1].type).toEqual('test');
      expect((keys[1] as any)['publicKeyBase64']).toBeDefined();
    });

    it('should ensure key IDs are fully-qualified', () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid,
        'publicKey': [
          {
            id: `key1`,
            controller: exampleDid,
            type: 'test',
            publicKeyPem: '-----BEGIN PUBLIC KEY-----\r\n-----END PUBLIC KEY-----\r\n\r\n'
          },
          {
            id: `#key2`,
            controller: exampleDid,
            type: 'test',
            publicKeyBase64: 'DEADBEEF'
          },
          {
            id: `${exampleDid}#key3`,
            controller: exampleDid,
            type: 'test',
            publicKeyBase64: 'DEADBEEF'
          }
        ]
      };

      let document = new DidDocument(json);
      expect(document.getPublicKey(`${exampleDid}#key1`)).toBeDefined();
      expect(document.getPublicKey(`${exampleDid}#key2`)).toBeDefined();
      expect(document.getPublicKey(`${exampleDid}#key3`)).toBeDefined();
      expect(document.getPublicKey(`${exampleDid}#key4`)).not.toBeDefined();
    });

  });

  describe('getPublicKey', () => {
    it('should retrieve the matching key', () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid,
        'publicKey': [{
          id: `${exampleDid}#keys-1`,
          controller: exampleDid,
          type: 'test',
          publicKeyPem: '-----BEGIN PUBLIC KEY-----\r\n-----END PUBLIC KEY-----\r\n\r\n'
        },
          {
            id: `${exampleDid}#keys-2`,
            type: 'test',
            controller: exampleDid,
            publicKeyBase64: 'DEADBEEF'
          }]
      };

      const document = new DidDocument(json);

      const publicKey = document.getPublicKey(`${exampleDid}#keys-1`);
      expect(publicKey).toBeDefined();
      if (!publicKey) {
        return;
      }
      expect(publicKey.type).toEqual('test');
    });

    it('should return undefined for no matching key', () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid,
        'publicKey': [{
          id: `${exampleDid}#keys-1`,
          type: 'test',
          controller: exampleDid,
          publicKeyPem: '-----BEGIN PUBLIC KEY-----\r\n-----END PUBLIC KEY-----\r\n\r\n'
        },
          {
            id: `${exampleDid}#keys-2`,
            type: 'test',
            controller: exampleDid,
            publicKeyBase64: 'DEADBEEF'
          }]
      };

      const document = new DidDocument(json);

      const publicKey = document.getPublicKey(`${exampleDid}#keys-3`);
      expect(publicKey).toBeUndefined();
    });

    it('should return undefined when no keys are defined', () => {

      const json: IDidDocument = {
        '@context': 'https://w3id.org/did/v1',
        'id': exampleDid
      };

      const document = new DidDocument(json);

      const publicKey = document.getPublicKey(`${exampleDid}#keys-1`);
      expect(publicKey).toBeUndefined();
    });
  });

  describe('getServices', () => {

    it('should return the services in the document', () => {
      const serviceJson: IDidDocumentServiceDescriptor[] = [{
        id: `${did};agent` as DidUrl,
        type: 'AgentService',
        serviceEndpoint: 'https://agent.example.com/837746'
      },
        {
          id: `${did};hub` as DidUrl,
          type: 'HubService',
          serviceEndpoint: 'https://hub.example.com'
        }];

      const document = adjustBaseDocument({
        service: serviceJson
      });

      expect(document.getServices()).toEqual(serviceJson);
    });

    it('should return an empty array if the service field is not present', () => {
      const document = new DidDocument(baseDocument);
      expect(Array.isArray(document.getServices())).toBeTruthy();
      expect(document.getServices()).toEqual([]);
    });

  });

  describe('getServicesByType', () => {

    it('should return services based on type', () => {
      const serviceJson: IDidDocumentServiceDescriptor[] = [{
        id: `${did};agent` as DidUrl,
        type: 'AgentService',
        serviceEndpoint: 'https://agent.example.com/837746'
      },
        {
          id: `${did};hub` as DidUrl,
          type: 'HubService',
          serviceEndpoint: 'https://hub.example.com'
        },
        {
          id: `${did};hub2` as DidUrl,
          type: 'HubService',
          serviceEndpoint: 'https://hub.example.com'
        }];

      const document = adjustBaseDocument({
        service: serviceJson
      });

      const services = document.getServicesByType('HubService');

      expect(services.length).toEqual(2);

      [0, 1].forEach((index) => {
        expect(services[index]).toEqual(serviceJson[index + 1]);
      });
    });

    it('should return an empty array if the service field is not present', () => {
      const document = new DidDocument(baseDocument);
      expect(Array.isArray(document.getServices())).toBeTruthy();
      expect(document.getServicesByType('foo')).toEqual([]);
    });

  });

});
