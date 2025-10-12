import { Pool } from 'pg';
import dotenv from 'dotenv';



const connectionString = process.env.DATABASE_URL;
console.log('Database connection string:', connectionString ? 'Present' : 'Missing');

if (!connectionString) {
    throw new Error('DATABASE_URL env var is required for PostgreSQL connection');
}

const pool = new Pool({
    connectionString,
      ssl: {
        rejectUnauthorized: false
    }
});

// Add connection error handling
pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
});

pool.on('connect', () => {
    console.log('Database connected successfully');
});

export async function initializeDatabase() {
    try {
        // Test connection first
        await pool.query('SELECT NOW()');
        console.log('Database connection test successful');
        
        // Create table if it does not exist
        await pool.query(`
            CREATE TABLE IF NOT EXISTS certifications (
              id SERIAL PRIMARY KEY,
              employeeId TEXT NOT NULL,
              certificationCode TEXT NOT NULL,
              employeeName TEXT NOT NULL,
              certificationName TEXT NOT NULL,
              issuingManager TEXT NOT NULL,
              issuedBy TEXT NOT NULL,
              timestamp BIGINT NOT NULL,
              CONSTRAINT unique_employee_cert UNIQUE (employeeId, certificationCode)
            )
        `);
        console.log('Database table initialized');

        return pool;
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
}