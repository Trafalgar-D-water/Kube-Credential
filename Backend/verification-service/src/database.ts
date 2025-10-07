import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path'
import {fileURLToPath} from 'url'
import { mkdir } from 'fs/promises';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const DB_PATH = path.join(__dirname , '../../data/certifications.sqlite')

export async function initializeDatabase(){
    try{
        await mkdir(path.dirname(DB_PATH) , {recursive : true})
    }
    catch(err){
        throw new Error('something went wrong while connecting to db')
    }

    const db = await open({
        filename : DB_PATH,
        driver : sqlite3.Database
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS certifications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          employeeId TEXT NOT NULL,
          certificationCode TEXT NOT NULL,
          employeeName TEXT NOT NULL,
          certificationName TEXT NOT NULL,
          issuingManager TEXT NOT NULL,
          issuedBy TEXT NOT NULL,
          timestamp INTEGER NOT NULL,
          UNIQUE(employeeId, certificationCode)
        )
      `);

      return db;
}

