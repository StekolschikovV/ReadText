jwerty.key('shift + Z', function () { chrome.runtime.sendMessage({ greeting: window.getSelection().toString(), speed: "1" }); });
jwerty.key('shift + X', function () { chrome.runtime.sendMessage({ greeting: window.getSelection().toString(), speed: "1.5" }); });
jwerty.key('shift + C', function () { chrome.runtime.sendMessage({ greeting: window.getSelection().toString(), speed: "2" }); });
jwerty.key('shift + A', function () { chrome.runtime.sendMessage({ greeting: window.getSelection().toString(), speed: "0.5" }); });
jwerty.key('shift + Q', function () { chrome.runtime.sendMessage({ greeting: window.getSelection().toString(), speed: "0.1" }); });
jwerty.key('shift + S', function () { chrome.runtime.sendMessage({ greeting: "", speed: "1" }); });