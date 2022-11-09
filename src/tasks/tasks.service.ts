import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
@Injectable()
export class TasksService {
	private tasks: Task[] = [];


    constructor(){
        this.tasks = [
            {
                id: "651126f5-b1ee-4ae2-b3fa-4bb142d00fe1",
                title: "my new task",
                description: "my description",
                status: TaskStatus.OPEN
            },
            {
                id: "fbfcbd49-059f-46da-ac6c-d8df5347292f",
                title: "my new task",
                description: "my description",
                status: TaskStatus.IN_PROGRESS
            },
            {
                id: "7c51225b-4cd2-4872-b18f-4361d6615c6f",
                title: "my new task",
                description: "my description",
                status: TaskStatus.DONE
            },
            {
                id: "01d57cd0-1f44-422e-a6b1-8f0a1a23b23c",
                title: "my new task",
                description: "my description",
                status: TaskStatus.OPEN
            }
        ]
    }
	getAllTasks(): Array<Task> {
		return this.tasks;
	}

	getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
		const { status, search } = filterDto;
        //define a temporary array to hold the result
        let tasks = this.getAllTasks();
        // do something with status
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        // do something with search
        if(search) {
            tasks = tasks.filter(task => {
                return task.title.toLowerCase().includes(search) 
                || task.description.toLowerCase().includes(search);
            });
        }
        // return final result
        return tasks;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		};
		this.tasks.push(task);
		return task;
	}

	getById(id: string): Task {
		const task = this.tasks.find((t) => t.id === id);
        if (!task) {
          throw new NotFoundException(`task with ID "${id}" not found`);
        }
		return task;
	}
	deleteTask(id: string): void {
        const task = this.getById(id);
		this.tasks = this.tasks.filter((t) => t.id !== task.id);
	}

	updateTaskStatus(id: string, taskStatus: UpdateTaskStatus) {
		const task = this.getById(id);
		task.status = taskStatus.status;
		return task;
	}
}
