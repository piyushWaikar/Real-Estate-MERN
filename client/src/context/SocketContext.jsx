import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
  currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);


  useEffect(()=>{
    currentUser && socket?.emit("newUser", currentUser.id);
  },[currentUser,socket]);

      // basically whatever value passed inside the value attribute we can access anywhere in the react application/at any component.To do complete setup we had rapped our main.jsx with </AuthContext.Provider> . AND here we are passing user info to check for user through out the different pages.
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};