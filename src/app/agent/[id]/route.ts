import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("apexxtech");

    // Our mock data uses numeric IDs, so we need to parse the string from the URL
    const agentId = parseInt(params.id, 10);

    const agent = await db
      .collection("agents")
      .findOne({ id: agentId });

    if (!agent) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json(agent);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching agent' }, { status: 500 });
  }
}
