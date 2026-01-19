export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt?: string;
  updatedAt?: string;
};