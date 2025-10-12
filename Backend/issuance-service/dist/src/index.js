import 'dotenv/config';
import express from 'express';
import { initializeDatabase } from './database.js';
import cors from 'cors';
export const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;
const POD_NAME = process.env.HOSTNAME || 'local-worker';
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', worker: POD_NAME });
});
app.post('/issue', async (req, res) => {
    const { employeeId, employeeName, certificationCode, certificationName, issuingManager } = req.body;
    if (!employeeId || !employeeName || !certificationCode) {
        return res.status(400).json({ message: 'some fileds are missing daa' });
    }
    const db = await initializeDatabase();
    try {
        const sql = `INSERT INTO certifications (employeeId, certificationCode, employeeName, certificationName, issuingManager, issuedBy, timestamp) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`;
        const timestamp = Date.now();
        const result = await db.query(sql, [employeeId, certificationCode, employeeName, certificationName, issuingManager || 'N/A', POD_NAME, timestamp]);
        res.status(201).json({
            message: `credential issued by ${POD_NAME}`,
            certification: { id: result.rows?.[0]?.id, employeeId }
        });
    }
    catch (err) {
        if (err?.code === '23505') {
            return res.status(409).json({ message: 'This certification has already been issued to this employee.' });
        }
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});
app.get('/', (req, res) => {
    res.send('Hello from the Issuance Service!');
});
if (import.meta.url === process.argv[1] || import.meta.main) {
    app.listen(PORT, () => {
        console.log(`Issuance service listening on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map