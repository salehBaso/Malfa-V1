import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon if using ?sslmode=require
  },
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
