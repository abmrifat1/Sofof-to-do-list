import { Body, Controller, Post } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { authJwtConstants } from "../constants/authJwt.constants";

@Controller('auth')
export class AuthController {

  @Post('login')
  login(@Body() user: {username: string, password: string}) {
    const { username, password } = user;
    if (username === 'Sofof Tech' && password === '123456') {
      const payload = { username };
      const token = jwt.sign(payload, authJwtConstants?.secret as jwt.Secret, { expiresIn: authJwtConstants.expiresIn as number });
      return { access_token: token };
    }
    return { status: 'invalid' };
  }
}
