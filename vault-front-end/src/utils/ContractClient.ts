import { JsonRpcProvider, Signer } from 'ethers/providers';
import {
    Controller,
    Controller__factory,
    ERC20__factory,
    Reader,
    Reader__factory,
    Storage,
    Storage__factory,
    VaultV1__factory,
} from 'vault-contract-sdk';

export class ContractClient {
    static provider: JsonRpcProvider;
    static reader: Reader;
    static controller: Controller;
    static storage: Storage;

    static getProvider() {
        if (!this.provider) {
            this.provider = new JsonRpcProvider(import.meta.env.HARDHAT_NODE_URL || 'http://localhost:8545');
        }

        return this.provider;
    }

    static getReader() {
        if (!this.reader) {
            this.reader = Reader__factory.connect('0xA3b48c7b901fede641B596A4C10a4630052449A6', this.getProvider());
        }

        return this.reader;
    }

    static getController() {
        if (!this.controller) {
            this.controller = Controller__factory.connect(
                '0x798f111c92E38F102931F34D1e0ea7e671BDBE31',
                this.getProvider(),
            );
        }

        return this.controller;
    }

    static getStorage() {
        if (!this.storage) {
            this.storage = Storage__factory.connect('0x273c507D8E21cDE039491B14647Fe9278D88e91D', this.getProvider());
        }

        return this.storage;
    }

    static async getBlockTime() {
        const blockNumber = await this.getProvider().getBlockNumber();
        const block = await this.getProvider().getBlock(blockNumber);
        return block?.timestamp;
    }
}

export const depositToVault = async ({
    signer,
    vaultAddress,
    amount,
    depositToken,
}: {
    signer: Signer;
    vaultAddress: string;
    amount: string;
    depositToken: {
        address: string;
        decimals: string;
    };
}) => {
    const vault = VaultV1__factory.connect(vaultAddress, signer);
    const token = ERC20__factory.connect(depositToken.address, signer);
    let nonce = await signer.getNonce();
    let data = await token.approve.populateTransaction(vault.target, amount);
    let tx = await signer.sendTransaction({
        from: await signer.getAddress(),
        to: token.target,
        nonce,
        value: 0,
        data: data.data,
    });
    await tx.wait();
    nonce = await signer.getNonce();
    data = await vault.deposit.populateTransaction(amount);
    tx = await signer.sendTransaction({
        from: await signer.getAddress(),
        to: vault.target,
        nonce,
        value: 0,
        data: data.data,
    });
    await tx.wait();
    console.log(tx.hash);
    return tx.hash;
};

export const withdrawToVault = async ({
    signer,
    vaultAddress,
    amount,
}: {
    signer: Signer;
    vaultAddress: string;
    amount: string;
}) => {
    const vault = VaultV1__factory.connect(vaultAddress, signer);
    const nonce = await signer.getNonce();
    const data = await vault.withdraw.populateTransaction(amount);
    const tx = await signer.sendTransaction({
        from: await signer.getAddress(),
        to: vault.target,
        nonce,
        value: 0,
        data: data.data,
    });
    await tx.wait();
    console.log(tx.hash);
    return tx.hash;
};

export const doHardWork = async ({ signer, vaultAddress }: { signer: Signer; vaultAddress: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).doHardWork(vaultAddress);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        // console.log('Error doing hard work', (error as any).reason);
        throw Error((error as any).reason);
    }
};

export const addHardWorker = async ({ signer, worker }: { signer: Signer; worker: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).addHardWorker(worker);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        console.log('Error adding hard worker', error);
        throw Error('Not governance');
    }
};

export const removeHardWorker = async ({ signer, worker }: { signer: Signer; worker: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).removeHardWorker(worker);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

// TODO: edit here
export const addToWhiteList = async ({ signer, address }: { signer: Signer; address: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).addToWhitelist(address);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const removeFromWhiteList = async ({ signer, address }: { signer: Signer; address: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).removeFromWhitelist(address);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setUniversalLiquidator = async ({ signer, address }: { signer: Signer; address: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).setUniversalLiquidator(address);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setRewardForwarder = async ({ signer, address }: { signer: Signer; address: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).setRewardForwarder(address);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setGovernance = async ({ signer, address }: { signer: Signer; address: string }) => {
    try {
        const storage = ContractClient.getStorage();
        const tx = await storage.connect(signer).setGovernance(address);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setController = async ({ signer, address }: { signer: Signer; address: string }) => {
    try {
        const storage = ContractClient.getStorage();
        const tx = await storage.connect(signer).setController(address);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setImplementationDelay = async ({ signer, delay }: { signer: Signer; delay: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).setNextImplementationDelay(delay);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const confirmImplementationDelay = async ({ signer }: { signer: Signer }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).confirmNextImplementationDelay();
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setProtocolFeeNumerator = async ({ signer, numerator }: { signer: Signer; numerator: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).setPlatformFeeNumerator(numerator);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const setStrategistFeeNumerator = async ({ signer, numerator }: { signer: Signer; numerator: string }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).setStrategistFeeNumerator(numerator);
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const confirmProtocolFeeNumerator = async ({ signer }: { signer: Signer }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).confirmSetPlatformFeeNumerator();
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};

export const confirmStrategistFeeNumerator = async ({ signer }: { signer: Signer }) => {
    try {
        const controller = ContractClient.getController();
        const tx = await controller.connect(signer).confirmSetStrategistFeeNumerator();
        await tx.wait();
        console.log(tx.hash);
        return tx.hash;
    } catch (error) {
        throw Error('Not governance');
    }
};
