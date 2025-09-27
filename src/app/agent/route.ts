import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("apexxtech"); // Use your database name

    const agents = await db
      .collection("agents") // Use your collection name
      .find({})
      .toArray();

    return NextResponse.json(agents);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching agents' }, { status: 500 });
  }
}
