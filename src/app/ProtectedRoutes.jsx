import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//const navigate = useNavigate();

export const ProtectedRoute = ({user, islogin=false, children, redirectTo="/login"}) =>{
    if(!user){
        return <Navigate to={redirectTo}/>;
    }
    else if(user===true && islogin===true){
        return  <Navigate to={redirectTo}/>;
    }else
    {
    return children ? children : <Outlet/>
    }
}

export default ProtectedRoute