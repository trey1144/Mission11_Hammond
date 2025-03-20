using System.ComponentModel.DataAnnotations;

namespace WaterProject.API.Data
{
    // Book class
    public class Book
    {
        // lists out the properties of the book and their requirements
        [Key]
        public int BookID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Classification { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public int PageCount { get; set; }
        [Required]
        public double Price { get; set; }

    }
}
