import request from 'supertest';
import { app } from '../src/index.js';

describe('Verification API', () => {
  it('returns 400 for missing fields', async () => {
    const res = await request(app).post('/verify').send({});
    expect(res.status).toBe(400);
  });
});

