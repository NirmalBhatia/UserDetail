using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace WebApplication4.Models
{
    public static class DataExtension {
        public static List<T> ConvertDataTableToList<T>( this DataTable dt ) {
            try {
                List<T> data = new List<T>( );
                foreach ( DataRow row in dt.Rows ) {
                    T item = GetItem<T>( row );
                    data.Add( item );
                }
                return data;
            }
            catch ( Exception ex ) {
                throw ex;
            }
        }

        public static T GetItem<T>( DataRow dr ) {
            try {
                Type temp = typeof( T );
                T obj = Activator.CreateInstance<T>( );
                foreach ( DataColumn column in dr.Table.Columns ) {
                    foreach ( PropertyInfo pro in temp.GetProperties( ).Where( w => w.Name.ToLower( ) == column.ColumnName.ToLower( ) ) ) {
                        if ( dr[ column.ColumnName ] != System.DBNull.Value )
                            if ( column.DataType.Name == "Byte[]" ) {
                                pro.SetValue( obj, Convert.ToBase64String( ( byte[ ] ) dr[ column.ColumnName ] ), null );
                            } else if ( pro.PropertyType.IsEnum ) {
                                pro.SetValue( obj, Enum.Parse( pro.PropertyType, dr[ column.ColumnName ].ToString( ) ), null );
                            } else {
                                pro.SetValue( obj, dr[ column.ColumnName ], null );
                            }
                        break;
                    }
                }
                return obj;
            }
            catch ( Exception ex ) {
                throw ex;
            }
        }
    }

    public class SQLConnect {
       
        #region Variables
        private string Connectionstring = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private DataSet _db;
        private SqlCommand Command;
        private SqlConnection con;
        private SqlDataAdapter DataAdapter;
        private SqlTransaction trans = null;

        delegate void DBTransactions( );
        DBTransactions begintrans, commitTrans, rollbackTrans;
        #endregion

        public SQLConnect( ) {
            this.begintrans = delegate ( ) { trans = con.BeginTransaction( ); };
            this.commitTrans = delegate ( ) { trans.Commit( ); con.Close( ); };
            this.begintrans = delegate ( ) { trans.Rollback( ); con.Close( ); };
        }

        public DataSet GetData( string proc, Dictionary<string, dynamic> parms, Dictionary<string, dynamic> outparms = null ) {
            try {
                OpenStoredPorcedure( proc );
                foreach ( var id in parms ) {
                    AddInParameter( id.Key, id.Value );
                }
                if ( outparms != null ) { 
                    foreach ( var key in outparms.Keys ) {
                        AddOutParameter( key, SqlDbType.NVarChar );
                    }
                }
                DataSet ds = ExecuteDataSet( );
                if ( outparms != null ) {
                    foreach ( var key in outparms.Keys ) {
                        outparms[ key ] = GetParameterValue( key ).ToString( );
                    }
                }
                return ds;
            }
            catch ( Exception ex ) {
                throw ex;
            }
        }
        public DataSet GetDataWithDS(string proc, Dictionary<string, dynamic> parms, Dictionary<string, dynamic> outparms = null)
        {
            try
            {
                OpenStoredPorcedure(proc);
                foreach (var id in parms)
                {
                    AddInParameter(id.Key, id.Value);
                }
                if (outparms != null)
                {
                    foreach (var key in outparms.Keys)
                    {
                        AddOutParameter(key, SqlDbType.NVarChar);
                    }
                }
                DataSet ds = ExecuteDataSet();
                if (outparms != null)
                {
                    foreach (var key in outparms.Keys.ToList())
                    {
                        outparms[key] = GetParameterValue(key).ToString();
                    }
                }
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        #region Protected Methods
        protected void OpenStoredPorcedure( string StoredProcedureName ) {
            con = new SqlConnection( Connectionstring );
            Command = new SqlCommand( );

            Command.CommandText = StoredProcedureName;
            Command.CommandType = CommandType.StoredProcedure;
            Command.CommandTimeout = 120;
            Command.Connection = con;
            con.Open( );
        }
        protected void AddInParameter( String ParameterName, object Values ) {
            Command.Parameters.AddWithValue( ParameterName, Values );
        }

        protected void AddOutParameter( String ParameterName, SqlDbType Datatype ) {
            if ( ( Datatype & SqlDbType.NVarChar ) == SqlDbType.NVarChar || ( Datatype & SqlDbType.VarChar ) == SqlDbType.NVarChar ) {
                Command.Parameters.Add( ParameterName, Datatype, 100 ).Direction = ParameterDirection.Output;
            } else if ( Datatype == SqlDbType.VarBinary ) {
                Command.Parameters.Add( ParameterName, Datatype, 8000 ).Direction = ParameterDirection.Output;
            } else {
                Command.Parameters.Add( ParameterName, Datatype ).Direction = ParameterDirection.Output;
            }
        }
        protected void AddOutParameterWithValue( String ParameterName, SqlDbType Datatype, dynamic defaultvalue ) {
            if ( ( Datatype & SqlDbType.NVarChar ) == SqlDbType.NVarChar || ( Datatype & SqlDbType.VarChar ) == SqlDbType.NVarChar ) {
                Command.Parameters.Add( ParameterName, Datatype, 100 ).Direction = ParameterDirection.InputOutput;
            } else {
                Command.Parameters.Add( ParameterName, Datatype ).Direction = ParameterDirection.InputOutput;
            }
            Command.Parameters[ ParameterName ].Value = defaultvalue;
        }

        public string GetParameterValue( string ParameterName ) {
            return Command.Parameters[ ParameterName ].Value.ToString( );
        }

        protected bool ExecuteNonQuery( ) {
            Command.ExecuteNonQuery( );
            con.Close( );
            return true;
        }

        protected DataSet ExecuteDataSet( ) {
            DataAdapter = new SqlDataAdapter( Command );
            _db = new DataSet( );
            DataAdapter.Fill( _db );
            con.Close( );
            return _db;
        }
        #endregion
    }
}