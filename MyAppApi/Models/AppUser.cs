namespace MyAppApi.Models
{
    public class AppUser
    {
        public AuthenticationInfo AuthenticationInfo { get; set; }
        public string SecurityToken { get; set; }
    }
}
