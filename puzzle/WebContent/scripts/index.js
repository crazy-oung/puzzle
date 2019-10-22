let loginState = "";
$(document).ready(function(){
	
	// 로그인 확인
	$.ajax({
		url : "/puzzle/GetSessionInfo",
		async : false, // 동기요청
		method : "POST",
		success : function(json) {
			loginState = json;
			console.log("sessionInfo : ", loginState);
		}
	});
	// 기본적으로 보여줄 
	let menu =	" <button type='button' class='btn btn-success' id='totalTop10'>🏆종합 TOP10</button> " +
				" <button type='button' class='btn btn-success' id='dailyTop10'>🥇오늘의 TOP10</button> " + 
				" <button type='button' class='btn btn-success' id='monthlyTop10'>🏅이달의 TOP10</button> ";
	//유저 확인
	console.log(loginState);
	if (loginState === null) {
		menu += "<button type='button' class='btn btn-warning' id='login'>🔑로그인</button>" +
				" <button type='button' class='btn btn-warning' id='signUp'>🎆회원가입</button> ";
		$("#menu").append(menu);
		console.log("비회원");
	}else{
		$("#loginState").append("<b>"+loginState+"</b>님 어서오세요!");
		menu += " <button type='button' class='btn btn-danger' id='gameStart'>🎮게임 스타트!</button> " +
				" <button type='button' class='btn btn-primary' id='myPage'>👀마이페이지</button> " + 
				" <button type='button' class='btn btn-primary' id='myReport'>📃마이리포트</button> " +
				" <button type='button' class='btn btn-warning' id='logout'>로그아웃 💨</button> "; 
		$("#menu").append(menu);
		console.log("회원");
	}

	//로그아웃 버튼
	$("#logout").click(function(){
		console.log("out");
		$.ajax({
	        url :"/puzzle/Logout",
	        method : "POST",
	        success : function(json){
	         console.log("sessionInfo : ", loginState);
	         location.href = "/puzzle/index.html";
	         alert("로그아웃 하셨습니다.");
	         return;
	        }, 
	        error: function() {
				alert("로그아웃 실패 다시 입력해 주세요.");
			},
			fail: function() {
				alert("로그아웃 실패 다시 입력해 주세요.");
			}
	      });
	});
	// 로그인 버튼
	$("#login").click(function(){
		console.log("go");
		location.href="/puzzle/signIn.html";
	});	
	// 회원가입 
	$("#signUp").click(function(){
		console.log("go");
		location.href="/puzzle/signUp.html";
	});
	
	let report = "";
	//순위 출력		
	// 종합 탑 10
	$("#totalTop10").click(function(){		
		console.log("totalTop10!");
		$("#top10Text").text("🏆 종합 Top 10 🏆");	
		$("#report").empty();
		report = "";
		report +="<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
		$.ajax({
			url: "/puzzle/SelectTotalTop10",
			method: "POST",
			success : function(json){				
//				console.log(json);
				report +="<tbody>"
				$(json).each(function(index, item){
					report += "<tr>";
					report += "<td>"+(index+1)+"</td>";
					report += "<td>"+item.memberId+"</td>";
					report += "<td>"+item.count+"</td>";
					report += "<td>"+item.timer+"</td>";
					report += "<td>"+item.reportDate+"</td>";
					report += "</tr>";					
				})
				report +="</tbody>";
				$("#report").append(report);
				$("#view").hide();
				$("#view").slideDown("slow");
			}                           
		}); 		
	});
	
	// 데일리 탑10
	$("#dailyTop10").click(function(){
		console.log("dailyTop10!");
		$("#top10Text").text("🥇 오늘의 Top 10 🥇");
		$("#report").empty();
		report = "";
		$.ajax({
			url: "/puzzle/SelectTodayTop10",
			method: "POST",
			success : function(json){				
//				console.log(json);					
				if(json == ""){
					$("#report").append("<hr><br><br><h1 class='display-4'><small>순위권에 든 플레이어가 없습니다!<br>오늘의 랭커가 되어보세요 !🔥</small></h1>");
					$("#view").hide();
					$("#view").slideDown("fast");
					return;
				}				
				report +="<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
				$(json).each(function(index, item){
					report += "<tr>";
					report += "<td>"+(index+1)+"</td>";
					report += "<td>"+item.memberId+"</td>";
					report += "<td>"+item.count+"</td>";
					report += "<td>"+item.timer+"</td>";
					report += "<td>"+item.reportDate+"</td>";
					report += "</tr>";					
				})
				report +="</tbody>";
				$("#report").append(report);
				$("#view").hide();
				$("#view").slideDown("fast");
			}                           
		}); 
	});
	
	// 먼슬리 탑10
	$("#monthlyTop10").click(function(){
		console.log("monthlyTop10!");
		$("#top10Text").text("🏅 이달의 Top 10 🏅");
		$.ajax({
			url: "/puzzle/SelectMonthlyTop10",
			method: "POST",
			success : function(json){				
//				console.log(json);
				report = "";	
				if(json == ""){
					$("#report").append("<hr><br><br><h1 class='display-4'><small>순위권에 든 플레이어가 없습니다!<br>오늘의 랭커가 되어보세요 !🔥</small></h1>");
					$("#view").hide();
					$("#view").slideDown("fast");
					return;
				}			
				$("#report").empty();				
				report +="<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
				$(json).each(function(index, item){
					report += "<tr>";
					report += "<td>"+(index+1)+"</td>";
					report += "<td>"+item.memberId+"</td>";
					report += "<td>"+item.count+"</td>";
					report += "<td>"+item.timer+"</td>";
					report += "<td>"+item.reportDate+"</td>";
					report += "</tr>";					
				})
				report +="</tbody>";
				$("#report").append(report);
				$("#view").hide();
				$("#view").slideDown("fast");
			}                           
		}); 		
	});
	
	// 게임스타트 버튼
	$("#gameStart").click(function(){
		console.log("game!");
		location.href="/puzzle/puzzle.html";		
	});
	
	// 마이페이지 버튼
	$("#myPage").click(function(){
		console.log("myPage!");
		location.href="/puzzle/myPage.html";		
	});
	

	
	// 마이리포트 버튼
	$("#myReport").click(function(){
		console.log("myReport!");
		$("#top10Text").text("📃 마이 리포트 📃");	
		$("#report").empty();
		report = "";
		$.ajax({
			url: "/puzzle/SelectMemberReport",
			data : {memberId : loginState},
			method : "POST",
			success : function(json){
				if(json == ""){
					report="<hr><br><br><h1 class='display-4'><small>기록이 아직 없군요 ..!<br>기록을 세워 랭커에 도전해보세요 !🔥</small></h1>";
					$("#report").append(report);
					$("#view").hide();
					$("#view").slideDown("fast");
//					$("#report").hide();
//					$("#report").show("slow");
					return;
				}			
				report +="<thead><tr><th>번호</th><th>기록번호</th><th>횟수</th><th>기록</th><th>날짜</th></tr></thead><tbody>";
				$(json).each(function(index, item){
					report += "<tr>";
					report += "<td>"+(index+1)+"</td>";
					report += "<td>"+item.reportId+"</td>";
					report += "<td>"+item.count+"</td>";
					report += "<td>"+item.timer+"</td>";
					report += "<td>"+item.reportDate+"</td>";
					report += "</tr>";					
				})
				report +="</tbody>";
				$("#report").append(report);
				$("#view").hide();
				$("#view").slideDown("fast");
			},
		});
	});
	
})
