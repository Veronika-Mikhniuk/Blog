import '../styles/title.scss'

export function Title({ children }: { children: string }) {
    return (
        <h1 className="title">{children}</h1>
    )
}