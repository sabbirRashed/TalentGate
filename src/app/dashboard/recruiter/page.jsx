import { DashboardStats } from '@/components/Dashboard/DashboardStats';
import { auth } from '@/lib/auth';
import { getUserSession } from '@/lib/core/session';
import { Briefcase, CircleCheck, Persons, Thunderbolt } from '@gravity-ui/icons';
import { headers } from 'next/headers';
import React from 'react';

const RecruiterDashboard = async () => {

    const user = await getUserSession();

    // console.log("user:", user);
    // Recruiter Dashboard Data
    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    return (
        <div className=" mx-auto space-y-6 p-4 md:p-8">
            {user && <>
                <h2 className="text-3xl">Welcome back, {user?.name}!</h2>
                <DashboardStats statsData={recruiterStats} />
            </>
            }

        </div>
    );
};

export default RecruiterDashboard;