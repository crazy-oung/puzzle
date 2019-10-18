package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.Member;
import model.Report;
import service.ReportService;

@WebServlet("/SelectMemberReport")
public class SelectMemberReport extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 System.out.println("::: SelectMemberReport SERVLET 실행 :::");
		   response.setContentType("application/json");
		   ReportService reportListService = new ReportService();
		   Member member = new Member();
		   String memberId = (request.getParameter("memberId")); 
		   member.setMemberId(memberId);
	      
		   List<Report> list = reportListService.selectMemberReport(member);
	            
		   Gson gson = new Gson();
		   String jsonList = gson.toJson(list);
		   System.out.println(jsonList);
		   response.getWriter().write(jsonList); 
	}

}
