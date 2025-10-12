import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || "postgresql://cube_kayy_user:z5iHIZ78gZqFoDjWa6sLKoTGGhYXPvUC@dpg-d3lcf7vdiees739agtig-a.oregon-postgres.render.com/cube_kayy";
if (!connectionString) {
  throw new Error('DATABASE_URL env var is required for PostgreSQL connection');
}

const sslMode = process.env.PGSSLMODE;
const pool = new Pool({
  connectionString,
  ssl: sslMode === 'disable' ? false : { rejectUnauthorized: false }
});

export async function initializeDatabase(){
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

  return pool;
}

