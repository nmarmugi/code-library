export const updateTitlePost = async (id: number, title: string, created_at: string) => {
    const response = await fetch("/api/posts/title", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, created_at }),
        });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante l'aggiornamento");
    }

    return response.json();
};
