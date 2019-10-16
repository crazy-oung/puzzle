package db;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBService {
	 public static Connection getConnection() throws Exception{
	       Class.forName("org.mariadb.jdbc.Driver");
	       Connection conn = DriverManager.getConnection("jdbc:mariadb://127.0.0.1:3306/puzzle","root","java1234");
	       return conn;	
	 }
}
