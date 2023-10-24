import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
// import MessagesBox from "./components/MessagesBox";
// import Signup from "./components/Signup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <NavBar user={user} />
      {/* {user ? <MessagesBox /> : <Signup />} */}
      <Welcome />
    </div>
  );
}

export default App;
