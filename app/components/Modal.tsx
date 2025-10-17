import React, { SetStateAction, useState } from "react";

interface Modal {
    setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
    onDelete: (id: number) => Promise<void> | void;
    id: number;
}

export default function Modal({ setIsOpenModal, onDelete, id }: Modal) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);
            await onDelete(id);
        } finally {
            setIsSubmitting(false);
            setIsOpenModal(false);
        }
    };

    return (
        <div
            onClick={() => setIsOpenModal(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 flex flex-col gap-6 transition-all duration-300"
            >
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Sei sicuro di voler eliminare lo snippet?
                </h3>
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                        onClick={() => setIsOpenModal(false)}
                        disabled={isSubmitting}
                        className="text-xs w-full sm:w-auto cursor-pointer px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Annulla
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className={`text-sm w-full sm:w-auto cursor-pointer px-8 py-3 font-semibold rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Eliminazione...
                            </>
                        ) : (
                            "Conferma 🗑️"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
