using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace BookProject.API.Controllers
{
    // BookController class
    // here is the route for the controller
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        // private BookDbContext field
        private BookDbContext _bookContext;

        // BookController constructor
        public BookController(BookDbContext temp) => _bookContext = temp;

        // GetBooks method
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            // LINQ query to get books
            var books =  query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // count of books
            var count = query.Count();

            // anonymous object to return both books and count
            var someObject = new
            {
                Books = books,
                TotalNumBooks = count
            };

            return Ok(someObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories() 
        {
            // LINQ query to get book categories
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(categories);
        }

        // controller to add a book
        // takes a book object and adds it to the database
        [HttpPost("AddBooks")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // update books in the database
        // set the information in database to the information from the updatedBook
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);

            // changes the existing information to the updated information for each column in the table
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        // passes the bookID then deletes that book from the database
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new{message = "Book not found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}
