import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchSession, getSession } from "../../state/reducers/auth/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const session = useSelector(getSession)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSession());
    }
    fetchData()
  }, [])
  
  return ( session ? children : <Navigate to="/login" /> )
};