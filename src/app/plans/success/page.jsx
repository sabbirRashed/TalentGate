import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { CircleCheck, ArrowRight, Envelope, ShieldCheck } from '@gravity-ui/icons'
import { postSubscription } from '@/lib/actions/subscription'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details,
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const customerEmail = customer_details?.email

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId,
        }

        // Update the user document about the new plan
        const result = await postSubscription(subsInfo)
       

        return (
            <section className="min-h-[80vh] bg-[#09090B] text-white flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg space-y-8 text-center">

                    {/* Success Card */}
                    <div className="bg-white/3 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">

                        {/* Animated Check Icon Badge */}
                        <div className="mx-auto w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                            <CircleCheck className='w-8 h-8' />
                        </div>

                        {/* Title & Headline */}
                        <div className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full inline-block">
                                Payment Successful
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                Thank You for Your Purchase!
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-400">
                                Your payment has been confirmed and your subscription plan is now active.
                            </p>
                        </div>

                        {/* Email Confirmation Box */}
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left space-y-2">
                            <div className="flex items-center gap-2 text-xs font-medium text-violet-300">
                                <Envelope size={16} />
                                <span>Confirmation Sent</span>
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                A confirmation receipt and invoice details have been emailed to{" "}
                                <strong className="text-white font-medium">{customerEmail || 'your email'}</strong>.
                            </p>
                        </div>

                        {/* Order Help & Support Note */}
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2 border-t border-white/10">
                            <ShieldCheck size={16} className="text-gray-500" />
                            <span>
                                Need help with your order? Contact{" "}
                                <a
                                    href="mailto:orders@example.com"
                                    className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
                                >
                                    orders@example.com
                                </a>
                            </span>
                        </div>

                        {/* CTA Navigation Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link href="/jobs">
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-xs rounded-xl shadow-lg hover:opacity-90 transition-opacity"
                                >
                                    Explore Jobs
                                    <ArrowRight size={16} />
                                </Button>
                            </Link>
                            <Link href={'/'}>
                                <Button
                                    size="lg"
                                    className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors"
                                >
                                    Go to Home
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}