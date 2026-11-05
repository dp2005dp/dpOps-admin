import { Navigate , Outlet } from "react-router-dom"

const PublicRoutes = () => {
   const token = localStorage.getItem('adminToken')

   return token ? <Navigate to="/" replace /> : <Outlet/>
}

export default PublicRoutes