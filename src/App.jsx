import './styles/app.scss'
import { RouterProvider } from "react-router-dom"
import { router } from "./router.jsx"
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

export default function App() {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  )
}
