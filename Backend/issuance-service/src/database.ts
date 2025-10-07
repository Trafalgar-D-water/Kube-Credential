import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path'


// This path points to the shared volume that Kubernetes will provide.
const DB_PATH = path.join('/data/certifications.sqlite');

export async function initializeDatabase(){
    
}
