import { Injectable } from '@nestjs/common';
import { prisma, Tweet } from '@prisma/client';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class TweetsService {
  constructor(private prisma: PrismaService){}
  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.prisma.tweet.create({
      data:{
        name:createTweetDto.name
      }
    });
  }

  async findAll() {
    return await this.prisma.tweet.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.tweet.findUnique({
      where:{
        id: id
      }
    });
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    return await this.prisma.tweet.update({
      where: {
        id: id
      }, data:{
        name: updateTweetDto.name
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.tweet.delete({
      where:{
        id: id
      }
    });
  }
}
