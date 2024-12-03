import { expect, test } from '@jest/globals'
import { createPost } from './createPost'

test('Test function createPost', () => {
    const inputData = {
        title: 'Test title',
        description: 'Test description',
        author: 'Test author'
    }

    const invalidData1 = {
        title: '',
        description: 'Test description',
        author: 'Test author'
    }
    const invalidData2 = {
        title: '       ',
        description: 'Test description',
        author: 'Test author'
    }
    const invalidData3 = {
        description: '',
        author: ''
    }

    const invalidData4 = {
        author: ''
    }

    const post = createPost(inputData)
    const nullPost1 = createPost(invalidData1)
    const nullPost2 = createPost(invalidData2)
    const nullPost3 = createPost(invalidData3)
    const nullPost4 = createPost(invalidData4)

    expect(typeof (post.id)).toBe('number')
    expect(post instanceof Object).toBe(true)
    expect(post.title).toBe(inputData.title)

    expect(post.description).toBe(inputData.description)
    expect(post.author).toBe(inputData.author)
    expect(post.createdAt instanceof Date).toBe(true)

    expect(nullPost1).toBeNull()
    expect(nullPost2).toBeNull()
    expect(nullPost3).toBeNull()
    expect(nullPost4).toBeNull()
})