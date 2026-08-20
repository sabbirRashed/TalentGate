import React from 'react';
import { Card, Button, Avatar } from '@heroui/react';
import { MapPin, Briefcase, Display, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';

export default function JobCard({ job = {} }) {
    // Destructure with default fallback values
    const {
        _id = '',
        title = 'Position Title',
        companyName = 'Company',
        location = 'Remote',
        salaryMin = 0,
        salaryMax = 0,
        currency = 'USD',
        responsibilities = '',
        isRemote = false,
        type = 'full-time',
        companyLogo = '',
    } = job;

    // Format currency range dynamically
    const formatAmount = (val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val);
    const currencySymbol = currency === 'USD' ? '$' : `${currency} `;
    const salaryText = salaryMin && salaryMax
        ? `${currencySymbol}${formatAmount(salaryMin)}–${currencySymbol}${formatAmount(salaryMax)}`
        : 'Competitive';

    return (
        <Card className="max-w-md bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-3xl p-6 shadow-xl hover:border-neutral-700 transition-colors">
            {/* Header: Company Logo & Title */}
            <Card.Header className="flex flex-row items-center gap-4 p-0 mb-4 bg-transparent border-none">
                <Avatar className="w-12 h-12 rounded-2xl bg-neutral-800 text-white font-bold shrink-0">
                    <Avatar.Image src={companyLogo} alt={companyName} />
                    <Avatar.Fallback>{companyName.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                    <Card.Title className="text-xl font-bold tracking-tight text-white m-0 truncate">
                        {title}
                    </Card.Title>
                    <span className="text-sm font-medium text-neutral-400 truncate">
                        {companyName}
                    </span>
                </div>
            </Card.Header>

            {/* Content: Description & Badges */}
            <Card.Content className="p-0 space-y-5">
                <Card.Description className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                    {responsibilities}
                </Card.Description>

                <div className="flex flex-wrap gap-2 pt-1">
                    {/* Location Chip */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs font-medium text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        <span>{location}</span>
                    </div>

                    {/* Work Type / Remote Chip */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs font-medium text-neutral-300 capitalize">
                        <Display className="w-3.5 h-3.5 text-pink-400" />
                        <span>{isRemote ? 'Remote' : type}</span>
                    </div>

                    {/* Salary Chip */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs font-medium text-neutral-300">
                        <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                        <span>{salaryText}</span>
                    </div>
                </div>
            </Card.Content>

            {/* Footer: Action Link */}
            <Card.Footer className="p-0 mt-6 bg-transparent border-none">
                <Link
                    href={`/jobs/${_id}`}
                    variant="light"
                    className="group inline-flex items-center gap-2 p-0 text-sm font-semibold text-white bg-transparent hover:bg-transparent min-w-0 h-auto"
                >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Card.Footer>
        </Card>
    );
}