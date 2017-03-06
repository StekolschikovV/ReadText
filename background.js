Speak = {
    fullString: "",
    status: false,
    time: 500,
    speed: 1,
    Start: function () {
        setInterval(function () {
            chrome.tts.isSpeaking(function (t) {
                0 == t && Speak.fullString.length > 0 && Speak.ReadText(Speak.fullString)
            })
        }, this.time);

        chrome.contextMenus.removeAll(function () { });
        chrome.contextMenus.create({
            'type': 'normal',
            'title': 'ОЗВУЧИТЬ ТЕКСТ',
            'contexts': ['selection'],
            'onclick': function (info, tab) {
                Speak.ReadText(info.selectionText);
            }
        });
    },
    ReadText: function (text) {
        text = text.replace(/[\/\]\[\{\}\»\«\-\)\(\—\?\!]/g, '');
        // text = text.replace(/((?:(url|url=|http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi, '');
        // text = text.replace(/[\http:\https:\url\url=\www]/g,'');
        // text = text.replace(/^(\[url=)?(http?:\/\/)?(www\.|\S+?\.)(\S+?\.)?\S+$\s*/mg, '');
        console.log("444")
        var res = text.split(" ");
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            if (res[i] == "") {
                res.splice(i, 1);
                i--;
            }
        }
        if (res.length > 20) {
            Speak.fullString = res.slice(20).join(' ');
            this.time = 0;
        } else {
            Speak.fullString = 0;
            this.time = 500;
        }
        console.log(Speak.speed);
        chrome.tts.speak(res.slice(0, 20).join(' ') , {rate: Speak.speed});
    }
}

window.onload = function () {
    Speak.Start();

};
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        Speak.speed = parseFloat(request.speed);
        Speak.ReadText(request.greeting);
    });