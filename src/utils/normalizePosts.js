export function normalizePosts(posts) {
    return posts.map((post) => {
        return {
            ...post,
            likes: 0,
            dislikes: 0,
            rating: 0,
            isFavourite: false
        }
    })
}