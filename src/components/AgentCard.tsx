import React from 'react';

// Define the type for an Agent object to ensure data consistency
interface Agent {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  capabilities: string[];
  verified: boolean;
  performance: {
    accuracy: string;
    speed: string;
  };
  freeTier: string;
  logo: string;
}

// Define the types for the props this component accepts
interface AgentCardProps {
  agent: Agent;
  onSelect: () => void;
  isSelected: boolean;
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, isSelected }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
                <img className="h-16 w-16 rounded-lg object-cover" src={agent.logo} alt={`${agent.name} logo`} />
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                    {agent.verified && <CheckCircleIcon />}
                  </div>
                  <p className="text-sm text-blue-500 font-semibold">{agent.category}</p>
                </div>
            </div>
            <input 
                type="checkbox" 
                checked={isSelected}
                onChange={onSelect}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
        </div>
        
        <p className="mt-4 text-gray-600 text-sm">{agent.description}</p>

        <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Capabilities:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
                {agent.capabilities.map(cap => (
                    <span key={cap} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{cap}</span>
                ))}
            </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 text-sm">
            <div>
                <span className="font-semibold text-gray-800">Pricing: </span>
                <span className="text-gray-600">{agent.price}</span>
            </div>
            <div>
                <span className="font-semibold text-gray-800">Free Tier: </span>
                <span className="text-gray-600">{agent.freeTier}</span>
            </div>
             <div>
                <span className="font-semibold text-gray-800">Accuracy: </span>
                <span className="text-gray-600">{agent.performance.accuracy}</span>
            </div>
             <div>
                <span className="font-semibold text-gray-800">Speed: </span>
                <span className="text-gray-600">{agent.performance.speed}</span>
            </div>
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50">
          <a href="#" className="text-blue-600 font-semibold hover:underline">View Details &rarr;</a>
      </div>
    </div>
  );
}

export default AgentCard;
