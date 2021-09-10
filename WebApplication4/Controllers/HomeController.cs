using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public ActionResult About(HttpPostedFileBase postedFile)
        {
            string filePath = string.Empty;
            if (postedFile != null)
            {
                string path = Server.MapPath("~/Uploads/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                filePath = path + Path.GetFileName(postedFile.FileName);
                string extension = Path.GetExtension(postedFile.FileName);
                postedFile.SaveAs(filePath);

                //Create a DataTable.
                DataTable dt = new DataTable();
                dt.Columns.AddRange(new DataColumn[9] {  new DataColumn("UserId", typeof(string)),
                                new DataColumn("FirstName", typeof(string)),
                                new DataColumn("LastName", typeof(string)),
                                new DataColumn("Email", typeof(string)),
                                new DataColumn("Phone", typeof(Int64)),
                                new DataColumn("Address", typeof(string)),
                                    new DataColumn("Status",typeof(string)),
                                new DataColumn("Role", typeof(string)),
                                new DataColumn("Password", typeof(string)),
                             });


                //Read the contents of CSV file.
                string csvData = System.IO.File.ReadAllText(filePath);

                //Execute a loop over the rows.
                foreach (string row in csvData.Split('\n'))
                {
                    if (!string.IsNullOrEmpty(row))
                    {
                        dt.Rows.Add();
                        int i = 0;

                        //Execute a loop over the columns.
                        foreach (string cell in row.Split(','))
                        {
                            dt.Rows[dt.Rows.Count - 1][i] = cell;
                            i++;
                        }
                    }
                }

                string conString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
                using (SqlConnection con = new SqlConnection(conString))
                {
                    using (SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(con))
                    {
                        //Set the database table name.
                        sqlBulkCopy.DestinationTableName = "dbo.UserDetail";

                        //[OPTIONAL]: Map the DataTable columns with that of the database table
                        sqlBulkCopy.ColumnMappings.Add("UserId", "UserId");
                        sqlBulkCopy.ColumnMappings.Add("FirstName", "FirstName");
                        sqlBulkCopy.ColumnMappings.Add("LastName", "LastName");
                        sqlBulkCopy.ColumnMappings.Add("Email", "Email");
                        sqlBulkCopy.ColumnMappings.Add("Phone", "PhoneNo");
                        sqlBulkCopy.ColumnMappings.Add("Address", "Address");
                        sqlBulkCopy.ColumnMappings.Add("Status", "Status");
                        sqlBulkCopy.ColumnMappings.Add("Role", "Role");
                        sqlBulkCopy.ColumnMappings.Add("Password", "Password");


                        con.Open();
                        sqlBulkCopy.WriteToServer(dt);
                        con.Close();
                    }
                }
            }

            Dictionary<string, dynamic> outparms = new Dictionary<string, dynamic>();
            Dictionary<string, dynamic> inParams = new Dictionary<string, dynamic>();
            string Role = "";
            string USerID = "";
            if (TempData["Role"] != null)
            {
                Role = TempData.Peek("Role").ToString();
            }
            inParams.Add("@USerRole", Role);
            SQLConnect balSQLConnect = new SQLConnect();
            List<UserDetails> list = balSQLConnect.GetData("[GetUserDetail]", inParams).Tables[0].ConvertDataTableToList<UserDetails>();
            Detaillist detaillist = new Detaillist();
            detaillist.UserDetails = list;
            return View(detaillist);
        }

        public string GenerateRandomNumber( )
        {
            string number = "";
            Random random = new Random();
             
                for (int i = 1; i <=Convert.ToInt32(1); i++)
                {
                    int n = random.Next(0, 100000);
                    number += n.ToString("D5") ;
                }
            
             return number;
        }
        public ActionResult Registration(string UId="")
        {
            Detaillist userDetails = new Detaillist();
            if (UId != "")
            {
                Dictionary<string, dynamic> outparms = new Dictionary<string, dynamic>();
                Dictionary<string, dynamic> inParams = new Dictionary<string, dynamic>();
                string Role = TempData.Peek("Role").ToString();
                inParams.Add("@UserDetailID", UId);
                SQLConnect balSQLConnect = new SQLConnect();
                List<UserDetails> list = balSQLConnect.GetData("[GetUserDetailByID]", inParams).Tables[0].ConvertDataTableToList<UserDetails>();
                Detaillist detaillist = new Detaillist();
                detaillist.UserDetails = list;
                return View(detaillist);
            }
            return View(userDetails);
        }

        [Authorize]
        public ActionResult About()
        {
            Dictionary<string, dynamic> outparms = new Dictionary<string, dynamic>();
            Dictionary<string, dynamic> inParams = new Dictionary<string, dynamic>();
            string Role = "";
            string USerID = "";
            if (TempData["Role"] != null) { 
              Role = TempData.Peek("Role").ToString();
                USerID = TempData.Peek("Userid").ToString();
            TempData["Role"] = Role;
            TempData["Userid"] = USerID;
        }
            inParams.Add("@USerRole", Role);
            inParams.Add("@USerID", USerID);
            SQLConnect balSQLConnect = new SQLConnect();
            List<UserDetails> list = balSQLConnect.GetData("[GetUserDetail]", inParams).Tables[0].ConvertDataTableToList<UserDetails>();
            Detaillist detaillist = new Detaillist();
            detaillist.UserDetails = list;
            return View(detaillist);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult SaveDetail(UserDetail userDetail)
        {
            Dictionary<string, dynamic> outparms = new Dictionary<string, dynamic>();
            Dictionary<string, dynamic> inParams = new Dictionary<string, dynamic>();
            inParams.Add("@first_name", userDetail.FName);
            inParams.Add("@last_name", userDetail.LName);
            inParams.Add("@email", userDetail.email);
            inParams.Add("@PhoneNo", userDetail.phone);
            inParams.Add("@Address", userDetail.address);
            inParams.Add("@Role", userDetail.Role);
            inParams.Add("@Password", userDetail.password);
            inParams.Add("@Status", userDetail.status==true?"Y":"N");
            SQLConnect balSQLConnect = new SQLConnect();
            DataSet ds = balSQLConnect.GetDataWithDS("SaveUserDetail", inParams);
            return Json(new { Res = JsonConvert.SerializeObject(outparms), Data = new SQLHelper().DstoJSON(ds) }, JsonRequestBehavior.DenyGet);
        }

        public JsonResult UpdateDetail(UserDetail userDetail, string Userid)
        {
            Dictionary<string, dynamic> outparms = new Dictionary<string, dynamic>();
            Dictionary<string, dynamic> inParams = new Dictionary<string, dynamic>();
            inParams.Add("@DUserid", Userid);
            inParams.Add("@email", userDetail.email);
            inParams.Add("@PhoneNo", userDetail.phone);
            inParams.Add("@Address", userDetail.address);
            inParams.Add("@Status", userDetail.status == true ? "Y" : "N");
            SQLConnect balSQLConnect = new SQLConnect();
            DataSet ds = balSQLConnect.GetDataWithDS("UpdateUserDetail", inParams);
            return Json(new { Res = JsonConvert.SerializeObject(outparms), Data = new SQLHelper().DstoJSON(ds) }, JsonRequestBehavior.DenyGet);
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult SendEmail(string bhtml, string strSub, string toEmail)
        {
            try
            {
                string result = "I0001";
                try
                {
                    System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                    if (toEmail != null)
                    {
                                mail.To.Add(toEmail);
                    }
                    mail.From = new MailAddress("Enter Email", "Enter Name");
                    mail.Subject = strSub.ToString();
                    mail.Body = bhtml.ToString();
                    mail.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = false;
                    NetworkCredential networkCredential = new NetworkCredential("Enter Email", "Enter Password");
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = networkCredential;
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                    
                }
                catch (Exception ex)
                {
                    result = "E0001";
                }
                return Json(result);
            }
            catch (Exception ex)
            {
            }
            return null;
        }
    }
}