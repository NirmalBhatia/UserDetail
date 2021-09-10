using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.UI.WebControls;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        

        public JsonResult CheckCredential(Models.Login logDetail)
        {
            Dictionary<string, dynamic> outparms = new Dictionary<string, dynamic>();
            Dictionary<string, dynamic> inParams = new Dictionary<string, dynamic>();
            inParams.Add("@UserName", logDetail.email);
            inParams.Add("@Pass", logDetail.password);
            outparms.Add("@Roles", SqlDbType.VarChar);
            outparms.Add("@Userid", SqlDbType.VarChar);
            SQLConnect balSQLConnect = new SQLConnect();
            DataSet ds = balSQLConnect.GetDataWithDS("[AuthenticateUser]", inParams, outparms);
            string val = balSQLConnect.GetParameterValue("@Roles");
            string Userid = balSQLConnect.GetParameterValue("@Userid");
            if(val!= "Incorrect UserName")
            {
                TempData["Role"] = val;
                TempData["Userid"] = Userid;
                FormsAuthentication.SetAuthCookie(logDetail.email, false);
            }
            return Json(new { Res = JsonConvert.SerializeObject(ds), Data = new SQLHelper().DstoJSON(ds) }, JsonRequestBehavior.AllowGet);
        }
    }
}