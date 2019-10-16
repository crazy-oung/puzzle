package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import model.Member;
import service.MemberService;

@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		System.out.println("::: Login Servlet 실행 :::");
		
		System.out.println("memberId: "+request.getParameter("memberId"));
		System.out.println("memberPw: "+request.getParameter("memberPw"));
	
		
		String memberId = request.getParameter("memberId");
		String memberPw = request.getParameter("memberPw");
		// 올바르지 못한 입력값
		if(memberId == "" || memberPw == "") {
			return;
		}
				
		HttpSession session = request.getSession();
		
		Member member = new Member();
		member.setMemberId(memberId);
		member.setMemberPw(memberPw);
		
		MemberService ms = new MemberService();
		
		String retmemberId = ms.login(member);
		
		session.setAttribute("sessionInfo", retmemberId);
		Gson gson = new Gson();
		String jsonStr = gson.toJson(member);
		response.getWriter().write(jsonStr);
	}

}
