import React from 'react';

export default function ApplicationMetrics({ applications = [] }) {
    const total = applications.length;
    const shortlisted = applications.filter((a) => a.notes?.toLowerCase().includes("shortlist")).length;
    const interviews = applications.filter((a) => a.notes?.toLowerCase().includes("interview")).length;
    const successRate = total > 0 ? Math.round((shortlisted / total) * 100) : 0;

    const metrics = [
        { label: 'Total Applied', value: total, accent: 'text-white' },
        { label: 'Shortlisted', value: shortlisted, accent: 'text-violet-400' },
        { label: 'Interviews', value: interviews, accent: 'text-amber-400' },
        { label: 'Success Rate', value: `${successRate}%`, accent: 'text-emerald-400' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((item, idx) => (
                <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-2"
                >
                    <span className="text-xs font-medium text-gray-400">{item.label}</span>
                    <span className={`text-3xl font-extrabold tracking-tight ${item.accent}`}>
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    );
}