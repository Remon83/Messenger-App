import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useNavigate, Navigate } from "react-router-dom";
const WithGuard = ({ children }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default WithGuard;
