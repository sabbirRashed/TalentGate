import { requireRole } from '@/lib/core/session';
import React from 'react';

const layout = async ({ children }) => {
    await requireRole('seeker');
    return children
};

export default layout;