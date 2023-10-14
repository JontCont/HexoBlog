---
title: 【HTML】套件-電子簽名 signature
date: 2023-09-02 22:53:07
categories: 
  - 前端技術
  - html
tags: 
  - front-end
  - 前端
cover: /image/20230902_22-53-07.png
---

這篇是多年前要製作電子簽名的時候，找到的一個套件，剛好文章沒有紀錄，所以就在這邊紀錄一下。

- 官方範例 : [Signature Pad demo](https://szimek.github.io/signature_pad/)
- Npm : [signature_pad](https://www.npmjs.com/package/signature_pad)

## signature pad
這裡範例只使用 ```signature_pad.umd.js``` 並用javascript 去實作。

### html 製作

這邊我分別使用了兩個 div 來製作，一個是用來放置簽名的區域，另一個是用來放置簽名的畫布。

```html
    <div id="signature-pad" class="signature-pad">
        <div class="signature-pad--body">
            <canvas></canvas>
        </div>
        <!--功能列區塊 -->
        <!--..... -->
    </div>
```

功能部份我切分成兩個區塊，一個是功能列，另一個是存檔列。

```html
    <div class="toolslist">
        <div class="func-itme">
            <label for="">功能列</label>
            <button type="button" class="button clear" data-action="clear">Clear</button>
            <button type="button" class="button" data-action="change-color">Change color</button>
            <button type="button" class="button" data-action="undo">Undo</button>
        </div>
        <div class="save-item">
            <label for="">存檔列</label>
            <button type="button" class="button save" data-action="save-png">Save as PNG</button>
            <button type="button" class="button save" data-action="save-jpg">Save as JPG</button>
            <button type="button" class="button save" data-action="save-svg">Save as SVG</button>
        </div>
    </div>
```

### css 製作
css依據自己喜好設定，若沒有想每可以直接使用
```css
body{
    background-color: #eee;
}
.toolslist{
    margin: 10px;
}
.func-itme{display: inline-block;}
.save-item{margin-top: 5px;}
.signature-pad {
    width: 400px;
    margin: auto;
    height: auto;
  }
  
  .signature-pad--body {
    min-height: 300px;
  }
  
  .signature-pad--actions {
    overflow: hidden;
  }
  
  .signature-pad--actions > div:first-child {
    float: left;
  }
  
  .signature-pad--actions > div:last-child {
    float: right;
  }
  
  .signature-pad--body {
    position: relative;
    /* width: 25%; */
    border: 1px solid #aaa;
    /* -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1; */
  }
  
  .signature-pad--body
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }
  
```

### javascript 
創建畫布區塊
```js
// 簽名區域
var wrapper = document.getElementById("signature-pad");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)'
});
```

設定功能列使用方式如下
```js
//清除
var clearButton = wrapper.querySelector("[data-action=clear]");
clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

//變更顏色
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
changeColorButton.addEventListener("click", function (event) {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var color = "rgb(" + r + "," + g + "," + b +")";

  signaturePad.penColor = color;
});

//還原
var undoButton = wrapper.querySelector("[data-action=undo]");
undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});
```

設定存檔列使用方式如下
```js
var savePNGButton = wrapper.querySelector("[data-action=save-png]");
savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL();
    download(dataURL, "signature.png");
  }
});

var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("image/jpeg");
    download(dataURL, "signature.jpg");
  }
});


var saveSVGButton = wrapper.querySelector("[data-action=save-svg]");
saveSVGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL('image/svg+xml');
    download(dataURL, "signature.svg");
  }
});

// 下載
function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

//產生blob
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
```

## 參考文件
1. [jQuery plugin - Signature Pad](https://dotblogs.com.tw/sungnoone/2014/08/08/146202)
2. [html-signature](https://github.com/JontCont/html-signature)