let model = [ "p0.png", "p0.png", "p1.png", "p1.png", "p2.png", "p2.png",
		"p3.png", "p3.png", "p4.png", "p4.png", "p5.png", "p5.png", "p6.png",
		"p6.png", "p7.png", "p7.png", "p8.png", "p8.png", "p9.png", "p9.png",
		"p10.png", "p10.png", "p11.png", "p11.png", "p12.png", "p12.png",
		"p13.png", "p13.png", "p14.png", "p14.png", "p15.png", "p15.png",
		"p16.png", "p16.png", "p17.png", "p17.png", ]; // [0] ~ [17]
let loginState = "";
let timerNum = 0;
let temp = 0;
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
	// 로그인 확인
	if (loginState == null) {
		location.href = "/puzzle/signIn.html";
		alert("로그인을 해야 게임을 플레이 할 수 있습니다. 아이디와 비밀번호만 입력하면 되는 간단한 절차이오니 어서 회원가입 해주세요 <3 <3 <3");
		return false;
	}		
	// 상단에 로그인 id표시
	$("#user").text(loginState);
	// 상단에 도전 횟수 표시
	/*$("#count").text(count);
	if (loginState = null) {
		return false;
	}*/
	
	timer = setInterval(function() {		
		if(timerNum==3 && temp<1){
			timerNum =0;
			temp=1;
			$(".card").each(function(){
				$(this).toggleClass("flipped");
			})
		}
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
	
	// 16개 이미지 출력.
	$("#board").append("<tr>");
	$(model).each( function(index, item) {
		// 우클릭 방지 : oncontextmenu ='return
		// false'
		// 드래그 방지 : ondragstart ='return false'
		let html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>"
				+ "<div class='card' id='pic-"+item+"'><div class='front' id='p"+index+"'><input type='image' src='/puzzle/pzImage/"
				+ item + "'></div><div class='back'><p>❓</p></div></div></div></td>";

		if (index / 6 > 0 && index % 6 == 0) {
			console.log(index);
			$("#board").append("</tr><tr>");
		}
		$("#board").append(html);		
	});
	
	
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
	$(".card").click(function(e){
		if(temp < 1 || $(this).children(".front").attr("id") == $(onePic).children(".front").attr("id") || $(this).children(".front").attr("id") == $(twoPic).children(".front").attr("id")){
			return;
		}
		if(state == 2){
			return;
		}
		total++;
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
				if (success == model.length / 2) {
					alert("게임종료! "+loginState+"님의 기록시간은 "+timerNum+"이고 횟수는 "+count+"입니다 🌟");
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
				$(onePic).unbind("click");
				$(twoPic).unbind("click");
				state = 0;
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
