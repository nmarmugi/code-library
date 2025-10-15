import { useRouter } from "next/navigation";

interface FormActionsProps {
    isSubmitting: boolean;
    onBack?: () => void;
}

export function FormActions({ isSubmitting, onBack }: FormActionsProps) {
    const router = useRouter();
    const handleBack = onBack || (() => router.back());

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
            <button
                type="button"
                onClick={handleBack}
                className="cursor-pointer px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
            >
                ← Torna indietro
            </button>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`cursor-pointer px-8 py-3 font-semibold rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                    isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                }`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvataggio...
                    </>
                    ) : (
                    "Salva Snippet ✨"
                )}
            </button>
        </div>
    );
}
