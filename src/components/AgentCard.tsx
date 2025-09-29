import React from 'react';
import { Agent } from '../lib/data';
import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  isSelected: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, isSelected }) => {
  
  // This handler ensures that when the checkbox is changed,
  // it toggles the selection but STOPS the event from bubbling up
  // and interfering with the parent Link component's navigation.
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // This is the crucial part.
    onSelect(agent);
  }

  return (
    // The entire card is a link to the agent's detail page.
    <Link href={`/agent/${agent.id}`} className="block h-full">
      <div className={`rounded-xl shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer ${isSelected ? 'shadow-2xl ring-2 ring-blue-500' : 'hover:shadow-lg hover:-translate-y-1'}`}>
        <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col">
          <div className="p-6 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img 
                  className="h-14 w-14 rounded-lg object-cover" 
                  src={agent.logo} 
                  alt={`${agent.name} logo`}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/e2e8f0/94a3b8?text=Error'; }}
                />
                <div className="ml-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-slate-800">{agent.name}</h3>
                    {agent.verified && (
                      // REFINED: Wrapped the icon in a span for a more explicit tooltip.
                      <span title="Verified Agent">
                        <BadgeCheck 
                          className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0" 
                        />
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-blue-600">{agent.category}</p>
                </div>
              </div>
              {/* Using a wrapper div to stop the click event on the checkbox area */}
              <div onClick={(e) => e.stopPropagation()} className="p-2 -mr-2">
                 <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange} // Use onChange for checkboxes
                    className="h-5 w-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                    aria-label={`Select ${agent.name} for comparison`}
                />
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{agent.description}</p>
          </div>
          
          <div className="px-6 pb-6 pt-4 bg-slate-50/70">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Key Capabilities</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.capabilities.slice(0, 3).map(cap => (
                  <span key={cap} className="px-2.5 py-1 text-xs font-medium bg-slate-200 text-slate-800 rounded-full">
                      {cap}
                  </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;

