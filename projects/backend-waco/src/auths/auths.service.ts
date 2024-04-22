import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from './inputs/auth.input';
import { IUser } from '../users/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthsService {
  constructor(
    @Inject('USER_MODEL')
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(input: AuthInput): Promise<IUser> {
    const { username, password } = input;
    const isUSer: IUser = await this._usersService.findOne({
      $or: [{ email: username }, { username }],
    });

    if (isUSer) {
      const verifyPassword = await bcrypt.compare(password, isUSer.password);
      if (verifyPassword) {
        return isUSer;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async login(input: IUser): Promise<AuthDto> {
    const authType = new AuthDto();
    const payload = {
      id: input._id,
      userName: input.username,
      sub: input.email,
      firstName: input.firstname,
      lastName: input.lastname,
    };
    authType.access_token = this._jwtService.sign(payload);
    return authType;
  }
}
