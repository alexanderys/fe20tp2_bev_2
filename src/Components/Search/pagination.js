import styled from "styled-components";

const StyledPaginationNav = styled.nav`
  * {
    color: ${({ theme }) => theme.primaryColor};
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    width: 40vw;
    flex-direction: row;
  }
  a {
    background-color: ${({ theme }) => theme.secondaryBackground};
    border-radius: 3px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 10px;
  }
`;

const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledPaginationNav>
      <ul>
        {pageNumbers.map((number) => (
          <a
            key={number}
            onClick={() => {
              paginate(number);
            }}
            href="#"
          >
            <li>{number}</li>
          </a>
        ))}
      </ul>
    </StyledPaginationNav>
  );
};

export default Pagination;
