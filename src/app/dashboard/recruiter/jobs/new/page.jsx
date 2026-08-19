import React from 'react';
import PostJobForm from './PostJobForm';
import { getLogedInRecruiterCompany } from '@/lib/api/company';

const PostJobPage = async() => {

    const company = await getLogedInRecruiterCompany();

    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobPage;