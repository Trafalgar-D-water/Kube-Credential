import express from 'express';
import type {Request , Response} from "express"
import {initializeDatabase} from './database.js'

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 8080;
const POD_NAME = process.env.HOSTNAME || 'local-worker'

app.post('/issue' , async (req : Request , res : Response)=>{
    const {employeeId , employeeName , certificationCode , certificationName,issuingManager} = req.body
    if(!employeeId || !employeeName || !certificationCode ){
        return res.status(400).json({message : 'some fileds are missing daa'});
    }

    const db = await initializeDatabase();

})

app.listen(PORT , ()=>{
    console.log(`Issuance service listening on port ${PORT}`)
})