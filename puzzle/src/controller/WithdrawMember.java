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

@WebServlet("/WithdrawMember")
public class WithdrawMember extends HttpServlet {
   private static final long serialVersionUID = 1L;
       
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.setContentType("application/json;charset=utf-8");
      MemberService memberService = new MemberService();
      Member member = new Member();
      String memberId = request.getParameter("memberId");
      System.out.println("AddMember Servlet memberId : "+ memberId);
      String memberPw = request.getParameter("memberPw");
      System.out.println("AddMember Servlet memberPw : "+ memberPw);
      
      member.setMemberId(memberId);
      member.setMemberPw(memberPw);
      memberService.SubMember(member);
      
      Gson gson = new Gson();
      String json = gson.toJson(true);
      response.getWriter().write(json);
   }
}