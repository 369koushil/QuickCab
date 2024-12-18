import { createContext, useEffect } from "react";
import { data } from "react-router-dom";
import { io } from "socket.io-client";

const baseurl = "http://localhost:4000";

const socket = io(baseurl);
export const SocketContext = createContext();

const SocketProvider = (props) => {
  useEffect(() => {

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

 
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  const sendMsg = (event, msg) => {
    socket.emit(event, msg);
  };

  const receiveMsg = (event, callback) => {
    // console.log(event)
    // console.log(callback)
    socket.on(event, callback);
  };

  return (
    <SocketContext.Provider value={{ sendMsg, receiveMsg }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
