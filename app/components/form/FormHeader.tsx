export function FormHeader() {
    return (
        <div className="text-center mb-10">
            <div className="inline-block mb-4">
                <div className="text-5xl sm:text-6xl">✍️</div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nuovo Snippet
            </h1>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Condividi il tuo frammento di codice con la community.
            </p>
        </div>
    );
}
