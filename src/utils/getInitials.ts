export function getInitials(username: string): string {
    const nameParts = username.includes('-') || username.includes('_')
        ? username.split(/[-_]/)
        : username.match(/[A-Z]?[a-z]+/g) || [username];

    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
}