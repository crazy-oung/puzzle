package service;

import java.sql.Connection;
import java.sql.SQLException;

import db.DBService;
import model.Report;
import model.ReportDao;

public class ReportService {
   public void AddReport(Report report) {
      Connection conn = null;
      
      try {
         DBService dbService = new DBService();
         conn = dbService.getConnection();
         ReportDao reportDao = new ReportDao();
         reportDao.AddReport(conn, report);
         
         conn.commit();
      } catch(Exception e) {
         try {
            conn.rollback();
         } catch(SQLException e1) {
            e1.printStackTrace();
         }
      }finally {
         try {
            conn.close();
         }catch(SQLException e) {
            e.printStackTrace();
         }
      }
   }
}