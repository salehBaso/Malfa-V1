import { query } from '../lib/db';

export default async function handler(req: any, res: any) {
    try {
        const result = await query('SELECT NOW() as time');
        res.status(200).json({
            message: "Database connection successful",
            time: result.rows[0].time
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Database connection failed' });
    }
}
