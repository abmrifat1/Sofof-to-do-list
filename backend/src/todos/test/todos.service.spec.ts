import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../services/todo.service';

const mockRepo = {
  create: jest.fn(({ title }) => Promise.resolve({ id: '1', title })),
  findAll: jest.fn(() => Promise.resolve([])),
  findById: jest.fn((id) => Promise.resolve({ id, title: 'x' })),
  update: jest.fn((id, data) => Promise.resolve({ id, ...data })),
  delete: jest.fn((id) => Promise.resolve()),
};

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: 'TodoRepository', useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('creates a todo', async () => {
    const res = await service.create({ title: 'test sofof todo' });
    expect(res?.title).toBe('test sofof todo');
    expect(mockRepo.create).toHaveBeenCalled();
  });
});