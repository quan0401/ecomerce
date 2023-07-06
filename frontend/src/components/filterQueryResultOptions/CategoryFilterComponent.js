import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function CategoryFilterComponent({
  selectedCategories,
  setSelectedCategories,
}) {
  const { categories } = useSelector((state) => state.category);

  return (
    <Form>
      <Form.Label className="fw-bold">Category</Form.Label>
      {categories &&
        categories.map((cate, index) => {
          let disabled = false;
          if (selectedCategories.length > 0) {
            disabled = true;
            const checkIfMatchTheSelectedCate = selectedCategories.find(
              (item) => item.split("/")[0] === cate.name.split("/")[0]
            );
            if (checkIfMatchTheSelectedCate) disabled = false;
          }
          return (
            <Form.Check // prettier-ignore
              disabled={disabled}
              key={index}
              type="checkbox"
              label={cate.name}
              value={cate.name}
              style={{ color: "green" }}
              onChange={(e) =>
                setSelectedCategories((prev) => {
                  if (e.target.checked)
                    return [...new Set([...prev, e.target.value])];

                  // if uncheck
                  const exist = prev.indexOf(e.target.value);
                  if (exist === -1) return [...prev];
                  prev.splice(exist, 1);
                  return [...prev];
                })
              }
            />
          );
        })}
    </Form>
  );
}

export default CategoryFilterComponent;
