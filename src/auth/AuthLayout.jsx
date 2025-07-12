import { useAuthContext } from "../context"
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
    const {isLoggedIn} = useAuthContext();
    

     return (!isLoggedIn)?(
        <div className="w-full h-full">
            <Outlet/>
        </div>):(<Navigate to="/"/>)
    
}

export default AuthLayout
