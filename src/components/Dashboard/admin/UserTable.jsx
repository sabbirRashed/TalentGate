'use client';

import { useState } from 'react';
import { Table, Avatar, Button, Modal, Spinner } from '@heroui/react';
import { updateUserRole } from '@/lib/actions/users';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
};

const getInitials = (name = '') => {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

export default function UserTable({ users }) {
    const [isOpen, setIsOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Prompt for confirmation before applying role change
    const promptRoleToggle = (user, targetRole) => {
        setPendingChange({ user, targetRole });
        setIsOpen(true);
    };

    // Process update and close modal
    const handleConfirmRoleToggle = async () => {
        if (!pendingChange) return;
        setIsUpdating(true);

        try {
            const { user, targetRole } = pendingChange;
            console.log('userId', user.id);
            const data = await updateUserRole(user.id, targetRole);
            console.log(`Updated user: ${data}`);
        } catch (error) {
            console.error('Failed to update user role:', error);
        } finally {
            setIsUpdating(false);
            setPendingChange(null);
            setIsOpen(false);
        }
    };

    const handleStatusToggle = (userId) => {
        console.log(`Toggle status for user ${userId}`);
    };

    return (
        <>
            <div className="rounded-xl border border-zinc-800/80 bg-[#161618] overflow-hidden shadow-2xl">
                <Table aria-label="User Management Table">
                    <Table.ScrollContainer>
                        <Table.Content>
                            {/* Table Header */}
                            <Table.Header className="border-b border-zinc-800/80 bg-[#1a1a1c]">
                                <Table.Column isRowHeader className="text-zinc-400 font-medium py-4 px-6 text-left text-xs uppercase tracking-wider">
                                    User Name
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-xs uppercase tracking-wider">
                                    Email Address
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-xs uppercase tracking-wider">
                                    Role
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-xs uppercase tracking-wider">
                                    Join Date
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-left text-xs uppercase tracking-wider">
                                    Status
                                </Table.Column>
                                <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-right text-xs uppercase tracking-wider">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            {/* Table Body */}
                            <Table.Body>
                                {users.map((user) => {
                                    const isSuspended = user.status === 'suspended';
                                    const role = user.role?.toLowerCase() || 'user';
                                    const userIdStr = user.id || user._id?.toString() || user.email;

                                    return (
                                        <Table.Row
                                            key={userIdStr}
                                            className="border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors"
                                        >
                                            {/* User Name */}
                                            <Table.Cell className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/60 text-xs font-bold text-zinc-300 shrink-0">
                                                        <Avatar.Fallback>
                                                            {getInitials(user.name)}
                                                        </Avatar.Fallback>
                                                    </Avatar>
                                                    <span className="font-medium text-zinc-100 text-sm">
                                                        {user.name || 'Anonymous'}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* Email */}
                                            <Table.Cell className="py-4 px-6 text-sm text-zinc-400 font-mono">
                                                {user.email}
                                            </Table.Cell>

                                            {/* Role Badge */}
                                            <Table.Cell className="py-4 px-6">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize border ${role === 'admin'
                                                        ? 'bg-purple-950/40 text-purple-400 border-purple-800/40'
                                                        : role === 'recruiter'
                                                            ? 'bg-blue-950/40 text-blue-400 border-blue-800/40'
                                                            : 'bg-zinc-800/60 text-zinc-300 border-zinc-700/50'
                                                        }`}
                                                >
                                                    {role}
                                                </span>
                                            </Table.Cell>

                                            {/* Join Date */}
                                            <Table.Cell className="py-4 px-6 text-sm text-zinc-400">
                                                {formatDate(user.createdAt)}
                                            </Table.Cell>

                                            {/* Status Badge */}
                                            <Table.Cell className="py-4 px-6">
                                                {!isSuspended ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-400 bg-rose-950/30 border border-rose-800/40 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Suspended
                                                    </span>
                                                )}
                                            </Table.Cell>

                                            {/* Actions */}
                                            <Table.Cell className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {role !== 'recruiter' && (
                                                        <Button
                                                            size="sm"
                                                            variant="flat"
                                                            onPress={() => promptRoleToggle(user, 'recruiter')}
                                                            className="text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/60 min-w-0 h-auto py-1 px-2.5 rounded-md"
                                                        >
                                                            Make Recruiter
                                                        </Button>
                                                    )}

                                                    {role !== 'admin' && (
                                                        <Button
                                                            size="sm"
                                                            variant="flat"
                                                            onPress={() => promptRoleToggle(user, 'admin')}
                                                            className="text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/60 min-w-0 h-auto py-1 px-2.5 rounded-md"
                                                        >
                                                            Make Admin
                                                        </Button>
                                                    )}

                                                    {role !== 'seeker' && (
                                                        <Button
                                                            size="sm"
                                                            variant="flat"
                                                            onPress={() => promptRoleToggle(user, 'seeker')}
                                                            className="text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/60 min-w-0 h-auto py-1 px-2.5 rounded-md"
                                                        >
                                                            Make Seeker
                                                        </Button>
                                                    )}

                                                    {/* Status Toggle Button */}
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        onPress={() => handleStatusToggle(user.id)}
                                                        className={`text-xs font-medium border min-w-0 h-auto py-1 px-2.5 rounded-md ${isSuspended
                                                            ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/50 hover:bg-emerald-900/40'
                                                            : 'bg-rose-950/30 text-rose-400 border-rose-800/50 hover:bg-rose-900/40'
                                                            }`}
                                                    >
                                                        {isSuspended ? 'Activate' : 'Suspend'}
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>

                    {/* Footer */}
                    <Table.Footer className="border-t border-zinc-800/80 px-6 py-4 bg-[#1a1a1c]">
                        <div className="flex items-center justify-between text-xs text-zinc-400 w-full">
                            <span>Showing 1 to {users.length} of {users.length} users</span>
                            <div className="flex items-center gap-1">
                                <Button size="sm" className="px-2 py-1 min-w-0 h-auto rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white">
                                    &lt;
                                </Button>
                                <Button size="sm" className="px-2.5 py-1 min-w-0 h-auto rounded bg-zinc-100 text-zinc-950 font-semibold">
                                    1
                                </Button>
                                <Button size="sm" className="px-2 py-1 min-w-0 h-auto rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white">
                                    &gt;
                                </Button>
                            </div>
                        </div>
                    </Table.Footer>
                </Table>
            </div>

            {/* Controlled HeroUI Modal */}
            {isOpen && (
                <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                    {/* Backdrop with page blur effect */}
                    <Modal.Backdrop className="bg-black/50 backdrop-blur-md">
                        <Modal.Container>
                            <Modal.Dialog className="bg-[#18181b] border border-zinc-800 text-zinc-100 sm:max-w-md p-6 rounded-xl">
                                <Modal.CloseTrigger />
                                <Modal.Header className="pb-2">
                                    <Modal.Heading className="text-lg font-semibold text-white">
                                        Confirm Role Change
                                    </Modal.Heading>
                                </Modal.Header>
                                <Modal.Body className="py-2">
                                    <p className="text-sm text-zinc-400">
                                        Are you sure you want to change{' '}
                                        <span className="font-semibold text-white">
                                            {pendingChange?.user?.name || pendingChange?.user?.email}
                                        </span>
                                        &apos;s role to{' '}
                                        <span className="font-semibold text-emerald-400 capitalize">
                                            {pendingChange?.targetRole}
                                        </span>
                                        ?
                                    </p>
                                </Modal.Body>
                                <Modal.Footer className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="flat"
                                        onPress={() => setIsOpen(false)}
                                        isDisabled={isUpdating}
                                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                                        slot="close"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        isDisabled={isUpdating}
                                        onPress={handleConfirmRoleToggle}
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2"
                                    >
                                        {isUpdating && <Spinner size="sm" color="current" />}
                                        {isUpdating ? 'Updating...' : 'Confirm Change'}
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            )}
        </>
    );
}