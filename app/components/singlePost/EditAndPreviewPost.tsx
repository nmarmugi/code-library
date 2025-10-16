'use client';

import { updatePost } from "@/utils/updatePost";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface EditAndPreviewPost {
    code: string;
    id: number;
}

export default function EditAndPreviewPost({ id, code }: EditAndPreviewPost) {
    const [isEdit, setIsEdit] = useState(false);
    const [editCode, setEditCode] = useState(code);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEdit && textareaRef.current) {
            const textarea = textareaRef.current;

            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";

            const length = textarea.value.length;
            textarea.setSelectionRange(length, length);
            textarea.focus();
        }
    }, [isEdit]);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
            const textarea = e.target;
            setEditCode(textarea.value);
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
    }

    const handleUpdate = async (id: number) => {
        const now = new Date().toISOString();
        setIsSubmitting(true);
        try {
            await updatePost(id, editCode, now);
            setIsEdit(false);
            router.refresh();
        } catch (err) {
            console.error("Errore durante l'aggiornamento:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isEdit ? (
                <>
                    <textarea
                        ref={textareaRef}
                        value={editCode}
                        onChange={handleChange}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 rounded-xl text-sm font-mono leading-relaxed shadow-inner w-full resize-none"
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
                        <button
                            onClick={() => {
                                setIsEdit(false);
                                setEditCode(code);
                            }}
                            type="button"
                            className="cursor-pointer px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            Annulla
                        </button>

                        <button
                            onClick={() => handleUpdate(id)}
                            type="button"
                            disabled={isSubmitting}
                            className={`cursor-pointer px-8 py-3 font-semibold rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
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
                                    Salvataggio...
                                </>
                            ) : (
                                "Salva Snippet ✨"
                            )}
                        </button>
                    </div>
                </>
            ) : (
                <pre
                    onClick={() => setIsEdit(true)}
                    className="cursor-pointer overflow-x-auto bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 rounded-xl text-sm font-mono leading-relaxed shadow-inner"
                >
                    <code>{code}</code>
                </pre>
            )}
        </>
    );
}
