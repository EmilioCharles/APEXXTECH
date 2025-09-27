"use client";
import React, { useState } from 'react';
import AgentCard from '../components/AgentCard';
import ResultsModal from '../components/ResultsModal';
import { Sparkles, Search, Layers, ShoppingBag, Pencil, BookOpen, SearchX } from 'lucide-react';

// Agent type definition remains the same
export interface Agent {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  capabilities: string[];
  integrations: string[];
  privacy: string;
  verified: boolean;
  performance: {
    speed: string;
    accuracy: string;
    uptime: string;
  };
  freeTier: string;
  logo: string;
}

// Mock data remains the same
const mockAgents: Agent[] = [
    { id: 1, name: 'BackgroundRemover Pro', category: 'Image Editing', description: 'Automated background removal for product photos and graphics.', price: 'Freemium', capabilities: ['Batch Processing', 'API Access', 'High Resolution'], integrations: ['Shopify', 'Figma', 'Adobe Photoshop'], privacy: 'GDPR Compliant', verified: true, performance: { speed: '2s/image', accuracy: '99.2%', uptime: '99.9%' }, freeTier: '5 free images per month', logo: 'https://placehold.co/100x100/4299e1/ffffff?text=BRP' },
    { id: 2, name: 'ContentGenius AI', category: 'Content Creation', description: 'Generate high-quality blog posts, articles, and marketing copy.', price: 'Subscription', capabilities: ['Multiple Languages', 'SEO Optimization', 'Plagiarism Checker'], integrations: ['WordPress', 'Google Docs', 'SurferSEO'], privacy: 'Data Encrypted', verified: true, performance: { speed: '30s/article', accuracy: '95%', uptime: '99.8%' }, freeTier: '1,000 words/month', logo: 'https://placehold.co/100x100/38b2ac/ffffff?text=CGAI' },
    { id: 3, name: 'ResearchAssist', category: 'Academic Research', description: 'Summarize research papers, extract data, and generate literature reviews.', price: 'Free', capabilities: ['PDF Analysis', 'Data Extraction', 'Citation Generation'], integrations: ['Zotero', 'Mendeley'], privacy: 'Private by Design', verified: false, performance: { speed: '5s/paper', accuracy: '97%', uptime: '99.5%' }, freeTier: 'Unlimited for academic use', logo: 'https://placehold.co/100x100/9f7aea/ffffff?text=RA' },
    { id: 4, name: 'EcomOptimizer', category: 'E-commerce', description: 'Analyzes sales data to provide product recommendations and pricing strategies.', price: 'Subscription', capabilities: ['Sales Forecasting', 'Inventory Management', 'A/B Testing'], integrations: ['Shopify', 'WooCommerce', 'Magento'], privacy: 'Enterprise Grade', verified: true, performance: { speed: 'Real-time', accuracy: '94% forecast accuracy', uptime: '99.99%' }, freeTier: '14-day free trial', logo: 'https://placehold.co/100x100/ed8936/ffffff?text=EO' },
];

interface UseCaseTemplate {
    name: string;
    icon: React.ElementType;
    searchTerm: string;
    filters: {
        price: 'all' | 'Free' | 'Freemium' | 'Subscription';
        capabilities: string[];
    }
}

const useCaseTemplates: UseCaseTemplate[] = [
    { name: "E-commerce", icon: ShoppingBag, searchTerm: 'e-commerce', filters: { price: 'all', capabilities: ['Batch Processing'] } },
    { name: "Content Creation", icon: Pencil, searchTerm: 'content', filters: { price: 'all', capabilities: ['SEO Optimization'] } },
    { name: "Academic Research", icon: BookOpen, searchTerm: 'research', filters: { price: 'Free', capabilities: [] } },
]

export default function Home() {
  // State management remains the same
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    price: 'all',
    capabilities: [] as string[],
    verified: false,
  });
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // All handler functions remain the same
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const isChecked = (e.target as HTMLInputElement).checked;
    if (type === 'checkbox') {
        if (name === 'verified') setFilters(prev => ({ ...prev, verified: isChecked }));
        else setFilters(prev => ({ ...prev, capabilities: isChecked ? [...prev.capabilities, value] : prev.capabilities.filter(cap => cap !== value) }));
    } else setFilters(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectAgent = (agent: Agent) => setSelectedAgents(prev => prev.find(a => a.id === agent.id) ? prev.filter(a => a.id !== agent.id) : [...prev, agent]);
  const handleTemplateClick = (template: UseCaseTemplate) => {
    setSearchTerm(template.searchTerm);
    setFilters(prev => ({ ...prev, price: template.filters.price, capabilities: template.filters.capabilities, }));
  };
  const openCompareModal = () => {
    if (selectedAgents.length > 1) setIsModalOpen(true);
    else console.warn("Please select at least two agents to compare.");
  };

  // Filtering logic remains the same
  const filteredAgents = mockAgents.filter(agent => (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || agent.description.toLowerCase().includes(searchTerm.toLowerCase()) || agent.category.toLowerCase().includes(searchTerm.toLowerCase())) && (filters.price === 'all' || agent.price === filters.price) && (filters.capabilities.length === 0 || filters.capabilities.every(cap => agent.capabilities.includes(cap))) && (!filters.verified || agent.verified));

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        
        {/* --- Hero Section --- */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 leading-tight">
            The Central Hub for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AI Agents</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Stop wasting time with trial-and-error. Find, compare, and integrate the perfect AI tools for any task, instantly.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="Describe your problem, e.g., 'remove backgrounds from product photos'"
                className="w-full pl-11 pr-4 py-4 text-lg border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                onChange={handleSearchChange}
                value={searchTerm}
              />
            </div>
          </div>
        </div>

        {/* --- Filter & Use Case Section --- */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <label htmlFor="price" className="text-sm font-medium text-slate-600">Price:</label>
                <select name="price" id="price" onChange={handleFilterChange} value={filters.price} className="px-4 py-2 border border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option value="all">All</option>
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Subscription">Subscription</option>
                </select>
                <div className="flex items-center">
                  <input id="verified" name="verified" type="checkbox" onChange={handleFilterChange} checked={filters.verified} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                  <label htmlFor="verified" className="ml-2 text-sm font-medium text-slate-700">Verified Only</label>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Or start with a template</span>
              </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {useCaseTemplates.map(template => (
                <button
                    key={template.name}
                    onClick={() => handleTemplateClick(template)}
                    className="group flex items-center justify-center text-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <template.icon className="h-6 w-6 mr-3 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{template.name}</span>
                </button>
            ))}
          </div>
        </div>
        
        {/* --- Agent Listing --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} onSelect={() => handleSelectAgent(agent)} isSelected={!!selectedAgents.find(a => a.id === agent.id)} />
          ))}
        </div>

        {/* --- Empty State --- */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-20 col-span-full">
              <SearchX className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-700">No Agents Found</h3>
              <p className="mt-1 text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

        {/* --- Comparison Button --- */}
        {selectedAgents.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={openCompareModal}
              disabled={selectedAgents.length < 2}
              className={`flex items-center gap-3 px-6 py-4 font-bold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${selectedAgents.length < 2 ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-2xl'}`}
            >
              <Layers className="h-5 w-5" />
              <span>Compare ({selectedAgents.length})</span>
            </button>
          </div>
        )}

        {/* --- Comparison Modal --- */}
        <ResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} agents={selectedAgents} />
      </div>
    </main>
  );
}



