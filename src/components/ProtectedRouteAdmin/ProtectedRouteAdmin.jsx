import { Navigate } from "react-router-dom";

const ProtectedRouteForAdmin = ({children}) => {
    
    const user = JSON.parse(localStorage.getItem('admins'));

    if(user?.role==='admin'  ){
        return children;
    }

    else{
        return <Navigate to='/login' />
    }
}

export default ProtectedRouteForAdmin;