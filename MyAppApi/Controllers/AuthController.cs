using Microsoft.AspNetCore.Mvc;
using MyAppApi.Dto;
using MyAppApi.Models;
using System;

namespace MyAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly AppUser _appUser = new()
        {
            AuthenticationInfo = new()
            {
                Login = "JohnPetrov",
                Password = "******"
            },
            SecurityToken = "6C1A7B81-047C-4A02-959E-35B55B628F83"
        };

        [HttpPost]
        public ActionResult<string> LogIn(AuthenticationInfoDto authInfo)
        {
            string securityToken = "";

            if (authInfo.Login.Equals(_appUser.AuthenticationInfo.Login, StringComparison.OrdinalIgnoreCase) &&
                authInfo.Password.Equals(_appUser.AuthenticationInfo.Password, StringComparison.Ordinal))
            {
                securityToken = _appUser.SecurityToken;
            }

            return securityToken;
        }
    }
}
