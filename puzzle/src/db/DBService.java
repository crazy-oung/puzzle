package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBService {
	// 디비와 연결 
	 public static Connection getConnection() throws Exception{
	       Class.forName("org.mariadb.jdbc.Driver");
	       Connection conn = DriverManager.getConnection("jdbc:mariadb://127.0.0.1:3306/puzzle","root","java1234");
	    //    Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/crazyoung","crazyoung","gksekdud5610@");
	       return conn;	
	 }
	 
	// db를 종료하는 메소드
	   public static void close(ResultSet rs, Statement stmt, Connection conn) {
	      if(rs != null) {
	         try {
	            rs.close();
	         } catch (SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      
	      if(stmt != null) {
	         try {
	            stmt.close(); 
	         } catch (SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      
	      if(conn != null) {
	         try {
	            conn.close();
	         } catch (SQLException e) {
	            e.printStackTrace();
	         }
	      }
	   }
}
