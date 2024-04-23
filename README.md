## 概要
### 名称
QuickStack  
関数名の干渉を防ぐため、このライブラリで追加される関数名にはプレフィックス"qs_"が付けられます。
### 注意事項
サイズや距離などを指定する場合、特に注意書きが無い限り単位にはpxが使用されます。

## 機能一覧
- [概要](#概要)
	- [名称](#名称)
	- [注意事項](#注意事項)
- [機能一覧](#機能一覧)
	- [Grid](#grid)
		- [qs\_gridFixed](#qs_gridfixed)
			- [概要](#概要-1)
			- [構文](#構文)
			- [引数](#引数)
		- [qs\_gridResponsive](#qs_gridresponsive)
			- [概要](#概要-2)
			- [構文](#構文-1)
			- [引数](#引数-1)
		- [qs\_gridCanvas](#qs_gridcanvas)
			- [概要](#概要-3)
			- [構文](#構文-2)
			- [引数](#引数-2)
		- [qs\_gridRadial](#qs_gridradial)
			- [概要](#概要-4)
			- [構文](#構文-3)
			- [引数](#引数-3)
			- [備考](#備考)
	- [ColorPalettes](#colorpalettes)
		- [qs\_showPalettes](#qs_showpalettes)
			- [概要](#概要-5)
		- [qs\_addPalette](#qs_addpalette)
			- [概要](#概要-6)
			- [引数](#引数-4)
		- [qs\_deletePalette](#qs_deletepalette)
			- [概要](#概要-7)
			- [引数](#引数-5)
		- [qs\_addColor](#qs_addcolor)
			- [概要](#概要-8)
			- [引数](#引数-6)
		- [qs\_deleteColor](#qs_deletecolor)
			- [概要](#概要-9)
			- [引数](#引数-7)
		- [qs\_pickPalette](#qs_pickpalette)
			- [概要](#概要-10)
			- [引数](#引数-8)
		- [qs\_rndPalette](#qs_rndpalette)
			- [概要](#概要-11)
		- [qs\_pickColor](#qs_pickcolor)
			- [概要](#概要-12)
			- [引数](#引数-9)
		- [qs\_rndPaletteColor](#qs_rndpalettecolor)
			- [概要](#概要-13)
			- [引数](#引数-10)
		- [qs\_rndColor](#qs_rndcolor)
			- [概要](#概要-14)

### Grid
グリッド系関数は、グリッド状に図形等を配置したい場合の座標計算を支援します。  
いずれの関数も返り値は配列です。`qs_gridRadial`を除き、グリッド配置は左上から順に行われ、各座標は左から右、上から下の順に格納されます。  
以下は、QuickStackが生成する座標配列の形式の例です。  
```
[
	{
		x: 400,
		y: 300,
	},
	{
		x: 350,
		y: 386,
	},
],
```
以下は、`qs_gridFixed()`を使用した際の座標を取り出す例です。
```
const points = qs_gridFixed(x, y, gapHor, gapVert);

for(let i=0;i>points.length;i++){
	// i番目の点のx座標を取得
	x = points[i].x;
	
	//i番目の点のy座標を取得
	y = points[i].y;
}
```

#### qs_gridFixed
##### 概要
点の間隔が等しいグリッド配置を行う際の、各点の座標を返します。
##### 構文
```
qs_gridFixed(x, y, gapHor, gapVert, cols, rows)
```
##### 引数
<dl>
<dt>x</dt>
<dd>グリッド配置を開始する点のx座標</dd>

<dt>y</dt>
<dd>グリッド配置を開始する点のy座標</dd>

<dt>gapHor</dt>
<dd>点同士の横方向の間隔</dd>

<dt>gapVert</dt>
<dd>点同士の縦方向の間隔</dd>

<dt>cols</dt>
<dd>横方向の要素数</dd>

<dt>rows</dt>
<dd>縦方向の要素数</dd>
</dl>

#### qs_gridResponsive
##### 概要
幅、高さ、横方向の分割数、縦方向の分割数を指定してグリッド配置を行う際の、各点の座標を返します。
##### 構文
```
qs_gridFixed(x, y, width, height, cols, rows)
```
##### 引数
<dl>
<dt>x</dt>
<dd>グリッド配置を開始する点のx座標</dd>

<dt>y</dt>
<dd>グリッド配置を開始する点のy座標</dd>

<dt>width</dt>
<dd>グリッドの横幅</dd>

<dt>height</dt>
<dd>グリッドの高さ</dd>

<dt>cols</dt>
<dd>横方向の要素数</dd>

<dt>rows</dt>
<dd>縦方向の要素数</dd>
</dl>

#### qs_gridCanvas
##### 概要
横方向の分割数、縦方向の分割数、周囲の空白を指定してキャンバス全体にグリッド配置を行う際の、各点の座標を返します。  
周囲の空白は、指定した値ぶんの空白が両方の側に作られることに注意してください。  
例えば`paddingHor`に`10`を指定した場合、キャンバスの左右の端から10pxずつ空白を開けた範囲でグリッド配置が行われます。
##### 構文
```
qs_gridCanvas(paddingHor, paddingVert, cols, rows)
```
##### 引数
<dl>
<dt>paddingHor</dt>
<dd>横方向に空ける空白(片側のみ)</dd>

<dt>paddingVert</dt>
<dd>縦方向に空ける空白</dd>

<dt>cols</dt>
<dd>横方向の点の数</dd>

<dt>rows</dt>
<dd>縦方向の点の数</dd>
</dl>

#### qs_gridRadial
##### 概要
半径、要素数を指定して円形配置を行う際の、各点の座標を返します。
##### 構文
```
qs_gridCanvas(x, y, radius, elements)
```
##### 引数
<dl>
<dt>x</dt>
<dd>グリッド配置を開始する点のx座標</dd>

<dt>y</dt>
<dd>グリッド配置を開始する点のy座標</dd>

<dt>radius</dt>
<dd>配置に使用する円の半径</dd>

<dt>elements</dt>
<dd>配置する要素の数</dd>
</dl>
##### 備考
要素数ではなく、要素同士の角度差を指定して円形配置する関数の実装も検討中です。

### ColorPalettes
カラーパレット系関数は、カラーパレットの管理を支援します。  
カラーパレットに関するデータは、実際に複数の色が格納された配列と、そのパレットを複数格納する配列で構成されています。  
以下は、QuickStackが生成するカラーパレット配列の形式の例です。  
それぞれの色は、p5.jsの`color`オブジェクトとして保存されています。
```
[
	[ //palette No.0
		{color object}, {color object}, {color object}, {color object}, {color object},
	],
	[ //palette No.1
		{color object}, {color object}, {color object}, {color object}, {color object},
	],
]
```
以下は、`qs_pickColor()`を使用して色を取り出し、塗りつぶし色に指定する例です。
```
fill(qs_pickColor(0, 1));
```
また、パレットを管理している配列に直接アクセスしたい場合は、配列`qsClr`がそれに該当します。

#### qs_showPalettes
##### 概要
現在管理されているカラーパレットの一覧を返します。
```
qs_showPalettes()
```

#### qs_addPalette
##### 概要
パレットを格納する配列の末尾に、新たなカラーパレットを追加します。  
引数にはそのパレットに属する色をまとめた配列を使用し、色の指定にはRGB(A)に対応する配列形式や文字列形式でのHEXカラー指定等、p5.jsの`color()`パーサが解釈可能な形式を使用してください。  
HEXカラーとは16進数による色指定で、`#4cba99`等がその例です。
```
qs_addPalette([[color], [color], [color]])
```
##### 引数
<dl>
<dt>palette</dt>
<dd>追加するカラーパレット</dd>

<dt>color</dt>
<dd>カラーパレットに属する色(ex: [120, 200, 255]や"#4cba99")</dd>
</dl>

#### qs_deletePalette
##### 概要
`index`で指定したパレットを削除します。`index`はパレットを格納している配列内でのそのパレットの位置です。
```
qs_deletePalette(index)
```
##### 引数
<dl>
<dt>index</dt>
<dd>削除するパレットの位置</dd>
</dl>

#### qs_addColor
##### 概要
指定したパレットに色を追加します。色は該当パレットの末尾に追加されます。  
色の指定にはRGB(A)に対応する配列形式や文字列形式でのHEXカラー指定等、p5.jsの`color()`パーサが解釈可能な形式を使用してください。  
HEXカラーとは16進数による色指定で、`#4cba99`等がその例です。
```
qs_addColor(index, color)
```
##### 引数
<dl>
<dt>index</dt>
<dd>追加するパレットの位置</dd>

<dt>color</dt>
<dd>追加する色</dd>
</dl>

#### qs_deleteColor
##### 概要
`paletteIndex`で指定されたパレット内の`colorIndex`で指定した色を削除します。`index`はパレット内でのその色の位置です。  
パレットを格納する配列に発生した空きは、自動で詰められます。
```
qs_deletePalette(paletteIndex, colorIndex)
```
##### 引数
<dl>
<dt>index</dt>
<dd>削除する色の位置</dd>
</dl>

#### qs_pickPalette
##### 概要
`index`で指定したパレットを返します。
```
qs_pickPalette(index)
```
##### 引数
<dl>
<dt>index</dt>
<dd>取得するパレットの位置</dd>
</dl>

#### qs_rndPalette
##### 概要
ランダムなパレットを返します。
```
qs_rndPalette()
```

#### qs_pickColor
##### 概要
`paletteIndex`で指定したパレットの、`colorIndex`で指定した色を返します。  
返り値はp5.jsの`color`オブジェクトです。
```
qs_pickColor(paletteIndex, colorIndex)
```
##### 引数
<dl>
<dt>paletteIndex</dt>
<dd>取得する色が格納されたパレットの位置</dd>

<dt>colorIndex</dt>
<dd>取得する色のパレット内での位置</dd>
</dl>

#### qs_rndPaletteColor
##### 概要
`index`で指定したパレットから、ランダムな色を返します。  
返り値はp5.jsの`color`オブジェクトです。
```
qs_rndPaletteColor(index)
```
##### 引数
<dl>
<dt>index</dt>
<dd>ランダムな色を取得するパレットの位置</dd>
</dl>

#### qs_rndColor
##### 概要
パレット関係なく、現在追加されている全ての色の中からランダムな色を返します。  
返り値はp5.jsの`color`オブジェクトです。
```
qs_rndColor()
```