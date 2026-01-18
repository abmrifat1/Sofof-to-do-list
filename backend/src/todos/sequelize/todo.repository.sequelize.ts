import { Injectable, NotFoundException } from '@nestjs/common';
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
    return todoData ? this.map(todoData) : null;
  }
  
  async findAll(status?: TodoStatusEnum): Promise<Todo[]> {
    const where = status ? { status } : undefined;
    const todoList = await this.todoModel.findAll({ where, order: [['createdAt', 'DESC']] });
    return todoList?.map((e) => this.map(e));
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    const created = await this.todoModel.create(todo as any);
    return this.map(created);
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const todoData = await this.todoModel.findByPk(id);
    if (!todoData) throw new NotFoundException('Sofof Todo not found');
    await todoData.update(data as any);
    return this.map(todoData);
  }

  async delete(id: string): Promise<void> {
    const todoDate = await this.todoModel.findByPk(id);
    if (!todoDate) throw new NotFoundException('Sofof Todo not found');
    await todoDate.destroy();
  }
}