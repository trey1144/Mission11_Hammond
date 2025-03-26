// Code for the BookList component
// imports
import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // state variables
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // sort books by title
  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === 'asc') return a.title.localeCompare(b.title);
    if (sortOrder === 'desc') return b.title.localeCompare(a.title);
    return 0;
  });

  // fetch books from the server
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  // return the list of books with pagination buttons at the bottom
  return (
    <>
      {sortedBooks.map((b) => (
        <div
          id="bookCard"
          className="card book-card mb-4 d-flex flex-column"
          key={b.bookID}
        >
          <div className="title-container">
            <h3 className="card-title text-center text-break">{b.title}</h3>
          </div>
          <div className="card-body flex-grow-1">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount} pages
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
        className="btn btn-outline-dark mx-1"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
          className="btn btn-outline-dark mx-1"
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
        className="btn btn-outline-dark mx-1"
      >
        Next
      </button>

      <br />
      <label className="me-2">
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
          className="form-select d-inline w-auto"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="btn btn-outline-dark mx-1"
      >
        Sort by Name {sortOrder === 'asc' ? '🔼' : '🔽'}
      </button>
    </>
  );
}

// export the BookList component
export default BookList;
