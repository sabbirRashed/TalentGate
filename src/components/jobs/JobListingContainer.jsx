"use client";

import React, { useState, useMemo, useEffect } from "react";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";

export default function JobListingContainer({ search_params, jobs = [], totalData }) {

    const [searchQuery, setSearchQuery] = useState(search_params.search || '');
    const [category, setCategory] = useState(search_params.category || "all");
    const [jobType, setJobType] = useState(search_params.type || 'all');
    const [isRemote, setIsRemote] = useState(
        search_params.isRemote === undefined
            ? "all"
            : search_params.isRemote === "true"
                ? "remote"
                : "onsite"
    );
    const [page, setPage] = useState(search_params.page || 1);

    const totalItems = totalData;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (page > 3) {
                pages.push("ellipsis");
            }
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (page < totalPages - 2) {
                pages.push("ellipsis");
            }
            pages.push(totalPages);
        }
        return pages;
    };

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);


    const router = useRouter()
    // console.log("search:", searchQuery, "category:", category, 'jobType:', jobType, "isremote:", isRemote);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (searchQuery) {
            searchParams.set('search', searchQuery)
        }
        if (category !== "all") {
            searchParams.set('category', category)
        }
        if (jobType !== "all") {
            searchParams.set('type', jobType)
        }
        if (isRemote !== "all") {
            if (isRemote === "remote") {
                searchParams.set('isRemote', true)
            }
            else if (isRemote === "onsite") {
                searchParams.set('isRemote', false)
            }
        }
        if (page) {
            searchParams.set('page', page)
        }

        const path = `?${searchParams.toString()}`;
        router.push(path)

    }, [router, searchQuery, category, jobType, isRemote, page])

    // const jobs = useMemo(() => {

    //     return jobs.filter((job) => {
    //         // Keyword search (title, company, or location)
    //         const query = filters.search.toLowerCase().trim();
    //         const matchesSearch =
    //             !query ||
    //             job.title?.toLowerCase().includes(query) ||
    //             job.companyName?.toLowerCase().includes(query) ||
    //             job.location?.toLowerCase().includes(query);

    //         // Category filter
    //         const matchesCategory =
    //             filters.category === "all" || job.category === filters.category;

    //         // Job Type filter
    //         const matchesType =
    //             filters.type === "all" || job.type === filters.type;

    //         // Remote filter
    //         const matchesRemote =
    //             filters.isRemote === "all" ||
    //             (filters.isRemote === "remote" && job.isRemote) ||
    //             (filters.isRemote === "onsite" && !job.isRemote);

    //         return matchesSearch && matchesCategory && matchesType && matchesRemote;
    //     });
    // }, [jobs, filters]);

    return (
        <div className="space-y-8">
            {/* Search & Filter Controls */}
            <JobFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                category={category}
                setCategory={setCategory}
                jobType={jobType}
                setJobType={setJobType}
                isRemote={isRemote}
                setIsRemote={setIsRemote} />

            {/* Filtered Grid Output */}
            {jobs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {jobs.map((job) => (
                            <JobCard
                                key={job._id || job.id}
                                job={job} />
                        ))}
                    </div>

                    <Pagination>
                        <Pagination.Summary>
                            Showing {startItem}-{endItem} of {totalItems} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={`ellipsis-${i}`}>
                                        <Pagination.Ellipsis />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ),
                            )}
                            <Pagination.Item>
                                <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 text-center">
                    <p className="text-zinc-300 text-lg font-medium">
                        No matching jobs found.
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                        Try adjusting your search query or reset your filters.
                    </p>
                </div>
            )}
        </div>
    );
}