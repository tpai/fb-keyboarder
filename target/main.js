if (navigator.appVersion.indexOf("Win")!=-1)os = "win"
else if (navigator.appVersion.indexOf("Mac")!=-1)os = "mac"

// Quick Launch Hint Text
var tip = function(val) { return "<div style='position: absolute; padding: 2px; right: 0px; bottom: 0px; font-size: 10px; line-height: 1; background-color: #3b5998; color: white;'>"+val+"</div>" };

if(os == "win") {
	$("#fbRequestsJewel").append(tip("Z"));
	hint1 = "Alt+1";
	hint2 = "Alt+2";
}
else {
	hint1 = "C-O+1";
	hint2 = "C-O+2";
}

$(document).ready(function() {
	$($("a.jewelButton")[1]).parent().append(tip("X"));
	$("#fbNotificationsJewel").append(tip("C"));
	$("#q").parent().append(tip("V"));
	setTimeout(function() {
		$(".fbChatSidebarMessage").next().find("input[type='text']").parent().append(tip("F"));
		$("img[id^='profile_pic_header']").css("float", "left");
		$("a[data-gt='{\"chrome_nav_item\":\"timeline_chrome\"}']").append("<br />"+hint2).css("line-height", "14px");
		$("a[data-gt='{\"chrome_nav_item\":\"home_chrome\"}']").append("<br />"+hint1).css("line-height", "14px");
	}, 1000);
});

// Chatbox Trigger
var chatbox = function(offset) {
	var tabs = $("#ChatTabsPagelet div.fbNub");
	var tab = tabs[tabs.length - offset - 1];
	if(tab != undefined) {
		if($(tab).prop("class").search("opened") != -1) {
			$(tab).find("div.titlebar").click();
		}
		else {
			$(tab).find("div.fbChatTab").click();
		}
	}
};

// Track Keyboard Event

var list_mode
var list_index = 0

window.onkeydown = function(e) {
	if(
		(
			os == "win" &&
			e.ctrlKey && e.altKey
		) ||
		(
			os == "mac" &&
			e.metaKey && e.altKey
		)
	) {
		switch(e.which) {
			//P
			case 80:
				$("textarea[name='xhpc_message_text']").focus();
				break;
			//Z
			case 90:
				$("a.jewelButton")[0].click();
				break;
			//X
			case 88:
				list_mode = "MercuryJewel";
				$("a.jewelButton")[1].click();
				break;
			//C
			case 67:
				list_mode = "fbNotifications";
				$("a.jewelButton")[2].click();
				break;
			//F
			case 70:
				$(".fbChatSidebarMessage").next().find("input[type='text']").focus();
				break;
			//V
			case 86:
				$("#q").focus();
				break;
			//L
			case 76:
				$("#logout_form").submit();
				break;
			//\/
			case 191: chatbox(0); break;
			//.
			case 190: chatbox(1); break;
			//,
			case 188: chatbox(2); break;
			//M
			case 77: chatbox(3); break;
			//N
			case 78: chatbox(4); break;
			//B
			case 66: chatbox(5); break;
			//1
			case 49: $("ul[role='navigation'] li:nth-child(2)").find("a")[0].click(); break;
			//2
			case 50: $("ul[role='navigation'] li:nth-child(1)").find("a")[0].click(); break;
		}
		return false;
	}
	else if(
		(os == "win" && e.altKey ) ||
		(os == "mac" && e.shiftKey)
	) {
		// message select
		if(list_mode == "MercuryJewel") {
			switch(e.which) {
				// arrow up
				case 38:
					if(list_index>0)list_index--
					break;
				// arrow down
				case 40:
					list_index++
					break;
			}
			$("a.messagesContent")[list_index].focus()
		}
		// notification select
		else if(list_mode == "fbNotifications") {
	
			switch(e.which) {
				// arrow up
				case 38:
					if(list_index>0)list_index--
					break;
				// arrow down
				case 40:
					list_index++
					break;
			}
			$("#fbNotificationsFlyout ul li").find("a:nth-child(1)")[list_index].focus()
		}
	}
};
