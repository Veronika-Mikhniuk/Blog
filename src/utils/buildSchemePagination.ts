type PaginationItem = number | '...'

export const buildSchemePagination = (currentPage: string | number, pageCount: number): PaginationItem[] => {
    if (pageCount <= 3) {
        return [...Array(pageCount)].map((_, i) => i + 1)
    }

    const prevPageNumber = +currentPage - 1
    const nextPageNumber = +currentPage + 1
    // build scheme
    const scheme: number[] = [1, prevPageNumber, +currentPage, nextPageNumber, pageCount]
    // remove all below zero and above pagesCounter
    const filteredScheme: number[] = scheme.filter(item => item > 0 && item <= pageCount)
    // remove dublicates
    const set: Set<number> = new Set(filteredScheme)
    // convert back to array
    const result: PaginationItem[] = Array.from(set)
    // insert '...'
    if (typeof result[0] === 'number' && result[0] + 1 !== result[1]) {
        result.splice(1, 0, '...')
    }
    if (
        typeof result[result.length - 1] === 'number' &&
        (result[result.length - 2] as number) + 1 !== (result[result.length - 1] as number)) {
        result.splice(result.length - 1, 0, '...')
    }
    return result
}