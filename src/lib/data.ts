// This file is the single source of truth for our agent data and type definitions.

// Define the detailed pricing structure
export interface PricingDetails {
  model: 'Subscription' | 'Pay-as-you-go' | 'Free' | 'Freemium';
  price?: number;
  unit?: string;
  freeTierLimit?: number;
}

// Define the main Agent interface
export interface Agent {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string; // The simple string for display/filtering
  pricingDetails: PricingDetails; // The detailed object for calculations
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

// Define and export our mock agent data
export const mockAgents: Agent[] = [
    { id: 1, name: 'BackgroundRemover Pro', category: 'Image Editing', description: 'Automated background removal for product photos and graphics.', price: 'Freemium', pricingDetails: { model: 'Freemium', price: 0.10, unit: 'image', freeTierLimit: 50 }, capabilities: ['Batch Processing', 'API Access', 'High Resolution'], integrations: ['Shopify', 'Figma', 'Adobe Photoshop'], privacy: 'GDPR Compliant', verified: true, performance: { speed: '2s/image', accuracy: '99.2%', uptime: '99.9%' }, freeTier: '50 free images/month', logo: 'https://placehold.co/100x100/4299e1/ffffff?text=BRP' },
    { id: 2, name: 'ContentGenius AI', category: 'Content Creation', description: 'Generate high-quality blog posts, articles, and marketing copy.', price: 'Subscription', pricingDetails: { model: 'Subscription', price: 49, unit: 'month' }, capabilities: ['Multiple Languages', 'SEO Optimization', 'Plagiarism Checker'], integrations: ['WordPress', 'Google Docs', 'SurferSEO'], privacy: 'Data Encrypted', verified: true, performance: { speed: '30s/article', accuracy: '95%', uptime: '99.8%' }, freeTier: '1,000 words/month', logo: 'https://placehold.co/100x100/38b2ac/ffffff?text=CGAI' },
    { id: 3, name: 'ResearchAssist', category: 'Academic Research', description: 'Summarize research papers, extract data, and generate literature reviews.', price: 'Free', pricingDetails: { model: 'Free' }, capabilities: ['PDF Analysis', 'Data Extraction', 'Citation Generation'], integrations: ['Zotero', 'Mendeley'], privacy: 'Private by Design', verified: false, performance: { speed: '5s/paper', accuracy: '97%', uptime: '99.5%' }, freeTier: 'Unlimited for academic use', logo: 'https://placehold.co/100x100/9f7aea/ffffff?text=RA' },
    { id: 4, name: 'EcomOptimizer', category: 'E-commerce', description: 'Analyzes sales data to provide product recommendations and pricing strategies.', price: 'Subscription', pricingDetails: { model: 'Subscription', price: 299, unit: 'month' }, capabilities: ['Sales Forecasting', 'Inventory Management', 'A/B Testing'], integrations: ['Shopify', 'WooCommerce', 'Magento'], privacy: 'Enterprise Grade', verified: true, performance: { speed: 'Real-time', accuracy: '94% forecast accuracy', uptime: '99.99%' }, freeTier: '14-day free trial', logo: 'https://placehold.co/100x100/ed8936/ffffff?text=EO' },
];
