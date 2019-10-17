package model;

import java.sql.*;

public class MemberDao {
	
	public void withdrawMember(Connection conn, Member member)throws Exception {
	      PreparedStatement stmt = null;
	      String sql = "UPDATE member SET member_level = 'N' WHERE member_id = ? AND member_pw = ?;";
	      try {
	         stmt = conn.prepareStatement(sql);
	         stmt.setString(1, member.getMemberId());
	         stmt.setString(2, member.getMemberPw());
	         stmt.executeUpdate();
	         } finally {
	            try {
	               stmt.close();
	            } catch(SQLException e) {
	               e.printStackTrace();
	            }
	         }
	   }
	
	public String updateMemberInfo(Connection conn, Member member, String newPw) {
		PreparedStatement stmt = null;
		ResultSet rs = null;
		String sql = null;
		String pw = null;
		try {
			sql = "SELECT member_pw FROM member WHERE member_id =?";
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, member.getMemberId());
			rs = stmt.executeQuery();
			rs.next();
			pw = rs.getString("member_pw");
			System.out.println("pw: "+pw + ", 입력받은pw: "+ member.getMemberPw());	
			
			// 기존 비밀번호가 틀렸을 때 
			if(!pw.equals(member.getMemberPw())) {				
				return "비밀번호가 틀렸습니다. 기존 비밀번호를 정확히 입력해주세요!";
			}		
			if(pw.equals(newPw)) {				
				return "수정을 요청하신 비밀번호가 기존 비밀번호와 동일 합니다.";
			}	
			
			sql = "UPDATE member SET member_pw=? WHERE member_id =?";	
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, newPw);
			stmt.setString(2, member.getMemberId());
			stmt.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				stmt.close();
				conn.close();
				rs.close();
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "정보 수정 완료 ! :)";
	}
	
	public Member SelectMemberInfo(Connection conn, Member member) {
		Member mem = new Member();
		// 비밀번호는 함부로 추출하지 않음.
		String sql = "SELECT member_id FROM member WHERE member_id =?";
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, member.getMemberId());
			rs = stmt.executeQuery();
			rs.next();
			mem.setMemberId(rs.getString("member_Id"));
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				stmt.close();
				conn.close();
				rs.close();
			}catch (Exception e) {
				e.printStackTrace();
			}
		}		
		return mem;
	}
	
	public Member login(Connection conn, Member member) {
		Member mem = new Member();
		String sql = "SELECT member_id FROM member WHERE member_id =? AND member_pw=? AND level = 'Y'";
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, member.getMemberId());
			stmt.setString(2, member.getMemberPw());
			rs = stmt.executeQuery();
			rs.next();
			mem.setMemberId(rs.getString("member_Id"));
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				stmt.close();
				conn.close();
				rs.close();
			}catch (Exception e) {
				e.printStackTrace();
			}
		}		
		return mem;
	}
	
	public void addMember(Connection conn, Member member)throws Exception {
		System.out.println("::: addMember 실행:::");
		System.out.println(member.toString());
	      PreparedStatement stmt = null;
	      String sql = "INSERT INTO member(member_id, member_pw, level) VALUES (?, ?, 'Y')";
	      try {
	         stmt = conn.prepareStatement(sql);
	         stmt.setString(1, member.getMemberId());
	         stmt.setString(2, member.getMemberPw());
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
