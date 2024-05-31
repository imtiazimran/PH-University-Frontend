import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const PrivetRoute = ({children}: {children: React.ReactNode}) => {
    const token = useAppSelector(useCurrentToken)

    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children
};

export default PrivetRoute;
