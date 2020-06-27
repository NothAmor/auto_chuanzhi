// ==UserScript==
// @name         传智自动播放视频
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  自动播放传智播客课程视频, 开发者博客:http://www.nothamor.cn
// @author       nothamor
// @match        *.ityxb.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        const CLASS_LIST = document.getElementsByClassName("point-progress-box");
        const CLASS_NAME = document.getElementsByClassName("point-text ellipsis");
        let question_text = document.getElementsByTagName("pre")[0];
        let player = document.getElementsByTagName("video")[0].id;
        let question_text_value;
        document.getElementById(player).click();
        let counter = 0;
        const TIMER = setInterval(function () {
            let percent = CLASS_LIST[counter].innerHTML.replace(/\ +/g, "").replace(/[\r\n]/g, "");
            let title_name = CLASS_NAME[counter].innerHTML.replace(/\ +/g, "").replace(/[\r\n]/g, "");
            if (percent.includes("100%") && counter == (CLASS_LIST.length - 1)) {
                clearInterval(TIMER);
                alert("当前页所有视频均已播放完成");
            } else if (percent.includes("100%")) {
                CLASS_LIST[counter + 1].click();
                player = document.getElementsByTagName("video")[0].id;
                document.getElementById(player).click();
                counter++;
            }
            if (title_name.includes("习题")) {
                question_text = document.getElementsByTagName("pre")[0];
                question_text_value = question_text.innerHTML;
                console.log("正在查题: " + question_text_value);
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://cx.icodef.com/wyn-nb',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Authorization': '',
                    },
                    data: 'question=' + encodeURIComponent(question_text_value),
                    onload: function(xhr) {
                        if (xhr.status == 200) {
                            var obj = $.parseJSON(xhr.responseText.replace(/^操作数据失败！/,'')) || {};
                            obj.answer = obj.data;
                            console.log("答案为:" + obj.answer);
                            if (obj.code) {
                            } else {
                                console.log('服务器繁忙，正在重试...');
                            }
                        } else if (xhr.status == 403) {
                            console.log('请求过于频繁，建议稍后再试');
                        } else {
                            console.log('服务器异常，正在重试...');
                        }
                    }
                });
            }
        }, 1000);
    }, 5000);
})();
