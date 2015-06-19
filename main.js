var myname = "自分の名前";
var myDataRef = new Firebase('https://[your-app-id].firebaseio.com/');
/* your-app-id にアプリ作成時に発行されるapp-idを記入します */
var nameText, textArea, board;
window.onload = function () {
    nameText = document.getElementById("nm");
    textArea = document.getElementById("msg");
    board = document.getElementById("board");
    nameText.setAttribute("value", myname);
}

function clickEvent() {
    var text = textArea.value;
    sendText(text);
}

function sendText(text) {
    myDataRef.push({ message: text, myname: nameText.value });
    console.log("送信完了!");
    textArea.value = "";
}

myDataRef.on("child_added", function (data) {
    addText(data.val());
});

function addText(text) {
    var panelDom = document.createElement("div");
    var nameDom = document.createElement("div");
    var msgDom = document.createElement("pre");
    panelDom.className = "panel panel-primary";
    nameDom.className = "panel-heading";

    nameDom.innerHTML = "<strong>" + text.myname + "</strong>";
    msgDom.innerHTML = text.message;
    panelDom.appendChild(nameDom);
    panelDom.appendChild(msgDom);
    board.insertBefore(panelDom, board.firstChild);
}
