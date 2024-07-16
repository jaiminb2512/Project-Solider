import clientPromise from './mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const client = await clientPromise;
    const db = client.db('stock');
    try {
        const inventory = db.collection('inventory');
        const categories = await inventory.distinct("category");
        return NextResponse.json({ categories, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
