import { useState } from "react";
import styles from "./welcome.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import GoogleSignIn from "../assets/google_signIn.png";

const { welcome, loginContainer, googleBtn, signup } = styles;
// interface User {
//   user?: object | null;
//   error: boolean;
// }
const Welcome = () => {
  // const [error] = useAuthState(auth);
  const [error, setError] = useState(false);
  // const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // const [error, setError] = useState(false);
  // console.log(error);
  // console.log(user);

  const googleSignInHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    navigate("/chatbox");
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
  };
  console.log(error);

  const signInEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chatbox");
      console.log("signed in successfully");
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={welcome}>
      <h1>
        Welcome Back <span> &#129321;</span>
      </h1>
      <div className={loginContainer}>
        <form onSubmit={signInEmailHandler}>
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          {error && (
            <p style={{ color: "red", fontSize: "13px" }}>
              Invalid Email or password, please try again.
            </p>
          )}
          <button>Sign in</button>
          <button className={googleBtn} onClick={googleSignInHandler}>
            <img src={GoogleSignIn} />
            Sign in with Google
          </button>
          <span>Don't have an account? </span>
          <span className={signup}>
            <NavLink to="/signup">Sign up</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
