import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { PLAN_PRICE_ID } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        // const formData = await request.formData()
        // const planId = formData.get('plan_id')
        // console.log('object:', planId);

        const user = await getUserSession();


        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price: "price_1U6xOfAmpKTH3QDCXI0JvJvW",
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
            // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
            // integration_identifier: '{{INTEGRATION_ID}}',
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}