import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import e from 'express';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentials;
        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({ username, password: hashedPassword });
		try {
			await this.save(user);
		} catch (error) { 
            console.error(error);
            if (error.code === '23505'){
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
            }
		}
	}
}
