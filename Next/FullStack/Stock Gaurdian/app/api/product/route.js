import clientPromise from './mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request) {
    const client = await clientPromise;
    const db = client.db('stock');
    try {
        const inventory = db.collection('inventory');
        const query = {};
        const allproduct = await inventory.find(query).toArray();
        return NextResponse.json({ allproduct, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request) {
    let body = await request.json();
    const client = await clientPromise;
    const db = client.db('stock');
    try {
        const inventory = db.collection('inventory');
        const product = await inventory.insertOne(body);
        return NextResponse.json({ product, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}

export async function PUT(request) {
    const { id, quantity } = await request.json();
    const client = await clientPromise;
    const db = client.db('stock');
  
    try {
      const inventory = db.collection('inventory');
      const objectId = new ObjectId(id);
      const result = await inventory.updateOne(
        { _id: objectId },
        { $set: { quantity: quantity } }
      );
  
      if (result.modifiedCount === 1) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Failed to update product quantity' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      return NextResponse.json({ error: 'Failed to update product quantity' }, { status: 500 });
    }
  }

  export async function DELETE(request) {
    const { id } = await request.json();
  
    const client = await clientPromise;
    const db = client.db('stock');
    try {
      const inventory = db.collection('inventory');
      const objectId = new ObjectId(id);
      const result = await inventory.deleteOne({ _id: objectId });
  
      if (result.deletedCount === 1) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
  }
