import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo, TodoRepository } from '../interface/todo.repository.interface';
import { TodoEntity, TodoStatusEnum } from '../entity/todo.entity';

@Injectable()
export class SequelizeTodoRepository implements TodoRepository {
  constructor(
    @InjectModel(TodoEntity)
    private todoModel: typeof TodoEntity,
  ) { }

  private map(entity: TodoEntity): Todo {
    return entity.toJSON() as Todo;
  }
 
  async findById(id: string): Promise<Todo | null> {
    const todoData = await this.todoModel.findByPk(id);
    if (todoData) {
      return this.map(todoData);
    } else {
      throw new NotFoundException(`Todo item not found`);
    }
  }
  
  async findAll(status?: TodoStatusEnum): Promise<Todo[]> {
    const where = status ? { status } : undefined;
    const todoList = await this.todoModel.findAll({ where, order: [['createdAt', 'DESC']] });
    if (todoList?.length > 0) {
      return todoList?.map((e) => this.map(e));
    } else {
      throw new NotFoundException(`No Todo list found`);
    }
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    try {
      const created = await this.todoModel.create(todo as any);
      return this.map(created);
    } catch (error) {
      const messages = error?.errors?.map(e => e?.message).join('; ');
      throw new BadRequestException(`Todo item creation error: ${messages}`);
    }
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    try {
      const todoData = await this.todoModel.findByPk(id);
      if (!todoData) throw new NotFoundException('Todo item not found');
      await todoData.update(data as any);
      return this.map(todoData);     
    } catch (error) {
      const messages = error?.response?.message ?? '';
      throw new BadRequestException(`Todo item updated error: ${messages}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {      
      const todoDate = await this.todoModel.findByPk(id);
      if (!todoDate) throw new NotFoundException('Todo item not found');
      await todoDate.destroy();
    } catch (error) {
      const messages = error?.response?.message ?? '';
      throw new BadRequestException(`Todo item deletion error: ${messages}`);
    }
  }
}