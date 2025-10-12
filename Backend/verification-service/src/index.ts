import 'dotenv/config';
import express from 'express';
import type {Request , Response} from "express";
import {initializeDatabase} from './database.js'
import cors from 'cors'

export const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8081;
const POD_NAME = process.env.HOSTNAME || 'local-worker'

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', worker: POD_NAME });
});

app.post('/verify' , async (req : Request , res : Response) =>{
    const {employeeId ,certificationCode} = req.body
    console.log(req.body , 'req.body in verifcation service')
    if(!employeeId || !certificationCode){
        return res.status(400).json({messsage : 'employeeId and certificationCode are required.'})
    }

    const db = await initializeDatabase();
    console.log( db , 'db in verifcation service')

    try{
        const sql = `SELECT issuedBy, timestamp FROM certifications WHERE employeeId = $1 AND certificationCode = $2`;
        const result = await db.query(sql, [employeeId, certificationCode]);
        console.log(result , 'result in verifcation service')
        const cert = result.rows?.[0];
        console.log(cert , 'cert in verifcation service')
        if(cert){
            res.status(200).json({
                verified: true,
                message: 'Certification is valid.',
                details: {
                    issuedBy: cert.issuedBy,
                    timestamp: new Date(parseInt(cert.timestamp)).toISOString()
                }
            });
        }
        else {
            res.status(404).json({ verified: false, message: 'Certification not found.' });
        }
    }
    catch(err : any){
        console.log(err , 'err in verifcation service')
        res.status(500).json({ message: 'Database error', error: err.message });
    }
})


app.listen(PORT, () => {
    console.log(`Issuance service listening on port ${PORT}`)
}).on('error', (err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});