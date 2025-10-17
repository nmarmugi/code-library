'use client';

import { showToast } from "nextjs-toast-notify";
import { useState, useRef, useEffect } from "react";
import CopyButton from "../CopyButton";
import { updateTitlePost } from "@/utils/updateTitlePost";

interface EditNamePost {
    title: string;
    code: string;
    id: number;
    onTitleUpdate?: (newTitle: string) => void; 
}

export default function EditNamePost({ id, title, code, onTitleUpdate }: EditNamePost) {
    const [isEdit, setIsEdit] = useState(false);
    const [editName, setEditName] = useState(title);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsEdit(false);
                setEditName(title);
            }
        }

        if (isEdit) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEdit, title]);

    useEffect(() => {
        if (isEdit && inputRef.current) {
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
            inputRef.current.focus();
        }
    }, [isEdit]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditName(e.target.value);
    }

    const handleUpdate = async (id: number) => {
        if (editName.trim() === '') {
            showToast.error("Il nome deve contenere almeno un carattere!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "slideInUp",
                icon: '',
                sound: true,
            });
            return;
        }
        setIsSubmitting(true);
        try {
            await updateTitlePost(id, editName, new Date().toISOString());
            setIsEdit(false);

            if (onTitleUpdate) onTitleUpdate(editName);

            showToast.success("Snippet aggiornato con successo!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "slideInUp",
                icon: '',
                sound: true,
    });
        } catch (err) {
            console.error("Errore durante l'aggiornamento:", err);
            showToast.error("Problema nell'aggiornamento dello snippet!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "slideInUp",
                icon: '',
                sound: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={containerRef} className="w-full">
            {isEdit ? (
                <div className="mb-5 w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <input
                        ref={inputRef}
                        value={editName}
                        onChange={handleChange}
                        className="bg-transparent text-gray-800 text-xl font-bold focus:outline-none px-0"
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEdit(false)}
                            className="text-sm cursor-pointer px-4 py-2 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            Annulla
                        </button>
                        <button
                            type="button"
                            onClick={() => handleUpdate(id)}
                            disabled={isSubmitting}
                            className={`text-sm cursor-pointer px-6 py-2 font-semibold rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
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
                </div>
            ) : (
                <div className="flex items-center gap-2 mb-4">
                    <h2
                        onClick={() => setIsEdit(true)}
                        className="cursor-pointer text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors"
                    >
                        {title.length > 17 ? `${title.slice(0, 17)}...` : title}
                    </h2>
                    <CopyButton code={code} />
                </div>
            )}
        </div>
    );
}
