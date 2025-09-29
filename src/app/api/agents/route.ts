import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Agent } from '@/lib/data';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("apexxtech");

    // Fetch the raw data from the 'agents' collection in your database.
    const rawAgents = await db
      .collection("agents")
      .find({})
      .toArray();

    // REFINED: Map over the raw data from MongoDB to clean it up.
    // This removes the MongoDB-specific "_id" field and ensures
    // that the data structure perfectly matches our Agent interface.
    const agents: Agent[] = rawAgents.map((agentDoc) => {
      const { _id, ...agentData } = agentDoc;
      return agentData as Agent;
    });

    // Return the clean, correctly-typed agent data.
    return NextResponse.json(agents);

  } catch (e) {
    console.error("Error fetching agents from DB:", e);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

