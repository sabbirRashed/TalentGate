'use client';

import React, { useState } from 'react';
import {
    Form,
    Select,
    ListBox,
    Label,
    Input,
    TextArea,
    Switch,
    Button,
    Card
} from '@heroui/react';

import {
    Briefcase,
    Pin,
    Calendar,
    FileText,
    Check,
    ArrowLeft,
    Persons as UserGroup
} from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
    const [recruiterCompany] = useState({
        id: 'comp_98765',
        name: 'HireLoop Inc.',
        isApproved: true,
    });

    const [isRemote, setIsRemote] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedSuccess, setSubmittedSuccess] = useState(false);
    const router = useRouter();

    // Form selection states
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [currency, setCurrency] = useState('USD');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!recruiterCompany.isApproved) return;

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const jobData = Object.fromEntries(formData.entries());

        const payload = {
            ...jobData,
            category,
            type,
            currency,
            companyId: recruiterCompany.id,
            companyName: recruiterCompany.name,
            isRemote: isRemote,
            status: 'active',
            isPublic: true,
            createdAt: new Date().toISOString(),
        };

        console.log('Submitting Job Payload:', payload);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmittedSuccess(true);
        }, 1200);
    };

    if (!recruiterCompany.isApproved) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
                <Card className="max-w-md w-full bg-zinc-900 border border-zinc-800 text-center p-6 rounded-2xl">
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                            <UserGroup className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-semibold">Company Approval Pending</h2>
                        <p className="text-sm text-zinc-400">
                            Your company account must be approved before you can post new job listings.
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950  text-zinc-100 flex items-center justify-center p-4 md:p-8">
            <Card className="max-w-4xl w-full bg-[#18181b] border border-zinc-800/80 shadow-2xl rounded-2xl overflow-hidden p-0">

                {/* Header Section */}
                <div className="flex flex-col items-start gap-1 p-6 md:p-8 border-b border-zinc-800/60 bg-zinc-900/40">
                    <div onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400 text-sm mb-1 hover:text-white cursor-pointer transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Jobs</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Post a New Job</h1>
                    <p className="text-sm text-zinc-400">
                        Create a job opening to reach qualified candidates across the platform.
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="w-full">
                    <div className="p-6 md:p-8 space-y-8 w-full">

                        {/* 1. Recruiter Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-zinc-200 font-medium">
                                <UserGroup className="w-5 h-5 text-zinc-400" />
                                <span>Company Details</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-xs font-medium text-zinc-400">Posting Company</Label>
                                    <Input
                                        value={recruiterCompany.name}
                                        readOnly
                                        className="bg-zinc-800/40 border border-zinc-700/60 text-zinc-300 rounded-lg p-2.5 text-sm cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-zinc-800/60" />

                        {/* 2. Job Info Section */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 text-zinc-200 font-medium">
                                <Briefcase className="w-5 h-5 text-zinc-400" />
                                <span>Job Information</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Job Title */}
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-xs font-medium text-zinc-300">Job Title *</Label>
                                    <Input
                                        name="title"
                                        placeholder="e.g. Senior Frontend Engineer"
                                        required
                                        className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
                                    />
                                </div>

                                {/* Job Category */}
                                <div className="flex flex-col gap-1.5">
                                    <Select className="w-full" onSelectionChange={(val) => setCategory(val)}>
                                        <Label className="text-xs font-medium text-zinc-300">Job Category *</Label>
                                        <Select.Trigger className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm flex justify-between items-center w-full">
                                            <Select.Value placeholder="Select category" />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-1 shadow-xl">
                                            <ListBox className="p-1 space-y-1">
                                                <ListBox.Item id="engineering" textValue="Engineering" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Engineering
                                                </ListBox.Item>
                                                <ListBox.Item id="design" textValue="Design & Creative" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Design & Creative
                                                </ListBox.Item>
                                                <ListBox.Item id="product" textValue="Product Management" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Product Management
                                                </ListBox.Item>
                                                <ListBox.Item id="marketing" textValue="Marketing & Sales" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Marketing & Sales
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Job Type */}
                                <div className="flex flex-col gap-1.5">
                                    <Select className="w-full" onSelectionChange={(val) => setType(val)}>
                                        <Label className="text-xs font-medium text-zinc-300">Job Type *</Label>
                                        <Select.Trigger className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm flex justify-between items-center w-full">
                                            <Select.Value placeholder="Select type" />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-1 shadow-xl">
                                            <ListBox className="p-1 space-y-1">
                                                <ListBox.Item id="full-time" textValue="Full-time" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Full-time
                                                </ListBox.Item>
                                                <ListBox.Item id="part-time" textValue="Part-time" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Part-time
                                                </ListBox.Item>
                                                <ListBox.Item id="contract" textValue="Contract" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Contract
                                                </ListBox.Item>
                                                <ListBox.Item id="internship" textValue="Internship" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">
                                                    Internship
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Currency & Salary */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="flex flex-col gap-1.5">
                                        <Select className="w-full" onSelectionChange={(val) => setCurrency(val)}>
                                            <Label className="text-xs font-medium text-zinc-300">Currency</Label>
                                            <Select.Trigger className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm flex justify-between items-center w-full">
                                                <Select.Value placeholder="USD" />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-1 shadow-xl">
                                                <ListBox className="p-1 space-y-1">
                                                    <ListBox.Item id="USD" textValue="USD ($)" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">USD ($)</ListBox.Item>
                                                    <ListBox.Item id="EUR" textValue="EUR (€)" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">EUR (€)</ListBox.Item>
                                                    <ListBox.Item id="GBP" textValue="GBP (£)" className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm">GBP (£)</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-xs font-medium text-zinc-300">Min Salary</Label>
                                        <Input
                                            name="salaryMin"
                                            type="number"
                                            placeholder="80,000"
                                            className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm placeholder:text-zinc-500"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-xs font-medium text-zinc-300">Max Salary</Label>
                                        <Input
                                            name="salaryMax"
                                            type="number"
                                            placeholder="120,000"
                                            className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm placeholder:text-zinc-500"
                                        />
                                    </div>
                                </div>

                                {/* Location & Remote Switch */}
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between mb-1">
                                        <Label className="text-xs font-medium text-zinc-300">Location *</Label>
                                        <Switch
                                            isSelected={isRemote}
                                            onChange={setIsRemote}
                                        >
                                            <Switch.Content className="flex items-center gap-2 cursor-pointer">
                                                <Switch.Control>
                                                    <Switch.Thumb />
                                                </Switch.Control>
                                                <span className="text-xs text-zinc-400 select-none">Fully Remote</span>
                                            </Switch.Content>
                                        </Switch>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            name="location"
                                            placeholder={isRemote ? "Worldwide / Remote" : "City, Country (e.g. San Francisco, CA)"}
                                            disabled={isRemote}
                                            required={!isRemote}
                                            className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 pl-9 text-sm placeholder:text-zinc-500 w-full disabled:opacity-50"
                                        />
                                        <Pin className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                                    </div>
                                </div>

                                {/* Application Deadline */}
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-xs font-medium text-zinc-300">Application Deadline *</Label>
                                    <div className="relative">
                                        <Input
                                            name="deadline"
                                            type="date"
                                            required
                                            className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 pl-9 text-sm w-full"
                                        />
                                        <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-zinc-800/60" />

                        {/* 3. Job Description Section */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 text-zinc-200 font-medium">
                                <FileText className="w-5 h-5 text-zinc-400" />
                                <span>Job Details & Description</span>
                            </div>

                            {/* Responsibilities */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs font-medium text-zinc-300">Responsibilities *</Label>
                                <TextArea
                                    name="responsibilities"
                                    placeholder="List the key duties and expectations for this role..."
                                    rows={4}
                                    required
                                    className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm placeholder:text-zinc-500 w-full"
                                />
                            </div>

                            {/* Requirements */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs font-medium text-zinc-300">Requirements & Qualifications *</Label>
                                <TextArea
                                    name="requirements"
                                    placeholder="List required skills, experience, qualifications, and tools..."
                                    rows={4}
                                    required
                                    className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm placeholder:text-zinc-500 w-full"
                                />
                            </div>

                            {/* Benefits */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs font-medium text-zinc-300">Benefits & Perks (Optional)</Label>
                                <TextArea
                                    name="benefits"
                                    placeholder="Health insurance, remote work allowance, flexible PTO..."
                                    rows={3}
                                    className="bg-zinc-900/90 border border-zinc-700/70 text-white rounded-lg p-2.5 text-sm placeholder:text-zinc-500 w-full"
                                />
                            </div>
                        </div>

                        {submittedSuccess && (
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3">
                                <Check className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-medium">
                                    Job posted successfully! Status is set to Active and is visible publicly.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 p-6 md:p-8 border-t border-zinc-800/60 bg-zinc-900/40">
                        <Button
                            type="button"
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium px-6 py-2 rounded-lg text-sm"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white hover:bg-zinc-200 text-black font-semibold px-8 py-2 rounded-lg text-sm transition-colors"
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Job Listing'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}