if (navigator.appVersion.indexOf("Win")!=-1)os = "win"
else if (navigator.appVersion.indexOf("Mac")!=-1)os = "mac"

var $home = $("a[data-gt='{\"chrome_nav_item\":\"home_chrome\"}']");
var $timeline = $("a[data-gt='{\"chrome_nav_item\":\"timeline_chrome\"}']");

// Quick Launch Hint Text
var tip = function(val) { return "<div style='position: absolute; padding: 2px; right: 0px; bottom: 0px; font-size: 10px; line-height: 1; background-color: #3b5998; color: white;'>"+val+"</div>" };

if(os == "win") {
    $("#fbRequestsJewel").append(tip("Z"));
    hint1 = "Alt+1";
    hint2 = "Alt+2";
}
else {
    hint1 = "Ctl-Opt+1";
    hint2 = "Ctl-Opt+2";
}

$(document).ready(function() {
    $($("a.jewelButton")[1]).parent().append(tip("X"));
    $("#fbNotificationsJewel").append(tip("C"));
    $("#q").parent().append(tip("V"));
    setTimeout(function() {
        $(".fbChatSidebarMessage").next().find("input[type='text']").parent().append(tip("F"));
        $("img[id^='profile_pic_header']").css("float", "left");
        $timeline.append("<br />"+hint2).css("line-height", "14px");
        $home.append("<br />"+hint1).css("line-height", "14px");
    }, 1000);
});

// Chatbox Trigger
var chatbox = function(offset) {
    var tabs = $("#ChatTabsPagelet div.fbNub");
    var tab = tabs[tabs.length - offset - 1];
    if(tab === undefined)return ;

    var $tab = $(tab);
    if($tab.prop("class").search("opened") != -1)
        $tab.find("div.titlebar").click();
    else
        $tab.find("div.fbChatTab").click();
};

var list_mode
var list_index = 0

// Keydown Event
window.onkeydown = function(e) {
    if(
        (
            os == "win" &&
            e.ctrlKey && e.altKey
        ) ||
        (
            os == "mac" &&
            e.metaKey && e.ctrlKey
        )
    ) {
        switch(e.which) {
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
        }
        return false;
    }
    else if(
        (os == "win" && e.altKey ) ||
        (os == "mac" && e.shiftKey)
    ) {
        // message selection
        if(list_mode == "MercuryJewel") {
            switch(e.which) {
                // arrow up
                case 38:
                    if(list_index > 0)list_index--
                    break;
                // arrow down
                case 40:
                    list_index++
                    break;
            }
            $($("a.messagesContent")[list_index])
                .focusin(function() {
                    $(this).css("background-color", "#f6f7f9")
                })
                .focusout(function() {
                    $(this).css("background-color", "")
                })
                .focus()
        }
        // notification selection
        else if(list_mode == "fbNotifications") {
            switch(e.which) {
                // arrow up
                case 38:
                    if(list_index > 0)list_index--
                    break;
                // arrow down
                case 40:
                    list_index++
                    break;
            }
            $("ul[data-testid='react_notif_list'] li div.anchorContainer")
                .children()
                .children()
                .closest("a:first-child")[list_index]
                .focus();
        }
    }
};
