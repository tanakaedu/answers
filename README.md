# anwers
演習の回答を共有するためのWebページを自分たちで作ろう。

# [デモページ](http://tanakaedu.github.io/answers/)
- データがオーバーしたからか、動作しなくなったので投稿機能は機能しないように変更しました。
- 投稿機能も含めてチェックする場合は、プログラムをダウンロードして、Milkcocoaで自前のアプリIDを取得して、お試しください。

# 開発環境
- 開発ツール
    - Visual Studio Community 2013
- プログラミング言語
    - JavaScript
- 情報の共有方法
    - Milkcocoa
    - Firebaseへの対応方法を[最後に追記](https://github.com/tanakaedu/answers/blob/master/README.md#firebase%E3%81%B8%E3%81%AE%E5%AF%BE%E5%BF%9C%E6%96%B9%E6%B3%95)
- 画面のレイアウト
    - Bootstrap(+jQuery)

# 開発手順
## 環境構築
- Visual Studioを起動する
- [ファイル]>[新規作成]>[Webサイト]
- [Visual C#]>[ASP.NET 空のWebサイト]>[参照]
- 適当なフォルダーを選択して、最後を「answers」などにする
- 質問が表示されるので「はい」でフォルダーを作成する
- [OK]でプロジェクトが作成されるのを待つ
以上で、環境の構築完了。

## index.htmlを作成
- [ファイル]>[新規作成]>[ファイル]を選択
- [HTML]ページを選択して、名前を「index.html」として[追加]を押す

## 必要なCSSやJavaScriptライブラリを読み込む
- [Bootstrap公式ページのGetting started](http://getbootstrap.com/getting-started/#download-cdn)からCDNのURLを確認する
- CSSを読み込むために、以下の行をコピーして、&lt;title&gt;&lt;/title&gt;の行の下に貼り付ける
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
```
- BootstrapのJavaScriptライブラリを読み込むために、以下の行をコピーして、&lt;/body&gt;の行の上に貼り付ける
```
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
```
- GoogleのCDNを[こちら](https://developers.google.com/speed/libraries/#jquery)で確認
- jQueryの2.x snippetにある以下の行をコピーして、先ほど貼り付けたbootstrap.min.jsの行の上に貼り付ける
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
```

ここまでのコードは、以下の通り。
```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
</head>
<body>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>
```

## Milkcocoaを組み込む
- https://mlkcca.com/ をWebブラウザで開く
- [チュートリアル]を選ぶ
- 以下の2行を選択して、&lt;/head&gt;の行の上に貼り付ける
```
    <script src="http://cdn.mlkcca.com/v2.0.0/milkcocoa.js"></script>
    <script src="main.js"></script>
```
- bodyの間の3行をコピーして、&lt;body&gt;の行の下に貼り付けて上書き保存する
- Visual Studioで[ファイル]>[新規作成]>[ファイル]を選択
- [JavaScript]ファイルを選択して、名前を[main.js]にして[追加]する
- Milkcocoaのページに切り替えて、[main.js]タブに切り替えて、中身を全てコピー
- Visual Studioに切り替えて、main.jsに貼り付ける
- アプリを新規登録して、そのアプリコードを1行目に反映させる(1行目のダブルクォーテーション内の最後に/があったら消しておくこと。これがあるとエラーになる)
- 上書き保存

ここまでで、Milkcocoaのチュートリアルで紹介されているチャット機能が動作するはずである。以下の手順で動作確認しよう。
- ソリューションエクスプローラーの[index.html]を右クリックして、[ブラウザーで表示]を選択
- 何か文字を入力して、[send message!]を押して、データが共有されるのを確認する

# プログラムを投稿できるように機能を拡張
入力エリアのレイアウトを変更する
- Visual Studioに切り替える
- index.htmlを開いて、&lt;body&gt;から&lt;/body&gt;の間を以下のように書き換える(*下から2行目のjQueryのバージョンが違う可能性があるので注意*）
```
    <div class="container-fluid">
        <div class="col-xs-6">
            <input type="text" class="form-control" id="nm" placeholder="名前" />
            <textarea name="" class="form-control" id="msg" cols="80" rows="20" placeholder="送信テキスト"></textarea>
            <button class="btn" name="button" onclick="clickEvent()">send message!</button>
        </div>
        <div class="col-xs-6">
            <div id="board"></div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
```
- main.jsを以下のように書き換える
- コピペの後、2行目のアプリIDをもう一度書き換える
```
var myname = "自分の名前";
var milkcocoa = new MilkCocoa('{ your-app-id }.mlkcca.com/');
/* your-app-id にアプリ作成時に発行されるapp-idを記入します */
var chatDataStore = milkcocoa.dataStore('chat');
var nameText, textArea, board;
window.onload = function () {
    nameText = document.getElementById("nm");
    textArea = document.getElementById("msg");
    board = document.getElementById("board");
    nameText.setAttribute("value", myname);

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
    chatDataStore.push({ message: text, myname: nameText.value });
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

    nameDom.innerHTML = "<strong>" + text.myname + "</strong>";
    msgDom.innerHTML = text.message;
    panelDom.appendChild(nameDom);
    panelDom.appendChild(msgDom);
    board.insertBefore(panelDom, board.firstChild);
}
```
- 上書き保存

以上で完成。ブラウザを再読み込みして、動かしてみよう。


# Firebaseへの対応方法
ここまでの作業が完了していることを前提に、Firebaseへの書き換え方をまとめる。

## index.htmlの修正
- 7行目近辺の以下のMilkcocoaのライブラリの読み込みを、Firebaseのものに差し替える
- 変更前
```
    <script src="http://cdn.mlkcca.com/v2.0.0/milkcocoa.js"></script>
```
- 変更後
```
    <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
```

## main.jsの修正
### 2行目付近
- 変更前
```
var milkcocoa = new MilkCocoa('{ your-app-id }.mlkcca.com/');
var chatDataStore = milkcocoa.dataStore('chat');
```
- 変更後
```
var myDataRef = new Firebase('https://[your-app-id].firebaseio.com/');
```
- 上記の[your-app-id]の部分は、Firebaseにsign upして、ログイン後のFirebase URLで確認して書き換える

###  12行目付近
- 以下のコードは不要なので削除
```
    //pushした順番に対して降順で取得
    milkcocoa.dataStore('chat').stream().next(function (err, data) {
        for (var i = 0  ; i < data.length ; i++) {
            addText(data[i].value);
        }
    });
```

### 18行目付近
- 変更前
```
chatDataStore.on("push", function (data) {
    addText(data.value);
});
 ```
- 変更後
```
myDataRef.on("child_added", function (data) {
    addText(data.val());
});
```

以上で、対応完了。

