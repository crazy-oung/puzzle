package service;

import java.sql.Connection;
import java.sql.SQLException;

import db.DBService;
import model.Member;
import model.MemberDao;
import model.Report;

public class MemberService {
	// 회원 탈퇴 - 회원을 삭제 하지 않고 레벨을 N으로 바꿈 .
	public void WithdrawMember(Member member) {
		System.out.println("::: WithdrawMember@MemberService 실행::: ");
	      Connection conn = null;
	      MemberDao memberDao = null;
	      try   {
	         DBService dbService = new DBService();
	         conn = dbService.getConnection();
	         memberDao = new MemberDao();
	         memberDao.withdrawMember(conn, member);
	         conn.commit();
	      } catch(Exception e) {
	         try {
	            conn.rollback();
	         } catch(SQLException e1) {
	            e1.printStackTrace();
	         }
	      } finally {
	         try {
	            conn.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }	      
	}
	// 회원정보 수정 
	public String UpdateMemberInfo(Member member, String newPw) {
		System.out.println("::: UpdateMemberInfo@MemberService 실행::: ");
		Connection conn = null;
		String result = null;
		try {
			conn = DBService.getConnection();
			MemberDao memberDao = new MemberDao();
			result = memberDao.updateMemberInfo(conn, member, newPw);
		}catch (Exception e) {
			try {
				conn.rollback();
			} catch(SQLException e1) {
				e1.printStackTrace();
			}
		}finally{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	//회원정보 조회
	public String selectMemberInfo(Member member) {
		System.out.println("::: selectMemberInfo@MemberService 실행::: ");
		Connection conn = null;
		Member returnMember = null;
		try {
			conn = DBService.getConnection();
			MemberDao memberDao = new MemberDao();
			// < before 
			returnMember = memberDao.SelectMemberInfo(conn, member);
			// after >
		}catch (Exception e) {
			try {
	            conn.rollback();
	         } catch(SQLException e1) {
	            e1.printStackTrace();
	         }
		}finally{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return returnMember.getMemberId();
	}
	
	//로그인
	public String login(Member member) {
		System.out.println("::: login@MemberService 실행::: ");
		Connection conn = null;
		Member returnMember = null;
		try {
			conn = DBService.getConnection();
			MemberDao memberDao = new MemberDao();
			// < before 
			returnMember = memberDao.login(conn, member);
			// after >
		}catch (Exception e) {
			try {
	            conn.rollback();
	         } catch(SQLException e1) {
	            e1.printStackTrace();
	         }
		}finally{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return returnMember.getMemberId();
	}
	
	//회원가입
	public void addMember(Member member) {
		System.out.println("::: addMember@MemberService 실행::: ");
	      Connection conn = null;
	      MemberDao memberDao = null;
	      try   {
	         DBService dbService = new DBService();
	         conn = dbService.getConnection();
	         memberDao = new MemberDao();
	         memberDao.addMember(conn, member);
	         conn.commit();
	      } catch(Exception e) {
	         try {
	            conn.rollback();
	         } catch(SQLException e1) {
	            e1.printStackTrace();
	         }
	      } finally {
	         try {
	            conn.close();
	         } catch(SQLException e) {
	            e.printStackTrace();
	         }
	      }
	   }
	
}
