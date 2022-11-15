import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}
	getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto, user);
	}

	createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto, user);
	}

	async getById(id: string, user: User): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id, user } });
		if (!task) {
			throw new NotFoundException(`task with ID "${id}" not found`);
		}
		return task;
	}

	async deleteTask(id: string, user: User): Promise<void> {
		const { affected } = await this.taskRepository.delete({id, user});
		if (affected == 0) {
			throw new NotFoundException(`task with ID "${id}" not found`);
		}
	}

	async updateTaskStatus(
		id: string,
		taskStatus: UpdateTaskStatus,
		user: User,
	): Promise<Task> {
		const task = await this.getById(id, user);
		task.status = taskStatus.status;
		await this.taskRepository.save(task);
		return task;
	}
}
