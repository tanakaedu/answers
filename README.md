# anwers
演習の回答を共有するためのWebページを自分たちで作ろう。

# 開発環境
- プログラミング言語
    - JavaScript
- 情報の共有方法
    - Milkcocoa
- 画面のレイアウト
    - Bootstrap

# 開発手順
## 環境構築
- Visual Studioを起動する
- [ファイル]>[新規作成]>[Webサイト]
- [Visual C#]>[ASP.NET 空のWebサイト]>[参照]
- 適当なフォルダーを選択して、最後に「answers」とする
- 質問が表示されるので「はい」でフォルダーを作成する
- [OK]でプロジェクトが作成されるのを待つ
- メニューから[ツール]>[NuGetパッケージマネージャー]>[ソリューションのNuGetパッケージの管理]を選択
- 画面左から[オンライン]を選択
- 右上の[オンラインの検索]に「jquery」と入力して、結果が表示されるまで待つ
- [jQuery]を選択して、[インストール]を押す
- [OK]でインストールを進める
- 右上の[オンラインの検索]に「less」と入力して、結果が表示されるまで待つ
- [Bootstrap Less Source]が表示されたら、[インストール]を押す
- [OK]でインストールを進める
- [閉じる]でウィンドウを閉じる
以上で、環境の構築完了。

## LESSをビルドできるようにする
- [ツール]>[拡張機能と更新プログラム]>[オンライン]を選択
- 右上の検索ボックスに[Web Essentials 2013]を入力して、検索に表示されたら[ダウンロード]する
- ダウンロードが終わったら[インストール]を押す
- インストールが終わると、Webブラウザでページが表示されるが、これで完了なのでブラウザは閉じてよい
- Visual Studioを[今すぐ再起動]する


## index.htmlを作成
- [ファイル]>[新規作成]>[ファイル]を選択
- [HTML]ページを選択して、名前を「index.html」として[追加]を押す
- [ソリューションエクスプローラー]から[Scripts]を開き、[jquery-x.x.x.min.js]と[bootstrap.min.js]をドラッグして、ソース上の<body>～</body>の間にドロップする
- [ソリューションエクスプローラー]から[Content]>[bootstrap]を開き、[bootstrap.less]をダブルクリックして呼び出す
- 保存ボタンを押すと、lessファイルがビルドされる
- [index.html]に切り替える
- 作成された[bootstrap.css]を開いて、[bootstrap.min.css]をドラッグして、</title>の後ろにドロップする

## Milkcocoaを組み込む
- https://mlkcca.com/ をWebブラウザで開く
- [チュートリアル]を選ぶ
- 以下の2行を選択して、</head>の上に貼り付ける
```
    <script src="http://cdn.mlkcca.com/v2.0.0/milkcocoa.js"></script>
    <script src="main.js"></script>
```
- bodyの間の3行をコピーして、<body>の下の行に貼り付ける
- Visual Studioで[ファイル]>[新規作成]>[ファイル]を選択
- [JavaScript]ファイルを選択して、名前を[main.js]にして[追加]する
- Milkcocoaのページに切り替えて、[main.js]タブに切り替えて、中身を全てコピー
- Visual Studioに切り替えて、main.jsに貼り付ける
- 1行目を指示されたものに書き換える
- ソリューションエクスプローラーの[index.html]を右クリックして、[ブラウザーで表示]を選択
- 何か文字を入力して、[send message!]を押して、データが共有されるのを確認する。

# プログラムを投稿できるように機能を拡張
入力エリアのレイアウトを変更する
- Visual Studioに切り替える
- index.htmlを開いて、<body>から</body>の間を以下のように書き換える
```
    <div class="container">
        <textarea name="" id="msg" cols="80" rows="10"></textarea>
    </div>
    <button name="button" onclick="clickEvent()">send message!</button>

    <div id="board"></div>

    <script src="Scripts/jquery-1.9.0.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
```
- main.jsを以下のように書き換える(コピペでよい)
```
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

```
- 上書き保存

以上で完成。ブラウザを再読み込みして、動かしてみよう。


