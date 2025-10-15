interface FormFieldProps {
    label: string;
    id: string;
    isTextarea?: boolean;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    rows?: number;
}

export function FormField({
    label,
    id,
    isTextarea = false,
    placeholder,
    value,
    onChange,
    disabled = false,
    rows = 3,
}: FormFieldProps) {
    const commonClasses =
        "w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400";

    if (isTextarea) {
        return (
            <div>
                <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
                <textarea
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${commonClasses.replace('py-3', 'py-4')} font-mono text-sm bg-gray-50 placeholder-gray-500 resize-none`}
                />
            </div>
        );
    }

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={commonClasses}
            />
        </div>
    );
}
