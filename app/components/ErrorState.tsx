export function ErrorState() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center">
            <div className="text-center mb-12">
                <div className="inline-block mb-4">
                    <div className="text-6xl sm:text-7xl">💻</div>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Code Library
                </h1>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    Houston, abbiamo un problema! 🚀
                </h2>
                <p className="text-gray-600 text-center">
                    I nostri snippet si sono nascosti. Riprova tra un attimo!
                </p>
            </div>
        </div>
    );
}
