import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";

function PaginationComponent({
  paginationLinksNumber,
  searchQuery,
  categoryName,
  pageNum,
}) {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";

  const url = `/product-list/${category}${search}`;
  return (
    <Pagination>
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {Array.from({ length: paginationLinksNumber }).map((item, index) => (
        <LinkContainer key={index + 1} to={`${url}${index + 1}`}>
          <Pagination.Item active={index + 1 === pageNum}>
            {index + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}

      <LinkContainer
        to={`${url}${pageNum + 1}`}
        disabled={paginationLinksNumber === pageNum}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>
  );
}

export default PaginationComponent;
