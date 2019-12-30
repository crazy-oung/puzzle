package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import db.DBService;



public class ReportDao {
	
	// 사용자의 플레이 내역 조회 
	public List selectMemberReport(Connection conn, Member member) {
		System.out.println("::: selectMemberReport@ReportDAO 실행 :::");
		List<Report> list = new ArrayList<Report>();
	      PreparedStatement stmt = null;
	      ResultSet rs = null;
	      String sql = "SELECT report_id, report_date, count, timer FROM puzzle_report "
	      				+ "WHERE member_id = ? ORDER BY report_date DESC";
	      // todo 마이리포트 페이징 *
	      try {
		      stmt = conn.prepareStatement(sql);
		      stmt.setString(1, member.getMemberId());
		      rs = stmt.executeQuery();	      
		      while(rs.next()) {
		         Report report = new Report();
		         report.setReportId(rs.getInt("report_id"));
		         report.setCount(rs.getInt("count"));
		         report.setTimer(rs.getInt("timer"));
		         report.setReportDate(rs.getString("report_date"));
		         list.add(report);
		      }
	      }catch (Exception e) {
			e.printStackTrace();
	      } finally {
	         try {
	            rs.close();
	            stmt.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      return list;
	}
	
	// 이번달 사용자 랭킹 출력 
	 public List<Report> selectMonthlyRankList(Connection conn, int limit) throws Exception{
		 System.out.println("::: selectMonthlyRankList@ReportDAO 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      PreparedStatement stmt = null;
	      ResultSet rs = null;
	      String sql = "SELECT member_id, report_date, count, timer FROM puzzle_report "
	      		+ "WHERE MONTH(report_date) = MONTH(NOW())"
	      		+ "ORDER BY timer asc LIMIT 0, ?;";
	      try {
	      stmt = conn.prepareStatement(sql);
	      stmt.setInt(1, limit);
	      rs = stmt.executeQuery();
	      
	      while(rs.next()) {
	         Report report = new Report();
	         report.setMemberId(rs.getString("member_id"));
	         report.setCount(rs.getInt("count"));
	         report.setTimer(rs.getInt("timer"));
	         report.setReportDate(rs.getString("report_date"));
	         list.add(report);
	      }
	      } finally {
	         try {
	            rs.close();
	            stmt.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      return list;
	   }
	
	 // 오늘 랭킹 출력 
	 public List<Report> selectTodayRankList(Connection conn, int limit) throws Exception{
		 System.out.println("::: selectTodayRankList@ReportDAO 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      PreparedStatement stmt = null;
	      ResultSet rs = null;
	      String sql = "SELECT member_id, report_date, count, timer FROM puzzle_report "
		      		+ "WHERE DATE(report_date) = DATE(NOW())"
		      		+ "ORDER BY timer asc LIMIT 0, ?;";
	      try {
	      stmt = conn.prepareStatement(sql);
	      stmt.setInt(1, limit);
	      rs = stmt.executeQuery();
	      
	      while(rs.next()) {
	         Report report = new Report();
	         report.setMemberId(rs.getString("member_id"));
	         report.setCount(rs.getInt("count"));
	         report.setTimer(rs.getInt("timer"));
	         report.setReportDate(rs.getString("report_date"));
	         list.add(report);
	      }
	      } finally {
	         try {
	            rs.close();
	            stmt.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      return list;
	   }
	 
	 // 주간 랭킹 출력 (기능에서 제외 . 차후 추가 예정)
	 public List<Report> selectWeeklyRankList(Connection conn, int limit) throws Exception{
		 System.out.println("::: selectWeeklyRankList@ReportDAO 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      PreparedStatement stmt = null;
	      ResultSet rs = null;
	      String sql = "SELECT member_id, report_date, count, timer FROM puzzle_report "
		      		+ "WHERE report_date BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK) AND NOW()"
		      		+ "ORDER BY timer asc LIMIT 0, ?;";
	      try {
	      stmt = conn.prepareStatement(sql);
	      stmt.setInt(1, limit);
	      rs = stmt.executeQuery();
	      
	      while(rs.next()) {
	         Report report = new Report();
	         report.setMemberId(rs.getString("member_id"));
	         report.setCount(rs.getInt("count"));
	         report.setTimer(rs.getInt("timer"));
	         report.setReportDate(rs.getString("report_date"));
	         list.add(report);
	      }
	      } finally {
	         try {
	            rs.close();
	            stmt.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      return list;
	   }
	
	 // 종합 랭킹 
	 public List<Report> selectOverallRankList(Connection conn, int limit) throws Exception{
		 System.out.println("::: selectOverallRankList@ReportDAO 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      PreparedStatement stmt = null;
	      ResultSet rs = null;
	      String sql = "SELECT member_id, report_date, count, timer FROM puzzle_report ORDER BY timer asc LIMIT 0, ?;";
	      try {
	      stmt = conn.prepareStatement(sql);
	      stmt.setInt(1, limit);
	      rs = stmt.executeQuery();
	      
	      while(rs.next()) {
	         Report report = new Report();
	         report.setMemberId(rs.getString("member_id"));
	         report.setCount(rs.getInt("count"));
	         report.setTimer(rs.getInt("timer"));
	         report.setReportDate(rs.getString("report_date"));
	         list.add(report);
	      }
	      } finally {
	         try {
	            rs.close();
	            stmt.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }
	      return list;
	   }
	 
	 //게임 결과 저장 - 게임 결과 추가 
   public void AddReport(Connection conn, Report report) throws Exception{
	   System.out.println("::: AddReport@ReportDAO 실행 :::");
         PreparedStatement stmt = null;
         String sql = "INSERT INTO puzzle_report(member_id, report_date, count, timer) VALUES (?, now(), ?, ?)";
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