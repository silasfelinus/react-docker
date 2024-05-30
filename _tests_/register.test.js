import { createMocks } from 'node-mocks-http';
import registerHandler from '../pages/api/auth/register';
import db from '../db';

jest.mock('../db');

describe('/api/auth/register', () => {
  beforeEach(() => {
    db.data = { users: [] };
  });

  it('should create a new user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await registerHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(db.data.users).toHaveLength(1);
    expect(db.data.users[0]).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
    });
  });

  it('should not create a user if email already exists', async () => {
    db.data.users.push({
      id: '1',
      name: 'Existing User',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await registerHandler(req, res);

    expect(res._getStatusCode()).toBe(409);
  });
});
