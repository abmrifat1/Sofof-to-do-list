import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

export enum TodoStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Table({ tableName: 'todos' })
export class TodoEntity extends Model<TodoEntity> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({})
  declare title: string;

  @Column({})
  declare description?: string;

  @Column({
    type: DataType.ENUM(...Object.values(TodoStatus)),
    allowNull: false,
    defaultValue: TodoStatus.PENDING,
  })
  declare status: TodoStatus;

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}