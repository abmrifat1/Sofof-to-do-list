import { Inject, Injectable } from "@nestjs/common";
import { Todo } from "../interface/todo.repository.interface";
import { TodoStatus } from "../entity/todo.entity";

@Injectable()
export class TodoService {
  constructor(@Inject('TodoRepository') private readonly todoService: TodoService) { }

  findAll(status?: TodoStatus) {
    return this.todoService.findAll(status);
  }

  findById(id: string) {
    return this.todoService.findById(id);
  }

  create(payload: Partial<Todo>) {
    return this.todoService.create(payload);
  }

  update(id: string, payload: Partial<Todo>) {
    return this.todoService.update(id, payload);
  }

  delete(id: string) {
    return this.todoService.delete(id);
  }
}