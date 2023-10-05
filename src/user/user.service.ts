import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './interfaces/user.entity';
import {CreateUserDTO} from './dtos/createUser.dto'
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}
    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDTO.password, saltOrRounds)

        return this.userRepository.save({
            ...createUserDTO,
            password: passwordHashed
        })
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }
}
