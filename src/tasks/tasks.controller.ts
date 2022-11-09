import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { title } from 'process';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { UpdateTaskStatus } from './dtos/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    // @Get()
    // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    //     // if we  have any filters defined, cañll task.service.getTasksWithFilters()
    //     //otherwise, hust get all the tasks
    //     if(Object.keys(filterDto).length){
    //         //...
    //         return this.taskService.getTasksWithFilters(filterDto);
    //     }
    //     return this.taskService.getAllTasks();
    // }

    // @Get(":id")
    // getTaskById(@Param('id') id: string): Task{
    //     const task = this.taskService.getById(id);
    //     return task;
    // }

    // @Post()
    // createTask(
    //     @Body()
    //     createTaskDto: CreateTaskDto
    // ): Task {
    //     return this.taskService.createTask(createTaskDto);
    // }

    // @Delete(":id")
    // deleteTask(@Param('id') id: string) {
    //     this.taskService.deleteTask(id);
    // }

    // @Patch(':id/status')
    // updateTask(
    //     @Param('id') id: string,
    //     @Body() status: UpdateTaskStatus): Task{
    //         return this.taskService.updateTaskStatus(id, status);

    // }
}
