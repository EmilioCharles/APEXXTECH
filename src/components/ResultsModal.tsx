import React from 'react';
// NEW: Import the Agent type definition from the main page
import { Agent } from '../app/page';
import { X } from 'lucide-react';

// NEW: Define an interface for the props that this component will receive
interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
}

const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, onClose, agents }) => {
  // If the modal is not open, render nothing (null)
  if (!isOpen) {
    return null;
  }

  // Define a list of all possible attributes to create the comparison table rows
  const attributes = [
    { key: 'price', label: 'Price Model' },
    { key: 'freeTier', label: 'Free Tier' },
    { key: 'performance.speed', label: 'Speed' },
    { key: 'performance.accuracy', label: 'Accuracy' },
    { key: 'performance.uptime', label: 'Uptime' },
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'capabilities', label: 'Capabilities' },
    { key: 'integrations', label: 'Integrations' },
  ];
  
  // A helper function to safely get nested property values
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };


  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      {/* Modal content container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Agent Comparison</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">Feature</th>
                {agents.map(agent => (
                  <th key={agent.id} className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">
                    {agent.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attributes.map(attr => (
                <tr key={attr.key}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-900">{attr.label}</td>
                  {agents.map(agent => (
                    <td key={agent.id} className="px-6 py-4 text-sm text-gray-700">
                      {Array.isArray(getNestedValue(agent, attr.key))
                        ? (getNestedValue(agent, attr.key) as string[]).join(', ')
                        : getNestedValue(agent, attr.key)
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;

