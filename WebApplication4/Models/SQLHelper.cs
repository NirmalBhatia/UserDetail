using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Configuration;
using System.Collections;
using System.Web.Configuration;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace WebApplication4.Models
{
    [Serializable]
    public class SQLHelper
    { 
        public string DstoJSON(DataSet ds)
        {
            if (ds != null)
            {
                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                ArrayList root = new ArrayList();
                List<Dictionary<string, object>> table;
                Dictionary<string, object> data;
                //int i = 1;
                foreach (DataTable dt in ds.Tables)
                {
                    table = new List<Dictionary<string, object>>();
                    foreach (DataRow dr in dt.Rows)
                    {
                        data = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            data.Add(col.ColumnName, dr[col]);
                        }
                        table.Add(data);
                    }
                    root.Add(table);
                }
                return serializer.Serialize(root);
            }
            else
            {
                return "";
            }
        } 
    }
    

    
     
}

