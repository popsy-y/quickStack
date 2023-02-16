console.log("QuickStack v1.0 loaded!");

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
            let strTmp = [color(clrs)];
            let strTmp1 = [[red(strTmp), blue(strTmp), green(strTmp)],];
            reqBody = reqBodyComposer(strTmp1);
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
            let tmp = [clrs[0], clrs[1], clrs[2],];
            reqBody = reqBodyComposer(tmp);
            break;

        default:
            console.error("[ERROR] qs_paletteGenerate > argumentTypeChecker: Invalid argument type");
            break;
    }

    const newPalette = paletteRequest(reqBody);

    qs_addPalette(newPalette);
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
    // let result = [];
    // result.push(ary);
    // for (let i = 0; i < 5-ary.length; i++) {
    //     result.push("N");
    // }

    return result;
}

async function paletteRequest(clrs){
    // add return keyword here
    return fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({"model":"default"})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.log('error at color palette request to colormind API.\n'+error);
    });
}

// async function qs_paletteGenerate(clrs){
//     if (clrs === undefined) {
//         const palette = await paletteRequest();
//         console.log(palette);
//         qs_addPalette(palette);
//     }
// }

// async function paletteRequest(){
//     fetch('http://colormind.io/api/', {
//         method: 'POST',
//         body: JSON.stringify({"model":"default"})
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         return data;
//     })
//     .catch(error => {
//         console.log('error at color palette request to colormind API.\n'+error);
//     });
// }