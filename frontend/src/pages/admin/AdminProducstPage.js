import { Table, Container, Row, Col, Button } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteProductAdmin,
  getProductsAdmin,
} from "../../service/productService";

import { toast } from "react-toastify";

import { logoutState } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

function AdminProducstPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(false);

  const handleDelete = async (productId, name) => {
    if (window.confirm("Delete " + name + " ?")) {
      const { EC, EM } = await deleteProductAdmin(productId);
      if (EC === 0) {
        toast.success(EM);
        setDeleteProduct((prev) => !prev);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getProductsAdmin(abortController)
      .then((res) => {
        if (Array.isArray(res)) setProductList(res);
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
  }, [deleteProduct]);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>Product</h1>
          <Link to="/admin/create-new-product">
            <Button className="mb-3">Add new product</Button>
          </Link>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>

            <tbody>
              {productList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <div className=" d-flex ">
                      <Button
                        as={Link}
                        to={`/admin/edit-product/${item._id}`}
                        className="mx-2"
                        size="sm"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>

                      <Button
                        onClick={() => handleDelete(item._id, item.name)}
                        variant="danger"
                        size="sm"
                      >
                        <i className="bi bi-trash2"></i>
                      </Button>
                    </div>
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

export default AdminProducstPage;
