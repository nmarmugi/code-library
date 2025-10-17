export const getPostById = async (id: string) => {
    const response = await fetch(`/api/posts/${id}`);

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante il recupero del post");
    }

    return response.json();
};
