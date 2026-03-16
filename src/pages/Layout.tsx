import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'

const Layout = () => {

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
  
      <div className="mt-4">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
