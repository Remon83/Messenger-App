import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./components/RootLayout";
import "./index.css";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatContextProvider } from "../src/context/ChatContext";
import WithGuard from "./util/withGuard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "chatbox",
        element: (
          <WithGuard>
            <ChatBox />
          </WithGuard>
        ),
      },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChatContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChatContextProvider>
);
