interface FormErrorProps {
    message: string;
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null;

    return (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
            <span>⚠️</span>
            <span>{message}</span>
        </div>
    );
}
