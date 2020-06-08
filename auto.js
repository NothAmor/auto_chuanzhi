const class_list = document.getElementsByClassName("point-progress-box");
const player = document.getElementsByTagName("video")[0].id;
const class_name = document.getElementsByClassName("point-text ellipsis");
$(player).click();
let arr = [];
for(let i in class_list) {
    arr.push(class_list[i]);
}
let i = 0;
const timer = setInterval(function() {
    let fuck = arr[i].innerHTML.replace(/\ +/g,"").replace(/[\r\n]/g,"");
    let shit = class_name[i].innerHTML.replace(/\ +/g,"").replace(/[\r\n]/g,"");
    if(fuck.includes("100%") && i == (class_list.length - 1)) {
        clearInterval("timer");
        alert("当前页所有视频均已播放完成");
    }else if(fuck.includes("100%")) {
        arr[i + 1].click();
        $(player).click();
        i++;
    }
    if(shit.includes("习题")){
        let audio = new Audio("http://dict.youdao.com/dictvoice?audio=city");
        audio.play();
    }
}, 1000);

function $(id) {
    return document.getElementById(id);
}
