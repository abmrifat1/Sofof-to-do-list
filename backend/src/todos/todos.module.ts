import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TodoEntity } from "./entity/todo.entity";
import { TodoController } from "./controllers/todo.controller";
import { TodoService } from "./services/todo.service";
import { SequelizeTodoRepository } from "./sequelize/todo.repository.sequelize";

@Module({
  imports: [SequelizeModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: 'TodoRepository',
      useClass: SequelizeTodoRepository
    }
  ],
  exports: []
})

export class TodoModule {}