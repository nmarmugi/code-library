export const getPosts = async () => {
    const response = await fetch("/api/posts");

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante il recupero dei post");
    }

    return response.json();
};
