import { useState } from "react";
import styles from "./signup.module.css";
import { auth, storage, db } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
import Upload from "../assets/upload.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, NavLink } from "react-router-dom";

const { welcome, signupContainer, msg } = styles;
// interface User {
//   user?: object | null;
//   error: boolean;
// }
// const checkUser = onAuthStateChanged(auth, (user) => {
//   console.log(user);
// });

const Signup = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // console.log(error);
  const signUpHandler = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(error);
          // console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "chatUsers", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={welcome}>
      <h1>Register</h1>
      <form className={signupContainer} onSubmit={signUpHandler}>
        <input type="text" className="userName" placeholder="username" />
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <input id="file" type="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={Upload} alt="" />
          <span>Add photo</span>
        </label>
        <span className={msg}>
          Have an account? <NavLink to="/">Sign in</NavLink>
        </span>
        <button type="submit">Sign up</button>
        {error && (
          <p style={{ color: "red", fontSize: "13px" }}>
            Something went wrong.
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
