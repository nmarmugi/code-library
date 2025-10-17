'use client';

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Pagina Non Trovata
                </h1>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Houston, non c'è nulla qui! 🚀
                </h2>
                <p className="text-gray-600 mb-6">
                    La pagina che stai cercando non esiste o è stata rimossa.
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300"
                >
                    Torna alla Home
                </button>
            </div>
        </div>
    );
}
