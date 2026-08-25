import React from 'react';
import { getUserList } from '@/lib/api/users';
import UserTable from '@/components/Dashboard/admin/UserTable';


export default async function AdminUsersPage() {
    const data = await getUserList();
    const users = data?.users || [];
    console.log(users);

    const totalUsers = users.length;
    const recruiterCount = users.filter((u) => u.role?.toLowerCase() === 'recruiter').length;
    const adminCount = users.filter((u) => u.role?.toLowerCase() === 'admin').length;

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    User Management
                </h1>
                <p className="text-sm text-zinc-400">
                    Manage system permissions, toggle recruiter roles, and monitor account activity.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#161618] flex flex-col justify-between space-y-3">
                    <span className="text-xs font-medium text-zinc-400">Total Active Users</span>
                    <div className="space-y-1">
                        <span className="text-3xl font-extrabold text-white tracking-tight">
                            {totalUsers.toLocaleString()}
                        </span>
                        <p className="text-xs font-medium text-emerald-400">
                            +12% vs last month
                        </p>
                    </div>
                </div>

                <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#161618] flex flex-col justify-between space-y-3">
                    <span className="text-xs font-medium text-zinc-400">Recruiters</span>
                    <div className="space-y-1">
                        <span className="text-3xl font-extrabold text-white tracking-tight">
                            {recruiterCount}
                        </span>
                        <p className="text-xs font-medium text-blue-400">
                            Hiring managers
                        </p>
                    </div>
                </div>

                <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#161618] flex flex-col justify-between space-y-3">
                    <span className="text-xs font-medium text-zinc-400">Administrators</span>
                    <div className="space-y-1">
                        <span className="text-3xl font-extrabold text-white tracking-tight">
                            {adminCount}
                        </span>
                        <p className="text-xs font-medium text-purple-400">
                            System managers
                        </p>
                    </div>
                </div>

                <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#161618] flex flex-col justify-between space-y-3">
                    <span className="text-xs font-medium text-zinc-400">New Signups (24h)</span>
                    <div className="space-y-1">
                        <span className="text-3xl font-extrabold text-white tracking-tight">
                            42
                        </span>
                        <p className="text-xs font-medium text-amber-400">
                            Steady activity
                        </p>
                    </div>
                </div>
            </div>

            {/* User Table Component */}
            <UserTable users={users} />
        </div>
    );
}