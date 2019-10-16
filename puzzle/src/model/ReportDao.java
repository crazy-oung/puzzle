package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;



public class ReportDao {
   
   public void AddReport(Connection conn, Report report) throws Exception{
         PreparedStatement stmt = null;
         String sql = "INSERT INTO report(member_id, report_date, count, timer) VALUES (?, now(), ?, ?)";
         try {
         stmt = conn.prepareStatement(sql);
         stmt.setString(1, report.getMemberId());
         stmt.setInt(2, report.getCount());
         stmt.setInt(3, report.getTimer());
         stmt.executeUpdate();
         } finally {
            try {
               stmt.close();
            } catch(SQLException e) {
               e.printStackTrace();
            }
         }
         
   }
}