package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.Member;
import service.MemberService;

@WebServlet("/UpdateMemberInfo")
public class UpdateMemberInfo extends HttpServlet {

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	  System.out.println("::: UpdateMemberInfo SERVLET 실행 :::");
	  response.setContentType("application/json;charset=utf-8");
	  MemberService memberService = new MemberService();
	  Member member = new Member();
	  
	  String memberId = request.getParameter("memberId");
	  System.out.println("UpdateMemberInfo Servlet memberId : "+ memberId);
	  String memberPw = request.getParameter("memberPw");
	  System.out.println("UpdateMemberInfo Servlet memberPw : "+ memberPw);
	  String newPw = request.getParameter("newMemberPw");
	  System.out.println("UpdateMemberInfo Servlet newMemberPw : "+ newPw);
	  
	  member.setMemberId(memberId);
	  member.setMemberPw(memberPw);
	  String result = memberService.UpdateMemberInfo(member, newPw);
	  
	  Gson gson = new Gson();
	  String json = gson.toJson(result);
	  response.getWriter().write(json);
	}

}
