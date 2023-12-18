import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/modules/auth/constants";
import { UserRoles } from "../entities/user-roles.enum";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            const user = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );

            if(user.role != UserRoles.ADMIN && user.role != UserRoles.SUPER_ADMIN) {
                throw new UnauthorizedException();
            }

            request['user'] = user;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        /* @ts-ignore */
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' || type === 'bearer' ? token : undefined;
    }
}