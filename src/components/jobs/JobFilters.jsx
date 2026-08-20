"use client";

import React from "react";
import {
    TextField,
    InputGroup,
    Label,
    Select,
    ListBox,
} from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function JobFilters({ filters, onFilterChange }) {
    const handleInputChange = (field, value) => {
        onFilterChange({ ...filters, [field]: value });
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-6 mb-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Input */}
                <TextField className="flex flex-col gap-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Search Jobs
                    </Label>
                    <InputGroup className="bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 flex items-center gap-2 focus-within:border-zinc-700 transition-colors">
                        <InputGroup.Prefix className="text-zinc-500">
                            <Magnifier className="w-4 h-4" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            type="text"
                            placeholder="Title, company, or city..."
                            value={filters.search}
                            onChange={(e) => handleInputChange("search", e.target.value)}
                            className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
                        />
                    </InputGroup>
                </TextField>

                {/* Category Select */}
                <Select
                    className="flex flex-col gap-1.5"
                    selectedKey={filters.category}
                    onSelectionChange={(key) => handleInputChange("category", key)}
                >
                    <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Category
                    </Label>
                    <Select.Trigger className="bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 flex items-center justify-between text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors">
                        <Select.Value placeholder="All Categories" />
                        <Select.Indicator className="text-zinc-500">
                            <ChevronDown className="w-4 h-4" />
                        </Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-1 mt-1 z-50 min-w-[200px]">
                        <ListBox className="flex flex-col gap-1">
                            <ListBox.Item
                                id="all"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>All Categories</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="software"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>Software Engineering</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="mobile-development"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>Mobile Development</Label>
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Job Type Select */}
                <Select
                    className="flex flex-col gap-1.5"
                    selectedKey={filters.type}
                    onSelectionChange={(key) => handleInputChange("type", key)}
                >
                    <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Job Type
                    </Label>
                    <Select.Trigger className="bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 flex items-center justify-between text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors">
                        <Select.Value placeholder="All Types" />
                        <Select.Indicator className="text-zinc-500">
                            <ChevronDown className="w-4 h-4" />
                        </Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-1 mt-1 z-50 min-w-[200px]">
                        <ListBox className="flex flex-col gap-1">
                            <ListBox.Item
                                id="all"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>All Types</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="full-time"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>Full Time</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="part-time"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>Part Time</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="contract"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>Contract</Label>
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Remote Preference Select */}
                <Select
                    className="flex flex-col gap-1.5"
                    selectedKey={filters.isRemote}
                    onSelectionChange={(key) => handleInputChange("isRemote", key)}
                >
                    <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Work Place
                    </Label>
                    <Select.Trigger className="bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 flex items-center justify-between text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors">
                        <Select.Value placeholder="All Locations" />
                        <Select.Indicator className="text-zinc-500">
                            <ChevronDown className="w-4 h-4" />
                        </Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-1 mt-1 z-50 min-w-[200px]">
                        <ListBox className="flex flex-col gap-1">
                            <ListBox.Item
                                id="all"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>All Locations</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="remote"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>Remote Only</Label>
                            </ListBox.Item>
                            <ListBox.Item
                                id="onsite"
                                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                            >
                                <Label>On-site Only</Label>
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
        </div>
    );
}