import { requireRole } from '@/lib/core/session';


const SeekerDashboardLayout = async ({ children }) => {
    await requireRole('seeker');
    return children
};

export default SeekerDashboardLayout;