package service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import db.DBService;
import model.Member;
import model.MemberDao;
import model.Report;
import model.ReportDao;

public class ReportService {
	// 마이리포트
	public List selectMemberReport(Member member) {
		System.out.println("::: selectMemberReport@ReportService 실행 :::");
		 List<Report> list = new ArrayList<Report>();
	      DBService dbService = new DBService();
	      ReportDao reportDao = new ReportDao();
	      Connection conn = null;
	      try {
	         conn = dbService.getConnection();
	         list = reportDao.selectMemberReport(conn, member);
	      }   catch (Exception e){
	            try {conn.rollback();}
	            catch(SQLException e1) {}
	            e.printStackTrace();
	      }finally {
	         DBService.close(null, null, conn);
	      }
	      return list;
	}
	
	// dao로 이번달 랭킹 조회 
	public List<Report> selectMonthlyRankList(int limit){
		System.out.println("::: selectMonthlyRankList@ReportService 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      DBService dbService = new DBService();
	      ReportDao reportDao = new ReportDao();
	      Connection conn = null;
	      
	      try {
	         conn = dbService.getConnection();
	         list = reportDao.selectMonthlyRankList(conn, limit);
	      }   catch (Exception e){
	            try {conn.rollback();}
	            catch(SQLException e1) {}
	            e.printStackTrace();
	      }finally {
	         DBService.close(null, null, conn);
	      }
	      return list;
	}
	
	// dao로 오늘 랭킹 조회 
	public List<Report> SelectTodayRankList(int limit){
		System.out.println("::: SelectTodayRankList@ReportService 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      DBService dbService = new DBService();
	      ReportDao reportDao = new ReportDao();
	      Connection conn = null;
	      
	      try {
	         conn = dbService.getConnection();
	         list = reportDao.selectTodayRankList(conn, limit);
	      }   catch (Exception e){
	            try {
	            	conn.rollback();
	            }
	            catch(SQLException e1) {}
	            e.printStackTrace();
	      }finally {
	         DBService.close(null, null, conn);
	      }
	      return list;
	}
	
	// dao로 종합 랭킹 조회 
	public List<Report> selectOverallRankList(int limit){
		System.out.println("::: selectOverallRankList@ReportService 실행 :::");
	      List<Report> list = new ArrayList<Report>();
	      DBService dbService = new DBService();
	      ReportDao reportDao = new ReportDao();
	      Connection conn = null;
	      
	      try {
	         conn = dbService.getConnection();
	         list = reportDao.selectOverallRankList(conn, limit);
	      }   catch (Exception e){
	            try {conn.rollback();}
	            catch(SQLException e1) {}
	            e.printStackTrace();
	      }finally {
	         DBService.close(null, null, conn);
	      }
	      return list;
	}

	// dao를 사용해 결과 저장 
   public void addReport(Report report) {
	   System.out.println("::: addReport@ReportService 실행 :::");
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