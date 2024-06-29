import { JsonRpcProvider } from 'ethers';
import { Reader, Reader__factory } from 'vault-contract-sdk';

export class ContractClient {
  static provider: JsonRpcProvider;
  static reader: Reader;

  static getProvider() {
    if (!this.provider) {
      this.provider = new JsonRpcProvider('http://localhost:8545');
    }

    return this.provider;
  }

  static getReader() {
    if (!this.reader) {
      this.reader = Reader__factory.connect(
        '0xA3b48c7b901fede641B596A4C10a4630052449A6',
        this.getProvider(),
      );
    }

    return this.reader;
  }
}
