const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    // totalMovies är antalet sökresultat, som vi delar på moviesPerPage (t.ex. 10st filmer per sida)
    //.ceil = avrundar antal sidor uppåt (så att det inte blir några decimaler)
    pageNumbers.push(i);
    //vi pushar in totala antalet sidor (i) i arrayen page numbers
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => {
                paginate(number);
              }}
              href="#"
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
