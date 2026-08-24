import { getUserList } from '@/lib/api/users';
import React from 'react';

const AdminUsersPage = async() => {
    const data = await getUserList();
    const users = data.users;
    return (
        <div>
            <h2>Total Users: {users.length}</h2>
        </div>
    );
};

export default AdminUsersPage;