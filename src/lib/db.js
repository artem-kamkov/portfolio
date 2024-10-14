import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_DB_URL;
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db('my-sveltekit-db');
    }
    return db;
}