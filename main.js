var myname = "自分の名前";
var milkcocoa = new MilkCocoa('{ your-app-id }.mlkcca.com/');
/* your-app-id にアプリ作成時に発行されるapp-idを記入します */
var chatDataStore = milkcocoa.dataStore('chat');
var textArea, board;
window.onload = function () {
    textArea = document.getElementById("msg");
    board = document.getElementById("board");
    //pushした順番に対して降順で取得
    milkcocoa.dataStore('chat').stream().next(function (err, data) {
        for (var i = 0  ; i < data.length ; i++) {
            addText(data[i].value);
        }
    });
}

function clickEvent() {
    var text = textArea.value;
    sendText(text);
}

function sendText(text) {
    chatDataStore.push({ message: text ,myname: myname});
    console.log("送信完了!");
    textArea.value = "";
}

chatDataStore.on("push", function (data) {
    addText(data.value);
});

function addText(text) {
    var panelDom = document.createElement("div");
    var nameDom = document.createElement("div");
    var msgDom = document.createElement("pre");
    panelDom.className = "panel panel-primary";
    nameDom.className = "panel-heading";

    nameDom.innerHTML = "<strong>"+text.myname+"</strong>";
    msgDom.innerHTML = text.message;
    panelDom.appendChild(nameDom);
    panelDom.appendChild(msgDom);
    board.insertBefore(panelDom, board.firstChild);
}
