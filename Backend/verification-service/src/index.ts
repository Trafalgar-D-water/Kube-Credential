import express from 'express';
import type {Request , Response} from "express";
import {initializeDatabase} from './database.js'

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 8081;

app.post('/verify' , async (req : Request , res : Response) =>{
    const {employeeId ,certificationCode} = req.body
    if(!employeeId || !certificationCode){
        return res.status(400).json({messsage : 'employeeId and certificationCode are required.'})
    }

    const db = await initializeDatabase();

    try{
        const sql = `SELECT issuedBy, timestamp FROM certifications WHERE employeeId = ? AND certificationCode = ?`;
        const cert = await db.get(sql, [employeeId, certificationCode]);
        if(cert){
            res.status(200).json({
                verified: true,
                message: 'Certification is valid.',
                details: {
                    issuedBy: cert.issuedBy,
                    timestamp: new Date(cert.timestamp).toISOString()
                }
            });
        }
        else {
            res.status(404).json({ verified: false, message: 'Certification not found.' });
        }
    }
    catch(err : any){
        res.status(500).json({ message: 'Database error', error: err.message });
    }
})


app.listen(PORT, () => console.log(`Verification service listening on port ${PORT}`));
