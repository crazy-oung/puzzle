package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.Report;
import service.ReportService;

@WebServlet("/SelectMonthlyTop10")
public class SelectMonthlyTop10 extends HttpServlet {

   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	   System.out.println("::: SelectMonthlyTop10 SERVLET 실행 :::");
	   response.setContentType("application/json");
	   ReportService reportListService = new ReportService();
      
	   List<Report> list = reportListService.selectMonthlyRankList(10);
            
	   Gson gson = new Gson();
	   String jsonList = gson.toJson(list);
	   System.out.println(jsonList);
	   response.getWriter().write(jsonList);   
   }
}