import { useEffect, useState, useContext } from "react";
import styles from "./contactsSideBar.module.css";
import Search from "./Search";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { ChatContext } from "../context/ChatContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";

const {
  contactSideBar,
  contacts,
  contact,
  chatUserInfo,
  currUser,
  currUserContainer,
} = styles;

const ContactSideBar = () => {
  const [user] = useAuthState(auth);
  const [usersChats, setUsersChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  useEffect(() => {
    function getUserChats() {
      const unsub = onSnapshot(doc(db, "chatUsers", user.uid), (doc) => {
        setUsersChats(doc.data());
      });
      return () => unsub();
    }
    user?.uid && getUserChats();
  }, [user?.uid]);

  const chatsArr: object[] = Object.entries(usersChats);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    // onSnapshot(doc(db, "chats", state.chatId), (doc) => {
    //   console.log(doc.data());
    // });
  };
  const signOutHandler = async () => {
    try {
      signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={contactSideBar}>
      <div className={currUserContainer}>
        <div className={currUser}>
          <img src={user?.photoURL} alt="" />
          <p>{user?.displayName}</p>
        </div>
        <button onClick={signOutHandler}>Sign out</button>
      </div>

      <Search />
      <div className={contacts}>
        {chatsArr
          .sort((a, b) => b[1].date - a[1].date)
          .map((ch) => (
            <div
              className={contact}
              key={ch[0]}
              onClick={() => handleSelect(ch[1].userInfo)}
            >
              <img src={ch[1].userInfo.photo} alt="" />
              <div className={chatUserInfo}>
                <span>{ch[1].userInfo.name}</span>
                <p>{ch[1].last_message?.message}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactSideBar;
