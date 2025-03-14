import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    console.log("Token in PrivateRoute:", token); // Debugging line

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
