import NavigateButton from "../NavigateButton";

export function EmptyState() {
    return (
        <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-50">📭</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Nessun codice ancora
            </h3>
            <p className="text-gray-500">
                Inizia ad aggiungere i tuoi snippet di codice preferiti!
            </p>
            <NavigateButton path={'/new-snippet'} content={'Aggiungi snippet'} />
        </div>
    );
}
