import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />
}

export default PrivateRoute