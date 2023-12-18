import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string) {
        try {
            const user = await this.usersService.findUserByEmail(email);
            if (!user) throw new UnauthorizedException();

            const passwordHashed = compareSync(password, user.password);
            if (!passwordHashed) throw new UnauthorizedException();

            const { password: pass, ...result } = user;

            const payload = { sub: user.id, id: user.id, name: user.name, email: user.email, role: user.role };

            return {
                success: true,
                user: result,
                access_token: await this.jwtService.signAsync(payload)
            };
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}
