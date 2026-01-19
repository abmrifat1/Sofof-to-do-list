import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoEntity } from './todos/entity/todo.entity';
import { TodoModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database.service';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'sofof_todo_user',
      password: process.env.DB_PASS || 'Sofof_Todo_Passw0rd!',
      database: process.env.DB_NAME || 'sofof_todo_db',
      models: [TodoEntity],
      autoLoadModels: true,
    }),
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'todos',
      method: RequestMethod.ALL,
    });
  }
}
