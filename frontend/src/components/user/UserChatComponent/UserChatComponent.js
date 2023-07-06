import { useEffect, useRef, useState } from "react";
import "./UserChatComponent.css";
import { Button, Form } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

function UserChatComponent() {
  const [hideChat, setHideChat] = useState(true);
  const [socket, setSocket] = useState();
  const [chat, setChat] = useState([{ admin: "Hello" }]);
  const [chatText, setChatText] = useState("");
  const [showDot, setShowDot] = useState(0);
  const [newChatConnection, setNewChatConnection] = useState(false);

  const { isAdmin } = useSelector((state) => state.userRegisterLogin.userInfo);

  const chatContainerRef = useRef(null);

  const chatBoxRef = useRef();

  useEffect(() => {
    const socket = socketIOClient.connect();
    setSocket(socket);
    socket.on("server sends message from admin to client", ({ message }) => {
      setShowDot((prev) => prev + 1);
      setChat((prev) => [...prev, { admin: message }]);
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
    });
    socket.on("no admins", () => {
      setShowDot((prev) => prev + 1);
      setChat((prev) => [...prev, { admin: "No admin at the moment" }]);
    });
    socket.on("admin deleted chat", (message) => {
      setChat((prev) => [...prev, { admin: message }]);
      setNewChatConnection(true);
    });
    return () => socket.disconnect();
  }, [newChatConnection]);

  const handleSubmit = (e) => {
    if (!isAdmin) {
      if (e.keyCode && e.keyCode !== 13) return;
      const chatMessage = chatText.trim();

      if (
        chatMessage === null ||
        chatMessage.trim() === "" ||
        chatMessage === false ||
        !chatMessage
      )
        return;

      setChat((prev) => [...prev, { client: chatMessage }]);
      setShowDot(0);
      setChatText("");
      chatBoxRef.current.focus();
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;

      socket.emit("client sends message", chatMessage);
    }
  };

  return (
    <>
      {!hideChat && (
        <div className="form-popup" id="myForm">
          <div className="form-container">
            <h2>Chat</h2>
            <div ref={chatContainerRef} className="chat-container">
              {chat.map((item, index) => {
                const [key] = Object.keys(item);
                if (key === "client")
                  return (
                    <div key={index} className="chat-msg-container client">
                      <div className="chat-msg">{item[key]}</div>
                    </div>
                  );
                else
                  return (
                    <div key={index} className="chat-msg-container">
                      <div className="chat-msg">{item[key]}</div>
                    </div>
                  );
              })}
            </div>

            <Form>
              <Form.Group className="mb-1 mt-3">
                {/* <Form.Label></Form.Label> */}
                <Form.Control
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  onKeyUp={(e) => handleSubmit(e)}
                  placeholder="Message"
                  as="textarea"
                  rows={2}
                  ref={chatBoxRef}
                ></Form.Control>
              </Form.Group>
            </Form>

            <div className="text-end">
              <Button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  marginTop: -85,
                  marginRight: 4,
                }}
                className="btn"
              >
                <i style={{ color: "#ADD8E6" }} className="bi bi-send-fill"></i>
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isAdmin && (
        <div className="chat-circle" onClick={() => setHideChat(!hideChat)}>
          {showDot !== 0 && (
            <i className="bi bi-circle-fill dot-nofitication"></i>
          )}
          {hideChat ? (
            <i className="bi bi-chat-heart-fill"></i>
          ) : (
            <>
              <i className="bi bi-x-circle"></i>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default UserChatComponent;
