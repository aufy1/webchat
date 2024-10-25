using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // Dwie różne listy produktów
        private static readonly List<string> Fruits = new List<string> { "Apple", "Banana", "Orange" };
        private static readonly List<string> Vegetables = new List<string> { "Carrot", "Tomato", "Cucumber" };

        // GET: api/products/fruits or api/products/vegetables
        [HttpGet("{listName}")]
        public IActionResult GetProducts(string listName)
        {
            if (listName.ToLower() == "fruits")
            {
                return Ok(Fruits);
            }
            else if (listName.ToLower() == "vegetables")
            {
                return Ok(Vegetables);
            }
            else
            {
                return BadRequest("Invalid list name. Please use 'fruits' or 'vegetables'.");
            }
        }

        // POST: api/products/fruits or api/products/vegetables
        [HttpPost("{listName}")]
        public IActionResult AddProduct(string listName, [FromBody] string product)
        {
            if (listName.ToLower() == "fruits")
            {
                Fruits.Add(product);
                return Ok(Fruits);
            }
            else if (listName.ToLower() == "vegetables")
            {
                Vegetables.Add(product);
                return Ok(Vegetables);
            }
            else
            {
                return BadRequest("Invalid list name. Please use 'fruits' or 'vegetables'.");
            }
        }
    }
}
