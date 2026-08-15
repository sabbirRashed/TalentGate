import { DashboardStats } from '@/components/Dashboard/DashboardStats';
import { auth } from '@/lib/auth';
import { Briefcase, CircleCheck, Persons, Thunderbolt } from '@gravity-ui/icons';
import { headers } from 'next/headers';
import React from 'react';

const RecruiterDashboard = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    console.log("user:", user);
    // Recruiter Dashboard Data
    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    return (
        <div className="p-10  mx-auto space-y-6">
            {user && <h2 className="text-4xl">Welcome back, {user?.name}</h2>}
            <DashboardStats statsData={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboard;