import { Container, Row, Col } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import { useDispatch, useSelector } from "react-redux";
import { setNewNofi } from "../../redux/actions/chatActions";

function AdminChatsPage() {
  const { chatRooms, socket } = useSelector((state) => state.adminChat);
  const dispatch = useDispatch();

  return (
    <Container>
      <Row className="mt-3">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Row>
            {Object.entries(chatRooms).map((chatRoom, index) => (
              <Col key={index} md={6}>
                <AdminChatRoomComponent
                  socket={socket}
                  roomIndex={index}
                  chatRoom={chatRoom}
                  reduxDispatch={dispatch}
                  setNewNofi={setNewNofi}
                  socketUser={chatRoom[0]}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminChatsPage;
