"use client";
import React, { useState, useMemo } from 'react';
import { PricingDetails } from '../lib/data';
import { DollarSign } from 'lucide-react';

interface CostCalculatorProps {
  pricing: PricingDetails;
}

const CostCalculator: React.FC<CostCalculatorProps> = ({ pricing }) => {
  const [quantity, setQuantity] = useState(1000);

  const calculateCost = useMemo(() => {
    if (!pricing || pricing.model === 'Free') {
      return { total: 0, text: 'This agent is completely free.' };
    }

    if (pricing.model === 'Subscription') {
      return { total: pricing.price || 0, text: `Fixed price per ${pricing.unit}.` };
    }

    if (pricing.model === 'Pay-as-you-go' || pricing.model === 'Freemium') {
      const { price = 0, unit, freeTierLimit = 0 } = pricing;
      const billableQuantity = Math.max(0, quantity - freeTierLimit);
      const total = billableQuantity * price;
      
      let text = `${freeTierLimit > 0 ? `${freeTierLimit} free ${unit}s, then ` : ''}$${price.toFixed(2)} per ${unit}.`;
      if (quantity <= freeTierLimit) {
        text = `Your usage is within the free tier of ${freeTierLimit} ${unit}s.`
      }

      return { total, text };
    }

    return { total: 0, text: 'Pricing model not supported.' };
  }, [quantity, pricing]);

  if (pricing.model === 'Free' || pricing.model === 'Subscription') {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Pricing</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-slate-900">${pricing.price || 0}</span>
          <span className="ml-1.5 text-slate-500">/ {pricing.unit}</span>
        </div>
        <p className="text-sm text-slate-500 mt-2">{calculateCost.text}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-4">Cost Calculator</h3>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 1000"
        />
        <span className="font-medium text-slate-600 capitalize">{pricing.unit}s</span>
      </div>
      <div className="bg-slate-50 rounded-lg p-4">
        <p className="text-sm text-slate-600 mb-1">{calculateCost.text}</p>
        <div className="flex items-baseline text-slate-800">
           <span className="font-medium">Estimated Cost:</span>
           <span className="text-2xl font-bold ml-2">${calculateCost.total.toFixed(2)}</span>
           <span className="ml-1.5 text-slate-500">/ month</span>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
