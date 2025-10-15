export const deletePost = async (id: number) => {
    const response = await fetch("/api/posts", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
        });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante l'eliminazione");
    }

    return response.json();
};
