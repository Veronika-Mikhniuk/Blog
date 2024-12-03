export function Main(props) {
    return (
        <main className="layout__main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flex: 1 }}>{props.children}</main>
    )
}