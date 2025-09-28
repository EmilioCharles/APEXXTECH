import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // CORRECTED: Updated the apiVersion to match the installed Stripe library's requirement
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: Request) {
  try {
    const { agentName, price, unit } = await request.json();

    // Ensure price is a valid number
    const amount = Math.round(Number(price) * 100); // Stripe expects the amount in cents
    if (isNaN(amount)) {
      throw new Error('Invalid price value');
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: agentName,
            },
            unit_amount: amount,
            recurring: unit === 'month' ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: unit === 'month' ? 'subscription' : 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (err: any) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ error: { message: err.message } }, { status: 500 });
  }
}

