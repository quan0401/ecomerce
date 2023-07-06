import { useState } from "react";

import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Table,
  Image,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function AdminEditProductPageComponent({
  categories,
  product,
  updateProductApi,
  reduxDispatch,
  createNewAttrForCate,
  deleteProductImageHandler,
  uploadImageApi,
  setReloadProduct,
  deleteCategoryAction,
}) {
  const [validated, setValidated] = useState(false);

  let { attributes: productAttributes, category: productCategory } = product;

  const [productAttributesTable, setProductAttributesTable] = useState([
    ...product.attributes,
  ]);

  // Attribute and value
  const [previousSelectedCategory, setPreviousSelectedCategory] =
    useState(productCategory);

  const [selectedCategory, setSelectedCategory] = useState(productCategory);

  const hightLevelCategoryOfEditedProduct = categories.filter((cate) => {
    return cate.name.split("/")[0] === selectedCategory.split("/")[0];
  });

  let attributesOfEditedProduct = hightLevelCategoryOfEditedProduct.reduce(
    (acc, currentValue) => {
      const currentList = [...acc, ...currentValue.attributes];

      return currentList;
    },
    []
  );

  // check if the category changed so that the selectedAttributeKey change too
  const [selectedAttributeKey, setSelectedAttributeKey] = useState(
    attributesOfEditedProduct[0]?.key
  );

  // check changed to and set new key and value
  if (previousSelectedCategory !== selectedCategory) {
    setSelectedAttributeKey(attributesOfEditedProduct[0]?.key);

    setPreviousSelectedCategory(selectedCategory);
  }

  let attributesValues = [];

  if (selectedAttributeKey) {
    attributesOfEditedProduct.forEach((item) => {
      if (item.key === selectedAttributeKey) {
        attributesValues = [...attributesValues, ...item.value];
      }
    });
  }

  const addAttributeToTable = (value, key = "") => {
    if (value === "choose_attribute_value") return;
    const actualKey = key || selectedAttributeKey;

    setProductAttributesTable((prev) => {
      const existedAttr = (productAttributes = productAttributesTable.find(
        (attr) => {
          // if exist change the value
          if (actualKey === attr.key) {
            attr.value = value;

            return true;
          }
          return false;
        }
      ));

      if (!existedAttr) return [...prev, { key: actualKey, value }];

      return [...prev];
    });
  };

  const removeAttrFromTable = (key) => {
    setProductAttributesTable((prev) =>
      prev.filter((item) => item.key !== key)
    );
  };

  // Create new attribute

  const [newAttributeKey, setNewAttributeKey] = useState("");

  const [newAttributeValue, setNewAttributeValue] = useState("");

  const createNewAttributeHandler = () => {
    if (newAttributeKey.trim() !== "" && newAttributeValue.trim() !== "") {
      addAttributeToTable(newAttributeValue, newAttributeKey);

      reduxDispatch(
        createNewAttrForCate(
          newAttributeKey,
          newAttributeValue,
          selectedCategory
        )
      );
    }
  };

  const [productUpdateStatus, setProductUpdateStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      name: { value: nameValue },
      description: { value: descriptionValue },
      count: { value: countValue },
      price: { value: priceValue },
      category: { value: categoryValue },
    } = e.currentTarget.elements;

    if (e.currentTarget.checkValidity()) {
      updateProductApi(product._id, {
        name: nameValue,
        description: descriptionValue,
        count: countValue,
        price: priceValue,
        category: categoryValue,
        attributesTable: productAttributesTable,
      })
        .then((res) => {
          toast.success(res.EM);
          setProductUpdateStatus(true);
        })
        .catch((err) => {
          console.log(err);
          setProductUpdateStatus(false);
        });
    }
  };
  const [imageUploadMessage, setImageUploadMessage] = useState("");

  const handleImageUpload = async (e) => {
    setImageUploadMessage("Uploading...");
    const files = e.target.files;
    if (files.length > 0) {
      await uploadImageApi(files, product._id);
      setReloadProduct((prev) => !prev);
      setImageUploadMessage("");
    }
  };

  const handleDeleteCategory = async (e) => {
    if (window.confirm(`Delete '${selectedCategory}' category`)) {
      await reduxDispatch(deleteCategoryAction(selectedCategory));
      setSelectedCategory(categories[0].name);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <h1>Edit product</h1>

          <Button
            as={Link}
            to="/admin/products"
            variant="info"
            className="my-2"
          >
            Go back
          </Button>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Name</Form.Label>

              <Form.Control
                defaultValue={product.name}
                name="name"
                required
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Description</Form.Label>

              <Form.Control
                defaultValue={product.description}
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Count in stock</Form.Label>

              <Form.Control
                defaultValue={product.count}
                name="count"
                required
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Price $</Form.Label>

              <Form.Control
                defaultValue={product.price}
                name="price"
                required
                type="text"
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label className="text-secondary">
                Choose category
              </Form.Label>

              <Form.Select
                required
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="category"
                value={selectedCategory}
              >
                {categories.map((cate, index) => {
                  return (
                    <option key={index} value={cate.name}>
                      {cate.name}
                    </option>
                  );
                })}
              </Form.Select>
              <div className="mt-3 text-end">
                <Button
                  onClick={handleDeleteCategory}
                  size="sm"
                  variant="danger"
                >
                  Delete selected category
                </Button>{" "}
              </div>
            </Form.Group>

            <Row>
              <Col className="mb-3" md={6}>
                <Form.Label className="text-secondary">
                  Choose attribute
                </Form.Label>

                <Form.Select
                  defaultValue={attributesOfEditedProduct[0]}
                  onChange={(e) => setSelectedAttributeKey(e.target.value)}
                >
                  {attributesOfEditedProduct.map((item, index) => (
                    <option key={index} value={item.key}>
                      {item.key}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Label className="text-secondary">
                  Attribute value
                </Form.Label>

                <Form.Select
                  onChange={(e) => addAttributeToTable(e.target.value)}
                  defaultValue={"choose_attribute_value"}
                >
                  <option value="choose_attribute_value">
                    Choose attribute value
                  </option>
                  {attributesValues.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {productAttributesTable.length > 0 && (
              <Table striped>
                <thead>
                  <tr>
                    <th>Attribute</th>

                    <th>Value</th>

                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {productAttributesTable.map((item, index) => (
                    <tr key={index}>
                      <td>{item.key}</td>

                      <td>{item.value}</td>

                      <td>
                        <Button
                          size="sm"
                          variant="light"
                          style={{
                            backgroundColor: "rgb(244,244,244)",
                          }}
                          onClick={() => removeAttrFromTable(item.key)}
                        >
                          <i className="bi bi-trash-fill text-danger"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-secondary">
                    New attribute name
                  </Form.Label>

                  <Form.Control
                    onChange={(e) => setNewAttributeKey(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-secondary">
                    Attribute value
                  </Form.Label>

                  <Form.Control
                    onChange={(e) => setNewAttributeValue(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row style={{ marginBottom: -30 }}>
              <div className="mt-3 text-end">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={createNewAttributeHandler}
                >
                  Add new attribute
                </Button>
              </div>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Images</Form.Label>

              <Row>
                {product.images.map((img, index) => (
                  <Col key={index} style={{ position: "relative" }} md={3}>
                    <Image crossOrigin="anonymous" fluid src={img.url} />
                    <Button
                      onClick={() => {
                        deleteProductImageHandler(img.url, product._id);
                      }}
                      variant="light"
                      style={{
                        position: "absolute",
                        top: -18,
                        left: -5,
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      <i className="bi bi-x-circle-fill text-danger"></i>
                    </Button>
                  </Col>
                ))}
              </Row>

              <Form.Control multiple onChange={handleImageUpload} type="file" />
            </Form.Group>
            {imageUploadMessage && <div>{imageUploadMessage}</div>}

            <div className="d-grid d-md-block mb-3">
              <Button type="submit">Save changes</Button>{" "}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditProductPageComponent;
