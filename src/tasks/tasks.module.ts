import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([TaskRepository]),
		AuthModule,
	],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
