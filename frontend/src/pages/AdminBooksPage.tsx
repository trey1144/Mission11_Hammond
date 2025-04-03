// imports
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // grabs the books from the database
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, pageNum, []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum]);

  // sort books by title
  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === 'asc') return a.title.localeCompare(b.title);
    if (sortOrder === 'desc') return b.title.localeCompare(a.title);
    return 0;
  });

  // handle deleting a book
  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookID);
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch (error) {
      alert('Failed to delete book. Please try again.');
    }
  };

  // gives notification based on the status
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div>
        <h1>Admin - Books</h1>

        {/* button to add a book and then shows the form when the button is pressed */}
        {!showForm && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowForm(true)}
          >
            Add Book
          </button>
        )}

        {showForm && (
          <NewBookForm
            onSuccess={() => {
              setShowForm(false);
              fetchBooks(pageSize, pageNum, []).then((data) =>
                setBooks(data.books)
              );
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* shows the edit book form when the edit button is pressed */}
        {editingBook && (
          <EditBookForm
            book={editingBook}
            onSuccess={() => {
              setEditingBook(null);
              fetchBooks(pageSize, pageNum, []).then((data) =>
                setBooks(data.books)
              );
            }}
            onCancel={() => setEditingBook(null)}
          />
        )}

        {/* table with the data */}
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((b) => (
              <tr key={b.bookID}>
                <td>{b.bookID}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>${b.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm w=100 mb-1"
                    onClick={() => setEditingBook(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w=100"
                    onClick={() => {
                      handleDelete(b.bookID);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        {/* button to sort the order */}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="btn btn-outline-dark mx-1"
        >
          Sort by Name {sortOrder === 'asc' ? '🔼' : '🔽'}
        </button>
      </div>
    </>
  );
};

export default AdminBooksPage;
