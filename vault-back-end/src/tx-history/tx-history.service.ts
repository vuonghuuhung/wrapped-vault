import { Injectable, Logger } from '@nestjs/common';
import { CreateTxHistoryDto } from './dto/create-tx-history.dto';
import { JsonRpcProvider } from 'ethers';
import { ContractClient } from 'src/web3/contract-client';
import {
  BaseUpgradeableStrategy__factory,
  Controller__factory,
  VaultV1__factory,
} from 'vault-contract-sdk';
import { DepositEvent } from './types/deposit-event.type';
import { WithdrawEvent } from './types/withdraw-event.type';
import { InjectModel } from '@nestjs/mongoose';
import { TxHistory } from './entities/tx-history.entity';
import { Model } from 'mongoose';
import { SharePriceChangeEvent } from './types/share-price-change-event.type';
import { NewHardWorkerEvent } from './types/new-hard-worker.type';
import { NewWhiteListEvent } from './types/new-white-list.type';
import { RemoveHardWorkerEvent } from './types/remove-hard-worker.type';
import { RemoveWhiteListEvent } from './types/remove-white-list.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateHardWorkerDto } from 'src/hard-worker/dto/create-hard-worker.dto';
import { CreateWhiteListDto } from 'src/white-list/dto/create-white-list.dto';
import { PlatformFeeEvent } from './types/platform-fee-event.type';
import { StrategistFeeEvent } from './types/strategist-fee-event';

@Injectable()
export class TxHistoryService {
  private readonly logger = new Logger(TxHistoryService.name);
  private readonly provider: JsonRpcProvider;

  constructor(
    @InjectModel(TxHistory.name)
    private readonly txHistoryModel: Model<TxHistory>,
    private eventEmitter: EventEmitter2,
  ) {
    this.provider = ContractClient.getProvider();

    this.logger.log(
      'DepositsService is initialized, filtering event DepoisitCreated...',
    );

    this.subcribeDepositEvent();
    this.subcribeWithdrawEvent();
    this.subcribeToDoHardWorkEvent();
    this.subcribeToNewHardWorkerEvent();
    this.subcribeToRemoveHardWorkerEvent();
    this.subcribeToNewAddressWhitelistEvent();
    this.subcribeToRemoveAddressWhitelistEvent();
  }

  subcribeDepositEvent(): void {
    const abi = VaultV1__factory.createInterface();
    const topicHash = abi.getEvent('Deposit').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
        .timestamp;
      const date = new Date(timestamp * 1000);
      const depositEvent = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (!event) {
            return false;
          }
          return event.name === 'Deposit';
        })[0];

      const [sender, receiver, assets, shares] = depositEvent.args;

      const depositEventData: DepositEvent = {
        sender,
        receiver,
        assets: assets.toString(),
        shares: shares.toString(),
      };

      const depositData: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: depositEvent.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify(depositEventData),
      };

      const savedTxHistory = await this.create(depositData);
      console.log({ savedTxHistory });
    });
  }

  subcribeWithdrawEvent(): void {
    const abi = VaultV1__factory.createInterface();
    const topicHash = abi.getEvent('Withdraw').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
        .timestamp;
      const date = new Date(timestamp * 1000);
      const withdrawEvent = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (!event) {
            return false;
          }
          return event.name === 'Withdraw';
        })[0];

      const [sender, receiver, owner, assets, shares] = withdrawEvent.args;

      const withdrawEventData: WithdrawEvent = {
        sender,
        receiver,
        owner,
        assets: assets.toString(),
        shares: shares.toString(),
      };

      const withdrawData: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: withdrawEvent.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify(withdrawEventData),
      };

      const savedTxHistory = await this.create(withdrawData);
      console.log({ savedTxHistory });
    });
  }

  /**
   * event SharePriceChangeLog(
        address indexed vault,
        address indexed strategy,
        uint256 oldSharePrice,
        uint256 newSharePrice,
        uint256 timestamp
    );
   */
  subcribeToDoHardWorkEvent(): void {
    const abi = Controller__factory.createInterface();
    const topicHash = abi.getEvent('SharePriceChangeLog').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      // const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
      //   .timestamp;
      const sharePriceChangeLog = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (event) {
            return event.name === 'SharePriceChangeLog';
          }

          return false;
        })[0];

      const [vault, strategy, oldSharePrice, newSharePrice, timestamp] =
        sharePriceChangeLog.args;

      const date = new Date(Number((timestamp * 1000n).toString()));

      const sharePriceChangeLogData: SharePriceChangeEvent = {
        vault,
        strategy,
        oldSharePrice: oldSharePrice.toString(),
        newSharePrice: newSharePrice.toString(),
        timestamp: timestamp.toString(),
      };

      //
      const strategyAbi = BaseUpgradeableStrategy__factory.createInterface();
      const allLogs = txReceipt.logs.map((log) => strategyAbi.parseLog(log));
      // console.log({ allLogs });
      const platformFeeLog = allLogs.filter((log) => {
        if (log) {
          return log.name === 'PlatformFeeLogInReward';
        }
        return false;
      });
      const strategistFeeLog = allLogs.filter((log) => {
        if (log) {
          return log.name === 'StrategistFeeLogInReward';
        }
        return false;
      });

      /**
     * emit PlatformFeeLogInReward(
                platformFeeRecipient,
                _rewardToken,
                _rewardBalance,
                platformFee,
                block.timestamp
            );
            emit StrategistFeeLogInReward(
                strategyFeeRecipient,
                _rewardToken,
                _rewardBalance,
                strategistFee,
                block.timestamp
            );
     */
      let platformFeeLogData: PlatformFeeEvent = null;
      let strategistFeeLogData: StrategistFeeEvent = null;
      if (platformFeeLog.length === 0 || strategistFeeLog.length === 0) {
      } else {
        const [platformFeeRecipient, rewardToken, rewardBalance, platformFee] =
          platformFeeLog[0].args;

        platformFeeLogData = {
          platformFeeRecipient,
          rewardToken,
          rewardBalance: rewardBalance.toString(),
          platformFee: platformFee.toString(),
          timestamp: timestamp.toString(),
        };

        const [
          strategistFeeRecipient,
          rewardToken2,
          rewardBalance2,
          strategistFee,
        ] = strategistFeeLog[0].args;

        strategistFeeLogData = {
          strategistFeeRecipient,
          rewardToken: rewardToken2,
          rewardBalance: rewardBalance2.toString(),
          strategistFee: strategistFee.toString(),
          timestamp: timestamp.toString(),
        };
      }

      //

      const sharePriceChangeLogDataDto: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: sharePriceChangeLog.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify([
          sharePriceChangeLogData,
          platformFeeLogData,
          strategistFeeLogData,
        ]),
      };

      const savedTxHistory = await this.create(sharePriceChangeLogDataDto);
      console.log({ savedTxHistory });
    });
  }

  /**
   * event AddedHardWorker(address indexed _address);
   */
  subcribeToNewHardWorkerEvent(): void {
    const abi = Controller__factory.createInterface();
    const topicHash = abi.getEvent('AddedHardWorker').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
        .timestamp;
      const date = new Date(timestamp * 1000);
      const newHardWorkerEvent = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (!event) {
            return false;
          }
          return event.name === 'AddedHardWorker';
        })[0];

      const [newHardWorker] = newHardWorkerEvent.args;

      const newHardWorkerEventData: NewHardWorkerEvent = {
        newHardWorker,
      };

      const newHardWorkerData: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: newHardWorkerEvent.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify(newHardWorkerEventData),
      };

      const savedTxHistory = await this.create(newHardWorkerData);

      // emit an event to let hard worker service save new hard worker
      const createHardWorkerDto: CreateHardWorkerDto = {
        address: newHardWorker,
      };
      this.eventEmitter.emit('hardWorker.add', createHardWorkerDto);

      console.log({ savedTxHistory });
    });
  }

  subcribeToRemoveHardWorkerEvent(): void {
    const abi = Controller__factory.createInterface();
    const topicHash = abi.getEvent('RemovedHardWorker').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
        .timestamp;
      const date = new Date(timestamp * 1000);
      const removedHardWorkerEvent = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (!event) {
            return false;
          }
          return event.name === 'RemovedHardWorker';
        })[0];

      const [removedHardWorker] = removedHardWorkerEvent.args;

      const removedHardWorkerEventData: RemoveHardWorkerEvent = {
        newHardWorker: removedHardWorker,
      };

      const removedHardWorkerData: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: removedHardWorkerEvent.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify(removedHardWorkerEventData),
      };

      const savedTxHistory = await this.create(removedHardWorkerData);

      // emit an event to let hard worker service remove hard worker
      this.eventEmitter.emit('hardWorker.remove', removedHardWorker);

      console.log({ savedTxHistory });
    });
  }

  subcribeToNewAddressWhitelistEvent(): void {
    const abi = Controller__factory.createInterface();
    const topicHash = abi.getEvent('AddedAddressToWhitelist').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
        .timestamp;
      const date = new Date(timestamp * 1000);
      const newAddressWhitelistEvent = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (!event) {
            return false;
          }
          return event.name === 'AddedAddressToWhitelist';
        })[0];

      const [newAddressWhitelist] = newAddressWhitelistEvent.args;

      const newAddressWhitelistEventData: NewWhiteListEvent = {
        address: newAddressWhitelist,
      };

      const newAddressWhitelistData: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: newAddressWhitelistEvent.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify(newAddressWhitelistEventData),
      };

      const savedTxHistory = await this.create(newAddressWhitelistData);

      // emit an event to let white list service save new white list
      const createWhiteListDto: CreateWhiteListDto = {
        address: newAddressWhitelist,
      };
      this.eventEmitter.emit('whiteList.add', createWhiteListDto);

      console.log({ savedTxHistory });
    });
  }

  subcribeToRemoveAddressWhitelistEvent(): void {
    const abi = Controller__factory.createInterface();
    const topicHash = abi.getEvent('RemovedAddressFromWhitelist').topicHash;
    this.provider.on({ topics: [topicHash] }, async (log) => {
      const txHash = log.transactionHash;
      const txReceipt = await this.provider.getTransactionReceipt(txHash);
      const from = txReceipt.from;
      const to = txReceipt.to;
      const timestamp = (await this.provider.getBlock(txReceipt.blockNumber))
        .timestamp;
      const date = new Date(timestamp * 1000);
      const removedAddressWhitelistEvent = txReceipt.logs
        .map((log) => abi.parseLog(log))
        .filter((event) => {
          if (!event) {
            return false;
          }
          return event.name === 'RemovedAddressFromWhitelist';
        })[0];

      const [removedAddressWhitelist] = removedAddressWhitelistEvent.args;

      const removedAddressWhitelistEventData: RemoveWhiteListEvent = {
        address: removedAddressWhitelist,
      };

      const removedAddressWhitelistData: CreateTxHistoryDto = {
        block: txReceipt.blockNumber,
        eventName: removedAddressWhitelistEvent.name,
        txHash,
        from,
        to,
        date,
        logs: JSON.stringify(removedAddressWhitelistEventData),
      };

      const savedTxHistory = await this.create(removedAddressWhitelistData);

      // emit an event to let white list service remove white list
      this.eventEmitter.emit('whiteList.remove', removedAddressWhitelist);

      console.log({ savedTxHistory });
    });
  }

  async create(createTxHistoryDto: CreateTxHistoryDto) {
    const createdTxHistory =
      await this.txHistoryModel.create(createTxHistoryDto);
    return createdTxHistory;
  }

  async findAll(vault: string, address: string): Promise<TxHistory[]> {
    // get the tx history from the database has from = address and to = vault
    try {
      const txHistories = await this.txHistoryModel
        .find({
          from: address,
          to: vault,
        })
        .exec();
      return txHistories;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async findInvestHistory(vault: string): Promise<TxHistory[]> {
    // get the tx history from the database has event name = 'SharePriceChangeLog' and the logs cointains vault
    try {
      const txHistories = await this.txHistoryModel
        .find({
          eventName: 'SharePriceChangeLog',
          logs: { $regex: vault },
        })
        .exec();
      return txHistories;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} txHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} txHistory`;
  }
}
