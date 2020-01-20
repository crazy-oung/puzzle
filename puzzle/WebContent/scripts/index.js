new Vue({
	el: ".container",
	data: {
		loginState : "",
		report : {
			index : 0,
			reportId : null,
			count : null,
			timer : null,
			reportDate : null
		},
	},
	mounted: {
		
		//logout html 
		logout: function(){
			console.log("out");
			$.ajax({
				url :"./Logout",
				method : "POST",
				success : function(json){
				console.log("sessionInfo : ", loginState);
				location.href = "./index.html";
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
		},
		
		
		//순위 출력	
		selectTop10:function(name){
			$.ajax({
				url: "./SelectTotalTop10",
				method: "POST",
				success : function(json){				
	 //				console.log(json);
					 reportHTML(json);
					$("#report").append(report);
					$("#view").hide();
					$("#view").slideDown("slow");
				}                           
			}); 	
		}
		// 종합 탑 10
		$("#totalTop10").click(function(){		
			console.log("totalTop10!");
			$("#top10Text").text("🏆 종합 Top 10 🏆");	
			$("#report").empty();
			report = "";
			report +="<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
				
		});
		
		// 데일리 탑10
		$("#dailyTop10").click(function(){
			console.log("dailyTop10!");
			$("#top10Text").text("🥇 오늘의 Top 10 🥇");
			$("#report").empty();
			report = "";
			$.ajax({
				url: "./SelectTodayTop10",
				method: "POST",
				success : function(json){				
	 //				console.log(json);					
					if(json == ""){
						$("#report").append("<hr><br><br><h1 class='display-4'><small>순위권에 든 플레이어가 없습니다!<br>오늘의 랭커가 되어보세요 !🔥</small></h1>");
						$("#view").hide();
						$("#view").slideDown("fast");
						return;
					}				
					reportHTML(json);
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
			$("#report").empty();
			$.ajax({
				url: "./SelectMonthlyTop10",
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
					reportHTML(json);
					$("#report").append(report);
					$("#view").hide();
					$("#view").slideDown("fast");
				}                           
			}); 		
		}),
		// 마이리포트 버튼
		$("#myReport").click(function(){
			console.log("myReport!");
			$("#top10Text").text("📃 마이 리포트 📃");	
			$("#report").empty();
			report = "";
			$.ajax({
				url: "./SelectMemberReport",
				data : {memberId : loginState},
				method : "POST",
				success : function(json){
					if(json == ""){
						report="";
						$("#report").append(report);
						$("#view").hide();
						$("#view").slideDown("fast");
						return;
					}			
					reportHTML(json);
					$("#report").append(report);
					$("#view").hide();
					$("#view").slideDown("fast");
				},
			});
		}),

		// append report html
		reportHTML : function(json){
			var report ="";
			json.each(function(index, item){
				report += "<tr>";
				report += "<td>"+(index+1)+"</td>";
				report += "<td>"+item.reportId+"</td>";
				report += "<td>"+item.count+"</td>";
				report += "<td>"+item.timer+"</td>";
				report += "<td>"+item.reportDate+"</td>";
				report += "</tr>";					
			})
			report +="</tbody>";

			return report;
		}
		
	},
	methods: {
		getLoginState:function(){
			$.ajax({
				url : "./GetSessionInfo",
				async : false, // 동기요청
				method : "POST",
				success : function(json) {
					this.loginState = json;
					console.log("sessionInfo : ", loginState);
				}
			})
		}
	}
 });

