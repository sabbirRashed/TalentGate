import React from 'react';

const JobApply = ({job}) => {
    console.log(job);
    return (
        <div>
            Job Apply Now!
            {job.title}
        </div>
    );
};

export default JobApply;