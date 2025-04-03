// import the Book object
import { Book } from '../types/Book';

// tells what we are getting out of FetchBooksResponse
interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

// variable containing the first part of our api url
const API_URL =
  'https://mission13-hammond-backend-gffrduhahwfke4gf.eastus-01.azurewebsites.net/Book';

// function to get all the books
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// function to add a book to the database
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    // posts data to the database
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

// function to update a book in the database
export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    // put data or edit data in the database based on bookID
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// function to delete a book from the database
export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    // delete method to delete from the database
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete book');
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
