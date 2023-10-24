import styles from "./messages.module.css";
import { Message } from "./MessagesContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { ChatContext } from "../context/ChatContext";
import { useContext, useRef, useEffect } from "react";

const { left, right, msgName, msgBody, msgWrapper, msgData } = styles;
interface messageProp {
  message: Message;
}
const Messages = ({ message }: messageProp) => {
  const [user] = useAuthState(auth);
  const { state } = useContext(ChatContext);
  const ref = useRef();
  // console.log(state.user.photo);
  // console.log(message);
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div>
      {/* {user?.uid === message.sennderId && ( */}
      <div
        className={`${
          user?.uid === message?.sennderId ? right : left
        } ${msgWrapper}`}
        ref={ref}
      >
        <img
          src={
            user?.uid === message.sennderId ? user.photoURL : state.user.photo
          }
          alt="avatar"
        />
        <div className={msgData}>
          <p className={msgName}>
            {user?.uid === message.sennderId
              ? user?.displayName
              : state?.user?.name}
          </p>
          <p className={msgBody}>{message.message}</p>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Messages;
