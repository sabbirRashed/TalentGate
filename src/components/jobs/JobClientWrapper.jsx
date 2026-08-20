"use client";

import React, { useState, useMemo } from "react";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";

export default function JobClientWrapper({ initialJobs = [] }) {
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        type: "all",
        isRemote: "all",
    });

    const filteredJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            // Keyword search (title, company, or location)
            const query = filters.search.toLowerCase().trim();
            const matchesSearch =
                !query ||
                job.title?.toLowerCase().includes(query) ||
                job.companyName?.toLowerCase().includes(query) ||
                job.location?.toLowerCase().includes(query);

            // Category filter
            const matchesCategory =
                filters.category === "all" || job.category === filters.category;

            // Job Type filter
            const matchesType =
                filters.type === "all" || job.type === filters.type;

            // Remote filter
            const matchesRemote =
                filters.isRemote === "all" ||
                (filters.isRemote === "remote" && job.isRemote) ||
                (filters.isRemote === "onsite" && !job.isRemote);

            return matchesSearch && matchesCategory && matchesType && matchesRemote;
        });
    }, [initialJobs, filters]);

    return (
        <div className="space-y-8">
            {/* Search & Filter Controls */}
            <JobFilters filters={filters} onFilterChange={setFilters} />

            {/* Filtered Grid Output */}
            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredJobs.map((job) => (
                        <JobCard key={job._id || job.id} job={job} />
                    ))}
                </div>
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