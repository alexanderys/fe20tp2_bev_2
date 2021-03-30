// @ todo byt namn på props
const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  const pageNumbers = [];

  // antal sidor funkar
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  // onClick funkar INTE!
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => {
                console.log(number);
                console.log(paginate(number));
                paginate(number);
              }}
              href=""
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
