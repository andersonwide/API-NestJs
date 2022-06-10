import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Tweet } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { Cache } from 'cache-manager';


@Injectable()
export class TweetCountService {
    private limit = 10;
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        private prisma: PrismaService){}
  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.prisma.tweet.create({
      data:{
        name:createTweetDto.name
      }
    });
  }
  @Interval(30000)
  async count() {
    console.log('Procurando novos tweets')
    let offset = await this.cacheManager.get<number>('tweet-offset');
    offset = offset === undefined ? 0 : offset;
    console.log(`offset ${offset}`);
    const tweets = await this.prisma.tweet.findMany({
        skip:offset,
    });
    console.log(`tamanho do array ${tweets.length}`);
    if(tweets.length >= this.limit){
    this.cacheManager.set('tweet-offset', offset + this.limit,{
        ttl: 60000,
    });
    console.log(`Achou mais ${this.limit} `)
    }
  }
}
