var chatOnOff = function(offset) {
	var length = document.getElementById("fbDockChatTabs").childNodes.length
	var i = length - offset - 1;
	var tab = document.getElementById("fbDockChatTabs").childNodes[i];
	if(tab != undefined) {
		if(tab.className.search("opened") != -1) {
			tab.getElementsByClassName("titlebar")[0].click()
		}
		else {
			tab.getElementsByTagName("a")[0].click()
		}
	}
};

var tip = function(value) {
	var ico = document.createElement("div")
	ico.setAttribute("style", "position: absolute; right: 0px; bottom: 0px; font-size: 10px; line-height: 1; background-color: #3b5998; color: white;")
	ico.innerHTML = value
	return ico
};
document.getElementById("navHome").getElementsByTagName("a")[0].style.lineHeight = "14px"
document.getElementById("navHome").getElementsByTagName("a")[0].innerHTML += "<br />Alt+1"
document.getElementsByClassName("headerTinymanName")[0].style.lineHeight = "14px"
document.getElementsByClassName("headerTinymanName")[0].innerHTML += "<br />Alt+2"
document.getElementById("fbRequestsJewel").appendChild(tip("Z"))
document.getElementById("fbMessagesJewel").appendChild(tip("X"))
document.getElementById("fbNotificationsJewel").appendChild(tip("C"))
document.getElementById("fbNotificationsList").parentNode.parentNode.style.top = "0px"
document.getElementById("navSearch").appendChild(tip("V"))

var i, child_len, more_btn
window.onkeydown = function(e) {
	//console.log(e.which)

	var trigger, container, children, hover_style, n_shown
	if(document.getElementById("fbNotificationsFlyout").className.search("toggleTargetClosed") == -1) {
		container = document.getElementById("fbNotificationsList").parentNode.parentNode
		children = document.getElementById("fbNotificationsList").childNodes
		more_btn = document.getElementsByClassName("notifMorePager")[0]
		hover_style = "notifHover"
		n_shown = 7
	}
	else if (document.getElementById("fbMessagesFlyout").className.search("toggleTargetClosed") == -1) {
		container = document.getElementsByClassName("jewelContent")[0].parentNode.parentNode.parentNode.parentNode;
		children = document.getElementsByClassName("jewelContent")[0].getElementsByTagName("li")
		more_btn = document.getElementsByClassName("uiMorePager")[0]
		hover_style = "jewelItemNew"
		n_shown = 5
	}

	//ctrl+alt+
	if(e.ctrlKey && e.altKey) {
		switch(e.which) {
			//Z
			case 90:
				document.getElementById("fbRequestsJewel").getElementsByTagName("a")[0].click()
				break
			//X
			case 88:
				trigger = document.getElementById("fbMessagesJewel").getElementsByTagName("a")[0]
			//C
			case 67:
				if(!trigger) trigger = document.getElementById("fbNotificationsJewel").getElementsByTagName("a")[0]

				if ("activeElement" in document)document.activeElement.blur()

				trigger.click()
				container.style.top = "0px"

				//clear hover from all children
				for(var j=0;j<children.length;j++) {
					children[j].className = children[j].className.replace(" "+hover_style, "")
				}

				i = 0
				children[i].className += " "+hover_style
				break
			//V
			case 86:
				document.getElementById("q").focus()
				break

			//"
			case 222: document.getElementsByClassName("fbChatSidebarMessage")[0].nextSibling.getElementsByClassName("innerWrap")[0].childNodes[0].focus(); break;
			//?
			case 191: chatOnOff(0); break;
			//>
			case 190: chatOnOff(1); break;
			//<
			case 188: chatOnOff(2); break;
			//M
			case 77: chatOnOff(3); break;
			//N
			case 78: chatOnOff(4); break;
			//B
			case 66: chatOnOff(5); break;
		}
		return false;
	}
	else if(e.altKey) {

		switch(e.which) {
			//alt+1
			case 97:
				document.getElementById("navHome").getElementsByTagName("a")[0].click()
				break
			//alt+2
			case 98:
				document.getElementsByClassName("headerTinymanName")[0].parentNode.click()
				break
			//alt+↑
			case 38:
				if(i - 1 >= 0) {

					if(i % n_shown == 0) {
						var top = parseInt(container.style.top, 10)

						var nowTop = top
						for(var j=i-n_shown;j<i;j++)
							nowTop += children[j].clientHeight-1;
						
						if(nowTop > 0)nowTop = 0
						
						container.style.top = nowTop + "px"
					}

					i--;

					children[i+1].className = children[i+1].className.replace(" "+hover_style, "")
					children[i].className += " "+hover_style
				}
				break
			//alt+↓
			case 40:
				i++;

				if(i != 0) {

					children[i-1].className = children[i-1].className.replace(" "+hover_style, "")
					children[i].className += " "+hover_style

					child_len = children.length
					if(i % n_shown == 0) {
						if(container.style.top == "")container.style.top = "0px" //to avoid empty
						var top = parseInt(container.style.top, 10)

						var nowTop = top
						for(var j=i-n_shown;j<i;j++)
							nowTop -= children[j].clientHeight-1;

						container.style.top = nowTop + "px"
					}
				}
				break
			//alt+↵
			case 13:
				if(document.getElementById("fbNotificationsFlyout").className.search("toggleTargetClosed") == -1 || document.getElementById("fbMessagesFlyout").className.search("toggleTargetClosed") == -1) {
					children[i].getElementsByTagName("a")[0].target = "_blank"
					children[i].getElementsByTagName("a")[0].click()
				}
				break
		}
	}
	else if(e.ctrlKey) {
		switch(e.which) {
			//ctrl+↵
			case 13:
				if(document.getElementById("fbNotificationsFlyout").className.search("toggleTargetClosed") == -1 || document.getElementById("fbMessagesFlyout").className.search("toggleTargetClosed") == -1) {
					children[i].getElementsByTagName("a")[0].target = "_blank"
					children[i].getElementsByTagName("a")[0].click()
				}
				break
		}
	}
};

setInterval(function() {
	if(document.getElementById("fbNotificationsFlyout").className.search("toggleTargetClosed") == -1) {
		if((i+1) / document.getElementById("fbNotificationsList").childNodes.length >= 0.8) {
			document.getElementsByClassName("notifMorePager")[0].getElementsByTagName("a")[0].click()
		}
	}
	else if (document.getElementById("fbMessagesFlyout").className.search("toggleTargetClosed") == -1) {
		if((i+1) / document.getElementsByClassName("jewelContent")[0].getElementsByTagName("li").length >= 0.8) {
			document.getElementsByClassName("uiMorePager")[0].getElementsByTagName("a")[0].click()
		}
	}
	else i = 0
}, 1000);