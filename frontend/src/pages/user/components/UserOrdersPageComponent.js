import { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserOrdersPageComponent({ getOrdersUserApi, userInfo }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersUserApi()
      .then((res) => {
        setOrders(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Row className="mt-3">
        <Col col={12}>
          <h1>My orders</h1>
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivered</th>
                <th>Order detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order?.createdAt.slice(0, 10)}</td>
                  <td>${order.orderTotal.cartSubTotal}</td>
                  <td>
                    {order.isDelivered ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    <Link to={"/user/order-detail/" + order._id}>
                      Go to order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserOrdersPageComponent;
