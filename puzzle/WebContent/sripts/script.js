let model = [ "p0.png", "p0.png", "p1.png", "p1.png", "p2.png", "p2.png",
		"p3.png", "p3.png", "p4.png", "p4.png", "p5.png", "p5.png", "p6.png",
		"p6.png", "p7.png", "p7.png", "p8.png", "p8.png", "p9.png", "p9.png",
		"p10.png", "p10.png", "p11.png", "p11.png", "p12.png", "p12.png",
		"p13.png", "p13.png", "p14.png", "p14.png", "p15.png", "p15.png",
		"p16.png", "p16.png", "p17.png", "p17.png", ]; // [0] ~ [17]

$(document).ready(
	function() {
		let loginState = "";
		let count = 0;
		
		// 로그인 확인
		$.ajax({
			url : "/jquery-ex/GetSessionInfo",
			async : false, // 동기요청
			method : "POST",
			success : function(json) {
				loginState = json;
				console.log("sessionInfo : ", loginState);
			}
		});
		console.log(loginState);
		// 로그인 확인
		if (loginState == null) {
			location.href = "/jquery-ex/login.html";
			return false;
		}
		
		// 상단에 로그인 id표시
		$("#user").text(loginState);
		// 상단에 도전 횟수 표시
		$("#count").text(count);
		if (loginState = null) {
			return false;
		}
		
		let timerNum = 0;
		timer = setInterval(function() {
			timerNum++;
			$("#timer").text(timerNum);
		}, 1000);

		// model이 뒤섞여 순서가 랜덤으로 출력.
		for (let i = 0; i < 100000; i++) {
			let ran = Math.floor(Math.random() * 36); // 0~35
			let tmp = model[0];
			model[0] = model[ran];
			model[ran] = tmp
		}

		$("#board").append("<tr>");
		$.ajax({
			url : "/jquery-ex/GetSessionInfo",
			async : false, // 동기요청
			method : "POST",
			success : function(json) {
				loginState = json;
				console.log("sessionInfo : ", loginState);
			}
		});
		// 16개 이미지 출력.
		$(model).each( function(index, item) {
			// 우클릭 방지 : oncontextmenu ='return
			// false'
			// 드래그 방지 : ondragstart ='return false'
			let html = "<td oncontextmenu ='return false' ondragstart ='return false' width='150px'>"
					+ "<input class='pic p1'  type='image' src='/jquery-ex/pzImage/"
					+ item + "'></td>";

			if (index / 6 > 0 && index % 6 == 0) {
				console.log(index);
				$("#board").append("</tr><tr>");
			}
			$("#board").append(html);
		});
		
		// 서서히 이미지가 사라짐.
		$(".pic").each(function() {
			$(this).animate({
				opacity : 0.00
			}, 3000); // 이슈 : 드래그 버그 ->우클릭 방지로 해결.
		});
		
		//로그아웃 버튼
		$("#logoutBtn").click(function(){
			console.log("out");
			$.ajax({
		        url :"/jquery-ex/Logout",
		        method : "POST",
		        success : function(json){
		         console.log("sessionInfo : ", loginState);
		         location.href = "/jquery-ex/login.html";
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
		
		$("#againBtn").click(function(){
			alert("다시 시작!");
			location.href = "/jquery-ex/puzzle.html";			
		});
		
		/*
		 * 게임 실행
		 * 1. 변수 선언
		 * 2. 그림 클릭시 보여주기
		 * 3. 짝 맞나 확인 
		 * 4. 맞으면 카드 모습 유지
		 */
		// 게임 실행을 위한 변수 설정
		let total = 0; // 전체 몇번째 클릭인지
		let state = 0; // 클릭 안했을시 0 첫클릭 1 두번째 클릭 2
		let success = 0; // 몇개의 그림을 맞췄는지 8이되면 게임이 끝.
		let onePic = null;
		let twoPic = null;
		
		console.log(loginState);
		// 1클릭과 2클릭이 같다면 같은 이미지는 멈춤, 아니라면 사라짐.
		$(".pic").click(
				function() {
					total++;
					state++;
					$(this).attr("disabled", true); // 더블클릭 방지
					
					if (1 == state) {
						console.log("1");
						$(this).animate({
							opacity : 1
						}, 500);
						onePic = $(this);
					} else if (2 == state) {
						console.log("2");
						$(this).animate({
							opacity : 1
						}, 500);
						twoPic = $(this);
						if ($(onePic).attr("src") == $(twoPic).attr("src")) {
							success++;
							if (success == model.length / 2) {
								alert("게임종료!");
								console.log(loginState);
								// 디비에 게임기록 저장
								$.ajax({
			                        url: "/jquery-ex/AddReport",
			                        method: "POST",
			                        data: {"timer": timerNum,
			                              "count": total,
			                              "memberId": loginState
			                              },
			                     }); 
								//타이머 종료
								clearInterval(timer);
								return;
							}
						} else {
							$(onePic).animate({
								opacity : 0
							}, 500);
							$(twoPic).animate({
								opacity : 0
							}, 500);
							$(onePic).attr("disabled", false); // 더블클릭
																// 방지
																// 해제
							$(twoPic).attr("disabled", false);
						}
						state = 0;
					}
		});
});
