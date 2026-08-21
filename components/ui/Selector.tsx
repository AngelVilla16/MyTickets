interface Option {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    placeholder?: string;
    className?: string;
    tag?: string;
}

export default function Selector({
    label,
    options,
    placeholder = "-- Seleccione --",
    className,
    tag,
    ...props 
}: SelectProps) {
    return (
        <div className="selector-container">
            {label && <label>{label}</label>}

          
            <select className={className} {...props}>
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

        </div>
    );
}