import { Outlet } from "react-router-dom"
import { Title } from './Title'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'

export function Layout(props) {
    return (
        <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div className="container-fluid" style={{ maxWidth: '1140px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Title >{props.title}</Title>
                <Main >{props.children}
                    {/* Позволит подставить дочерний компонент */}
                    <Outlet />
                </Main>
                <Footer />
            </div>
        </div>
    )
}