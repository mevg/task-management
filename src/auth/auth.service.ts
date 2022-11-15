import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private usersRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signup(authCredentials: AuthCredentialsDto): Promise<void> {
		return this.usersRepository.createUser(authCredentials);
	}

	async signin(
		authCredentials: AuthCredentialsDto,
	): Promise<{ accessToken: string }> {
		const { username, password } = authCredentials;
		const user = await this.usersRepository.findOne({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayload = { username };
			const accessToken = await this.jwtService.signAsync(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException(
				'Please check your login credentials',
			);
		}
	}
}
