export function createPost({ title, description, author }) {
    if (!title?.trim() || !description?.trim() || !author?.trim()) {
        return null;
    }

    const date = new Date()

    return {
        id: date.getTime(),
        title,
        description,
        author,
        createdAt: date
    }
}