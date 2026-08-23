import { Table } from '@heroui/react';
import { getCompanies } from '@/lib/api/company';

// Helper to format ISO date to "MMM DD, YYYY" (e.g. Oct 12, 2023)
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
};

// Helper for status badge styling
const getStatusBadge = (status = 'Pending') => {
    const normalized = status.toLowerCase();

    if (normalized === 'approved') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Approved
            </span>
        );
    }

    if (normalized === 'rejected') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Rejected
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Pending
        </span>
    );
};

// Helper to extract company initials for fallback avatar
const getInitials = (name = '') => {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

export default async function AdminCompaniesPage() {
    const companies = (await getCompanies()) || [];

    return (
        <div className="w-full  mx-auto p-6 bg-zinc-950 min-h-screen text-zinc-100">
            <div className="rounded-xl border border-zinc-800/80 bg-[#161618] overflow-hidden shadow-2xl">
                <Table aria-label="Company review table">
                    <Table.ScrollContainer>
                        <Table.Content>
                            <Table.Header className="border-b border-zinc-800/80 bg-[#1a1a1c]">
                                <Table.Column isRowHeader className="text-zinc-400 font-medium py-4 px-6 text-left text-sm">
                                    Company Name
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-sm">
                                    Recruiter Email
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-sm">
                                    Industry
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-sm">
                                    Status
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-sm">
                                    Date Submitted
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-right text-sm">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {companies.map((company) => {
                                    const status = company.status || 'Pending';
                                    const isApproved = status.toLowerCase() === 'approved';
                                    const isRejected = status.toLowerCase() === 'rejected';

                                    return (
                                        <Table.Row
                                            key={company._id}
                                            className="border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors"
                                        >
                                            {/* Company Name with Logo or Initials */}
                                            <Table.Cell className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    {company.logo ? (
                                                        <img
                                                            src={company.logo}
                                                            alt={company.name}
                                                            className="w-8 h-8 rounded-lg object-cover bg-zinc-800 border border-zinc-700/50"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-lg bg-zinc-800/90 border border-zinc-700/60 flex items-center justify-center font-bold text-xs text-zinc-200">
                                                            {getInitials(company.name)}
                                                        </div>
                                                    )}
                                                    <span className="font-semibold text-zinc-100 text-sm">
                                                        {company.name}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* Recruiter Email */}
                                            <Table.Cell className="py-4 px-6 text-sm text-zinc-300">
                                                {company.recruiterEmail || 'N/A'}
                                            </Table.Cell>

                                            {/* Industry Badge */}
                                            <Table.Cell className="py-4 px-6">
                                                <span className="px-2.5 py-1 text-xs rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 capitalize">
                                                    {company.industry || 'Technology'}
                                                </span>
                                            </Table.Cell>

                                            {/* Status Indicator */}
                                            <Table.Cell className="py-4 px-6">
                                                {getStatusBadge(status)}
                                            </Table.Cell>

                                            {/* Date Submitted */}
                                            <Table.Cell className="py-4 px-6 text-sm text-zinc-300">
                                                {formatDate(company.createdAt)}
                                            </Table.Cell>

                                            {/* Actions */}
                                            <Table.Cell className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {!isApproved && (
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/60 hover:bg-emerald-900/50 rounded-md transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    {!isRejected && (
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 text-xs font-medium text-rose-400 bg-rose-950/30 border border-rose-800/60 hover:bg-rose-900/50 rounded-md transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    )}
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
}