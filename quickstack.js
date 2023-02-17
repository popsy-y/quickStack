console.log("QuickStack v0.9 loaded!");

// --------------------
//        GRID
// --------------------
function qs_gridFixed(x, y, gapHor, gapVert, cols, rows){
    let result = [];

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let tmp = {
                'x': x+gapHor*i,
                'y': y+gapVert*j,
            };
            result.push(tmp);
        }
    }

    return result;
}

function commonResponsiveScatter(x, y, gridWidth, gridHeight, cols, rows){
    let result = [];

    const gapHor = gridWidth/cols;
    const gapVert = gridHeight/rows;
    const offsetHor = gapHor/2;
    const offsetVert = gapVert/2;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let tmp = {
                'x': x+offsetHor+gapHor*i,
                'y': y+offsetVert+gapVert*j,
            };
            result.push(tmp);
        }
    }

    return result;
}

function qs_gridResponsive(x, y, width, height, cols, rows){
    let result = commonResponsiveScatter(x, y, width, height, cols, rows)
    return result;
}

function qs_gridCanvas(paddingHor, paddingVert, cols, rows){
    const gridWidth = width - paddingHor*2;
    const gridHeight = height - paddingVert*2;

    let result = commonResponsiveScatter(paddingHor, paddingVert, gridWidth, gridHeight, cols, rows);
    return result;
}

function qs_gridRadial(x, y, radius, elements){
    const angle = 360/elements;

    let result = [];

    for (let i = 0; i < elements; i++) {
        let tmp = {
            'x': x+radius*cos(radians(angle*i)),
            'y': y+radius*sin(radians(angle*i)),
        };
        result.push(tmp);
    }

    return result;
}

// --------------------
//    COLOR PALETTES
// --------------------
let qsClr = [];

function qs_showPalettes(){
    return qsClr;
}

function qs_addPalette(palette){
    let tmp = [];    

    for (let i = 0; i < palette.length; i++) {
        tmp.push(color(palette[i]));
    }

    qsClr.push(tmp);
    return true;
}

function qs_deletePalette(index){
    if (index > qsClr.length) {
        console.error("[ERROR] qs_deletePalette: Invalid palette index");
    }else{
        qsClr.splice(index, 1);
    }

    return true;
}

function qs_addColor(index, clr){
    if (index > qsClr.length) {
        console.error("[ERROR] qs_addColor: Invalid palette index");
    }else{
        qsClr[index].push(color(clr));
    }

    return true;
}

function qs_deleteColor(paletteIndex, colorIndex){
    if (paletteIndex > qsClr.length) {
        console.error("[ERROR] qs_deleteColor: Invalid palette index");
    }else if(colorIndex > qsClr[paletteIndex].length){
        console.error("[ERROR] qs_deleteColor: Invalid color index");
    }else{
        qsClr[paletteIndex].splice(colorIndex, 1);
    }

    return true;
}

function qs_pickPalette(index){
    if (index > qsClr.length) {
        console.error("[ERROR] qs_pickPalette: Invalid palette index");
    }else{
        return qsClr[index];
    }

    return false;
}

function qs_rndPalette(){
    return qsClr[Math.floor(Math.random()*qsClr.length)];
}

function qs_pickColor(paletteIndex, colorIndex){
    if (paletteIndex > qsClr.length) {
        console.error("[ERROR] qs_pickColor: Invalid palette index");
    }else if(colorIndex > qsClr[paletteIndex].length){
        console.error("[ERROR] qs_pickColor: Invalid color index");
    }else{
        return qsClr[paletteIndex][colorIndex];
    }

    return false;
}

function qs_rndPaletteColor(index){
    if (index > qsClr.length) {
        console.error("[ERROR] qs_rndPaletteColor: Invalid palette index");
    }else{
        return qsClr[index][Math.floor(Math.random()*qsClr[index].length)];
    }

    return false;
}

function qs_rndColor(){
    const paletteIndex = Math.floor(Math.random()*qsClr.length);
    const colorIndex = Math.floor(Math.random()*qsClr[paletteIndex].length);

    return qsClr[paletteIndex][colorIndex];
}

async function qs_paletteGenerate(clrs){
    let reqBody;

    switch (argumentTypeChecker(clrs)) {
        case "str":
            console.log(clrs);
            // あとはカラーパレット生成機能で完成！
            let strTmpAry = [];
            let strTmp = color(clrs);
            strTmpAry.push([red(strTmp), green(strTmp), blue(strTmp)]);
            console.log(strTmpAry);
            reqBody = reqBodyComposer(strTmpAry);
            break;

        case "plt":
            if (clrs.length > 4) {
                console.error("[ERROR] qs_paletteGenerate: Too many colors in one palette");
            }else{
                let tmp = clrs;
                reqBody = reqBodyComposer(tmp);
            }
            break;

        case "rgb":
            let rgbTmpAry = [];
            rgbTmpAry.push([clrs[0], clrs[1], clrs[2],]);
            reqBody = reqBodyComposer(rgbTmpAry);
            break;

        default:
            console.error("[ERROR] qs_paletteGenerate > argumentTypeChecker: Invalid argument type");
            break;
    }

    console.log([reqBody]);

    // const newPalette = paletteRequest([reqBody]);

    paletteRequest(reqBody);

    // qs_addPalette(newPalette);
    return true;
}

function argumentTypeChecker(target){
    if (typeof target == "string") {
        return "str";
    }else if (typeof target == "object") {
        if (typeof target[0] == "object") {
            return "plt";
        }else{
            return "rgb";
        }
    }

    return false;
}

function reqBodyComposer(ary){
      let blackets = [];
      for (let i = 0; i < 5-ary.length; i++) {
        blackets.push("N");
      }
      
      let result = ary.concat(blackets);
      console.log(result);

    return result;
}

// async function paletteRequest(clrs){
//     let resClone = "";
//     // add return keyword here
//     return fetch('http://colormind.io/api/', {
//         method: 'POST',
//         body: JSON.stringify({"input":clrs,"model":"default"})
//     })
//     .then(function (response){
//         resClone = response;
//         // return JSON.parse(response);
//         return response.json();
//         // ここでコケる　<html><h1>internal server error</h1>みたいなのがresponseに入ってるっぽい　なんで？
//         // 下の公式ページから持ってきたサンプルだとうまくいく　色が若干変わるのは仕様っぽい
//         // console.log(response.json());
//     })
//     // .then(response => response.json())
//     .then(data => {
//         console.log(JSON.stringify(data));
//         return data;
//     })
//     .catch(error => {
//         console.error('error at color palette request to colormind API.\n'+error);
//         console.log(resClone);
//     });
// }

// async function paletteRequest(clrs){
//     let palette;
//     var url = "http://colormind.io/api/";
//     var data = {
//         model : "default",
//         input : clrs
//     }

//     var http = new XMLHttpRequest();

//     http.onreadystatechange = function() {
//         if(http.readyState == 4 && http.status == 200) {
//             console.log("before parse");
//             console.log(http.responseText);
//             palette = JSON.parse(http.responseText).result;
//             console.log("after parse");
//             qs_addPalette(palette);
//             console.log(palette);

//             return true;
//         }
//     }

//     http.open("POST", url, true);
//     await http.send(JSON.stringify(data));

//     return palette;
// }

function paletteRequest(clrs){
    var url = "http://colormind.io/api/";
    var data = {
        model : "default",
        input : clrs
    };

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var palette = JSON.parse(http.responseText).result;
            qs_addPalette(palette);
            qs_showPalettes();
            console.log(palette);
        }
    }

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}