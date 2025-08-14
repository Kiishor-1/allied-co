import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  ];

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updated: Partial<User>): User {
    const user = this.getById(id);
    Object.assign(user, updated);
    return user;
  }

  replace(id: number, newUser: Omit<User, 'id'>): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User with ID ${id} not found`);
    this.users[index] = { id, ...newUser };
    return this.users[index];
  }

  delete(id: number): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User with ID ${id} not found`);
    this.users.splice(index, 1);
  }
}
