import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TodoStatusEnum } from "../entity/todo.entity";

export class CreateSofofTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateSofofTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  status?: TodoStatusEnum;
}