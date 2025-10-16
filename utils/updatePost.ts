export const updatePost = async (id: number, newCode: string, created_at: string) => {
    const response = await fetch("/api/posts", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, newCode, created_at }),
        });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante l'aggiornamento");
    }

    return response.json();
};
