import { Injectable } from '@nestjs/common';
import { CreateWhiteListDto } from './dto/create-white-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WhiteList } from './entities/white-list.entity';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class WhiteListService {
  constructor(
    @InjectModel(WhiteList.name)
    private readonly whiteListModel: Model<WhiteList>,
  ) {}

  async create(createWhiteListDto: CreateWhiteListDto): Promise<WhiteList> {
    try {
      const exist = await this.whiteListModel
        .findOne({ address: createWhiteListDto.address })
        .exec();
      if (exist) {
        return null;
      }
      const createdWhiteList = new this.whiteListModel(createWhiteListDto);
      return createdWhiteList.save();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findAll(): Promise<WhiteList[]> {
    try {
      return this.whiteListModel.find().exec();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async remove(address: string): Promise<boolean> {
    try {
      this.whiteListModel.deleteOne({ address }).exec();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @OnEvent('whiteList.add')
  async handleWhiteListAddEvent(payload: CreateWhiteListDto) {
    await this.create(payload);
  }

  @OnEvent('whiteList.remove')
  async handleWhiteListRemoveEvent(payload: string) {
    await this.remove(payload);
  }
}
