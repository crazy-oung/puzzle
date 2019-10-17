package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Report;
import service.ReportService;

@WebServlet("/AddReport")
public class AddReport extends HttpServlet {

   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      System.out.println("::: AddReport SERVLET 실행 :::");
      int timer = Integer.parseInt(request.getParameter("timer"));
      System.out.println("AddReport timer : "+timer);
      int count = Integer.parseInt(request.getParameter("count"));
      System.out.println("AddReport count : "+count);
      String memberId = request.getParameter("memberId");
      System.out.println("AddReport memberId : "+memberId);
      
      Report report = new Report();
      report.setMemberId(memberId);
      report.setCount(count);
      report.setTimer(timer);
      
      
      ReportService reportService = new ReportService();
      reportService.addReport(report);
   }
}