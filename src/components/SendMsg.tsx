import { useState, useContext } from "react";
import styles from "./sendmsg.module.css";
import {
  serverTimestamp,
  arrayUnion,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../context/ChatContext";

const { sendMsgBox } = styles;
// type CurrentUser = {
//   displayName: string;
//   photoURL: string;
//   uid: string;
// };
// type Scroll = {
//   scroll: React.RefObject<HTMLDivElement>;
// };
const SendMsg = () => {
  const [message, setMessage] = useState<string>("");
  const [user] = useAuthState(auth);
  const { state } = useContext(ChatContext);
  console.log(state);
  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (message.trim() === "") {
  //     return;
  //   }
  //   const { displayName, photoURL, uid } = auth.currentUser as CurrentUser;
  //   await addDoc(collection(db, "messages"), {
  //     text: message,
  //     name: displayName,
  //     photo: photoURL,
  //     createdAt: serverTimestamp(),
  //     uid,
  //   });
  //   setMessage("");
  //   // scroll.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    await updateDoc(doc(db, "chats", state.chatId), {
      messages: arrayUnion({
        id: Math.random(),
        message,
        time: Timestamp.now(),
        sennderId: user?.uid,
      }),
    });
    await updateDoc(doc(db, "chatUsers", user.uid), {
      [state.chatId + ".last_message"]: {
        message,
      },
      [state.chatId + ".time"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "chatUsers", state.user.uid), {
      [state.chatId + ".last_message"]: {
        message,
      },
      [state.chatId + ".time"]: serverTimestamp(),
    });
    setMessage("");
    // scroll.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={sendMsgBox}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMsg;
