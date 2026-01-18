import { TodoStatusEnum } from "../entity/todo.entity";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status?: TodoStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoRepository {
  create(todo: Partial<Todo>): Promise<Todo>;
  findAll(status?: TodoStatusEnum): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(id: string, data: Partial<Todo>): Promise<Todo>;
  delete(id: string): Promise<void>;
}