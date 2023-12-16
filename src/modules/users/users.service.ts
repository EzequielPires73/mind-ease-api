import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExists = await this.findUserByEmail(createUserDto.email);

      if(userAlreadyExists) throw new Error(`Usuário com o email ${createUserDto.email} já existe.`);

      const user = this.userRepository.create(createUserDto);

      return {
        success: true,
        message: 'Usuário criado com sucesso.',
        user: await this.userRepository.save(user)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({email});
    if(!user) return null;

    return user;
  }

  async findAll() {
    try {
      const [results, total] = await this.userRepository.findAndCount();

      return {
        success: true,
        results,
        total
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findOne(id: number) {
    try {
      const userAlreadyExists = await this.userRepository.findOneBy({id});
      if(!userAlreadyExists) throw new Error(`Usuário com o id ${id} não existe.`);

      return {
        success: true,
        result: userAlreadyExists,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userAlreadyExists = await this.userRepository.findOneBy({id});
      if(!userAlreadyExists) throw new Error(`Usuário com o id ${id} não existe.`);

      await this.userRepository.update(id, updateUserDto);

      return {
        success: true,
        message: `Usuário com o id ${id} atualizado com sucesso.`,
        result: await this.userRepository.findOneBy({id}),
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      const userAlreadyExists = await this.userRepository.findOneBy({id});
      if(!userAlreadyExists) throw new Error(`Usuário com o id ${id} não existe.`);

      await this.userRepository.delete(id);

      return {
        success: true,
        message: `Usuário com o id ${id} removido com sucesso.`,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
