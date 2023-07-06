import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { Fragment, useState, useRef, useEffect } from "react";
import { Button, Toast, Form } from "react-bootstrap";

function AdminChatRoomComponent({
  chatRoom,
  socket,
  roomIndex,
  reduxDispatch,
  setNewNofi,
  socketUser,
}) {
  const [showA, setShowA] = useState(true);
  const [rerender, setRerender] = useState(false);
  const [textMsg, setTextMsg] = useState("");
  const [showScrollToNewMessage, setShowScrollToNewMessage] = useState(false);
  const messageContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const toggleShowA = () => setShowA(!showA);
  const scrollToNewestMessage = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const adminSendMessage = (e) => {
    e.preventDefault();
    const chatMsg = textMsg.trim();
    if (e.keyCode && e.keyCode !== 13) return;
    else if (chatMsg === "") return;
    reduxDispatch(setNewNofi(false));
    chatRoom[1].push({ admin: chatMsg });
    socket.emit("admin sends message", { message: chatMsg, user: socketUser });
    setTextMsg("");
    setRerender(!rerender);
    messageContainerRef.current.focus();
  };

  const deleteConversation = () => {
    socket.emit("admin deleted conversation", "");
  };

  const scrollFunc = (e) => {
    if (e.target.scrollTop < 0.3 * e.target.scrollHeight)
      setShowScrollToNewMessage(true);
    else setShowScrollToNewMessage(false);
  };

  useEffect(() => {
    scrollToNewestMessage();
  }, [chatRoom[1].length]);

  return (
    <div className="d-flex">
      <div className="mb-4 me-3">
        {!showA && (
          <>
            <div className="d-flex align-items-center mb-2">
              <Button className="me-1" onClick={toggleShowA}>
                Chat with {chatRoom[0]}
              </Button>
              <Button onClick={deleteConversation} variant="danger">
                <i className="bi bi-x-circle-fill "></i>
              </Button>
            </div>
          </>
        )}

        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">{chatRoom[0]}</strong>
            <small>11 mins ago</small>
          </Toast.Header>

          <Toast.Body
            ref={scrollContainerRef}
            style={{
              height: 300,
              overflow: "auto",
              scrollBehavior: "smooth",
            }}
            onScroll={(e) => scrollFunc(e)}
          >
            <div>
              {chatRoom[1].map((chats, index) => {
                return (
                  <Fragment key={index}>
                    {chats.client ? (
                      <div
                        style={{
                          fontSize: 16,
                        }}
                        className="mb-2 rounded-pill text-end"
                      >
                        <span className="bg-success rounded-pill px-3 py-1 text-white">
                          <b>{chatRoom[0]}: </b>
                          {chats.client}
                        </span>
                      </div>
                    ) : (
                      <div className="mb-2 rounded-pill text-start">
                        <span
                          style={{
                            backgroundColor: "lightblue",
                            fontSize: 16,
                          }}
                          className="rounded-pill px-3 py-1 text-white"
                        >
                          <b>Admin: </b>
                          {chats.admin}
                        </span>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </Toast.Body>
          <Form className="p-3 position-relative pt-1">
            {showScrollToNewMessage && (
              <div
                style={{
                  position: "absolute",
                  top: "-30%",
                  right: "50%",
                  backgroundColor: "lightblue",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  alignItems: center,
                }}
                onClick={() => scrollToNewestMessage()}
                className="text-align-center  text-center"
              >
                <i className="bi h5 bi-arrow-down"></i>
              </div>
            )}
            <Form.Group>
              <Form.Control
                value={textMsg}
                className="p-2 mb-2"
                as="textarea"
                rows={1}
                type="text"
                placeholder="Write a message"
                id={"chatRoom_" + roomIndex}
                onKeyUp={(e) => adminSendMessage(e)}
                onChange={(e) => setTextMsg(e.target.value)}
                ref={messageContainerRef}
              />
            </Form.Group>
            <Button
              onClick={(e) => adminSendMessage(e)}
              variant="success"
              className="text-white"
              type="submit"
            >
              Send
            </Button>
          </Form>
        </Toast>
      </div>

      {/* <div className="mb-4">
        <Button onClick={toggleShowB} className="mb-2">
          Show chat with John Doe
        </Button>

        <Toast show={showB} onClose={toggleShowB}>
          <Toast.Header>
            <strong className="me-auto">Chat with John Doe</strong>
            <small>11 mins ago</small>
          </Toast.Header>

          <Toast.Body style={{ maxHeight: 300, overflowY: "auto" }}>
            <div>
              {Array.from({ length: 30 }).map((item, index) => (
                <Fragment key={index}>
                  <p className="bg-primary rounded-pill px-3 py-1 text-white ms-5">
                    <b>Admin: </b>Woohoo, you're reading this text in a Toast!
                  </p>
                  <p className="me-5 bg-success rounded-pill px-3 py-1 text-white">
                    <b>Admin: </b>Woohoo, you're reading this text in a Toast!
                  </p>

                  <p className="bg-primary rounded-pill px-3 py-1 text-white ms-5">
                    <b>Admin: </b>Woohoo, you're reading this text in a Toast!
                  </p>
                  <p className="me-5 bg-success rounded-pill px-3 py-1 text-white">
                    <b>Admin: </b>Woohoo, you're reading this text in a Toast!
                  </p>
                </Fragment>
              ))}
            </div>
          </Toast.Body>
          <Form className="p-3">
            <Form.Group>
              <Form.Control
                className="p-2 mb-2"
                as="textarea"
                rows={1}
                type="text"
                placeholder="Write a message"
              />
            </Form.Group>
            <Button variant="success" className="text-white">
              Send
            </Button>
          </Form>
        </Toast>
      </div> */}
    </div>
  );
}

export default AdminChatRoomComponent;
