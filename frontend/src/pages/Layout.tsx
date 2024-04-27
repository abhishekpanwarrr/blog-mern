import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'
import FooterArea from '../components/Footer'

const Layout = () => {
    return (
        <div className="">
            <Header />
            <Outlet />
            <FooterArea />
            <Toaster />
        </div>
    )
}

export default Layout