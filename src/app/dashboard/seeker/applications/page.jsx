import { Table } from '@heroui/react';
import {
    Code,
    Compass,
    Database,
    Terminal,
    Cpu,
    ChevronLeft,
    ChevronRight
} from '@gravity-ui/icons';
import { getApplicationByApplicant } from '@/lib/api/application';
import { getUserSession } from '@/lib/core/session';

// Helper to render icons based on job title/role
const getJobIcon = (title = '') => {
    const lower = title.toLowerCase();
    if (lower.includes('frontend')) return <Code width={18} height={18} className="text-zinc-300" />;
    if (lower.includes('designer')) return <Compass width={18} height={18} className="text-zinc-300" />;
    if (lower.includes('data')) return <Database width={18} height={18} className="text-zinc-300" />;
    if (lower.includes('cloud') || lower.includes('backend')) return <Terminal width={18} height={18} className="text-white" />;
    return <Cpu width={18} height={18} className="text-zinc-300" />;
};

// Helper for status badge styles
const getStatusBadge = (status = 'Applied') => {
    const styles = {
        Applied: 'border-zinc-500 text-zinc-200 bg-zinc-800/40',
        Review: 'border-amber-500/80 text-amber-400 bg-amber-950/20',
        Shortlisted: 'border-emerald-500/80 text-emerald-400 bg-emerald-950/20',
        Rejected: 'border-rose-500/80 text-rose-400 bg-rose-950/20',
        Offered: 'border-zinc-400 text-zinc-100 bg-zinc-800/40',
    };

    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.Applied
                }`}
        >
            {status}
        </span>
    );
};

// Helper to format ISO date to relative time
const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const diffInDays = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return '1 week ago';
    return `${Math.floor(diffInDays / 7)} weeks ago`;
};

export default async function SeekerApplicationPage() {
    const user = await getUserSession();
    const applications = (await getApplicationByApplicant(user?.id)) || [];

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-zinc-950 min-h-screen text-zinc-100">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-2xl backdrop-blur-md">
                <Table aria-label="Applications table">
                    <Table.ScrollContainer>
                        <Table.Content>
                            <Table.Header className="border-b border-zinc-800 bg-zinc-900/80">
                                {/* Added isRowHeader to fix the error */}
                                <Table.Column isRowHeader className="text-zinc-400 font-medium py-4 px-6 text-left">
                                    Job Title
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left">
                                    Company
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left">
                                    Applied
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left">
                                    Status
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-right">
                                    Action
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {applications.map((app) => (
                                    <Table.Row
                                        key={app._id}
                                        className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                                    >
                                        {/* Job Title & Details */}
                                        <Table.Cell className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2.5 rounded-lg flex items-center justify-center ${app.jobTitle?.toLowerCase().includes('cloud')
                                                        ? 'bg-rose-900/80 border border-rose-700/50'
                                                        : 'bg-zinc-800/80 border border-zinc-700/50'
                                                    }`}>
                                                    {getJobIcon(app.jobTitle)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-zinc-100 text-sm">
                                                        {app.jobTitle}
                                                    </div>
                                                    <div className="text-xs text-zinc-400 mt-0.5">
                                                        {app.type || 'Full-time'} • {app.location || 'Remote'}
                                                    </div>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* Company */}
                                        <Table.Cell className="py-4 px-6 text-sm text-zinc-300">
                                            {app.companyName}
                                        </Table.Cell>

                                        {/* Applied Date */}
                                        <Table.Cell className="py-4 px-6 text-sm text-zinc-400">
                                            {formatTimeAgo(app.createAt)}
                                        </Table.Cell>

                                        {/* Status Badge */}
                                        <Table.Cell className="py-4 px-6">
                                            {getStatusBadge(app.status || 'Applied')}
                                        </Table.Cell>

                                        {/* Action */}
                                        <Table.Cell className="py-4 px-6 text-right">
                                            <a
                                                href={`/applications/${app._id}`}
                                                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                                            >
                                                Details
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>

                    {/* Footer Pagination */}
                    <Table.Footer className="border-t border-zinc-800 px-6 py-4 bg-zinc-900/40">
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                            <div>
                                Showing 1-{applications.length} of {applications.length} applications
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    disabled
                                    className="p-1 rounded text-zinc-600 cursor-not-allowed hover:text-zinc-400"
                                >
                                    <ChevronLeft width={16} height={16} />
                                </button>
                                <button className="w-6 h-6 rounded bg-white text-zinc-950 font-medium flex items-center justify-center">
                                    1
                                </button>
                                <button className="w-6 h-6 rounded text-zinc-400 hover:bg-zinc-800 flex items-center justify-center">
                                    2
                                </button>
                                <button className="w-6 h-6 rounded text-zinc-400 hover:bg-zinc-800 flex items-center justify-center">
                                    3
                                </button>
                                <button className="p-1 rounded text-zinc-400 hover:text-zinc-200">
                                    <ChevronRight width={16} height={16} />
                                </button>
                            </div>
                        </div>
                    </Table.Footer>
                </Table>
            </div>
        </div>
    );
}