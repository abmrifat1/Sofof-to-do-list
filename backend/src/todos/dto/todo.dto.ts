import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TodoStatus } from "../entity/todo.entity";

export class CreateSofofTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  status?: TodoStatus;
}

export class UpdateSofofTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  status?: TodoStatus;
}