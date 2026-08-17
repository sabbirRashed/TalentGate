import RegisterCompanyModal from '@/components/Dashboard/RegisterCompany';
import React from 'react';

const CompanyProfile = () => {
    return (
        <div className='space-y-6 p-4 md:p-8'>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Company Profile</h2>
            <RegisterCompanyModal/>
        </div>
    );
};

export default CompanyProfile;