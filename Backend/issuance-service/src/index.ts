import express from 'express';
import type { Request, Response } from "express"
import { initializeDatabase } from './database.js'

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 8080;
const POD_NAME = process.env.HOSTNAME || 'local-worker'

app.post('/issue', async (req: Request, res: Response) => {
    const { employeeId, employeeName, certificationCode, certificationName, issuingManager } = req.body
    if (!employeeId || !employeeName || !certificationCode) {
        return res.status(400).json({ message: 'some fileds are missing daa' });
    }

    const db = await initializeDatabase();
    try {
        const sql = `INSERT INTO certifications (employeeId, certificationCode, employeeName, certificationName, issuingManager, issuedBy, timestamp) VALUES (? ,? , ? ,? ,? ,? ,?)`
        const timestamp = Date.now()
        const result = await db.run(sql ,[employeeId, certificationCode, employeeName, certificationName, issuingManager || 'N/A', POD_NAME, timestamp])
        console.log(result , 'result')

        res.status(201).json({
            message: `credential issued by ${POD_NAME}`,
            certification: { id: result.lastID, employeeId }
        });
    }
    catch (err: any) {
        if(err.code === 'SQLITE_CONSTRAINT'){

            return res.status(409).json({ message: 'This certification has already been issued to this employee.' });
        }
        res.status(500).json({ message: 'Database error', error: err.message });

    }
})

app.get('/', (req, res) => {
    res.send('Hello from the Issuance Service!');
  });

app.listen(PORT, () => {
    console.log(`Issuance service listening on port ${PORT}`)
})