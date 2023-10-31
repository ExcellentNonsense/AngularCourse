using Microsoft.AspNetCore.Mvc;
using MyAppApi.Dto;

namespace MyAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : Controller
    {
        private static UserProfileDto _userProfile;

        [HttpGet]
        public ActionResult<UserProfileDto> GetUserProfile()
        {
            return _userProfile;
        }

        [HttpPut]
        public IActionResult UpdateUserProfile(UserProfileDto userProfileDto)
        {
            _userProfile = userProfileDto;

            return NoContent();
        }
    }
}
