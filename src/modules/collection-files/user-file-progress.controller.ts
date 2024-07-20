import { Body, Controller, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UserFileProgressService } from "./user-file-progress.service";
import { CreateUserFileDto } from "./dto/create-user-file.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user-file-progress')
export class UserFileProgressController {
    constructor(
        private userFileProgressService: UserFileProgressService
    ) {}

    @UseGuards(AuthGuard)
    @Patch(':id/progress')
    async updateUserFileProgress(
        @Param('id') fileId: number,
        @Body() body: CreateUserFileDto,
        @Req() {user}
    ) {
        console.log(fileId);
        console.log(body);
        console.log(user);
        return this.userFileProgressService.updateUserFileProgress(user.id, fileId, body);
    }
}