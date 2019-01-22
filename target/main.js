if (navigator.appVersion.indexOf('Win') != -1) os = 'win';
else if (navigator.appVersion.indexOf('Mac') != -1) os = 'mac';

// ---------------- selectors -------------------
// banner
const qSearch  = 'input[name="q"]';
const profile  = 'img[id^="profile_pic_header"]';
const home     = 'a[data-gt=\'{"chrome_nav_item":"home_chrome"}\']';
const timeline = 'a[data-gt=\'{"chrome_nav_item":"timeline_chrome"}\']';
const requests = 'a[name="requests"]';
const messages = 'a[name="mercurymessages"]';
const notifs   = 'a[name="notifications"]';
const creation = 'a#creation_hub_entrypoint';
const info     = 'a[aria-label="使用說明"]';

// ---------------- DOM -------------------
let $profile;
let $home;
let $timeline;
let $requests;
let $messages;
let $notifs;
let $creation;
let $info;

window.onload = () => {

  $profile  = q(profile);
  $home     = q(home);
  $timeline = q(`${timeline} span > span`);
  $requests = q(requests);
  $messages = q(messages);
  $notifs   = q(notifs);
  $creation = q(creation);
  $info     = q(info);

  // Remove unnecessary buttons
  $creation.remove();
  $info.remove();

  // ---------------- Hint Letter/Text -------------------
  let hintTextOfHome;
  let hintTextOfTimeline;
  if (os === 'win') {
    hintTextOfHome     = 'Ctrl-Alt+U';
    hintTextOfTimeline = 'Ctrl-Alt+Y';
  } else {
    hintTextOfHome     = '⌘-Ctrl+U';
    hintTextOfTimeline = '⌘-Ctrl+Y';
  }

  $profile.style.float = 'left';
  $home.style.lineHeight = '14px';
  $home.innerHTML += '<br />' + hintTextOfHome;
  $timeline.style.lineHeight = '14px';
  $timeline.innerHTML = $timeline.textContent + '<br />' + hintTextOfTimeline;
  $requests.parentNode.appendChild(createHintLetter('I'));
  $messages.parentNode.appendChild(createHintLetter('O'));
  $notifs.parentNode.appendChild(createHintLetter('P'));

  setInterval(function() {
    q(qSearch).setAttribute('placeholder', '搜尋 ⌘-Ctrl+K');
    ['#BuddylistPagelet', '.fbChatSidebar'].map((selector) => {
      q(selector)
        .querySelector('#chatsidebarsheet')
        .nextSibling
        .querySelector('input[type="text"]')
        .setAttribute('placeholder', '⌘-Ctrl+J');
    });
  }, 1000);

  // highlight message entry
  Array.prototype.map.call(qo('a.messagesContent'), (entry) => {
    entry.addEventListener('focusin', () => {
      entry.style.backgroundColor = '#f6f7f9';
    });
    entry.addEventListener('focusout', () => {
      entry.style.backgroundColor = '';
    });
  });
};

let currentMode;
let currentIndex = 0;

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
        triggerMouseEvent($timeline, 'click');
        break;
      //U
      case 85:
        triggerMouseEvent($home, 'click');
        break;
      //I
      case 73:
        triggerMouseEvent($requests, 'click');
        break;
      //O
      case 79:
        currentMode = 'MercuryJewel';
        triggerMouseEvent($messages, 'click');
        break;
      //P
      case 80:
        currentMode = 'fbNotifications';
        triggerMouseEvent($notifs, 'click');
        break;
      //J
      case 74:

        let $chatDialogContainer;
        let $chatDialogToggler;
        let $chatDialogTitlebar;
        $chatDialogContainer = q('div#fbDockChatBuddylistNub');
        $chatDialogToggler   = q('div#BuddylistPagelet a.fbNubButton');
        $chatDialogTitlebar  = q('div#BuddylistPagelet div.titlebarLabel');

        // toggle chat dialog
        if ($chatDialogContainer.className.search('openToggler') === -1) {
          triggerMouseEvent($chatDialogToggler, 'click');
        } else {
          triggerMouseEvent($chatDialogTitlebar, 'click');
        }

        const chatSidebar = q('div.fbChatSidebar');
        let parentNodeId;
        if (
          chatSidebar === null ||
          chatSidebar.className.search('hidden_elem') !== -1
        ) {
          parentNodeId = '#BuddylistPagelet';
        } else {
          parentNodeId = '.fbChatSidebar';
        }
        const chatSearch       = q(`${parentNodeId} #chatsidebarsheet`).nextSibling;
        const chatSearchInput  = chatSearch.querySelector('input[type="text"]');
        if (chatSearch) {
          chatSearchInput.focus();
        }
        break;
      //K
      case 75:
        q(qSearch).focus();
        break;
      //\/
      case 191:
        toggleChatbox(0);
        break;
      //.
      case 190:
        toggleChatbox(1);
        break;
      //,
      case 188:
        toggleChatbox(2);
        break;
      //M
      case 77:
        toggleChatbox(3);
        break;
      //N
      case 78:
        toggleChatbox(4);
        break;
      //B
      case 66:
        toggleChatbox(5);
        break;
    }
    return false;
  } else if ((os == 'win' && e.altKey) || (os == 'mac' && e.shiftKey)) {
    // message selection
    if (currentMode == 'MercuryJewel') {
      switch (e.which) {
        // arrow up
        case 38:
          if (currentIndex > 0) currentIndex--;
          break;
        // arrow down
        case 40:
          currentIndex++;
          break;
      }
      qo('a.messagesContent')[currentIndex].focus();
    } else if (currentMode == 'fbNotifications') {
      // notification selection
      switch (e.which) {
        // arrow up
        case 38:
          if (currentIndex > 0) currentIndex--;
          break;
        // arrow down
        case 40:
          currentIndex++;
          break;
      }
      qo('a[data-testid="notif_list_item_link"]')[currentIndex].focus();
    }
  }
};

function triggerMouseEvent(node, eventType) {
  const clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

function createHintLetter (val) {
  const div = document.createElement('div');
  div.setAttribute('id', `shortcut-${val}`);
  div.setAttribute('style', `
    position: absolute;
    padding: 2px;
    right: 0px;
    bottom: 0px;
    font-size: 10px;
    line-height: 1;
    background-color: #3b5998;
    color: white;
    z-index: 9;
  `);
  div.textContent = val;
  return div;
}

function toggleChatbox (offset) {
  const tabs = qo('#ChatTabsPagelet div.fbNub');
  const tab = tabs[tabs.length - offset - 1];

  if (tab) {
    triggerMouseEvent(tab.querySelector('div.titlebar').firstChild, 'click');
  }
}

function q (selector) {
  return document.querySelector(selector);
}

function qo (selector) {
  return document.querySelectorAll(selector);
}
