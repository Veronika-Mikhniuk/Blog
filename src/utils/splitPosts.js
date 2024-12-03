export function splitPosts(posts) {
    const largePost = posts[0]
    const remainingPosts = posts.slice(1)

    let mediumPosts = [];
    let smallPosts = [];

    if (remainingPosts.length <= 2) {
        smallPosts = remainingPosts.slice(0,2)
    } else {
        const halfIndex = Math.ceil(remainingPosts.length / 2)
        mediumPosts = remainingPosts.slice(halfIndex)
        smallPosts = remainingPosts.slice(0, halfIndex)
    }

    return { largePost, mediumPosts, smallPosts }
}