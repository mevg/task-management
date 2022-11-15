import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
	private logger: Logger = new Logger('TaskRepository', { timestamp: true });
	async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
		const { status, search } = filterDto;

		const query = this.createQueryBuilder('task');
		query.where({ user });
		if (status) {
			query.andWhere('task.status = :status', { status });
		}
		if (search) {
			query.andWhere(
				'(LOWER(task.title) lIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
				{ search: `%${search}%` },
			);
		}
		try {
			const tasks = await query.getMany();
			return tasks;
		} catch (error) {
			this.logger.error(
				`Failed to get tasks for the user ${
					user.username
				}. Filters: ${JSON.stringify(filterDto)}`,
				error.trace
			);
			new InternalServerErrorException();
		}
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		const { title, description } = createTaskDto;

		const task: Task = this.create({
			title,
			description,
			status: TaskStatus.OPEN,
			user,
		});

		await this.save(task);
		return task;
	}
}
