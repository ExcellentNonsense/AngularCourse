using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsThemesController : Controller
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetNewsThemes()
        {
            return new[] { "Политика", "Туризм", "Экономика", "Наука", "Интернет" };
        }
    }
}
