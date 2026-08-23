"use client";

import React, { useState } from 'react';
import { Table, Button } from '@heroui/react';
import { ArrowUpRight, FileText, Globe, Clock, ChevronLeft, ChevronRight } from '@gravity-ui/icons';

export default function ApplicationsTable({ applications = [] }) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    // Relative Time Helper
    const formatTimeAgo = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    // Badge Style Handler
    const getStatusBadge = (status = "Submitted") => {
        const styles = {
            Applied: "bg-blue-500/10 border-blue-500/30 text-blue-400",
            Review: "bg-amber-500/10 border-amber-500/30 text-amber-400",
            Shortlisted: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
            Rejected: "bg-rose-500/10 border-rose-500/30 text-rose-400",
            Offered: "bg-violet-500/10 border-violet-500/30 text-violet-400",
        };

        const currentStyle = styles[status] || styles.Applied;

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${currentStyle}`}>
                {status}
            </span>
        );
    };

    const paginatedApps = applications.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Table className="border border-white/10 rounded-2xl bg-white/3 backdrop-blur-xl overflow-hidden">
            <Table.ScrollContainer>
                <Table.Content aria-label="Job Applications Table" className="w-full text-left">
                    <Table.Header className="bg-white/5 text-gray-400 text-[11px] uppercase tracking-wider border-b border-white/10">
                        <Table.Column className="p-4 font-semibold">Job Title</Table.Column>
                        <Table.Column className="p-4 font-semibold">Company</Table.Column>
                        <Table.Column className="p-4 font-semibold">Applied</Table.Column>
                        <Table.Column className="p-4 font-semibold">Status</Table.Column>
                        <Table.Column className="p-4 font-semibold">Links</Table.Column>
                        <Table.Column className="p-4 font-semibold text-right">Action</Table.Column>
                    </Table.Header>

                    <Table.Body className="divide-y divide-white/5 text-xs text-gray-300">
                        {paginatedApps.length > 0 ? (
                            paginatedApps.map((item) => (
                                <Table.Row key={item._id} className="hover:bg-white/5 transition-colors">
                                    <Table.Cell className="p-4">
                                        <div className="font-semibold text-white text-sm">{item.jobTitle || "Untitled Role"}</div>
                                        <div className="text-gray-400 text-[11px]">{item.applicantEmail}</div>
                                    </Table.Cell>

                                    <Table.Cell className="p-4 font-medium text-gray-200">
                                        {item.companyName || "N/A"}
                                    </Table.Cell>

                                    <Table.Cell className="p-4 text-gray-400">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} className="text-gray-500" />
                                            <span>{formatTimeAgo(item.createAt)}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="p-4">
                                        {getStatusBadge(item.notes || "Applied")}
                                    </Table.Cell>

                                    <Table.Cell className="p-4">
                                        <div className="flex items-center gap-3">
                                            {item.resumeUrl && (
                                                <a
                                                    href={item.resumeUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1 text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors text-[11px]"
                                                >
                                                    <FileText size={12} /> Resume
                                                </a>
                                            )}
                                            {item.portfolioUrl && (
                                                <a
                                                    href={item.portfolioUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors text-[11px]"
                                                >
                                                    <Globe size={12} /> Portfolio
                                                </a>
                                            )}
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="p-4 text-right">
                                        <a
                                            href={`/jobs/${item.jobId}`}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-[11px] transition-colors"
                                        >
                                            Details
                                            <ArrowUpRight size={12} />
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell className="p-8 text-center text-gray-400" colSpan={6}>
                                    No job applications found.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>

            {/* Hero UI Table Footer Pagination */}
            <Table.Footer className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>
                    Showing {paginatedApps.length} of {applications.length} applications
                </span>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        isIconOnly
                        isDisabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="bg-white/5 border border-white/10 text-white text-xs rounded-lg"
                    >
                        <ChevronLeft size={14} />
                    </Button>
                    <span className="text-white font-medium px-2">{page}</span>
                    <Button
                        size="sm"
                        isIconOnly
                        isDisabled={page * rowsPerPage >= applications.length}
                        onClick={() => setPage((p) => p + 1)}
                        className="bg-white/5 border border-white/10 text-white text-xs rounded-lg"
                    >
                        <ChevronRight size={14} />
                    </Button>
                </div>
            </Table.Footer>
        </Table>
    );
}