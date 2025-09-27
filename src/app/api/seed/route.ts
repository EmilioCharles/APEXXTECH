import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { mockAgents } from '@/lib/data'; // We'll use our existing mock data file

// This route is for one-time use to seed the database.
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("apexxtech");
    const agentsCollection = db.collection("agents");

    // Clear existing data
    await agentsCollection.deleteMany({});

    // Insert new data
    await agentsCollection.insertMany(mockAgents);

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: 'Failed to seed database' }, { status: 500 });
  }
}
