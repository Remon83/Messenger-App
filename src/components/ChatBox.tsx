import ContactSideBar from "./ContactSideBar";
import SendMsg from "./SendMsg";
import styles from "./chatbox.module.css";
import MessagesContainer from "./MessagesContainer";

const { chatBox, chatBlock } = styles;

const MessagesBox = () => {
  // const scroll = useRef<HTMLDivElement>(null);

  return (
    <div className={chatBox}>
      <div className={chatBlock}>
        <ContactSideBar />
        <MessagesContainer />
      </div>
      <SendMsg />
    </div>
  );
};

export default MessagesBox;
