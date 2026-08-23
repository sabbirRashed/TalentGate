import { requireRole } from '@/lib/core/session';


const layout = async ({ children }) => {
    await requireRole('seeker');
    return children
};

export default layout;