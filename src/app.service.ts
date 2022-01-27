import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['pets'],
    }); // SELECT * from user ; JOIN with pets
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id); //SELECT * from user WHERE user.id === id
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({ name }); // const newUser = new User(); newUser.name = name
    return this.usersRepository.save(newUser); // INSERT
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name;
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return this.usersRepository.remove(user);
  }

  // Just an example of a custom query for SQL
  customQuery(): any {
    return this.usersRepository.createQueryBuilder('user').select('name');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
