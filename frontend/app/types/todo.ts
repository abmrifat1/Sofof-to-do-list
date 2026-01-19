export type TodoStatusEnum = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatusEnum;
  createdAt?: string;
  updatedAt?: string;
};