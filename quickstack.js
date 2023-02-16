console.log("QuickStack v1.0 loaded!");

// -----------
//    GRID
// -----------
function gridFixed(x, y, gapHor, gapVert, cols, rows){
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

function gridResponsive(x, y, width, height, cols, rows){
    let result = commonResponsiveScatter(x, y, width, height, cols, rows)
    return result;
}

function gridCanvas(paddingHor, paddingVert, cols, rows){
    const gridWidth = width - paddingHor*2;
    const gridHeight = height - paddingVert*2;

    let result = commonResponsiveScatter(paddingHor, paddingVert, gridWidth, gridHeight, cols, rows);
    return result;
}