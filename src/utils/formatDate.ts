import { IDateFormatOptions } from '../types/IDateFormatOptions'

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const options: IDateFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
}