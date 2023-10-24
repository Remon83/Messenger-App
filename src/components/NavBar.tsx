import styles from "./navbar.module.css";
// import { Outlet } from "react-router-dom";
// import GoogleSignIn from "../assets/google_signIn.png";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
const { navbar } = styles;

const NavBar = () => {
  // const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
  } else {
    console.log("Not logged in");
  }
  const signOutHandler = async () => {
    try {
      signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={navbar}>
        <h1>Messenger App</h1>
        <button onClick={signOutHandler}>Sign out</button>
      </div>
    </>
  );
};

export default NavBar;
