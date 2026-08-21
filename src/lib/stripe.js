import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID= {
    "seeker_pro": "price_1U6wkkAmpKTH3QDCNLVmtZNR",
    "seeker_premium": "price_1U6vq9AmpKTH3QDC7OE2KAas",
    "recruiter_growth": "price_1U6xOfAmpKTH3QDCXI0JvJvW",
    "recruiter_enterprise": "price_1U6xQEAmpKTH3QDC139tQofY",
}