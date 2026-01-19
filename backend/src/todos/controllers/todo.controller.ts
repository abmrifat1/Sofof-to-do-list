import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TodoService } from "../services/todo.service";
import { TodoStatus } from "../entity/todo.entity";
import { CreateSofofTodoDto, UpdateSofofTodoDto } from "../dto/todo.dto";

@Controller('todos')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Query('status') status?: TodoStatus) {
    return this.todoService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateSofofTodoDto) {
    return this.todoService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateSofofTodoDto) {
    return this.todoService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
