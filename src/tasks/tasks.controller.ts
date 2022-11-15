import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { title } from 'process';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	constructor(private taskService: TasksService) {}

	@Get()
	async getTasks(
		@Query() filterDto: GetTaskFilterDto,
		@GetUser() user: User,
	): Promise<Task[]> {
		return await this.taskService.getAllTasks(filterDto, user);
	}

	@Get(':id')
	async getTaskById(
		@Param('id') id: string,
		@GetUser() user: User,
	): Promise<Task> {
		const task = await this.taskService.getById(id, user);
		return task;
	}

	@Post()
	async createTask(
		@Body()
		createTaskDto: CreateTaskDto,
		@GetUser() user: User,
	): Promise<Task> {
		return await this.taskService.createTask(createTaskDto, user);
	}

	@Delete(':id')
	deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
		return this.taskService.deleteTask(id, user);
	}

	@Patch(':id/status')
	updateTask(
		@Param('id') id: string,
		@Body() status: UpdateTaskStatus,
		@GetUser() user: User,
	): Promise<Task> {
		return this.taskService.updateTaskStatus(id, status, user);
	}
}
