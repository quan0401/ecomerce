import { useState } from "react";
import { Form } from "react-bootstrap";

function PriceFilterComponent({ setPrice, price }) {
  return (
    <>
      <Form.Label>
        <div>
          Below:
          {price < 0 ? (
            <>
              {/* <span className="fw-bold"> None</span> */}
              {null}
            </>
          ) : (
            <span className="fw-bold"> ${price}</span>
          )}
        </div>
      </Form.Label>
      <Form.Range
        min={1}
        step={10}
        max={10000}
        defaultValue={1}
        onChange={(e) => setPrice(e.target.value)}
      />
    </>
  );
}

export default PriceFilterComponent;
