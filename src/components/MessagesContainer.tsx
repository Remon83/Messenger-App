import { useContext, useEffect, useState } from "react";
import styles from "./messagesContainer.module.css";
import Messages from "./Messages";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { ChatContext } from "../context/ChatContext";

const { messagesContainer, peerInfo } = styles;

export interface Message {
  id: string;
  text: string;
  photo?: string;
  name?: string;
  createdAt: Date;
  uid: string;
}

const MessagesContainer = () => {
  const { state } = useContext(ChatContext);
  // console.log(state);
  const [messages, setMessages] = useState<Message[]>();
  // const { user } = useContext(ChatContext);
  // useEffect(() => {
  //   const q = query(
  //     collection(db, "messages"),
  //     orderBy("createdAt"),
  //     limit(30)
  //   );

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const msgList: Message[] = [];
  //     querySnapshot.forEach((snapshot) => {
  //       msgList.push({ ...snapshot.data(), id: snapshot.id } as Message);
  //     });
  //     setMessages(msgList);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unsub();
  }, [state.chatId]);
  console.log(messages);
  return (
    <div className={messagesContainer}>
      <p className={state.user.name && peerInfo}>{state.user.name}</p>
      {messages?.map((message) => (
        <Messages key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesContainer;
