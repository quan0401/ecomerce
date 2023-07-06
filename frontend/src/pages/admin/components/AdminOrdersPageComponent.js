import { Table, Container, Row, Col } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getOrdersAdmin } from "../../../service/orderService";

import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { logoutState } from "../../../redux/actions/userActions";

import { useDispatch } from "react-redux";

function AdminOrdersPageComponent() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const getDate = (setDate) => {
    const date = new Date(setDate);

    return date.toLocaleDateString();
  };

  useEffect(() => {
    const abortController = new AbortController();

    getOrdersAdmin(abortController)
      .then((res) => {
        if (Array.isArray(res)) setOrders(res);
      })
      .catch((error) => {
        toast.error(error);

        dispatch(
          logoutState(function () {
            navigate("/login");
          })
        );
      });

    return () => abortController.abort();
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>

        <Col md={10}>
          <h1>Orders</h1>

          <Table bordered striped hover>
            <thead>
              <tr>
                <th>#</th>

                <th>User</th>

                <th>Date</th>

                <th>Total</th>

                <th>Subtotal</th>

                <th>Delivered</th>

                <th>Order detail</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    {order?.user?.firstName} {order?.user?.lastName}
                  </td>

                  <td>{getDate(order.createdAt)}</td>

                  <td>{order?.orderTotal?.itemsCount}</td>

                  <td>{order?.orderTotal?.cartSubTotal} $</td>

                  <td>
                    {order?.isDelivered === true ? (
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

export default AdminOrdersPageComponent;
