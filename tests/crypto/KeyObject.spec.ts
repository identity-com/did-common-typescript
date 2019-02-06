import KeyObject from '../../lib/crypto/KeyObject';
import { KeyType } from '../../lib/crypto/KeyType';
import WebCrypto from 'node-webcrypto-ossl';

const crypto = new WebCrypto();

describe('Constructor', () => {
  describe('Test constructor oct key', () => {
    it('Should set the right properties for the symmetric key.', (done) => {
      const alg = { name: 'hmac', hash: 'SHA-256' };
      crypto.subtle.generateKey(alg, true, [ 'sign' ]).then((key) => {
        let keyObject: KeyObject = new KeyObject(KeyType.Oct, key);
        expect(KeyType.Oct).toBe(keyObject.keyType);
        expect(false).toBe(keyObject.isKeyPair);
        expect(false).toBe(keyObject.isPublicKeyCrypto);
        done();
      });
    });

    it('Should set the right properties for the EC key.', (done) => {
      let alg: any = { name: 'ECDH', namedCurve: 'K-256' };
      crypto.subtle.generateKey(alg, true, [ 'deriveBits' ]).then((key) => {
        let keyObject: KeyObject = new KeyObject(KeyType.EC, key);
        expect(KeyType.EC).toBe(keyObject.keyType);
        expect(true).toBe(keyObject.isKeyPair);
        expect(true).toBe(keyObject.isPublicKeyCrypto);
        done();
      });
    });

    it('Should set the right properties for the imported private key.', (done) => {
      let alg: any = { name: 'ECDH', namedCurve: 'K-256' };
      crypto.subtle.generateKey(alg, true, [ 'deriveBits' ]).then((key: any) => {
        crypto.subtle.exportKey('jwk', key.privateKey).then((jwkKey: any) => {
          crypto.subtle.importKey('jwk', jwkKey, alg, true, [ 'deriveBits' ]).then((key: any) => {
            let keyObject: KeyObject = new KeyObject(KeyType.EC, key);
            expect(KeyType.EC).toBe(keyObject.keyType);
            expect(false).toBe(keyObject.isKeyPair);
            expect(true).toBe(keyObject.isPublicKeyCrypto);
            done();
          });
        });
      });
    });

    it('Should set the right properties for the imported public key.', (done) => {
      let alg: any = { name: 'ECDH', namedCurve: 'K-256' };
      crypto.subtle.generateKey(alg, true, [ 'deriveBits' ]).then((key: any) => {
        crypto.subtle.exportKey('jwk', key.publicKey).then((jwkKey: any) => {
          crypto.subtle.importKey('jwk', jwkKey, alg, true, [ 'deriveBits' ]).then((key: any) => {
            let keyObject: KeyObject = new KeyObject(KeyType.EC, key);
            expect(KeyType.EC).toBe(keyObject.keyType);
            expect(false).toBe(keyObject.isKeyPair);
            expect(true).toBe(keyObject.isPublicKeyCrypto);
            done();
          });
        });
      });
    });

  });
});
