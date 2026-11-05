import { Navigate , Outlet } from "react-router-dom"

const ProductRoutes = () => {
     const token = localStorage.getItem('adminToken')

     return token ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProductRoutes