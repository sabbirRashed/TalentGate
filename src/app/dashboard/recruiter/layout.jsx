import { requireRole } from '@/lib/core/session';
import React from 'react';

const RecruiterDashboardLayout = async({children}) => {
    await requireRole('recruiter');
    return children
};

export default RecruiterDashboardLayout;