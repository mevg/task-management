import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('signup')
	signup(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
		return this.authService.signup(authCredentials);
	}

	@Post('signin')
	signin(
		@Body() authCredentials: AuthCredentialsDto,
	): Promise<{ accessToken: string }> {
		return this.authService.signin(authCredentials);
	}
}
