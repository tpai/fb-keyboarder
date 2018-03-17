if (navigator.appVersion.indexOf('Win') != -1) os = 'win';
else if (navigator.appVersion.indexOf('Mac') != -1) os = 'mac';

var $home = $('a[data-gt=\'{"chrome_nav_item":"home_chrome"}\']');
var $timeline = $("a[title='個人檔案']").find('span > span');

// Quick Launch Hint Text
var tip = function(val) {
  return `<div id='shortcut-${val}' style='
      position: absolute;
      padding: 2px;
      right: 0px;
      bottom: 0px;
      font-size: 10px;
      line-height: 1;
      background-color: #3b5998;
      color: white;
      z-index: 9;
    '>
    ${val}
    </div>`;
};

if (os == 'win') {
  $('#fbRequestsJewel').append(tip('Z'));
  hint1 = 'Ctrl-Alt+U';
  hint2 = 'Ctrl-Alt+Y';
} else {
  hint1 = '⌘-Ctrl+U';
  hint2 = '⌘-Ctrl+Y';
}

$(document).ready(function() {
  $($('a.jewelButton')[1])
    .parent()
    .append(tip('O'));
  $('#fbNotificationsJewel').append(tip('P'));
  $('#fbRequestsJewel').append(tip('I'));
  $("img[id^='profile_pic_header']").css('float', 'left');
  $timeline
    .html($timeline.text() + '<br />' + hint2)
    .css('line-height', '14px');
  $home.append('<br />' + hint1).css('line-height', '14px');

  setInterval(function() {
    $("input[name='q']").prop('placeholder', '搜尋 ⌘-Ctrl+K');
    $('#chatsidebarsheet')
      .next()
      .find("input[type='text']")
      .prop('placeholder', '⌘-Ctrl+J');
  }, 1000);
});

// Chatbox Trigger
var chatbox = function(offset) {
  var tabs = $('#ChatTabsPagelet div.fbNub');
  var tab = tabs[tabs.length - offset - 1];
  if (tab === undefined) return;

  var $tab = $(tab);
  if ($tab.prop('class').search('opened') != -1)
    triggerMouseEvent($tab.find("div[role='heading']")[0], 'mouseup');
  else triggerMouseEvent($tab.find("div[role='button']")[0], 'mouseup');
};

var list_mode;
var list_index = 0;

// Keydown Event
window.onkeydown = function(e) {
  if (
    (os == 'win' && e.ctrlKey && e.altKey) ||
    (os == 'mac' && e.metaKey && e.ctrlKey)
  ) {
    console.log(e.which);
    switch (e.which) {
      //Y
      case 89:
        $('a[title="個人檔案"]')[0].click();
        break;
      //U
      case 85:
        $("div[data-click='home_icon']")
          .find('a')[0]
          .click();
        break;
      //I
      case 73:
        $('a.jewelButton')[0].click();
        break;
      //O
      case 79:
        list_mode = 'MercuryJewel';
        $('a.jewelButton')[1].click();
        break;
      //P
      case 80:
        list_mode = 'fbNotifications';
        $('a.jewelButton')[2].click();
        break;
      //J
      case 74:
        $('#chatsidebarsheet')
          .next()
          .find("input[type='text']")
          .focus();
        break;
      //K
      case 75:
        $("input[name='q']").focus();
        break;
      //\/
      case 191:
        chatbox(0);
        break;
      //.
      case 190:
        chatbox(1);
        break;
      //,
      case 188:
        chatbox(2);
        break;
      //M
      case 77:
        chatbox(3);
        break;
      //N
      case 78:
        chatbox(4);
        break;
      //B
      case 66:
        chatbox(5);
        break;
    }
    return false;
  } else if ((os == 'win' && e.altKey) || (os == 'mac' && e.shiftKey)) {
    // message selection
    if (list_mode == 'MercuryJewel') {
      switch (e.which) {
        // arrow up
        case 38:
          if (list_index > 0) list_index--;
          break;
        // arrow down
        case 40:
          list_index++;
          break;
      }
      $($('a.messagesContent')[list_index])
        .focusin(function() {
          $(this).css('background-color', '#f6f7f9');
        })
        .focusout(function() {
          $(this).css('background-color', '');
        })
        .focus();
    } else if (list_mode == 'fbNotifications') {
      // notification selection
      switch (e.which) {
        // arrow up
        case 38:
          if (list_index > 0) list_index--;
          break;
        // arrow down
        case 40:
          list_index++;
          break;
      }
      $("ul[data-testid='react_notif_list'] li div.anchorContainer")
        .children()
        .children()
        .closest('a:first-child')
        [list_index].focus();
    }
  }
};

function triggerMouseEvent(node, eventType) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}
