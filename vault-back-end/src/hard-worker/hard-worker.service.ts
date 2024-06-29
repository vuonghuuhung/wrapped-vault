import { Injectable } from '@nestjs/common';
import { CreateHardWorkerDto } from './dto/create-hard-worker.dto';
import { HardWorker } from './entities/hard-worker.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class HardWorkerService {
  constructor(
    @InjectModel(HardWorker.name)
    private readonly hardWorkerModel: Model<HardWorker>,
  ) {}

  async create(createHardWorkerDto: CreateHardWorkerDto): Promise<HardWorker> {
    try {
      // check if exist
      const exist = await this.hardWorkerModel
        .findOne({ address: createHardWorkerDto.address })
        .exec();
      if (exist) {
        return null;
      }
      const createdHardWorker = new this.hardWorkerModel(createHardWorkerDto);
      return createdHardWorker.save();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findAll(): Promise<HardWorker[]> {
    try {
      return this.hardWorkerModel.find().exec();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async remove(address: string): Promise<boolean> {
    try {
      this.hardWorkerModel.deleteMany({ address }).exec();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @OnEvent('hardWorker.add')
  async handleHardWorkerAddEvent(payload: CreateHardWorkerDto) {
    await this.create(payload);
  }

  @OnEvent('hardWorker.remove')
  async handleHardWorkerRemoveEvent(payload: string) {
    await this.remove(payload);
  }
}
