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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            // LINQ query to get books
            var books =  _bookContext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // count of books
            var count = _bookContext.Books.Count();

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
    }
}
