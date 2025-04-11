import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FetchModule } from './fetch/fetch.module';

@Module({
  imports: [PrismaModule, FetchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
