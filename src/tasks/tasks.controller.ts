import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { title } from 'process';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
        return await this.taskService.getAllTasks(filterDto);
    }

    @Get(":id")
    async getTaskById(@Param('id') id: string): Promise<Task>{
        const task = await this.taskService.getById(id);
        return task;
    }

    @Post()
    async createTask(
        @Body()
        createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Delete(":id")
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch(':id/status')
    updateTask(
        @Param('id') id: string,
        @Body() status: UpdateTaskStatus): Promise<Task>{
            return this.taskService.updateTaskStatus(id, status);

    }
}
