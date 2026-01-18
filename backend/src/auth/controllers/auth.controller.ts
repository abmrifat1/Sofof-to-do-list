import { Body, Controller, Post } from "@nestjs/common";
import { User } from "../dto/user.dto";
import * as jwt from 'jsonwebtoken';
import { authJwtConstants } from "../constants/authJwt.constants";

@Controller('auth')
export class AuthController {

  @Post('login')
  login(@Body() user: User) {
    if (user?.userName === 'Sofof Tech' && user?.password === '123456') {
      const payload = { username: user?.userName };
      const token = jwt.sign(payload, authJwtConstants?.secret as jwt.Secret, { expiresIn: authJwtConstants.expiresIn as number });
      return { access_token: token };
    }
    return { status: 'invalid' };
  }
}
