"use client";

import { Table, Button } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

const STATUS_STYLES = {
    active: "bg-emerald-500/10 text-emerald-400",
    draft: "bg-amber-500/10 text-amber-400",
    closed: "bg-gray-500/10 text-gray-400",
    expired: "bg-rose-500/10 text-rose-400",
};

function StatusBadge({ status }) {
    const style = STATUS_STYLES[status] ?? STATUS_STYLES.closed;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${style}`}
        >
            {status}
        </span>
    );
}

function formatType(type) {
    if (!type) return "";
    return type
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function capitalize(text) {
    if (!text) return "";
    return text[0].toUpperCase() + text.slice(1);
}

/**
 * Recruiter jobs table — Title, Type/Category, Location, Status, Action.
 *
 * @param {object} props
 * @param {Array<object>} props.jobs - Job documents (title, type, category, location, isRemote, status, _id)
 * @param {(job: object) => void} [props.onView]
 * @param {(job: object) => void} [props.onEdit]
 * @param {(job: object) => void} [props.onDelete]
 */
export default function JobTable({ jobs = [], onView, onEdit, onDelete }) {
    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Job posts" className="min-w-[720px]">
                    <Table.Header>
                        <Table.Column isRowHeader>Title</Table.Column>
                        <Table.Column>Type / Category</Table.Column>
                        <Table.Column>Location</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>

                    <Table.Body
                        items={jobs}
                        renderEmptyState={() => (
                            <div className="py-10 text-center text-sm text-gray-400">
                                No job posts yet.
                            </div>
                        )}
                    >
                        {(job) => (
                            <Table.Row id={job._id?.$oid ?? job._id}>
                                <Table.Cell>
                                    <span className="font-medium text-white">
                                        {job.title}
                                    </span>
                                </Table.Cell>

                                <Table.Cell>
                                    <span className="text-gray-300">
                                        {formatType(job.type)}
                                    </span>
                                    <span className="text-gray-500"> · </span>
                                    <span className="text-gray-400">
                                        {capitalize(job.category)}
                                    </span>
                                </Table.Cell>

                                <Table.Cell>
                                    <span className="text-gray-300">{job.location}</span>
                                    {job.isRemote && (
                                        <span className="ml-2 inline-flex items-center rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-300">
                                            Remote
                                        </span>
                                    )}
                                </Table.Cell>

                                <Table.Cell>
                                    <StatusBadge status={job.status} />
                                </Table.Cell>

                                <Table.Cell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="outline"
                                            aria-label="View job"
                                            onPress={() => onView?.(job)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="outline"
                                            aria-label="Edit job"
                                            onPress={() => onEdit?.(job)}
                                        >
                                            <HiOutlinePencilSquare className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="outline"
                                            aria-label="Delete job"
                                            className="text-rose-400"
                                            onPress={() => onDelete?.(job)}
                                        >
                                            <HiOutlineTrash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}