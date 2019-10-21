//stage 1  model1 	4*4
let model1 = [ 	"p0.png", "p0.png", 
				"p1.png", "p1.png", 
				"p2.png", "p2.png",
				"p3.png", "p3.png", 
				"p4.png", "p4.png",
				"p5.png", "p5.png", 
				"p6.png", "p6.png", 
				"p7.png", "p7.png", ];

//stage 2 model2	6*6
let model2 = [ 	"p0.png", "p0.png", 
				"p1.png", "p1.png", 
				"p2.png", "p2.png",
				"p3.png", "p3.png", 
				"p4.png", "p4.png", 
				"p5.png", "p5.png", 
				"p6.png", "p6.png", 
				"p7.png", "p7.png", 
				"p8.png", "p8.png", 
				"p9.png", "p9.png",
				"p10.png", "p10.png", 
				"p11.png", "p11.png", 
				"p12.png", "p12.png",
				"p13.png", "p13.png", 
				"p14.png", "p14.png", 
				"p15.png", "p15.png",
				"p16.png", "p16.png", 
				"p17.png", "p17.png", ]; // [0] ~ [17]

//stage 3 model3	8*8
let model3 = [ 	"p0.png", "p0.png", 
				"p1.png", "p1.png", 
				"p2.png", "p2.png",
				"p3.png", "p3.png", 
				"p4.png", "p4.png", 
				"p5.png", "p5.png", 
				"p6.png", "p6.png", 
				"p7.png", "p7.png", 
				"p8.png", "p8.png", 
				"p9.png", "p9.png",
				"p10.png", "p10.png", 
				"p11.png", "p11.png", 
				"p12.png", "p12.png",
				"p13.png", "p13.png", 
				"p14.png", "p14.png", 
				"p15.png", "p15.png",
				"p16.png", "p16.png", 
				"p17.png", "p17.png",
				"p0.png", "p0.png", 
				"p1.png", "p1.png", 
				"p2.png", "p2.png",
				"p3.png", "p3.png", 
				"p4.png", "p4.png", 
				"p5.png", "p5.png", 
				"p6.png", "p6.png", 
				"p7.png", "p7.png", 
				"p8.png", "p8.png", 
				"p9.png", "p9.png",
				"p10.png", "p10.png", 
				"p11.png", "p11.png", 
				"p12.png", "p12.png",
				"p13.png", "p13.png", ]; // [0] ~ [31]

let loginState = "";
let timerNum = 0;
let temp = 0;
let cardRow = 4;
let remainHint = 2;
// 스테이지 시작시 기억을 위해 주는 시간 
let timeLeft = 4;
$(document).ready( function(){
	let count = 0;
	
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
	
	console.log(loginState);
	// 로그인 안했을 시 돌아가기
	if (loginState == null) {
		location.href = "/puzzle/signIn.html";
		alert("로그인을 해야 게임을 플레이 할 수 있습니다 T.T \n🎀 아이디와 비밀번호만 입력하면 되니 같이 회원가입을 하러 가봅시다! 🎀");
		return false;
	}		
	// 상단에 로그인 id표시
	$("#user").text(loginState);
	
	//게임 시작시 알림 띄움
	alert("3초 동안 최대한 많이 기억하세요 ! \n확인 버튼을 누르면 시작합니다 !");
	// 힌트 개수 표시
	$("#remainHint").text(remainHint);
	// 스테이지 초기화
	let stage =1;	
	// 모델 초기화 
	let model = model1;
	// model이 뒤섞여 순서가 랜덤으로 출력.
//	for (let i = 0; i < 100000; i++) {
//		let ran = Math.floor(Math.random() * model.length); // 0~ 카드갯수 -1 까지
//		let tmp = model[0];
//		model[0] = model[ran];
//		model[ran] = tmp
//	}
	
	// 16개 이미지 출력.
	$("#board").append("<tr>");
	$(model).each( function(index, item) {
		// 우클릭 방지 : oncontextmenu ='return
		// false'
		// 드래그 방지 : ondragstart ='return false'
		let html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>"
				+ "<div class='card' id='pic-"+item+"'><div class='front' id='p"+index+"'><input type='image' src='/puzzle/pzImage/"
				+ item + "'></div><div class='back'><p>🎆</p></div></div></div></td>";

		if (index / cardRow > 0 && index % cardRow == 0) {
			console.log(index);
			$("#board").append("</tr><tr>");
		}
		$("#board").append(html);		
	});
	// 타이머 시작
	timer = setInterval(function() {
		console.log(timeLeft,"<- 남은시간!!! @timer");
		if(timeLeft > 0 ){
			timeLeft --;
			console.log(timeLeft,"<- 남은시간 감소");
			if(timeLeft==0){
				$(".card").each(function(i){
					let card = $(this);
					flip = setTimeout( function(){
						console.log("works!");
						$(card).toggleClass("flipped");							
					}, i*18);
				})
				$("#timer").text("시작합니다!");
				temp = 1;
				return;
			}
			$("#timer").text("시작까지 "+timeLeft+"초");				
			return;			
		}
		timerNum++;				
		$("#timer").text("경과시간 " + timerNum+" 초");		
	}, 1000);
	
	//로그아웃 버튼
	$("#logoutBtn").click(function(){
		console.log("out");
		$.ajax({
	        url :"/puzzle/Logout",
	        method : "POST",
	        success : function(json){
	         console.log("sessionInfo : ", loginState);
	         location.href = "/puzzle/index.html";
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
	// 다시하기 버튼
	$("#againBtn").click(function(){
		alert("다시 시작!");
		location.href = "/puzzle/puzzle.html";			
	});
	// 홈으로 버튼 
	$("#toHomeBtn").click(function(){
		location.href = "/puzzle/index.html";			
	});
	
	// 힌트 버튼 클릭시 힌트 사용 가능 횟수 감소
	$("#hintBtn").click(function(){		
		remainHint --;
		$("#remainHint").text(remainHint);
		$(".card").each(function(){			
			$(this).toggleClass("flipped");
		})
		setTimeout(function(){
			console.log("대기 후 다시 돌림 ")
			$(".card").each(function(){
				$(this).toggleClass("flipped");
			})
		}, 1000)
		
		// 힌트 실행 후 남은 횟수 0 이면 비활성화 
		if(remainHint==0){
			$("#hintBtn").attr("disabled", "disabled");
			return;
		}		
	})
	
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
	$(document).on("click", ".card", function(){
		console.log($(this),"click!");
		// 게임이 시작전이면 클릭 못하게 막기
		if(temp < 1 ){
			return;
		}
		// 더블 클릭 방지
		if($(this).attr('class') === "card"){
			return;
		}
		//클릭 횟수 소진시 아래 코드 실행 하지 않기. 세번 클릭을 방지하기 위함
		if(state == 2){
			return;
		}
		total++;
		$("#count").text(total);
		state++;
		$(this).toggleClass("flipped");
		if (1 == state) {
			console.log("1");
			onePic = $(this);
			console.log(onePic);			
		} 
		if (2 == state) {
			console.log("2");
			twoPic = $(this);
			console.log(twoPic);
			if ($(onePic).attr("id") == $(twoPic).attr("id")) {
				success++;
				state = 0;
				if (success == model.length / 2) {
					alert("스테이지"+stage+" 클리어‼ \n"+loginState+"님의 누적시간은 "+timerNum+"이고 시도횟수는 "+total+"입니다 ☑");
					console.log(timeLeft,"<- 남은시간");
					timeLeft = 4;
					temp=0;
					console.log(timeLeft,"<- 남은시간");
					console.log(loginState);
					stage ++;
					console.log(stage);
					success =0;
					if(stage < 4) {
						// stage1 이면 모델1, stage2 이면 모델2, 
						console.log("stage: ", stage);
						if(stage == 2) {
							model = model2;	
							cardRow +=2;
						} else if(stage == 3) {
							model = model3;
							cardRow +=2;
						}
						console.log("***model.length: ", model.length);
						// 모델 셔플
//						for(let i=0; i<100000; i++) {
//							let ran = Math.floor(Math.random()*model.length);
//							let tmp = model[0];
//							model[0] = model[ran];
//							model[ran] = tmp
//				 		}
						// 모델 출력
						$("#board").empty();
						$("#board").append("<tr>");
						$(model).each( function(index, item) {
							// 우클릭 방지 : oncontextmenu ='return
							// false'
							// 드래그 방지 : ondragstart ='return false'
							let html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>"
									+ "<div class='card' id='pic-"+item+"'><div class='front' id='p"+index+"'><input type='image' src='/puzzle/pzImage/"
									+ item + "'></div><div class='back'><p>🎆</p></div></div></div></td>";

							if (index / cardRow > 0 && index % cardRow == 0) {
								console.log(index);
								$("#board").append("</tr><tr>");
							}
							$("#board").append(html);		
						});			
							
					} else {
						// 서버로 최종 결과 전송
						alert("게임종료✔️ \n"+loginState+"님의 최종 기록시간은 "+timerNum+"이고 최종 시도횟수는 "+total+"입니다 🎊");
						console.log(loginState);
						// 디비에 게임기록 저장
						$.ajax({
	                        url: "/puzzle/AddReport",
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
				}				
			} else {
				// 2번째 선택한 카드 확인
				setTimeout(function() {
					  console.log('Works!');
					  $(onePic).toggleClass("flipped");
					  $(twoPic).toggleClass("flipped");
					  onePic = null;
					  twoPic = null;
					  state = 0;
				}, 370);				
			}			
		}
	});
});
