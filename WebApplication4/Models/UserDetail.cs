using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication4.Models
{
    public class UserDetail
    {
        public string FName { get; set; }
        public string LName { get; set; }
        public int phone { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string password { get; set; }
        public string Role { get; set; }
        public bool status { get; set; }
    }

    public class UserDetails
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PhoneNo { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }
    }

    public class Detaillist
    {
        public List<UserDetails> UserDetails { get; set; }
    }
    public class Login
    {
        public string email { get; set; }
        public string password { get; set; }
    }

}