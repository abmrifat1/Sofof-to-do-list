import { TodoStatus } from "../entity/todo.entity";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status?: TodoStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoRepository {
  create(todo: Partial<Todo>): Promise<Todo>;
  findAll(status?: TodoStatus): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(id: string, data: Partial<Todo>): Promise<Todo>;
  delete(id: string): Promise<void>;
}