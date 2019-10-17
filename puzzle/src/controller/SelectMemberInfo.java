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

@WebServlet("/SelectMemberInfo")
public class SelectMemberInfo extends HttpServlet {
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
         response.setContentType("application/json;charset=utf-8");
         HttpSession session = request.getSession();
         System.out.println("::: SelectMemberInfo servlet 실행 :::");
         Member member = new Member();
     
         member.setMemberId(request.getParameter("memberId"));
         System.out.println("memberId: "+member.getMemberId());         
         
         MemberService ms = new MemberService();
         String memberId = ms.selectMemberInfo(member);
         Gson gson = new Gson();
         String json = gson.toJson(memberId);
         response.getWriter().write(json);
   }
}