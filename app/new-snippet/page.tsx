"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/utils/createPost";
import { FormHeader } from "../components/form/FormHeader";
import { FormError } from "../components/form/FormError";
import { FormField } from "../components/form/FormField";
import { FormActions } from "../components/form/FormActions";
import { showToast } from "nextjs-toast-notify";

export default function NewSnippetForm() {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !code.trim()) {
            setError("Titolo e codice sono obbligatori!");
            showToast.error("Titolo e codice sono obbligatori!", {
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
        setError(null);

        try {
            await createPost(title, code);
            router.push("/");
            showToast.success("Snippet creato con successo!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "slideInUp",
                icon: '',
                sound: true,
            });
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : "Qualcosa è andato storto.";
            setError(errorMessage);
            showToast.error("Problema nella creazione dello snippet!", {
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <FormHeader />
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                    <FormError message={error || ""} />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            label="Titolo dello snippet *"
                            id="title"
                            value={title}
                            onChange={setTitle}
                            placeholder="Ese: Validatore di email in TypeScript"
                            disabled={isSubmitting}
                        />

                        <FormField
                            label="Codice *"
                            id="code"
                            isTextarea
                            value={code}
                            onChange={setCode}
                            placeholder={`// Incolla qui il tuo codice\nfunction hello() {\n  console.log('Ciao, mondo!');\n}`}
                            disabled={isSubmitting}
                            rows={14}
                        />

                        <FormActions isSubmitting={isSubmitting} />
                    </form>
                </div>
            </div>
        </div>
    );
}
