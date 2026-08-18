"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    TextField,
    TextArea,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
} from "@heroui/react";
import { MapPin, ArrowUpFromLine } from "@gravity-ui/icons";

const INDUSTRY_OPTIONS = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Other",
];

const EMPLOYEE_RANGES = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
];

const inputClass =
    "w-full border border-white/15 bg-white/5 focus:border-violet-500 transition-colors";

/**
 * Create or edit a company profile.
 * Pass `company` to pre-fill the form and switch to edit mode (PATCH instead of POST).
 * Company logo upload is presentational only — no upload logic wired up.
 */
export default function CompanyForm({ company }) {
    const router = useRouter();
    const isEditMode = Boolean(company);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState(null); // { type: "error" | "success", text: string }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormMessage(null);

        const form = new FormData(e.currentTarget);
        const values = Object.fromEntries(form.entries());

        const url = isEditMode ? `/api/companies/${company._id}` : "/api/companies";
        const method = isEditMode ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(
                    data.message ||
                        `Failed to ${isEditMode ? "update" : "register"} company.`
                );
            }

            setFormMessage({
                type: "success",
                text: isEditMode ? "Company updated!" : "Company registered!",
            });
        } catch (error) {
            setFormMessage({ type: "error", text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/3 p-8">
            <div className="mb-6 border-b border-white/10 pb-5">
                <h2 className="text-xl font-bold text-white">
                    {isEditMode ? "Edit Company" : "Register New Company"}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                    {isEditMode
                        ? "Update your business details."
                        : "Enter your business details to start hiring on TalentGate."}
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
                <TextField name="companyName" defaultValue={company?.companyName} isRequired>
                    <Label>Company Name</Label>
                    <Input placeholder="e.g. Acme Corp" className={inputClass} />
                    <FieldError />
                </TextField>

                <Select
                    name="industry"
                    defaultSelectedKey={company?.industry ?? "Technology"}
                >
                    <Label>Industry / Category</Label>
                    <Select.Trigger className={inputClass}>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {INDUSTRY_OPTIONS.map((option) => (
                                <ListBox.Item key={option} id={option} textValue={option}>
                                    {option}
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                <TextField name="websiteUrl" defaultValue={company?.websiteUrl}>
                    <Label>Website URL</Label>
                    <div className="flex overflow-hidden rounded-lg border border-white/15 bg-white/5 focus-within:border-violet-500">
                        <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-sm text-gray-400">
                            https://
                        </span>
                        <Input
                            placeholder="www.company.com"
                            className="w-full border-0 bg-transparent"
                        />
                    </div>
                    <FieldError />
                </TextField>

                <TextField name="location" defaultValue={company?.location}>
                    <Label>Location</Label>
                    <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input placeholder="City, Country" className={`${inputClass} pl-9`} />
                    </div>
                    <FieldError />
                </TextField>

                <Select
                    name="employeeCount"
                    defaultSelectedKey={company?.employeeCount ?? "1-10 employees"}
                >
                    <Label>Employee Count Range</Label>
                    <Select.Trigger className={inputClass}>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {EMPLOYEE_RANGES.map((range) => (
                                <ListBox.Item key={range} id={range} textValue={range}>
                                    {range}
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                <div>
                    <span className="mb-2 block text-sm font-medium text-gray-300">
                        Company Logo
                    </span>
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5">
                            <ArrowUpFromLine className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                </div>

                <TextField
                    name="description"
                    defaultValue={company?.description}
                    className="sm:col-span-2"
                >
                    <Label>Brief Description</Label>
                    <TextArea
                        placeholder="Tell us about your company's mission and culture..."
                        rows={4}
                        className={inputClass}
                    />
                    <FieldError />
                </TextField>

                {formMessage && (
                    <p
                        className={`sm:col-span-2 text-sm ${
                            formMessage.type === "error"
                                ? "text-red-400"
                                : "text-emerald-400"
                        }`}
                    >
                        {formMessage.text}
                    </p>
                )}

                <div className="flex justify-end gap-3 border-t border-white/10 pt-5 sm:col-span-2">
                    <Button
                        type="button"
                        variant="outline"
                        onPress={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isPending={isSubmitting}
                        isDisabled={isSubmitting}
                        className="bg-white text-black hover:bg-gray-200"
                    >
                        {isSubmitting
                            ? isEditMode
                                ? "Saving…"
                                : "Registering…"
                            : isEditMode
                              ? "Save Changes"
                              : "Register Company"}
                    </Button>
                </div>
            </form>
        </section>
    );
}