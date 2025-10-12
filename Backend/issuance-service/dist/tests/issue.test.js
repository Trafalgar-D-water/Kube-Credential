import request from 'supertest';
import { app } from '../src/index.js';
describe('Issuance API', () => {
    it('returns 400 for missing fields', async () => {
        const res = await request(app).post('/issue').send({});
        expect(res.status).toBe(400);
    });
});
//# sourceMappingURL=issue.test.js.map