package service;

import java.sql.Connection;
import java.sql.SQLException;

import db.DBService;
import model.Member;
import model.MemberDao;

public class MemberService {
	public String login(Member member) {
		Connection conn = null;
		Member returnMember = null;
		try {
			conn = DBService.getConnection();
			MemberDao memberDao = new MemberDao();
			// < before 
			returnMember = memberDao.login(conn, member);
			// after >
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return returnMember.getMemberId();
	}

}
