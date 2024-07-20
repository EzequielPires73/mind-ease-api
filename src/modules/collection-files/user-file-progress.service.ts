import { InjectRepository } from "@nestjs/typeorm";
import { UserFileProgress } from "./entities/collection-file.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateUserFileDto } from "./dto/create-user-file.dto";

@Injectable()
export class UserFileProgressService {
    constructor(
        @InjectRepository(UserFileProgress)
        private readonly userFileProgressRepository: Repository<UserFileProgress>,
    ) { }

    async updateUserFileProgress(userId: number, fileId: number, body: CreateUserFileDto): Promise<UserFileProgress> {
        console.log(body);
        let userFileProgress = await this.userFileProgressRepository.findOne({
            where: { user: { id: userId }, file: { id: fileId } },
        });

        if (!userFileProgress) {
            userFileProgress = this.userFileProgressRepository.create({
                user: { id: userId },
                file: { id: fileId },
            });
        }

        userFileProgress.progress = body.progress;
        if (body.progress >= 100) {
            userFileProgress.is_consumed = true;
        }

        return this.userFileProgressRepository.save(userFileProgress);
    }
}