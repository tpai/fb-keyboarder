//排程工作
var at, stage
setInterval(function() {
	//通知自動增量
	if ($("#fbNotificationsFlyout").prop("class").search("toggleTargetClosed") == -1) {
		if((msg_notif_index+1) / $("#fbNotificationsList").children().length >= 0.8) {
			$(".notifMorePager").find("a")[0].click()
		}
	}
	//訊息自動增量
	else if ($("#fbMessagesFlyout").prop("class").search("toggleTargetClosed") == -1) {
		if((msg_notif_index+1) / $(".jewelContent").find("li").length >= 0.8) {
			$(".uiMorePager").find("a")[0].click()
		}
	}
	//場景判斷
	if(location.pathname.search("groups") != -1) {
		at = "group"
	}
	else {
		at = "wall"
	}
}, 500)

/* ------------------------------------------------------------------ */

//反選擇
var blurAll = function() {
	if ("activeElement" in document)document.activeElement.blur()
};

//story動作
var resStory = function(index, action) {
	var story
	if(at == "wall")
		story = $("li[id^='stream_story_']")
	else if(at == "group")
		story = $("li[id^='mall_post_']")

	window.scrollTo(0, story[index].offsetTop)

	if(action == "like")
		$(story[index]).find("a[class*='UFILikeLink']")[0].click()
	else if(action == "comment")
		$(story[index]).find("label[class*='comment_link']")[0].click()
};

//開關對話框
var chatbox = function(index) {
	var boxes = $("#ChatTabsPagelet").find("div[class*='videoCallEnabled']").children()
	if($(boxes[boxes.length-1-index]).prop("class").search("opened") != -1) {
		console.log("opened")
		$(boxes[boxes.length-1-index]).find("div[class*='titlebarButtonWrapper']")[0].click()
	}
	else {
		console.log("closed")
		$(boxes[boxes.length-1-index]).find("a[class*='fbNubButton']")[0].click()
	}
};

/* ------------------------------------------------------------------ */

//全域變數宣告
var sidebar_index, sidebar_item, story_index, msg_notif_index
var item, hover, n_item_shown, container

window.onkeydown = function(e) {

	var jewel

	//通知已開
	if($("#fbNotificationsFlyout").prop("class").search("toggleTargetClosed") == -1) {
		item = $("#fbNotificationsList").find("li")
		hover = "notifHover"
		n_item_shown = 7
		container = $("#fbNotificationsList").parent().parent()
	}
	//訊息已開
	else if($("#fbMessagesFlyout").prop("class").search("toggleTargetClosed") == -1) {
		item = $(".jewelContent").find("li")
		hover = "jewelItemNew"
		n_item_shown = 5
		container = $(".jewelContent").parent().parent().parent().parent()
	}

	//Ctrl+Alt+
	if(e.ctrlKey && e.altKey) {

		switch(e.which) {
			//ESC : 反選擇
			case 27:
				blurAll()
				break
			//P : 發佈貼文
			case 80:
				//首頁
				if($("#pagelet_stream_pager") == [])
					$("#pagelet_composer").find("textarea")[0].focus()
				//社團
				else
					$("#pagelet_group_composer").find("textarea")[0].focus()
				break
			//A : 切換至側邊item並置頂
			case 65:
				stage = "sidebar"
				sidebar_index = 0
				sidebar_item = $("li[id^='navItem_']")
				$(sidebar_item[0]).css("background-color", "#eff2f7")

				window.scrollTo(0, 0)
				break
			//S : 切換至story並置頂
			case 83:
				stage = "wall"
				story_index = 0
				resStory(story_index, "comment")
				break
			//Z : 快捷鈕 朋友邀請
			case 90:
				$("#fbRequestsJewel").find("a")[0].click()
				break
			//X : 快捷鈕 訊息
			case 88:
				stage = "msg"
				jewel = $("#fbMessagesJewel").find("a")[0]
			//C : 快捷鈕 通知
			case 67:
				//索引置頂
				msg_notif_index = 0
				//因為msg跟notif可以用相同的程式碼處理 所以利用jewel來區分
				if(!jewel) {
					stage = "notif"
					jewel = $("#fbNotificationsJewel").find("a")[0]
				}
				jewel.click() //按下按鈕

				//清除所有已選狀態
				blurAll()

				$(container[0]).css("top", "0px")

				break
			//D : 聊天室搜尋
			case 68:
				$(".fbChatSidebarMessage").next().find("input[type='text']")[0].focus()
				break;
			//V : 群體搜尋
			case 86:
				$("#q").focus()
				break
			//?
			case 191: chatbox(0); break;
			//>
			case 190: chatbox(1); break;
			//<
			case 188: chatbox(2); break;
			//M
			case 77: chatbox(3); break;
			//N
			case 78: chatbox(4); break;
			//B
			case 66: chatbox(5); break;
		}
		return false;
	}

	else if(e.altKey) {
		switch(e.which) {
			//Alt+↑ : 項目上移
			case 38:
				//塗鴉牆或社團貼文
				if(stage == "wall") {
					story_index --
					resStory(story_index, "comment")
				}
				//通知或訊息
				else if(stage == "notif" || stage == "msg") {
					//上移
					if(msg_notif_index > 0) {
						msg_notif_index --
						$(item).removeClass(hover)
						$(item[msg_notif_index]).addClass(hover)
					}
					//捲動換頁
					if(msg_notif_index % n_item_shown == 0) {

						//避免有些container沒有起始值
						if(container[0].style.top == "")container[0].style.top = "0px" //to avoid empty

						//將container目前高度減去本頁所有子代之高度 (此處的減 畫面就會往下捲)
						var top = parseInt(container[0].style.top, 10)
						var nowTop = top
						for(var j=msg_notif_index-n_item_shown;j<msg_notif_index;j++)
							nowTop += item[j].clientHeight-1;
						
						if(nowTop > 0)nowTop = 0
						
						container[0].style.top = nowTop + "px"
					}
				}
				//側邊攔
				else if(stage == "sidebar") {
					if(sidebar_index > 0) {
						sidebar_index --
						$(sidebar_item).css("background-color", "#ffffff")
						$(sidebar_item[sidebar_index]).css("background-color", "#eff2f7")
					}
				}
				break
			//Alt+↓ : 項目下移
			case 40:
				if(stage == "wall") {
					story_index ++
					resStory(story_index, "comment")
				}
				else if(stage == "notif" || stage == "msg") {
					//下移
					if(msg_notif_index < $(item).length) {
						msg_notif_index ++
						$(item).removeClass(hover)
						$(item[msg_notif_index]).addClass(hover)
					}
					//捲動換頁
					if(msg_notif_index % n_item_shown == 0) {

						//避免有些container沒有起始值
						if(container[0].style.top == "")container[0].style.top = "0px" //to avoid empty

						//將container目前高度減去本頁所有子代之高度 (此處的減 畫面就會往下捲)
						var top = parseInt(container[0].style.top, 10)
						var nowTop = top
						for(var j=msg_notif_index-n_item_shown;j<msg_notif_index;j++)
							nowTop -= item[j].clientHeight-1;
						
						container[0].style.top = nowTop + "px"
					}
				}
				else if(stage == "sidebar") {
					if(sidebar_index < sidebar_item.length) {
						sidebar_index ++
						$(sidebar_item).css("background-color", "#ffffff")
						$(sidebar_item[sidebar_index]).css("background-color", "#eff2f7")
					}
				}
				break
		}
	}

	else if(e.ctrlKey) {
		switch(e.which) {
			//Ctrl+↵
			case 13:
				//選取notif或msg
				if (stage == "notif" || stage == "msg") {
					//使用彈出式視窗
					$(item[msg_notif_index]).find("a").prop("target", "_blank")
					$(item[msg_notif_index]).find("a")[0].click()
				}
				//選取sidebar item
				else if(stage == "sidebar") {
					$(sidebar_item[sidebar_index]).find(".item")[0].click()
				}
				break
			//Ctrl+\
			case 220:
				//塗鴉牆貼文按讚
				if(stage == "wall") {
					resStory(story_index, "like")
				}
				break
		}
	}
};

/* ------------------------------------------------------------------ */

//提示字
var tip = function(value) {
	return $("<div>")
				.text(value)
				.css("position", "absolute")
				.css("right", "0px")
				.css("bottom", "0px")
				.css("color", "white")
				.css("font-size", "10px")
				.css("line-height", "1")
				.css("background-color", "#3b5998")
};

$("#navHome").find("a").append("<br />Alt+1").css("lineHeight", "14px")
$(".headerTinymanName").append("<br />Alt+2").css("lineHeight", "14px")
$("#fbRequestsJewel").append(tip("Z"))
$("#fbMessagesJewel").append(tip("X"))
$("#fbNotificationsJewel").append(tip("C"))
$("#navSearch").append(tip("V"))