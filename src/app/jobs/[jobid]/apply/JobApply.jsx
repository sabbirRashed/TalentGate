"use client";

import React, { useState } from "react";
import {
    Form,
    Button,
    TextField,
    Label,
    Input,
    Description,
    FieldError,
    TextArea,
    Avatar,
    Card,
    toast,
} from "@heroui/react";
import {  Link as LinkIcon, Globe, FileText, ArrowRight, ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";
import { submitApplication } from "@/lib/actions/application";


export default function JobApply({ job = {}, applicant = {} }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Extract form data
        const formData = new FormData(e.currentTarget);
        const submissionData = {
            jobId: job?._id,
            jobTitle: job?.title,
            companyName: job?.companyName,
            applicantId: applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            status: 'applied',
            resumeUrl: formData.get("resumeUrl"),
            portfolioUrl: formData.get("portfolioUrl"),
            notes: formData.get("notes"),
            
        };

        console.log("Submitting application:", submissionData);

       const res = await submitApplication(submissionData);
       if(res.insertedId){
        setSubmitted(true);
       }
      

        setLoading(false);
        
    };

    if (submitted) {
        return (
            <div className="bg-zinc-950 text-zinc-100 min-h-[70vh] flex items-center justify-center px-4 py-12">
                <Card className="max-w-md w-full bg-zinc-900 border border-zinc-800 text-center p-8 rounded-3xl shadow-2xl space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">Application Submitted!</h2>
                        <p className="text-zinc-400 text-sm">
                            Your application for <span className="text-white font-semibold">{job.title}</span> at{" "}
                            <span className="text-pink-400 font-semibold">{job.companyName}</span> has been received.
                        </p>
                    </div>
                    <Link href="/jobs">
                        <Button
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Job Listings</span>
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 text-zinc-100 min-h-screen px-4 py-12 sm:px-8 lg:px-12 flex justify-center">
            <div className="max-w-2xl w-full space-y-8">

                {/* Job Summary Banner */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center gap-4 shadow-xl">
                    <Avatar className="w-14 h-14 rounded-2xl bg-zinc-800 text-white font-bold shrink-0">
                        <Avatar.Image src={job.companyLogo} alt={job.companyName} />
                        <Avatar.Fallback>{job.companyName?.charAt(0) || "C"}</Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0">
                        <span className="text-xs font-semibold uppercase text-pink-500 tracking-wider">
                            Applying for
                        </span>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-white truncate">
                            {job.title || "Software Position"}
                        </h1>
                        <p className="text-sm text-zinc-400 truncate">{job.companyName}</p>
                    </div>
                </div>

                {/* Application Form Card */}
                <Card className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                    <Form onSubmit={handleSubmit} className="space-y-6">

                        {/* Form Header */}
                        <div>
                            <h2 className="text-xl font-bold text-white">Application Details</h2>
                            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                                Provide a link to your resume and any optional links or details for the hiring team.
                            </p>
                        </div>

                        {/* Resume Link Field (Required) */}
                        <TextField className="flex flex-col gap-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                <LinkIcon className="w-4 h-4 text-pink-400" />
                                <span>Resume Link *</span>
                            </Label>
                            <Input
                                name="resumeUrl"
                                type="url"
                                required
                                placeholder="https://drive.google.com/file/d/... or Notion link"
                                className="bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                            />
                            <Description className="text-xs text-zinc-500">
                                Direct public URL to your Resume/CV (Google Drive, Dropbox, Notion, PDF link).
                            </Description>
                            <FieldError className="text-xs text-rose-500" />
                        </TextField>

                        {/* Portfolio / Website Link Field (Optional) */}
                        <TextField className="flex flex-col gap-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                <Globe className="w-4 h-4 text-pink-400" />
                                <span>Portfolio or GitHub Link (Optional)</span>
                            </Label>
                            <Input
                                name="portfolioUrl"
                                type="url"
                                placeholder="https://github.com/username or portfolio link"
                                className="bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                            />
                            <Description className="text-xs text-zinc-500">
                                Link to your personal website, GitHub profile, or project showcase.
                            </Description>
                        </TextField>

                        {/* Additional Information / Cover Notes (Optional) */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-pink-400" />
                                <span>Additional Information (Optional)</span>
                            </Label>
                            <TextArea
                                name="notes"
                                aria-label="Additional Information"
                                placeholder="Share a brief introduction, relevant project achievements, or notice period..."
                                className="w-full h-32 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl p-3 text-sm focus:outline-none focus:border-zinc-700 transition-colors resize-none"
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                            <Button
                                type="submit"
                                isDisabled={loading}
                                className="w-full sm:flex-1 bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-pink-600/20"
                            >
                                <span>{loading ? "Submitting..." : "Submit Application"}</span>
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </Button>
                            <Button
                                type="reset"
                                variant="flat"
                                className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
                            >
                                Reset
                            </Button>
                        </div>

                    </Form>
                </Card>

            </div>
        </div>
    );
}