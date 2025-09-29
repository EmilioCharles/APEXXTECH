// This is a Server Component, which is great for performance.
import React from 'react';
import { Agent } from '../../../lib/data';
import clientPromise from '../../../lib/mongodb';
import { ArrowLeft, CheckCircle, Info, Zap, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// This helper function runs on the server to fetch data directly from MongoDB.
async function getAgent(id: string): Promise<Agent | null> {
  try {
    const client = await clientPromise;
    const db = client.db("apexxtech");
    // The ID from the URL is a string, but our data uses numbers.
    const agentId = parseInt(id, 10);

    const agentDoc = await db.collection("agents").findOne({ id: agentId });

    if (!agentDoc) {
      return null;
    }

    // Convert the MongoDB document to our Agent type.
    const { _id, ...agent } = agentDoc;
    return agent as Agent;

  } catch (error) {
    console.error("Failed to fetch agent from DB:", error);
    return null;
  }
}

// The page itself is an async component.
// CORRECTED: We now pass the entire props object to the function
// to ensure Next.js handles the params correctly.
export default async function AgentDetailPage(props: { params: { id: string } }) {
  // We access the ID through props.params.id
  const agent = await getAgent(props.params.id);

  // If no agent is found, show a helpful message.
  if (!agent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-slate-700">Agent Not Found</h1>
          <p className="text-slate-500 mt-2">The agent you're looking for doesn't exist or may have been moved.</p>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mt-6 font-semibold">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Agents
          </Link>
        </div>
      </div>
    );
  }

  // We construct the URL for the checkout page here on the server.
  const checkoutUrl = `/checkout?agentName=${encodeURIComponent(agent.name)}&price=${agent.pricingDetails.price || 0}&unit=${agent.pricingDetails.unit || 'one-time'}`;

  return (
    <div className="bg-slate-50 min-h-screen">
       <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to All Agents
            </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Agent Information */}
            <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                    <img src={agent.logo} alt={`${agent.name} logo`} className="h-20 w-20 rounded-xl mr-6 mb-4 sm:mb-0 flex-shrink-0"/>
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-800">{agent.name}</h1>
                        <p className="text-lg text-blue-600 font-semibold">{agent.category}</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">About {agent.name}</h2>
                    <p className="text-slate-600 leading-relaxed">{agent.description}</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-slate-700 flex items-center mb-3"><Zap className="h-5 w-5 mr-2 text-amber-500"/>Capabilities</h3>
                            <ul className="space-y-2">
                                {agent.capabilities.map(cap => ( <li key={cap} className="flex items-center text-slate-600"> <CheckCircle className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" /> {cap} </li> ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 flex items-center mb-3"><Info className="h-5 w-5 mr-2 text-sky-500"/>Performance</h3>
                             <ul className="space-y-2 text-slate-600">
                                <li><strong>Speed:</strong> {agent.performance.speed}</li>
                                <li><strong>Accuracy:</strong> {agent.performance.accuracy}</li>
                                <li><strong>Uptime:</strong> {agent.performance.uptime}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Column: Pricing Box with the link to checkout */}
            <div className="lg:col-span-1">
                <div className="sticky top-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-lg mb-2">Pricing</h3>
                        <div className="flex items-baseline mb-4">
                            <span className="text-4xl font-extrabold text-slate-900">${agent.pricingDetails.price || 0}</span>
                            {agent.pricingDetails.unit && <span className="ml-1.5 text-slate-500">/ {agent.pricingDetails.unit}</span>}
                        </div>
                        <p className="text-sm text-slate-500 mb-6 h-10">
                            {agent.pricingDetails.model === 'Freemium' 
                                ? `Includes a free tier of ${agent.pricingDetails.freeTierLimit} ${agent.pricingDetails.unit}s.` 
                                : 'Get started now with full access.'}
                        </p>
                        <Link href={checkoutUrl} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <ShoppingCart className="h-5 w-5"/>
                            Get Access Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

