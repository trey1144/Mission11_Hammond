// Code for the BookList component
// imports
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import './BookList.css';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // state variables
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // sort books by title
  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === 'asc') return a.title.localeCompare(b.title);
    if (sortOrder === 'desc') return b.title.localeCompare(a.title);
    return 0;
  });

  // fetch books from the server
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  // when the page is grabbing from the database it shows a message
  // when there is an error it also says the error
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}

      {/* pagination component */}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />

      {/* button to change the order of the items in the list */}
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
