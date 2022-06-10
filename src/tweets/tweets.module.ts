import { CacheModule, Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TweetCountService } from './tweet-count/tweet-count.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [CacheModule.register(), ScheduleModule.forRoot()],
  controllers: [TweetsController],
  providers: [TweetsService, PrismaService, TweetCountService]
})
export class TweetsModule {}
