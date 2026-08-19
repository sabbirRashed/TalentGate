"use client";

import { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Input,
    TextArea,
    Label,
    FieldError,
    Select,
    ListBox,
    Button,
    Chip,
    toast
} from "@heroui/react";
import {
    Pin,
    ArrowUpFromLine,
    Pencil,
    Check,
    Clock,
    Xmark,
    Globe
} from "@gravity-ui/icons";
import { BiBuilding } from "react-icons/bi";
import { createNewCompany } from "@/lib/actions/companies";

const textInputClass = "bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-white placeholder:text-zinc-600 rounded-lg px-3 py-2 text-sm w-full outline-none transition-colors";
const textAreaClass = "bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-white placeholder:text-zinc-600 rounded-lg p-3 text-sm w-full outline-none transition-colors resize-none";
const selectBoxClass = "flex flex-col gap-1 w-full";
const triggerClasses = "bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm flex justify-between items-center w-full focus:outline-none";
const popoverClasses = "bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-xl text-white";
const listItemClasses = "px-3 py-2 text-sm hover:bg-zinc-800 rounded cursor-pointer transition-colors text-zinc-300";

export default function CompanyProfile({recruiter}) {
    
    const [company, setCompany] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState(company?.logo || "");


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const uploadImageAPI = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${uploadImageAPI}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors((prev) => ({ ...prev, logo: null }));
            } else {
                setErrors((prev) => ({ ...prev, logo: "Image upload failed. Try again." }));
            }
        } catch (err) {
            console.error("Upload error:", err);
            setErrors((prev) => ({ ...prev, logo: "Upload error occurred." }));
        } finally {
            setIsUploading(false);
        }
    };

    const validateForm = (data) => {
        const newErrors = {};

        // Company Name
        if (!data.companyName || !data.companyName.trim()) {
            newErrors.companyName = "Company name is required.";
        }

        // Website URL validation
        const urlPattern = /^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
        if (!data.websiteUrl || !data.websiteUrl.trim()) {
            newErrors.websiteUrl = "Website URL is required.";
        } else if (!urlPattern.test(data.websiteUrl.trim())) {
            newErrors.websiteUrl = "Enter a valid URL (e.g. www.company.com).";
        }

        // Industry
        if (!data.industry) {
            newErrors.industry = "Please select an industry.";
        }

        // Location
        if (!data.location || !data.location.trim()) {
            newErrors.location = "Location is required.";
        }

        // Employee Count
        if (!data.employeeCount) {
            newErrors.employeeCount = "Please select an employee range.";
        }

        // Logo Check
        if (!logoUrl) {
            newErrors.logo = "Company logo is required.";
        }

        // Description validation
        if (!data.description || !data.description.trim()) {
            newErrors.description = "Brief description is required.";
        } else if (data.description.trim().length < 20) {
            newErrors.description = "Description must be at least 20 characters long.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const formValues = {
            companyName: formData.get("companyName"),
            websiteUrl: formData.get("websiteUrl"),
            industry: formData.get("industry"),
            location: formData.get("location"),
            employeeCount: formData.get("employeeCount"),
            description: formData.get("description"),
        };

        const validationErrors = validateForm(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const newCompany = {
            name: formValues.companyName,
            website: formValues.websiteUrl,
            industry: formValues.industry,
            location: formValues.location,
            employeeCount: formValues.employeeCount,
            description: formValues.description,
            logo: logoUrl,
            status: company?.status || "pending",
        };
        setCompany(newCompany);

        const payload = await createNewCompany(newCompany);
        if (payload.inserted) {
            toast.success("Company profile created successfully!");
        }
        setIsEditing(false);
    };

    const getStatusChip = (status) => {
        switch (status) {
            case "Approved":
                return <Chip color="success" variant="flat"><Check /> Approved</Chip>;
            case "Rejected":
                return <Chip color="danger" variant="flat"><Xmark /> Rejected</Chip>;
            default:
                return <Chip color="warning" variant="flat"><Clock /> Pending Approval</Chip>;
        }
    };

    // 1. STATE: NO COMPANY REGISTERED
    if (!company && !isEditing) {
        return (
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 max-w-2xl mx-auto text-center space-y-4 mt-12 md:mt-30">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                    <BiBuilding size={24} />
                </div>
                <h3 className="text-xl font-medium text-white">No Company Registered</h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                    You haven't added a company profile yet. Register your company to start posting jobs and managing candidates.
                </p>
                <Button
                    onClick={() => {
                        setErrors({});
                        setIsEditing(true);
                    }}
                    className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-10 mt-2"
                >
                    Register Company
                </Button>
            </div>
        );
    }

    // 2. STATE: VIEW COMPANY DETAILS
    if (company && !isEditing) {
        return (
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 max-w-3xl mx-auto space-y-6 mt-12 md:mt-30">
                <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-4">
                        {company.logo ? (
                            <img src={company.logo} alt="Logo" className="w-16 h-16 rounded-lg object-cover bg-zinc-900 border border-zinc-800" />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                                <BiBuilding size={28} />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold text-white">{company.name}</h2>
                                {getStatusChip(company.status)}
                            </div>

                            <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-xs text-zinc-400 hover:text-white transition-colors">
                                https://{company.website}
                            </a>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            setLogoUrl(company.logo);
                            setErrors({});
                            setIsEditing(true);
                        }}
                        variant="bordered"
                        className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-9 text-sm flex items-center gap-2"
                    >
                        <Pencil size={14} />
                        Edit
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-900">
                        <span className="text-zinc-500 block text-xs mb-1">Industry</span>
                        <span className="text-zinc-200 capitalize">{company.industry}</span>
                    </div>
                    <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-900">
                        <span className="text-zinc-500 block text-xs mb-1">Location</span>
                        <span className="text-zinc-200">{company.location}</span>
                    </div>
                    <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-900">
                        <span className="text-zinc-500 block text-xs mb-1">Company Size</span>
                        <span className="text-zinc-200">{company.employeeCount} employees</span>
                    </div>
                </div>

                <div>
                    <span className="text-zinc-500 block text-xs mb-2">About Company</span>
                    <p className="text-zinc-300 text-sm leading-relaxed">{company.description}</p>
                </div>
            </div>
        );
    }

    // 3. STATE: FORM (REGISTER / EDIT)
    return (
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 max-w-3xl mx-auto mt-12 md:30">
            <Form onSubmit={handleSubmit} className="space-y-6" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                        {company ? "Edit Company Information" : "Register Company"}
                    </legend>

                    {/* Row 1: Name & Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="companyName" defaultValue={company?.name} isInvalid={!!errors.companyName} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
                            <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                            {errors.companyName && <FieldError className="text-xs text-red-500 mt-1">{errors.companyName}</FieldError>}
                        </TextField>

                        <Select className={selectBoxClass} name="industry" defaultSelectedKeys={[company?.industry || "technology"]} isInvalid={!!errors.industry}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Industry / Category</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white placeholder:text-zinc-600" />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                    <ListBox.Item id="design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                                    <ListBox.Item id="finance" className={listItemClasses} textValue="Finance">Finance</ListBox.Item>
                                    <ListBox.Item id="marketing" className={listItemClasses} textValue="Marketing">Marketing</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                            {errors.industry && <span className="text-xs text-red-500 mt-1">{errors.industry}</span>}
                        </Select>
                    </div>

                    {/* Row 2: Website URL & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="websiteUrl" defaultValue={company?.website} isInvalid={!!errors.websiteUrl} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                            <div className="flex items-center">
                                <span className="bg-zinc-800 text-zinc-400 text-sm px-3 py-2 rounded-l-lg border border-r-0 border-zinc-800">https://</span>
                                <Input placeholder="www.company.com" className={`${textInputClass} rounded-l-none`} />
                            </div>
                            {errors.websiteUrl && <FieldError className="text-xs text-red-500 mt-1">{errors.websiteUrl}</FieldError>}
                        </TextField>

                        <TextField name="location" defaultValue={company?.location} isInvalid={!!errors.location} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                            <div className="relative flex items-center">
                                <Pin size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                            </div>
                            {errors.location && <FieldError className="text-xs text-red-500 mt-1">{errors.location}</FieldError>}
                        </TextField>
                    </div>

                    {/* Row 3: Employee Count & Logo Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <Select className={selectBoxClass} name="employeeCount" defaultSelectedKeys={[company?.employeeCount || "1-10"]} isInvalid={!!errors.employeeCount}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Employee Count Range</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                                    <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                                    <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                                    <ListBox.Item id="201+" className={listItemClasses} textValue="201+ employees">201+ employees</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                            {errors.employeeCount && <span className="text-xs text-red-500 mt-1">{errors.employeeCount}</span>}
                        </Select>

                        {/* File Upload Component with Validation */}
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Company Logo</Label>
                            <div className="flex items-center gap-3">
                                <label className={`relative flex flex-col items-center justify-center w-16 h-16 bg-zinc-900 border ${errors.logo ? "border-red-500" : "border-dashed border-zinc-700 hover:border-zinc-500"} rounded-lg cursor-pointer transition-colors group`}>
                                    <ArrowUpFromLine size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-200">
                                        {isUploading ? "Uploading..." : "Upload image"}
                                    </span>
                                    <span className="text-xs text-zinc-500">PNG, JPG up to 5MB</span>
                                    {logoUrl && <span className="text-xs text-emerald-400 mt-1">✓ Logo attached</span>}
                                </div>
                            </div>
                            {errors.logo && <span className="text-xs text-red-500 mt-1">{errors.logo}</span>}
                        </div>
                    </div>

                    {/* Row 4: Description */}
                    <TextField name="description" defaultValue={company?.description} isInvalid={!!errors.description} className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
                        <TextArea placeholder="Tell us about your company's mission and culture..." rows={4} className={textAreaClass} />
                        {errors.description && <FieldError className="text-xs text-red-500 mt-1">{errors.description}</FieldError>}
                    </TextField>
                </Fieldset>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                    {company && (
                        <Button
                            type="button"
                            variant="bordered"
                            onClick={() => {
                                setErrors({});
                                setIsEditing(false);
                            }}
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                    >
                        {company ? "Update Information" : "Save Company"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}