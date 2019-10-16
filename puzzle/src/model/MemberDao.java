package model;

import java.sql.*;

public class MemberDao {
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
	
	
}
