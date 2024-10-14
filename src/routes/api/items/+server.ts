import { json } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/db';

export async function GET() {
    const db = await connectToDatabase();
    const items = await db.collection('portfolio_items').find().toArray();

    return json(items);
}



