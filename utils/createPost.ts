export const createPost = async (title: string, code: string) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, code }),
        });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante il salvataggio");
    }

    return response.json();
};
