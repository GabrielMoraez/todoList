import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getSession } from "../../state/reducers/auth/slice";

export const PrivateRoute = ({ children }) => {
  const { session } = useSelector(getSession)
  
  return ( session ? children : <Navigate to="/login" /> )
};