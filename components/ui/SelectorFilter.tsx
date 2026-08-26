"use client";

import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export default function SelectorFilter({
                                           label,
                                           options,
                                           placeholder,
                                           className = "filterselector",
                                           ...props
                                       }: SelectProps) {
    return (
        <div className="selector-container">
            {label && <label className="selector-label">{label}</label>}

            <select className={className} {...props}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt, index) => (
                    <option key={`${opt.value}-${index}`} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}