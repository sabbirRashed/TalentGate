import CompanyTable from '@/components/Dashboard/admin/CompanyTable';
import { getCompanies } from '@/lib/api/company';


export default async function AdminCompaniesPage() {
    const companies = (await getCompanies()) || [];

    return (
        <div className="w-full mx-auto p-6 bg-zinc-950 min-h-screen text-zinc-100">
            <CompanyTable companies={companies} />
        </div>
    );
}