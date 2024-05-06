import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
    const { user } = useSelector((state) => state.user);
    console.log(user);
    return user ? <Outlet /> : <Navigate to="/login" />;
}