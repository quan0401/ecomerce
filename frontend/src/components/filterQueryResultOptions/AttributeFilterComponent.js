import { Form } from "react-bootstrap";

function AttributeFilterComponent({ attributes, setSelectedAttributes }) {
  return (
    <Form>
      {attributes &&
        attributes.map((attribute, index) => {
          return (
            <div key={index}>
              <Form.Label
                style={{ textTransform: "capitalize" }}
                className="fw-bold"
              >
                {attribute.key}
              </Form.Label>
              {attribute &&
                attribute.value &&
                attribute.value.map((item, index1) => (
                  <Form.Check
                    value={item}
                    onChange={(e) =>
                      setSelectedAttributes((prev) => {
                        const checkExistKey = prev.findIndex(
                          (item) => item.key === attribute.key
                        );

                        if (e.target.checked) {
                          // Not found index
                          if (checkExistKey === -1) {
                            return [
                              ...prev,
                              { key: attribute.key, value: [e.target.value] },
                            ];
                          }
                          // push value to exists key
                          prev[checkExistKey].value.push(e.target.value);

                          const unique = [
                            ...new Set(prev[checkExistKey].value),
                          ];

                          prev[checkExistKey].value = unique;

                          return [...prev];
                        }
                        // Unchecked
                        // Remove the attribute
                        if (prev[checkExistKey].value.length === 1) {
                          prev.splice(checkExistKey, 1);
                        } else {
                          // remove unchecked
                          prev[checkExistKey].value = prev[
                            checkExistKey
                          ].value.filter((value) => value !== e.target.value);
                        }

                        return [...prev];
                      })
                    }
                    key={index1}
                    label={item}
                  />
                ))}
            </div>
          );
        })}
    </Form>
  );
}

export default AttributeFilterComponent;
