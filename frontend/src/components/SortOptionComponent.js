import Form from "react-bootstrap/Form";

function SortOptionComponent({ setSortOption }) {
  return (
    <Form.Select
      onChange={(e) => setSortOption(e.target.value)}
      aria-label="Default select example"
    >
      <option>Sort by</option>
      <option value="price_1">Price: Low to high</option>
      <option value="price_-1">Price: High to Low</option>
      <option value="name_1">Name: A-Z</option>
      <option value="name_-1">Name: Z-A</option>
    </Form.Select>
  );
}

export default SortOptionComponent;
