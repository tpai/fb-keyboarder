// Quick Launch Hint Text
var tip = function(val) { return "<div style='position: absolute; right: 0px; bottom: 0px; font-size: 10px; line-height: 1; background-color: #3b5998; color: white;'>"+val+"</div>" };

$("#navHome a").append("<br />Alt+1").css("line-height", "14px");
$(".headerTinymanName").append("<br />Alt+2").css("line-height", "14px");
$("#fbRequestsJewel").append(tip("Z"));
$("#fbMessagesJewel").append(tip("X"));
$("#fbNotificationsJewel").append(tip("C"));
$("#navSearch").append(tip("V"));

// Chatbox Trigger
var chatbox = function(offset) {
	var tabs = $("div[data-referrer='ChatTabsPagelet'] div.videoCallEnabled div.fbNub");
	var tab = tabs[tabs.length - offset - 1]
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
window.onkeydown = function(e) {
	if(e.ctrlKey && e.altKey) {
		switch(e.which) {
			//P
			case 80:
				$("textarea[name='xhpc_message']").focus();
				break;
			//Z
			case 90:
				$("#fbRequestsJewel").find("a.jewelButton")[0].click();
				break;
			//X
			case 88:
				$("#fbMessagesJewel").find("a.jewelButton")[0].click();
				break;
			//C
			case 67:
				$("#fbNotificationsJewel").find("a.jewelButton")[0].click();
				break;
			//D
			case 68:
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
};