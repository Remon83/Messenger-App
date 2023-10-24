import { useState } from "react";
import styles from "./search.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
const { search, searchResult } = styles;
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const [userResult, setUserResult] = useState(null);
  const [err, SetErr] = useState(false);
  const [user] = useAuthState(auth);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userInput)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserResult(doc.data());
      });
    } catch (error) {
      // console.log(error);
      SetErr(true);
    }
  };

  const keyHandler = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      user?.uid > userResult.uid
        ? user.uid + userResult.uid
        : userResult.uid + user?.uid;
    try {
      const docRef = doc(db, "chats", combinedId);
      const res = await getDoc(docRef);

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      await updateDoc(doc(db, "chatUsers", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: userResult.uid,
          photo: userResult.photoURL,
          name: userResult.displayName,
        },

        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "chatUsers", userResult.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          photo: user.photoURL,
          name: user.displayName,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      // SetErr(true);
    }

    setUserResult(null);
    setUserInput("");
    SetErr(false);
  };
  return (
    <div className={search}>
      <input
        type="text"
        value={userInput}
        onKeyDown={keyHandler}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Search a user..."
      />
      {err && <span>User not found</span>}
      {userResult && (
        <div className={searchResult} onClick={handleSelect}>
          <img src={userResult.photoURL} alt="" />
          <div>
            <span>{userResult.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
