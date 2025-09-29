"use client";
import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Zap, CheckCircle, Copy, Loader2, AlertCircle } from 'lucide-react';

// --- Crypto Payment Simulator Component ---
const CryptoSimulator = ({ price }: { price: number }) => {
    const [status, setStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
    const [copied, setCopied] = useState(false);
    const ethAmount = (price / 3500).toFixed(5); // Simulated ETH price
    const walletAddress = "0x1234AbCdEfG56789hIjKlMnOpQrStUvWx";

    const handlePayment = () => {
        setStatus('pending');
        setTimeout(() => {
            setStatus('confirmed');
        }, 4000); // Simulate network confirmation time
    };
    
    // Replaced alert with a smoother UX for copying
    const copyAddress = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    };

    return (
        <div className="bg-slate-800 text-white p-6 rounded-lg border border-slate-700">
            <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="Ethereum" className="h-6 w-6"/>
                Pay with Crypto (Simulator)
            </h3>
            <p className="text-slate-400 mb-4 text-sm">Send exactly {ethAmount} ETH to the following address.</p>
            
            <div className="bg-slate-900 p-3 rounded-md flex items-center justify-between mb-4">
                <span className="font-mono text-sm truncate">{walletAddress}</span>
                <button onClick={copyAddress} className="p-1.5 hover:bg-slate-700 rounded-md transition-colors" title="Copy address">
                    {copied ? <CheckCircle className="h-4 w-4 text-green-400"/> : <Copy className="h-4 w-4"/>}
                </button>
            </div>

            {status === 'idle' && (
                <button onClick={handlePayment} className="w-full bg-indigo-500 hover:bg-indigo-600 font-bold py-3 rounded-lg transition-colors">
                    I Have Sent The Payment
                </button>
            )}
            {status === 'pending' && (
                <div className="text-center text-amber-400 flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                    <p>Awaiting blockchain confirmation...</p>
                </div>
            )}
            {status === 'confirmed' && (
                <div className="text-center text-green-400 font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5"/>
                    <p>Payment Confirmed! Access Granted.</p>
                </div>
            )}
        </div>
    );
};

// --- Main Checkout Component ---
const CheckoutContent = () => {  
  const searchParams = useSearchParams();
  const agentName = searchParams.get('agentName') || "Selected Agent";
  const price = parseFloat(searchParams.get('price') || '0');
  const unit = searchParams.get('unit') || "one-time";
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

  useEffect(() => {
      if (!stripePublishableKey) {
          console.error("Stripe publishable key is not set. Card payments are disabled.");
      }
  }, [stripePublishableKey]);

  const handleStripeCheckout = async () => {
    if (!stripePromise) {
        setError("Payment service is currently unavailable.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentName, price, unit }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to create Stripe session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
          throw new Error(result.error.message);
      }
    } catch (err: any) {
      console.error('Error redirecting to Stripe:', err);
      setError(err.message || "An unknown error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in-up">
          <div className="text-center mb-6">
            <Zap className="h-10 w-10 mx-auto text-amber-500 mb-2"/>
            <h1 className="text-2xl font-extrabold text-slate-800">Get Instant Access</h1>
            <p className="text-slate-500 mt-1">You are purchasing access to <span className="font-bold">{agentName}</span>.</p>
          </div>
          
          <div className="bg-slate-100 p-4 rounded-lg text-center mb-6">
            <p className="text-slate-600">Total Due Today</p>
            <p className="text-4xl font-bold text-slate-900">${price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <button 
                onClick={handleStripeCheckout} 
                disabled={isLoading || !stripePromise}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin"/> : <CreditCard className="h-5 w-5"/>}
              <span>{isLoading ? 'Processing...' : 'Pay with Card'}</span>
            </button>

            {error && (
                <div className="text-red-600 text-sm flex items-start gap-2 p-3 bg-red-50 rounded-md">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5"/>
                    <span>{error}</span>
                </div>
            )}
            
            <CryptoSimulator price={price}/>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component with Suspense Fallback ---
export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="h-8 w-8 text-slate-400 animate-spin"/>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}

