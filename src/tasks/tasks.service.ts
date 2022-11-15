import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {

    constructor(
        private taskRepository: TaskRepository
    ){}
	getAllTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
	}

	createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async getById(id: string): Promise<Task> {
		const task = await this.taskRepository.findOne({where: {id}});
        if (!task) {
          throw new NotFoundException(`task with ID "${id}" not found`);
        }
		return task;
	}

	async deleteTask(id: string): Promise<void> {
	    const { affected } =  await this.taskRepository.delete(id);
        if( affected == 0) {
            throw new NotFoundException(`task with ID "${id}" not found`);
        }
	}

	async updateTaskStatus(id: string, taskStatus: UpdateTaskStatus): Promise<Task>{
		const task = await this.getById(id);
		task.status = taskStatus.status;
        await this.taskRepository.save(task);
		return task;
	}
}
