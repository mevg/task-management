import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
@Injectable()
export class TasksService {

    constructor(){}
	// getAllTasks(): Array<Task> {
	// 	return this.tasks;
	// }

	// getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
	// 	const { status, search } = filterDto;
    //     //define a temporary array to hold the result
    //     let tasks = this.getAllTasks();
    //     // do something with status
    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     // do something with search
    //     if(search) {
    //         tasks = tasks.filter(task => {
    //             return task.title.toLowerCase().includes(search) 
    //             || task.description.toLowerCase().includes(search);
    //         });
    //     }
    //     // return final result
    //     return tasks;
	// }

	// createTask(createTaskDto: CreateTaskDto): Task {
	// 	const { title, description } = createTaskDto;
	// 	const task: Task = {
	// 		id: uuid(),
	// 		title,
	// 		description,
	// 		status: TaskStatus.OPEN,
	// 	};
	// 	this.tasks.push(task);
	// 	return task;
	// }

	// getById(id: string): Task {
	// 	const task = this.tasks.find((t) => t.id === id);
    //     if (!task) {
    //       throw new NotFoundException(`task with ID "${id}" not found`);
    //     }
	// 	return task;
	// }
	// deleteTask(id: string): void {
    //     const task = this.getById(id);
	// 	this.tasks = this.tasks.filter((t) => t.id !== task.id);
	// }

	// updateTaskStatus(id: string, taskStatus: UpdateTaskStatus) {
	// 	const task = this.getById(id);
	// 	task.status = taskStatus.status;
	// 	return task;
	// }
}
