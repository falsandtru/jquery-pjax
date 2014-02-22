#pjax
pjaxはデータの読み込みと描画の冗長部分を省略することで非常に高速かつシームレスなページ移動を実現する、HTML5で実装される高速ブラウジング機能です。

ページ移動の高速化のほか、シームレス性を利用してフルフラッシュサイトをHTML5で表現したり、ウェブサービスをハイエンドなインターフェースを持つアプリケーションソフトのように提供することができます。

##概要
サイト内のページ移動において指定したHTML要素（異なるコンテンツを持つ範囲）のみ更新することでページ移動を高速化します。
フルフラッシュサイトのHTML5化、ウェブサービスのアプリケーション的な表現、ウェブアプリ開発におけるajaxの機能拡張、ネイティブアプリのウェブアプリへの移行などの用途にも利用できます。
HTMLに数行のコードを追加するだけで簡単に導入することができ、既存のサイト構造やHTMLのクラス名を変更する必要はありません。

※**defunkt/jquery-pjaxとfalsandtru/jquery.pjax.jsはまったく別のjQueryプラグインであり初期化方法など使用方法に互換性はありません。ときおり混同して使用されている方を見かけますのでご注意ください。**  
※動作テストのためpjaxが正常に動作していないことがあります。恐縮ですがその際は時間をおいて再度ご覧ください。  

##特徴

* jQuery 1.4.2から動作します。
* サーバー側の設定やコードのインストール等の作業が不要です。
* <a href="https://github.com/falsandtru/jquery.preload.js" target="_blank">preload</a>と組み合わせて使用できます。
* CSSとJavaScriptの自動読み込みが可能です。
* 詳細な動作制御が可能で幅広い要求に対応できます。
* pjax(pushState + ajax)で一般的に発生する問題に対応しています。

##対応

* CSSの読み込み
* JavaScriptの読み込み
* Android・iOSでの使用
* フォームのsubmitによるページ遷移
* Google Analytics によるアクセス解析
* Wordpressでの使用
* pjaxを使用するURLの範囲の設定
* 複数範囲の更新
* 更新範囲の動的設定
* 文字コードの異なるページの読み込み
* サーバーからの差分データによるページ更新
* キャッシュによるページ更新
* ローディングエフェクトの表示
* <a href="https://github.com/falsandtru/jquery.preload.js" target="_blank">preload</a>との連携
* <a href="https://github.com/falsandtru/jquery.spage.js" target="_blank">spage</a>とのキャッシュの共有

##preloadとの併用
<a href="https://github.com/falsandtru/jquery.preload.js" target="_blank">preload</a>と併用することで初回アクセスから極めて高速にページ移動を行うことができるため、preloadとの併用を推奨します。

##pjaxの問題への対応
pushStateないしreplaceStateとajaxを組み合わせたいわゆるpjaxと呼ばれる機能には下記のような問題が存在しています。当pjaxプラグインはこれらを解消するための処理を組み込み済みです。

|項目|対応|
|:---|:--:|
|locationオブジェクトの更新※1|○|
|間違った履歴の修復※2|○|
|スクロール位置の復元※3|○|

※1 **AndroidとiOSでは`location`オブジェクトが`pushState`を使用しても更新されず、ブラウザのアドレスバーに表示されるURLと`location.href`により取得するURLが一致しない**バグが報告されています。defunkt版でもアドレスバーのURLと`location.href`が別のページを指しています。この問題は下の比較用デモで確認できます。当プラグインではこの問題を独自の方法で解決しています。この問題が解決されていなかった場合、ページのURLを参照するすべてのスクリプトが正常に動作できなくなり致命的なバグが発生する可能性があるため十分注意してください。Google Analytics などは間違ったアクセスログを生成することになります。  
※2 **ajax通信が強制終了されたページのタイトルが直近の正常に表示されたページのタイトルで上書きされ、間違った履歴が記録される**問題があります。この問題はpjaxにより2回以上ページ移動後、ページをリロードしブラウザの戻るボタンでページを読み込む時間を与えず2回以上ページを戻ることで確認できます。当プラグインではこの問題をブラウザに内蔵されているデータベースを利用することでほぼ解決しています（Firefoxでは何度も修復を繰り返すと修復されにくくなっていくような挙動をする問題がありますが通常の使用の範囲であれば正常に修復されると思われます）。  
※3 **ブラウザの戻る/進む機能によりページを移動した場合に移動先ページの直前のスクロール位置が復元されないことがある**問題があります。この問題はたとえば3000pxスクロールしているページから1000pxの高さのページに移動して前のページに戻ると1000px付近までしかスクロールされないといった形で確認できます。当プラグインではこの問題をブラウザに内蔵されているデータベースを利用することでほぼ解決しています（Firefoxでは何度も補正を繰り返すと補正されにくくなっていくような挙動をする問題がありますが通常の使用の範囲であれば正常に補正されると思われます）。  

##defunkt版との比較
このpjaxプラグインは独自に開発されており、本家defunkt版の派生ではないため仕様が異なります。
defunkt版（v1.7.0/2013年6月現在最新版）との主な違いは次のとおりです。

|項目|defunkt版|falsandtru版|
|:---|:-------:|:----------:|
|jQueryバージョン対応|1.8.x|1.4.2|
|プリロードとの併用|×|○|
|Android・iOSへの対応<br>locationオブジェクトの更新|**×**|○|
|Android・iOSへの対応<br>スクロール位置の操作※1|×|○|
|間違った履歴の修復|**×**|○|
|スクロール位置の復元|**×**|○|
|ページ移動方法の自動切替<br>HTML以外のコンテンツへのアクセス※2|×|○|
|JavaScriptの実行順序維持※3|×|○|
|JavaScriptの読み込み<br>埋め込み型|×|○|
|CSSの読み込み|×|○|
|キャッシュ制御※4|×|○|
|キャッシュ無効化|×|○|
|キャッシュ作成タイミング※5|ページ離脱時|ページ取得時＋任意|
|適用範囲の設定|×|○|
|適用範囲別の設定|×|○|
|複数領域の更新|×|○|
|更新範囲の動的設定|×|○|
|ユーザー定義関数の実行形式|イベント|コールバック＋イベント|
|ユーザー定義関数の設定箇所|9|33+4|
|部分的更新キャンセル※6|×|○|
|比較用デモ※7|<a href="http://falsandtru.github.io/pjax/demo/defunkt/" target="_blank">defunkt</a>|<a href="http://falsandtru.github.io/pjax/demo/falsandtru/" target="_blank">falsandtru</a>|

※1 AndroidとiOSではページ移動時にjQueryの`scrollTop`メソッドでスクロール位置を操作できず、当プラグインではjQueryMobileと同じく`scrollTo`メソッドを使用することでこの問題を解決しています。**defunkt版では`scrollTop`メソッドを使用しているためAndroidとiOSでスクロール位置を操作できません**。  
※2 リンク先がJavaScriptなどHTMLページ以外を参照していた場合にContent-Typeを参照してページ移動方法を自動的にpjaxから通常のものに切り替えます。defunkt版ではこの機能がないためJavaScriptなど誤作動を起こすリンクでpjaxが動作しないよう`"a:not([href$='.js'])"`のようにリンクの絞込みを行う必要があります。  
※3 defunkt版のDOMオブジェクトの生成によるJavaScriptの動的読み込みはオライリーの｢続・ハイパフォーマンスWebサイト｣で実行順序が維持されない読込方法に分類されています。  
※4 キャッシュの無効化、有効期限の設定など。  
※5 defunkt版はキャッシュをページ離脱時に作成するためフォームの入力状態などページ(DOM)の状態を保持しますが、ページをリロードしなければページを初期状態に戻すことはできません。なお、入力状態などを保持する目的であればpjaxを使用せず通常のページ移動を行うかサーバー側で状態を保存するべきです。  
※6 タイトルやURLなどの更新を個別にキャンセルできます。コールバック関数を非同期に実行している場合はキャンセルできません。  
※7 defunkt版は非対応の複数領域の更新を無理やりさせようとしているため更新部分の表示がバグってます。  

##使用法

###jQuery
v1.7.2の使用を推奨します。
v1.4.2から動作します。

###Register

####*$.pjax( Setting as object )*
リンクにpjaxを登録します。`document`オブジェクトにデリゲートを設定します。

```javascript
$.pjax({ area: '.container' });
```

####*$.fn.pjax( Setting as object )*
コンテキストに含まれるリンクにのみpjaxを登録します。コンテキストにデリゲートを設定します。
`link`パラメータと`form`パラメータはコンテキストにより絞り込まれますが、`area`パラメータは絞り込まれません。

```javascript
$('.delegate').pjax({ area: '.container' });
```

###Parameter
パラメータはすべてパラメータ用オブジェクトのプロパティに設定して渡します。パラメータとなるオブジェクトのプロパティは次のとおりです

####*area: Selector as string / function( event, parameter, to, from )*
pjaxにより更新する範囲（HTML要素）をjQueryセレクタで設定します。
`$.fn.pjax`により設定されたコンテキストで絞り込まれません。

#####*area: Selector as string*
文字列により更新する範囲を設定します。

#####*area: Selector as function( event, parameter, to, from )*
関数の戻り値により更新する範囲を動的に設定します。

####*link: Selector as string*
pjaxによりページ移動を行うリンク（アンカータグ）をjQueryセレクタで選択します。初期値は`a:not([target])`（`target`属性がない`anchor`要素）です。
`$.fn.pjax`で使用された場合は設定されたコンテキスト内で選択されます。
なお、カレントディレクトリを基準とした相対パスは正常に動作しない可能性があるため使用しないでください。

####*filter: string / function*
リンクを絞り込むjQueryセレクタまたは関数を設定します。初期値は`function(){ return /(\/|\.html?|\.php)([#?].*)?$/.test( this.href ); }`です。

####*form: Selector as string*
pjaxによりページ移動を行うフォーム（フォームタグ）をjQueryセレクタで選択します。
初期値は`null`でpjaxはフォームによるページ移動に使用されません。
`$.fn.pjax`で使用された場合は設定されたコンテキスト内で選択されます。

####*scope: Scope as object*
pjaxによりページ移動を行う（pjaxを適用する）ページの範囲をURL（ルートパス）ベースで設定します。pjaxの設定を範囲ごとに個別に変更できます。範囲をディレクトリで設定した場合はサブディレクトリも範囲に含まれます。設定はサブディレクトリで上書きできます。初期値は`null`で無効です。

pjaxによるページ移動を`http://example.com/pjax/`ディレクトリ内でのみ有効にする場合は`{'/pjax/': ['/pjax/']}`とします。`{'/pjax/': ['/pjax/', {area: '.pjax'}]}`とすると範囲内での更新範囲が`.pjax`に変更されます。

先頭に`^`を付加することで否定表現となり、サブディレクトリ（`http://example.com/pjax/except/`）でpjaxを無効にする場合は`{'/pjax/': ['/pjax/', '^/pjax/except/'], '/pjax/except/': false}`とします。無効を指定する値には偽と評価される値と空配列が使用できます。`http://example.com/a/`から`http://example.com/b/`への移動のみ有効にする場合は`{'/a/': ['/b/']}`と、双方向で有効にする場合は`{'/a/': ['/a/', '/b/'], '/b/': ['/a/', '/b/']}`とします。

先頭に`*`を付加することで正規表現となり、`{'/a/': ['/a/', '/b/'], '/b/': ['/a/', '/b/']}`は`{'/a/': ['*/[ab]/'], '/b/': ['*/[ab]/']}`と同義です。

`'rewrite'`を配列に加えると`scope.rewrite`に定義した関数によりハッシュテーブルでキーとして使用される文字列を一度だけ書き換えることができます。

`'inherit'`を配列に加えると直近の適用条件に一致するものがなかった場合に一階層上の条件を継承します。ディレクトリ上で複数階層開きがあっても継承されます。

オブジェクトを配列に加えるとオブジェクトによりpjaxの設定が上書きされます。ただし、`'rewrite'`により適用設定が見つかった場合は書き換え前のキーの設定は使用されません。

####*hashquery: boolean*
ハッシュの変更によりページを更新するかを設定します。関数が設定された場合は戻り値が渡されます。ハッシュごとにレスポンスが異なる場合に使用します。初期値は`false`で無効です。

####*state: any / function( event, parameter, to, from )*
`pushState`の第一引数として渡す値を設定します。関数が設定された場合は戻り値が渡されます。初期値は`null`です。

####*scrollTop: Position as number / false / null / function( event, parameter, to, from )*
リンクまたはフォームによるページ移動後の縦方向のスクロール位置を設定します。`false`または`null`を設定すると移動前のスクロール位置を維持します。関数を設定すると戻り値がスクロール位置となります。初期値は`0`です。

####*scrollLeft: Position as number / false / null / function( event, parameter, to, from )*
リンクまたはフォームによるページ移動後の横方向のスクロール位置を設定します。`false`または`null`を設定すると移動前のスクロール位置を維持します。関数を設定すると戻り値がスクロール位置となります。初期値は`0`です。

####*scroll: node*
スクロール位置の復元のためのスクロール位置の記録間隔にかかる設定項目を持ちます。

#####*scroll.delay: Millisecond as number*
スクロール位置の記録処理がスクロールイベント発生後実行されるまでの待機時間をミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中の処理の実行はキャンセルされます。初期値は`500`です。パラメータの詳細な仕様は<a href="https://github.com/falsandtru/jquery.visibilitytrigger.js" target="_blank">visibilitytrigger</a>の同名のパラメータを確認してください。

####*ajax: object*
pjaxで内部的に使用される`$.ajax`のパラメータを設定します。`$.ajax`のコールバック関数はすべて上書きされるため使用できません。代わりに`callbacks.ajax`で設定できるのでこちらを使用してください。

####*contentType: string*
移動先として読み込むデータで許容するコンテントタイプをカンマまたはセミコロン区切りの文字列で設定します。初期値は`text/html`です。

####*load: node*
pjaxによるページ読み込み時のCSSとJavaScriptを読み込みにかかる設定項目を持ちます。
`load.css`と`load.script`を有効にすることで、ページ別にCSSやJavaScriptが存在するサイトでも配置や構成を変えることなくpjaxを導入することができます。

#####*load.css: boolean*
pjaxによるページ読み込み時にCSSを読み込むかを設定します。初期値は`false`で読み込みません。

読み込まれるページの、現在のページに存在しないすべてのCSS（`link rel="stylesheet"`要素および`style`要素）を読み込みます。読み込まれるページに存在しないCSSは削除されます。読み込まれるCSSに挟まれて存在する読み込み済みのCSSは読み込み順序維持のため削除され順序を維持して追加しなおされます。読み込まれたCSSはすべてDOMの`head`要素末尾のノードとして追加されます。

#####*load.script: boolean*
pjaxによるページ読み込み時にJavaScriptを読み込むかを設定します。初期値は`false`で読み込みません。

読み込まれるページの、現在のページに存在しないすべてのJavaScript（`script`要素）を読み込みます。外部ファイル以外の形式のJavaScriptは同一の内容であっても再度読み込まれます。jQueryの仕様により、JavaScriptは読み込まれていてもDOMに追加されません。通常のページ移動と同じ実行順序が維持されます。

ページの表示直後にすべて実行されている必要のないJavaScriptは、ページ読み込み時に一括で実行せず<a href="https://github.com/falsandtru/jquery.visibilitytrigger.js" target="_blank">visibilitytrigger</a>により随時実行することで負荷を削減することを推奨します。ページの表示直後にすべて読み込まれている必要のないコンテンツについても同様です。

#####*load.ajax: object*
`ajax`パラメータに重ねて上書きする`$.ajax`のパラメータを設定します。初期値は`{dataType: 'script'}`です。

#####*load.execute: boolean*
埋め込み型のJavaScriptを実行するかを設定します。初期値は`true`で有効です。

#####*load.reload: Selector as string*
繰り返し読み込むJavaScriptと読み込みを維持するCSSをjQueryセレクタで設定します。初期値は`null`で無効です。

#####*load.reject: Selector as string*
読み込まないJavaScriptとCSSをjQueryセレクタで設定します。初期値は`null`で無効です。

#####*load.sync: boolean*
`defer`属性を持つJavaScript（`script`要素）の読み込みを、pjaxによるコンテンツの更新が描画されてから行います。ただし、描画の確認回数が100回を超えた場合は描画を待たずその時点で読み込みます。初期値は`true`で有効です。

#####<del>*load.async: Millisecond as number*</del>
`script`要素の`async`属性により個別に設定されるよう変更されました。

#####*load.rewrite: function( element )*
JavaScriptまたはCSSとして読み込まれる要素（`script``link``style`要素）を戻り値の要素で置換します。初期値は`null`です。

CloudFlareのRocketLoaderを使用するなどして要素が書き換えられている場合に有効です。

####*interval: Millisecond as number*
pjaxにより更新されたコンテンツの描画の確認を行う間隔をミリ秒で設定します。初期値は`300`です。

####*cache: node*
pjaxによるページ読み込み時のキャッシュの使用にかかる設定項目を持ちます。
独自に作成したキャッシュを使用することでサーバーと通信を行わずにページを移動することができるため、サーバーへのアクセスと負荷を軽減することができます。また、サーバーへのリクエスト時にキャッシュが使用されることはないため、リロードによる最新のデータへのアクセスを妨げません。ページに期限が設定されキャッシュされるよう設定されている場合はブラウザのキャッシュ機能が使用できるためpjaxのキャッシュ機能は無効にすることを推奨します。キャッシュはページを閉じるか通常のページ移動などによりJavaScriptの実行状態がリセットされるまで保持されます。初期設定では無効です。

#####*cache.click: boolean*
リンクのクリックによるページ移動にキャッシュを使用するかを設定します。初期値は`false`で無効です。

#####*cache.submit: boolean*
フォームの送信によるページ移動にキャッシュを使用するかを設定します。初期値は`false`で無効です。

#####*cache.popstate: boolean*
ブラウザの操作によるページ移動にキャッシュを使用するかを設定します。初期値は`false`で無効です。

#####*cache.get: boolean*
フォームのGET送信により取得したページをキャッシュするかを設定します。初期値は`true`で有効です。

#####*cache.post: boolean*
フォームのPOST送信により取得したページをキャッシュするかを設定します。初期値は`true`で有効です。

#####*cache.length: number*
キャッシュを保持するページ数の上限を設定します。初期値は`9`です。

#####*cache.size: Byte as number*
キャッシュを保持するデータサイズの上限をバイト数で設定します。初期値は`1048576`(1MB)です。

#####*cache.expire: Millisecond as number*
キャッシュの有効期限をミリ秒で設定します。初期値は`1800000`(30分)です。

####*wait: Millisecond as number / function( event, parameter, to, from )*
`$.ajax`の実行からコンテンツの更新までの最低待ち時間を設定します。関数が設定された場合は関数の戻り値が使用されます。jQuery 1.5より前のバージョンでは無効です。初期値は`0`です。

####*fallback: boolean / function( event, parameter, to, from )*
pjaxによるページ移動が失敗した場合の対応を行うかを設定します。初期状態では代替処理として通常のページ移動が行われます。関数が設定された場合は代替処理が当該関数により上書きされます。処理はエラーにかかるコールバック関数を実行後に行われます。初期値は`true`で有効です。

####*fix: node*
pjaxの諸問題の修正にかかる設定項目を持ちます。

#####*fix.location: boolean*
`location`オブジェクトを更新するかを設定します。初期値は`true`で有効です。

#####*fix.history: boolean*
履歴を修復するかを設定します。`database`パラメータによりデータベースの使用が許可されていなければなりません。初期値は`true`で有効です。

#####*fix.scroll: boolean*
スクロール位置を復元するかを設定します。`database`パラメータによりデータベースの使用が許可されていなければなりません。初期値は`true`で有効です。

#####*fix.reset: boolean*
MobileSafariでスクロールが長く重いページからの移動時にスクロール位置がリセットされない場合があるバグを修正するかを設定します。この修正を行った場合、移動前のページのスクロール位置が復元されない仕様となるためバグの発生しないサイトでは有効にする必要はありません。MobileSafariは通常のページ遷移が高速であるため導入するサイトでバグが生じるようであれば同ブラウザではpjaxを使用しない対応を推奨します。初期値は`false`で無効です。

####*database: boolean*
Indexed Databaseの使用をするかを設定します。データはデータ数が1000を超えるたびに最後のアクセスから3日（72時間）以上経過したデータが削除（削除後もデータ数が1000を超えている場合はすべてのデータを削除）され、データベースは暦日で7日ごとに日付変更後最初の`$.pjax()`実行時に初期化されます。データベースのサイズは最大1MB以下を見積もっています。初期値は`true`で有効です。

####*server: node*
サーバーとの通信にかかる設定項目を持ちます。

#####*server.query: Query as string*
pjaxによるサーバーへリクエストではページのURLにpjaxによるリクエストであることを通知するためのクエリ名が追加されており、このクエリ名を設定します。このクエリは内部処理でのみ使用されるためサイトの閲覧者の目に触れることはありません。初期値は`gns`の設定値と同じであり、`?pjax=1`のようにクエリが付加されます。

####*callback: function( event, parameter, data, textStatus, XMLHttpRequest )*
ページ移動後に実行されるコールバック関数を設定します。ページの更新処理が成功したときに`update.complete( event, parameter, data, textStatus, XMLHttpRequest )`の直後に実行されます。`callback``callbacks`ともに`callbacks.async`に`true`を設定することでコールバック関数の実行を非同期に行えます。コールバック関数を非同期で実行することで処理を高速化することができますが、戻り値に`false`を設定することによる処理のキャンセルができなくなります。

####*parameter: any*
すべてのコールバック関数に共通で渡されるパラメータを設定します。適用されている`scope`の設定を識別する用途などに使用できます。

####*callbacks: object*
内部の各タイミングにおいて実行されるコールバック関数を設定します。コールバック関数にはイベントの発生もとのオブジェクトがコンテキストとして与えられます。
`ajax`を除くすべてのコールバック関数は戻り値に`false`を設定することで現在の処理を抜けることができます。`before`では以降の処理をすべてキャンセルします。このときフォールバック処理は`fallback`の設定にかかわらず行われません。`update.any.before``update.any.after`ではページ更新処理のうちanyの示す部分の更新処理をキャンセルないし抜けます。ページ移動でエラーが発生した際に`update.error``update.complete`で処理を抜けるとフォールバック処理が`fallback`の設定にかかわらず行われません。
使用できる`callbacks`のプロパティと渡されるパラメータ、実行タイミングは次のとおりです。

#####*async*
コールバック関数の実行を非同期にするかを設定します。初期値は`false`で無効です。

#####*before( event, parameter )*
コード上の実行順序において最初に実行されます。

#####*after( event, parameter )*
コード上の実行順序において最後に実行されます。

#####*ajax.xhr( event, parameter )*
ajax通信において同名のメソッド内で実行されます。

#####*ajax.beforeSend( event, parameter, data, settings )*
〃

#####*ajax.dataFilter( event, parameter, data, type )*
〃

#####*ajax.success( event, parameter, data, textStatus, XMLHttpRequest )*
〃

#####*ajax.error( event, parameter, XMLHttpRequest, textStatus, errorThrown )*
〃

#####*ajax.complete( event, parameter, XMLHttpRequest, textStatus )*
〃

#####*update.before( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理において最初に実行されます。

#####*update.after( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理において最後に実行されます。

#####*update.cache.load.before( event, parameter, cache )*
ページの更新処理においてcacheの読み込み前に実行されます。

#####*update.cache.load.after( event, parameter, cache )*
ページの更新処理においてcacheの読み込み後に実行されます。

#####*update.url.before( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてURLの更新前に実行されます。

#####*update.url.after( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてURLの更新後に実行されます。

#####*update.title.before( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてタイトルの更新前に実行されます。

#####*update.title.after( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてタイトルの更新後に実行されます。

#####*update.content.before( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてコンテンツの更新前に実行されます。

#####*update.content.after( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてコンテンツの更新後に実行されます。

#####*update.scroll.before( event, parameter )*
ページの更新処理においてスクロール位置の更新前に実行されます。

#####*update.scroll.after( event, parameter )*
ページの更新処理においてスクロール位置の更新後に実行されます。

#####*update.cache.save.before( event, parameter, cache )*
ページの更新処理においてcacheの作成前に実行されます。

#####*update.cache.save.after( event, parameter, cache )*
ページの更新処理においてcacheの作成後に実行されます。

#####*update.css.before( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてCSSの読み込み前に実行されます。

#####*update.css.after( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてCSSの読み込み後に実行されます。

#####*update.script.before( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてJavaScriptの読み込み前に実行されます。

#####*update.script.after( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理においてJavaScriptの読み込み後に実行されます。

#####*update.rendering.before( event, parameter )*
ページの更新処理において更新の反映を契機とする内部イベント処理の実行前に実行されます。

#####*update.rendering.after( event, parameter )*
ページの更新処理において更新の反映を契機とする内部イベント処理の実行後に実行されます。

#####*update.verify.before( event, parameter )*
ページの更新処理において更新結果の検証前に実行されます。

#####*update.verify.after( event, parameter )*
ページの更新処理において更新結果の検証後に実行されます。

#####*update.success( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理が成功したときに実行されます。

#####*update.error( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理が失敗したときに実行されます。

#####*update.complete( event, parameter, data, textStatus, XMLHttpRequest )*
ページの更新処理が完了したときに実行されます。

###Method

####*on()*
pjaxを有効にします。

####*off()*
pjaxを無効にします。

####*click()*
pjaxを使用してクリックによりページを移動します。

#####*click( Anchor as jQuery / element )*
渡されたリンク（アンカー要素）を使用します。

#####*click( URL as string [, Attribute as object ] )*
渡されたデータを元に生成したリンクを使用します。

####*submit()*
pjaxを使用してフォーム送信によりページを移動します。

#####*submit( Form as element / jQuery / element )*
渡されたフォームを使用します。

#####*submit( URL as string, Attribute as object, Data as Object / Array )*
渡されたデータを元に生成したフォームを使用します。

`Attribute`パラメータによりフォームの属性を設定できます。`Data`パラメータにはフォームの子要素の仕様（`[{tag: 'tagName', attr: {attrName: attrValue, ...}, name: 'name', value: 'data'}, ...]`）またはJSONオブジェクト（`{"name": "data", ...}`）を設定します。

`$.pjax.submit('/', {method: 'POST'}, {"name": "data"})`

`$.pjax.submit('/', {method: 'POST'}, [{tag: 'input', attr: {type: 'text'}, name: 'name', value: 'data'}])`

####*relay( URL as string, Ajax as jQuery )*
外部のajax処理を引き継いでページ移動を行います。第二引数`Ajax`は`$.ajax()`の戻り値を使用します。jQuery 1.5より前のバージョンでは無効です。

####*setCache( [ URL as string [, Data as string [, textStatus as string, XMLHttpRequest as XMLHttpRequest ] ] ] )*
キャッシュを設定します。ページの更新には`XMLHttpRequest.responseText`をベースに`Data`に存在するタイトルと更新範囲で上書きして使用されます。`Data`によるキャッシュの上書きはタイトルと更新範囲にのみ適用されます。`XMLHttpRequest`がない場合はページ移動時に取得して補充されます。

#####*setCache( URL as string, Data as string, textStatus as string, XMLHttpRequest as XMLHttpRequest )*
#####*setCache( URL as string, Data as string )*
パラメータによりキャッシュを設定します。`Data`に`null`を設定すると`XMLHttpRequest`を使用して更新されます。

#####*setCache( URL as string )*
URLのページのキャッシュを設定します。`setCache( URL, document.documentElement.outerHTML )`と同義です。

#####*setCache()*
現在のページのキャッシュを設定します。`setCache( location.href, document.documentElement.outerHTML )`と同義です。

#####*setCache( URL as string )*
URLのページのキャッシュを削除します。

####*getCache( [ URL as string ] )*
キャッシュを取得します。

#####*getCache( URL as string )*
URLのページのキャッシュを取得します。

#####*getCache()*
現在のページのキャッシュを取得します。

####*removeCache( [ URL as string ] )*
URLまたは現在のページのキャッシュを削除します。

####*clearCache()*
キャッシュをすべて削除します。

###Property
なし

###Event
pjaxによるページ遷移では通常のページ遷移で発生する`onload`などのイベントが発生しないため、この代替イベントを提供します。

####*pjax.unload*
更新データを取得し、DOMの更新準備ができた時点で`window`オブジェクトから発生します。

####*pjax.DOMContentLoaded*
`area`で指定された範囲のDOMの更新が完了した時点で`document`オブジェクトから発生します。CSSについてのDOMの更新は完了していません。

####*pjax.ready*
すべてのDOMの更新が完了した時点で`document`オブジェクトから発生します。

####*pjax.load*
すべてのDOMの更新が反映された時点で`window`オブジェクトから発生します。画像の表示状態は考慮されません。

##記述例


###導入
シンプルな実行例です。リンクをクリックするとPrimaryのみ更新されます。

**<a href="http://falsandtru.github.io/pjax/demo/install/" target="_blank">demo</a>**

```javascript
$.pjax({ area: 'div.pjax' });
```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta http-equiv="content-language" content="ja">
<title>pjax</title>
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.pjax.min.js"></script>
<script type="text/javascript">
$(function(){
  $.pjax({ area: 'div.pjax' });
});
</script>
<style type="text/css">

/* 省略 */

</style>
</head>
<body>
  <div id="container">
    <div id="header">
      <div class="layout">
        <p>header1</p>
        <p>pjax demo</p>
      </div>
    </div>
    <div id="wrapper" class="clearfix">
      <div class="layer">
        <div class="primary pjax">
          <div class="layout">
            <p>primary1</p>
            <p>pjax enable あアｱ亜</p>
            <ul>
              <li><a href="/output/pjax/demo/install/">page1 enable</a></li>
              <li><a href="/output/pjax/demo/install/2.html">page2 enable</a></li>
              <li><a href="/output/pjax/demo/install/3.html">page3 enable</a></li>
            </ul>
          </div>
        </div>
        <div class="secondary">
          <div class="layout">
            <p>secondary1</p>
            <ul>
              <li><a href="/output/pjax/demo/install/">page1 enable</a></li>
              <li><a href="/output/pjax/demo/install/2.html">page2 enable</a></li>
              <li><a href="/output/pjax/demo/install/3.html">page3 enable</a></li>
            </ul>
          </div>
        </div>
        <div class="tertiary">
          <div class="layout">
            <p>tertiary1</p>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="layout">
        <p>footer1</p>
        
      </div>
    </div>
  </div>
</body>
</html>
```

###更新範囲 - area
pjaxによる更新範囲を設定します。次のように複数の範囲を同時に更新することもできます。双方のページで更新範囲が一致していないか更新先のページに更新範囲がひとつもない場合はエラーとなり例外処理が実行されます。

**<a href="http://falsandtru.github.io/pjax/demo/area/" target="_blank">demo</a>**

```javascript
  $.pjax({ area: 'div.primary.pjax, div.tertiary.pjax' });
```

###フォーム - form
pjaxでフォームの送信によるページ遷移を行います。キャッシュ有効時は初期設定ではPOST送信結果もキャッシュされることに注意してください。

**<del>demo</del>**GitPagesではPHPが動作しないため<a href="http://sa-kusaku.sakura.ne.jp/output/pjax/demo/form/" target="_blank">差し替え</a>

```javascript
  $.pjax({ area: 'div.pjax', form: 'form.pjax' });
```

###リンク - $.fn.pjax, link
pjaxによりページ移動を行うリンクを選択します。

**<a href="http://falsandtru.github.io/pjax/demo/fn/" target="_blank">demo</a>**

```javascript
  $('div.primary.pjax').pjax({
    area: 'div.primary.pjax'
  });
```

`$.fn.pjax`のコンテキストにpjaxの`area`パラメータの子孫要素（pjaxによる更新範囲内）を設定することはできません。pjaxによりページ移動を行うリンクをpjaxによる更新範囲内にあるリンクから選択するには`link`パラメータを使用してください。

**<a href="http://falsandtru.github.io/pjax/demo/link/" target="_blank">demo</a>**

```javascript
  // NG
  $('div.primary.pjax li').pjax({
    area: 'div.primary.pjax'
  });
```

```javascript
  // OK
  $('div.primary.pjax').pjax({
    area: 'div.primary.pjax' ,
    link: 'li a:not([target])'
  });
```

###適用範囲 - scope
pjaxによりページ移動を行う範囲を設定します。先頭に`^`で否定表現、先頭にまたは否定表現に続けて`*`で正規表現となります。

####特定のページ間の移動のみpjaxを使用する

* a.html,b.html,c.htmlの間での移動のみpjaxを使用する。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/a.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/b.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/c.html': ['*/output/pjax/demo/scope/[a-c].html']
    }
  });
```

####特定のディレクトリ下の移動のみpjaxを使用する

* pjaxディレクトリ下のページ間での移動のみpjaxを使用する。
* pjax/exceptディレクトリ下のページは除外、pjaxを使用しない。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/pjax/': ['/output/pjax/demo/scope/pjax/', '^/output/pjax/demo/scope/pjax/except/'],
      '/output/pjax/demo/scope/pjax/except/': false
    }
  });
```

####pjaxの設定を変更する

* すべてのページでpjaxを使用する。
* pjaxディレクトリ下のページ間の移動では更新範囲を`div.pjax`に変更する。

```javascript
  $.pjax({
    area: '.container',
    scope: {
      '/': ['/', '^/output/pjax/demo/scope/pjax/'],
      '/output/pjax/demo/scope/pjax/': ['/output/pjax/demo/scope/pjax/', {area: 'div.pjax'}]
    }
  });
```

####動的に生成されるディレクトリ下にある特定のページ間の移動のみpjaxを使用する（異なる動的ディレクトリ間の移動を含む）

* user/*(user/foo,user/bar,etc)ディレクトリのインデックスページ間での移動のみpjaxを使用する。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/user/': ['*/output/pjax/demo/scope/user/[^/]+/([?#][^/]*)?$']
    }
  });
```

####動的に生成されるディレクトリ下にある特定のディレクトリ下の移動のみpjaxを使用する（同一の動的ディレクトリ下の移動のみ）

* user/\*/a,user/\*/bディレクトリ下での移動のみpjaxを使用する。
* 同一の動的ディレクトリ下(user/foo/a,user/foo/b)でのみpjaxを使用し、異なる場合(user/foo/a,user/bar/a)は使用しない。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/user/': ['rewrite'],
      '/output/pjax/demo/scope/user/*/': ['*/output/pjax/demo/scope/user/*/[ab]/'],
      rewrite: function( url ){ return url.replace(/^[^\/]+\/\/[^\/]+/,'').replace(/^(\/output\/pjax\/demo\/scope\/user\/)[^\/]+(\/.*)/, '$1*$2') ; }
    }
  });
```

####複雑な条件の設定例

* a.html,b.html,c.htmlの間での移動にpjaxを使用する。
* pjaxディレクトリ下のページ間での移動にpjaxを使用する。
* pjax/exceptディレクトリ下のページは除外、pjaxを使用しない。
* user/\*(user/foo,user/bar,etc)ディレクトリのインデックスページ間での移動にpjaxを使用する。
* user/\*(user/foo,user/bar,etc)ディレクトリのインデックスページ間での移動では更新範囲を`'#header, div.pjax'`に変更する。
* 同一の動的ディレクトリ下(user/foo/a,user/foo/b)でのみpjaxを使用し、異なる場合(user/foo/a,user/bar/a)は使用しない。
* 同一の動的ディレクトリ下(user/foo/c/1,user/foo/c/2,user/foo/c/\*)でのみpjaxを使用し、異なる場合(user/foo/c/1,user/bar/c/2)は使用しない。
* その他のページではpjaxを使用しない。


**<a href="http://falsandtru.github.io/pjax/demo/scope/" target="_blank">demo</a>**

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/pjax/': ['/output/pjax/demo/scope/pjax/', '^/output/pjax/demo/scope/pjax/except/'],
      '/output/pjax/demo/scope/pjax/except/': false,
      '/output/pjax/demo/scope/a.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/b.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/c.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/user/': ['*/output/pjax/demo/scope/user/[^/]+/([?#][^/]*)?$', 'rewrite', {area: '#header, div.pjax'}],
      '/output/pjax/demo/scope/user/*/': ['*/output/pjax/demo/scope/user/*/[ab]/'],
      '/output/pjax/demo/scope/user/*/c/': ['*/output/pjax/demo/scope/user/*/c/'],
      rewrite: function( url ){ return url.replace(/^[^\/]+\/\/[^\/]+/,'').replace(/^(\/output\/pjax\/demo\/scope\/user\/)[^\/]+(\/.*)/, '$1*$2') ; }
    }
  });
```

###CSS自動読み込み - load.css
pjaxによる移動先のページのCSSを自動的に読み込みます。移動先のページに存在しない現在のページのCSSは削除されます。

**<a href="http://falsandtru.github.io/pjax/demo/css/" target="_blank">demo</a>**

```javascript
  $.pjax({
    area: 'div.pjax' ,
    load: { css: true }
  });
```

###JavaScript自動読み込み - load.script
pjaxによる移動先のページのJavaScriptを自動的に読み込みます。
同一の**外部ファイル**により記述されるJavaScriptは**重複して読み込まれません**が、**埋め込み**により記述される同一のJavaScriptは**重複して実行されます**。

**<a href="http://falsandtru.github.io/pjax/demo/script/" target="_blank">demo</a>**

```javascript
  $.pjax({
    area: 'div.pjax' ,
    load: { script: true }
  });
```

**上記pjax登録処理は実際には外部ファイルに記述してください。埋め込みで記述した場合、pjax登録処理がページ移動ごとに不要に繰り返されます。**

###代替処理 - fallback
pjaxによるページ移動が失敗した場合に通常のページ移動を行います。初期値で有効になっているためこのための設定は不要です。

**<a href="http://falsandtru.github.io/pjax/demo/fallback/" target="_blank">demo</a>**

```javascript
  $.pjax({ area: 'div.pjax' });
```

```javascript
  $.pjax({ area: 'div.pjax', fallback: true });
```

###スクロール位置 - scrollTop, scrollLeft
pjaxによるページ移動後のスクロール位置を設定します。`false`を設定すると移動前のスクロール位置を維持します。

**<a href="http://falsandtru.github.io/pjax/demo/scroll/" target="_blank">demo</a>**

```javascript
  $.pjax({ area: 'div.pjax', scrollTop: false, scrollLeft: 50 });
```

###最低待ち時間 - wait
`$.ajax`の実行からコンテンツの更新までの最低待ち時間を設定します。pjaxによるページ移動が速すぎる場合などに使用します。

**<a href="http://falsandtru.github.io/pjax/demo/wait/" target="_blank">demo</a>**

```javascript
  $.pjax({ area: 'div.pjax', wait: 1000 });
```

###ajax通信設定 - ajax
pjaxで内部的に使用される`$.ajax`のパラメータを設定できます。

```javascript
  $.pjax({ area: 'div.pjax', ajax: { timeout: 3000 } });
```

###コールバックとパラメータ - callback, callbacks, parameter
コールバックに設定した関数を実行します。コールバック関数の第一引数はイベントオブジェクトが渡され、第二引数に設定したパラメータが渡され、以降は各もととなるコールバック関数に渡された引数を引き継ぎます。すべてのコールバック関数にはイベントの発生元のオブジェクトがコンテクストとして与えられます。例えば、`anchor`要素のクリックにより実行されるコールバックの`this`は`anchor`要素であり、コールバック関数内で`this.href`などが使用できます。

**<a href="http://falsandtru.github.io/pjax/demo/callback/" target="_blank">demo</a>**

```javascript
  $.pjax({
    area: 'div.pjax' ,
    callback: function( event, arg ){ console.log( arg + ': callback' ) ; } ,
    callbacks:
    {
      before: function( event, arg ){ console.log( arg + ': before' ) ; } ,
      ajax:
      {
        beforeSend: function( event, arg ){ console.log( arg + ': ajax.beforeSend' ) ; } ,
        dataFilter: function( event, arg, data ){ console.log( arg + ': ajax.dataFilter' ) ; return data ; } ,
        success: function( event, arg ){ console.log( arg + ': ajax.success' ) ; } ,
        error: function( event, arg ){ console.log( arg + ': ajax.error' ) ; } ,
        complete: function( event, arg ){ console.log( arg + ': ajax.complete' ) ; }
      } ,
      update:
      {
        success: function( event, arg ){ console.log( arg + ': update.success' ) ; } ,
        error: function( event, arg ){ console.log( arg + ': update.error' ) ; } ,
        complete: function( event, arg ){ console.log( arg + ': update.complete' ) ; }
      } ,
      after: function( event, arg ){ console.log( arg + ': after' ) ; }
    } ,
    parameter: 'callback'
  });
```

###Google Analytics - callback
コールバックで`_gaq.push( ['_trackPageview'] )`を実行することでpjaxによるページ移動を Google Analytics に認識させることができます。

```javascript
  $.pjax({
    area: 'div.pjax' ,
    callback: function(){ if( window._gaq ){ _gaq.push( ['_trackPageview'] ) ; } }
  });
```

**`load.script`によりJavaScriptを有効にしている場合は移動先のページに埋め込まれているアクセス解析用のスクリプトが自動的に実行されますが、不要な部分まで実行されてしまうためアクセス解析用の記述を次のように置き換えることを推奨します。**

####旧 Google Analytics

```javascript
  if (!window._gaq) {
    window._gaq = [];
    window._gaq.push(['_setAccount', 'UA-xxxxxxxx-x']);
    window._gaq.push(['_trackPageview']);
    
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  } else {
    window._gaq.push(['_trackPageview']);
  }
```

####新 Google Analytics

```javascript
  if (!window.ga) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
    window.ga('create', 'UA-xxxxxxxx-x', 'hostname');
    window.ga('send', 'pageview');
  } else {
    window.ga('send', 'pageview', window.location.pathname+window.location.search);
  }
```

###ローディングエフェクト - callback, callbacks
コールバックをカスタマイズすることでページ移動時にローディングエフェクトを表示させることができます。

**<a href="http://falsandtru.github.io/pjax/demo/effect/" target="_blank">demo</a>**

```javascript
  $.pjax({
    area: 'div.pjax',
    callback: function(){ $('div.loading').fadeOut(500); },
    callbacks: 
    {
      before: function(){ $('div.loading').fadeIn(100); }
    },
    ajax:
    {
      timeout: 3000
    },
    wait: 1000
  });
```

```html
        <div class="loading" style="background:rgba(100%,100%,100%,.8);display:none;position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;">
          <div style="position:absolute;top:45%;left: 50%;margin-top:-64px;margin-left:-64px;text-align:center;">
            <img src="/images/loading.gif" alt="" style="display:block;">
            <span style="font-size:18px;font-weight:bold;position:absolute;white-space:nowrap;">now loading...</span>
          </div>
        </div>
```

ローディングエフェクトは頻繁に表示されると煩わしいため多用しないことを推奨します。
ページ移動時のローディングエフェクトの使用量を削減するには、ロードに1秒以上かかった場合のみ1秒経過した時点からローディングエフェクトを表示するなどの方法が考えられます。

```javascript
  $.pjax({
    area: 'div.pjax',
    callback: function()
    {
      clearTimeout($.data($('div.loading').get(0), 'pjax-effect-id'));
      $('div.loading').fadeOut(500);
      $.data($('div.loading').get(0), 'pjax-effect-id', 0);
    },
    callbacks: 
    {
      before: function()
      {
        clearTimeout($.data($('div.loading').get(0), 'pjax-effect-id'));
        $.data($('div.loading').get(0), 'pjax-effect-id', setTimeout(function(){ $('div.loading').fadeIn(100); }, 1000));
      }
    },
    ajax:
    {
      timeout: 3000
    },
    wait: 100
  });
```

プログレスバーでページの読み込み状況を表示することもできます。

**<a href="http://falsandtru.github.io/pjax/demo/progress/" target="_blank">demo</a>**

```javascript
  $.pjax({
    area: 'div.pjax',
    callbacks: {
      before: function(){
        $('div.loading').children().width('');
        $('div.loading').fadeIn(0);
      },
      ajax: {
        xhr: function(){
          var xhr = jQuery.ajaxSettings.xhr();
          
          $('div.loading').children().width('5%');
          if ( xhr instanceof Object && 'onprogress' in xhr ) {
            xhr.addEventListener( 'progress', function ( event ) {
              var percentage = event.total ? event.loaded / event.total : 0.4;
              percentage = percentage * 90 + 5;
              $('div.loading').children().width( percentage + '%' );
            }, false );
            xhr.addEventListener( 'load', function ( event ) {
              $('div.loading').children().width('95%');
            }, false );
            xhr.addEventListener( 'error', function ( event ) {
              $('div.loading').children().css('background-color', '#00f');
            }, false );
          }
          return xhr;
        }
      },
      update: {
        content: {
          after: function(){
            $('div.loading').children().width('96.25%');
          }
        },
        css: {
          after: function(){
            $('div.loading').children().width('97.5%');
          }
        },
        script: {
          after: function(){
            $('div.loading').children().width('98.75%');
          }
        },
        rendering: {
          after: function(){
            $('div.loading').children().width('100%');
            $('div.loading').fadeOut(50);
          }
        }
      }
    },
    ajax: { timeout: 3000 },
    wait: 1000
  });
```

```html
        <div class="loading" style="background:rgba(0,0,0,.2);display:none;position:fixed;bottom:0;left:0;z-index:9999;width:100%;height:5px;">
          <div style="background:#f77;position:absolute;top:0;left:0;width:0;height:3px;"></div>
        </div>
```

###UTF-8以外の文字コードへの対応 - callbacks.ajax.beforeSend
`beforeSend`でMimeTypeをオーバーライドすることでUTF-8以外の文字コードを使用したHTMLを文字化けすることなく読み込むことができます。ただし、移動先のページの文字コードを事前に判別することができないため、複数の文字コードの混在したサイトでは文字コードの設定ができずpjaxは使用できません（CSSやJavaScriptなどの外部ファイルは異なる文字コードで作成されていても問題ありません）。
文字コード変換のデモは、当サイトのサーバーがUTF-8以外で作成されたページもUTF-8として強制的に表示させる設定となっていたことから正常に動作しないため公開していません。

```javascript
  $.pjax({
    area: 'div.pjax' ,
    callbacks:
    {
      ajax:
      {
        beforeSend: function( event, arg, XMLHttpRequest )
        {
            XMLHttpRequest.overrideMimeType( 'text/html;charset=UTF-8' ) ;
            XMLHttpRequest.overrideMimeType( 'text/html;charset=Shift_JIS' ) ;
            XMLHttpRequest.overrideMimeType( 'text/html;charset=EUC-JP' ) ;
        }
      }
    }
  });
```

###サーバーへの対応 - PHPなどによる差分データを使用した更新
pjaxによる通信をサーバー側で識別し、pjax用の差分データを返させ、これを使用してページの更新（移動）を行います。データサイズを削減できるため、より少ない転送量と帯域で多くのアクセスを処理できます。
pjaxは通信時にHTTPリクエストヘッダに`X-Pjax``X-Pjax-Area``X-Pjax-CSS``X-Pjax-Script`のフィールドと値を追加します。また、リクエストするURLに`?pjax=1`のようにクエリを追加します。サーバーはこれによりpjaxの使用の有無と必要なデータを知ることができます。なお、レスポンスヘッダの`Content-Type`に必ず`contentType`パラメータで設定したいずれかの値が含まれている必要があります。

**<a href="http://falsandtru.github.io/pjax/demo/server/" target="_blank">demo</a>** ※これは移動先のページを差分データに置き換えた擬似的なデモです。  

```javascript
  $.pjax({ area: 'div.pjax' });
```

```html
<html>
<head>
<title>pjax demo</title>
</head>
<body>
  <div class="primary pjax">
    <div class="layout">
      <p>primary2</p>
      <p>pjax enable あアｱ亜</p>
      <ul>
        <li><a href="/output/pjax/demo/server/">page1 enable</a></li>
        <li><a href="/output/pjax/demo/server/2.html">page2 enable</a></li>
        <li><a href="/output/pjax/demo/server/3.html">page3 enable</a></li>
      </ul>
    </div>
  </div>
</body>
</html>
```

```html
<title>pjax demo</title>
<div class="primary pjax">
  <div class="layout">
    <p>primary3</p>
    <p>pjax enable あアｱ亜</p>
    <ul>
      <li><a href="/output/pjax/demo/server/">page1 enable</a></li>
      <li><a href="/output/pjax/demo/server/2.html">page2 enable</a></li>
      <li><a href="/output/pjax/demo/server/3.html">page3 enable</a></li>
    </ul>
  </div>
</div>
```

pjaxによる通信とそれ以外の通信により返すレスポンス（HTML）の切り替えは、ページごとにPHPにより行う方法もありますが、ページが大量にある場合はWordpressのように差分データをデータベースで管理するとより簡便です。アクセスされるページのURLはmod_rewriteを使用すれることで`http://example/a/b/c/`→`http://example/?dir1=a&dir2=b&dir3=c`のようにクエリに変換することができます。この方法であればページファイルは`http://example/index.php`１つで済み、あとはGETクエリに応じたSQLクエリを生成しデータベースから必要なデータを持ってくるだけです。ただし、サーバーにpjax用の差分データを返させる（静的なページから動的なページと構成に変更する）場合は、大なり小なりサーバーの負荷が増加し従前より処理能力が低下する可能性があることに留意してください。

###Wordpressへの導入
Wordpressにも既存の設定を変更することなく簡単にpjaxを導入することができます。
Wordpressの各種プラグインも概ね共存し併用することができます。
※Wordpressインストール直後、twentytwelveテーマを使用して確認。  
※プラグインはメジャーなものを2,30個インストールして確認、競合は1,2個ほど。  
※文字コードの差異は修正する必要があります。  
※本稼働中のWordpressサイトでの動作は未確認。現在動作および負荷検証用Wordpressサイトを制作中。  

####初期テーマ（twentytwelve）への導入例

0. WordpressにjQueryとpjaxプラグインをアップロードしてください。ここでは`/lib/`ディレクトリにアップロードしたものとします。
0. テキストエディタで`initialize.js`ファイルを作成し、次のように記述したのちUTF-8で保存し先ほどと同じディレクトリにアップロードします。`http://host/`の部分はサイトにあわせて変更してください。
```javascript
$(function(){
  $.pjax({
    area: '#primary' ,
    link: 'a:not([target])[href^="http://host/"]' ,
    load: { css : true , script : true , sync : true , async : 0 }
  });
});
```
0. テーマ編集画面を開き、`header.php`の`</head>`タグの直前に次のようにコードを追加してアップロードしたファイルを読み込ませてください。jQueryは外部のサイトから読み込ませてもかまいません。
```html
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.pjax.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/initialize.js"></script>
</head>
```

以上で終わりです。`header.php`の編集を保存したらpjaxが動作しているはずです。

####競合により不具合が発生するWordpressプラグインへの対応
JavaScriptを使用しているWordpressプラグインで不具合が発生する場合があります。基本的にはpjaxのscope機能によりpjaxを使用するページの範囲を制限し競合するWordpressプラグインとpjaxの動作ページを分離する方法での解決を推奨しますが、JavaScriptの実行タイミングを調整することで競合を解消し共存させられる可能性もあります。不具合が発生する主な状況と対応は以下のとおりです。

#####WordpressプラグインのJavaScriptの想定外のページでの使用
pjaxではJavaScriptの実行状態がページ移動後も維持されるため、ページ移動により変更されたDOMの差異からエラーが発生する可能性があります。ページ移動時に当該JavaScriptを終了ないし停止させ、適宜再開させることができれば回避が可能です。終了ないし停止ができない場合はあとはWordpressプラグインのJavaScriptの例外処理の問題であるためWordpressプラグインの修正以外による同一ページ内での共存は困難です。

#####WordpressプラグインのJavaScriptを使用するページへの再アクセス
pjaxは移動先のページのJavaScriptが読み込み済みであり、コードが外部ファイルに記述されている場合はこれを読み込まず、同一ページに埋め込まれている場合は再度読み込み実行します。このため、併用するJavaScriptによっては正常に動作させるために適宜再実行により実行状態をリセットするか、または読み込ませずリセットさせない処理を追加する必要があります。

###CloudFlareのRocketLoaderへの対応（暫定） - load.rewrite
書き換えられた`script`要素を内部処理用に再度書き換えることで正常に動作させることができます。

```html
<script type="text/rocketscript" charset="utf-8" data-rocketsrc="/lib/jquery-1.7.2.min.js" data-rocketoptimized="true"></script>
<script type="text/rocketscript" charset="utf-8" data-rocketsrc="/lib/jquery.pjax.min.js" data-rocketoptimized="true"></script>
<script type="text/rocketscript" data-rocketoptimized="true">
$(function(){
  $.pjax({
    area: 'div.pjax',
    load: {
      script: true,
      rewrite: function( element ){
        var src;
        if(src = element.type === 'text/rocketscript' && $(element).data('rocketsrc')){
          element.type = 'text/javascript';
          element.src = src;
          return element;
        }
      }
    }
 });
});
</script>
```

###高速化済みサーバーでの設定例
すべてのデータをブラウザでキャッシュするようサーバーで設定済みの場合の例です。

* `http://example.com/somedir/`以下のページでpjaxを使用する
* Firefoxではすべてのページでpjaxを使用する
* Opera以外のブラウザではパース済みのHTMLを受け取る
* CSSとJavaScriptを自動的に読み込む
* `reset`関数により毎回ページを初期化する
* `page.js`を毎回読み込みグローバルオブジェクトを初期化する

```javascript
// これはinit.jsの記述です
(function(){
  function init(){
    // Firefoxでのみpjaxを使用する場合は次の行を有効にする
    //if(!$.clientenv.is('firefox')){ return; }
    var scope;
    scope = $.clientenv.is('firefox') ? undefined : { '/somedir/', '/somedir/' };
    $.pjax({
      area: '#contaner',
      scope: scope,
      ajax: { cache: true, timeout: 5000 },
      load: { css: true, script: true, sync: true, reload: '[src$="/page.js"]' }
    });
  }
  function reset(){
    // 遅延読み込みはサーバーを問わず効果的です
    $.visibilitytrigger({
      trigger: 'img[data-origin]',
      callback: function(){ this.src = $(this).attr('data-origin'); }
    }).vtrigger();
  }
  
  init();
  $(function(){ reset(); });
  $(document).bind('pjax.ready', function(){ reset(); });
})();
```

```html
<html>
<head>
<title>title</title>
</head>
<body>
  <div id="contaner">content</div>
  <script type="text/javascript" charset="utf-8" src="/jquery.1.7.2.js"></script>
  <script type="text/javascript" charset="utf-8" src="/jquery.clientenv.js"></script>
  <script type="text/javascript" charset="utf-8" src="/jquery.pjax.js"></script>
  <script type="text/javascript" charset="utf-8" src="/jquery.visibilitytrigger.js"></script>
  <script type="text/javascript" charset="utf-8" src="/init.js"></script>
  <script type="text/javascript" charset="utf-8" src="/page.js"></script>
</body>
</html>
```

##注意点

###リンクパスの記述
pjaxを使用したサイトでは相対パスはルートパスで書くのが基本です。カレントディレクトリを基準とした相対パスで書いた場合、リンクが意図しないURLを示すことがあるため内部リンクの相対パスは必ずルートパスで書いてください。

```html
http://host/from/ から http://host/from/to/ へのリンク

OK
<a href="/from/to/"></a>

NG
<a href="to"></a>
<a href="to/"></a>
<a href="../from/to"></a>
<a href="/from/to"></a>
```

###フォームの取り扱い
フォームによりデータの送受信を行うページではpjaxの使用を推奨しません。pjaxによりページ遷移を行った場合ではフォームへの入力情報が前後へのページ移動のつどリセットされるため、入力情報のリセット対策を施さなければ送信までのコンバージョン率の大幅な低下が予想されること、POST情報の二重送信防止の一般的な手法であるページのリダイレクトを行うために結局は通常のページ遷移が要求されることが理由です。
フォームによるデータの送受信はpjaxではなく通常のページ遷移またはajaxによる入力情報の送信とページ内容の書き換えにより行うことを推奨します。

なお、検索フォームのようなGET送信フォームで使用する分には問題ありません。

###pjaxの解消不能なバグ
当プラグインはpjaxのデメリットを極力減らし、pjaxの一般的な問題点を概ね解消していますが、MobileSafari(Android・iOS)でlocationオブジェクトが更新されないバグを解消する代わりに、主にスクロールが長く重いページからの移動先ページのスクロール位置をリセットできない場合があるバグが生じ、当プラグインはさらにこれを解消する設定を行った場合は代わりに同ブラウザではブラウザバックで戻ったページのスクロール位置を復元できない仕様となっています。pjax機能を持つメジャーなプラグインであるdefunkt版pjax、jQueryMobileの手法も検証しましたがいずれもこれら３つの問題を同時には解決できませんでした。pjaxの導入の際はこの点留意してください。MobileSafariは通常のページ遷移が高速であるため導入するサイトでスクロール位置がリセットされないバグが生じるようであれば同ブラウザではpjaxを使用しない対応を推奨します。

###pjaxの導入にあたって
pjaxの恩恵が得られるのは基本的にサーバーサイドでの高速化の代替、重いページ初期化処理の省略、ページ状態の維持を目的として使用する場面であり、これらいずれにも該当しない場合（サーバーでブラウザがHTML、CSS、JavaScriptをキャッシュするよう設定しており、ページの初期化処理（JavaScriptの実行）が重くなく、ページ状態を維持する必要がない）は余分な処理をさせるデメリットが生じるだけでないかよく検討するべきです。pjaxをサイトの一部のページだけで使用する場合はscope機能の使用を推奨します。

###pjaxのコンテンツ別使用適否
####テキストコンテンツのサイト
テキストコンテンツを主体とするサイトではあまりpjaxを使用するべきではありません。テキストを読み進める場合、ページ移動時のホワイトアウトがページの余白として機能するためこれを失わせると読者がページから意識をはずして休息をとる1秒前後の時間やページを読み進めるリズムを奪うことになります。もっとも、最新のモダンブラウザは非常に高速に動作し軽量なページではホワイトアウトが発生しないようになったので今は逆に昔はあった休憩時間を作りたいときに使うことになるかもしれません。その場合はページの閲覧時間が数十秒以上かつクリックによる移動にのみ休憩を挟むとよいでしょう。

####画像・動画など非テキストコンテンツのサイト
pjaxを使用するべきです。ページ移動時のホワイトアウトを取り除くことでそのサイトへの没入を促進することができます。また、ページ移動にかかる時間がコンテンツを見続ける時間に転化されるためコンテンツの閲覧時間を増やし、リアクションを起こす確率を上げることができます。なお、このときローディングエフェクトなどによりページをマスクせず、読み込み状態の通知はプログレスバーやローディングアイコンを画面の隅に表示するにとどめる必要があります。

####ショッピングサイト
非テキストコンテンツのサイトにおけるpjaxの利点はショッピングサイトで特に効果的です。商品が見られる時間を増やすことができるだけでなく、ページ移動時間というユーザーが気をゆるめる時間に商品を見せることができるため効果的に商品に関心を持たせて商品ページへ誘導することができます。

####サービス提供サイト
検索エンジンやSNSのようにレスポンスを得るために閲覧、操作するサイトにもpjaxは適しています。シームレスな画面遷移は高品質なサービスを演出するとともに没入性を高めます。

###pjaxサイトレビュー
####YouTube
各ページ間の移動がスムーズでサイト内を途切れることなく散策できる、手本となる非常に良い実装です。

####Amazon
検索結果に使用されていますが読み込み中に商品が見れなくなり商品の購入機会を減らしている悪い実装例です。

####Chrome ウェブストア
サイト（サービス）のウェブアプリ化の好例です。ウェブサービスが専用のアプリケーションを使用しているかのように提供されています。

####ニコニコ動画
変則的な画面遷移とあわせて使用されていますがこうした動きは違和感と抵抗感を生むため推奨されません。一覧性と検索性は向上したもののレスポンスと操作性が悪く個人的には許容範囲ぎりぎりといったところです。

###ウェブアプリへの利用
pjaxは情報の閲覧を目的に利用される一般的なウェブサイトのオプションとしてはそれほど魅力のないものですが、シームレスな画面遷移をページ遷移と同期させることができるという点に着目すると、ウェブブラウザの特徴であるページ移動のたびに画面がホワイトアウトする垢抜けなさを脱却、あるいはajaxではURLとページが固定される制限を克服し、ウェブサービスのアプリケーション化やウェブアプリケーションをUXの高いインターフェースを持った遷移状態を把握・再現可能なネイティブアプリケーションのように提供するといった利用方法が見つかります。

ウェブサービスのウェブアプリ化はウェブブラウザからアプリケーションを提供されることへの違和感から抵抗を感じることが予想されるため、利用者に受け入れられるには既存のイメージを書き換えるに足るインパクトのあるサービス（Gmail、GoogleMapsなどがこれに適しているがajaxによる実装に留まっている）が先陣を切る必要がありますが、企業がクローズドな環境で使用する業務アプリのようなネイティブアプリを開発・販売しているのであればページ移動ごとのホワイトアウトの克服とHTML5によるUXの高いハイエンドかつリッチなインターフェースの実装は企業内で使用されるアプリケーションをウェブブラウザで提供することへのクライアントの心理的抵抗を低減し、ネイティブアプリをウェブアプリ化するにあたっての障壁を引き下げる効果が期待できます。加えて、アプリケーションの遷移状態をURLの形で把握・再現できるということはサポートや利用者間の情報共有において大きく役立つでしょう。また、広く一般ユーザーに利用されるサービスを提供するネイティブアプリであっても、特に複数のユーザーと共同して利用されるサービス（Skypeなど）を開発・提供するものなどはウェブブラウザを介するウェブアプリに適しているでしょう（サーバーの負担は増えると思いますが）。

##補足
ドキュメント内の用語の用法にはあまり自信がありません。間違いやバグに気づかれた方は<a href="http://sa-kusaku.sakura.ne.jp/service/board/">掲示板</a>または<a href="http://sa-kusaku.sakura.ne.jp/service/contact/">連絡フォーム</a>からご連絡ください。

##更新情報

###change log

####1.31.10

* URL処理のバグを修正

####1.31.9

* `relay`メソッドを追加
* ajax処理の外部からの引継ぎに対応
* URL処理のバグを修正

####1.31.8

* イベント登録のバグを修正

####1.31.7

* preloadに対応
* `filter`パラメータを追加
* `load.reject`パラメータの初期値を`null`から`''`に変更
* `load.reload`パラメータの初期値を`null`から`''`に変更
* パーセントエンコードされたURLの当該部分の大文字小文字を維持するよう変更
* pjax無効時でもイベントがキャンセルされるバグを修正

####1.31.6

* `hashquery`パラメータの仕様を変更
  <br>関数の設定への対応を削除。

####1.31.5

* `server.query`パラメータの初期値を`gns`から独立
* `scroll.delay`パラメータの初期値を`500`から`300`に変更
* コードを最適化

####1.31.4

* `load.reload`パラメータの仕様を拡張
* `load.reject`パラメータの仕様を拡張
* 同一ページへのリンクのクリックでページを再度読み込むよう動作を変更
* ハッシュリンクのクリックでURLが更新されないバグを修正
* コードを最適化
* データベース処理を修正
* 重点検証部分以外の検証コードを削除

####1.31.3

* データベース処理を修正
* スクロール処理を修正

####1.31.2

* データベース処理を修正

####1.31.1

* データベース処理を修正

####1.31.0

* `area`パラメータの仕様を変更
  <br>関数が設定された場合に与えられる引数を変更。
* `hashquery`パラメータの仕様を変更
  <br>関数が設定された場合に与えられる引数を変更。
* `state`パラメータの仕様を変更
  <br>関数が設定された場合に与えられる引数を変更。
* `scrollTop`パラメータの仕様を変更
  <br>関数が設定された場合に与えられる引数を変更。
* `scrollLeft`パラメータの仕様を変更
  <br>関数が設定された場合に与えられる引数を変更。
* `fallback`パラメータの仕様を変更
  <br>関数が設定された場合に与えられる引数を変更。
* `wait`パラメータの仕様を拡張
  <br>関数を設定できるよう変更。
* `callbacks.update.scroll`系コールバック関数を追加

####1.30.9

* `scope`パラメータのみ設定した空登録に対応

####1.30.8

* `click`メソッドの仕様を拡張
* `scrollTop`パラメータの仕様を拡張
* `scrollLeft`パラメータの仕様を拡張
* テストを追加

####1.30.7

* `validator`変数が宣言されていない場合にエラーが発生するバグを修正

####1.30.6

* IndexedDBのリトライ処理のバグを修正
* データベース処理の検証コードを修正
  <br>ブラウザの設定によりデータベースが使用できない場合にもIndexedDBの`open`メソッドの実行が失敗し`onerror`メソッドが呼び出されるためこれをエラーとして記録しないよう修正。

####1.30.5

* 動作を高速化

####1.30.4

* CSSの読み込み順序が維持されない場合があるバグを修正

####1.30.3

* データベース処理のバグを修正

####1.30.2

* キャッシュ処理のバグを修正
  <br>ChromeでまれにスクリプトがVMで実行され、変数のスコープが正常に参照されずエラーが発生する場合があるバグを修正。
* IndexedDBのデータベース作成失敗時に作成を一定回数リトライするよう修正

####1.30.1

* キャッシュ処理のバグを修正

####1.30.0

* `setCache`メソッドの仕様を変更
  <br>パラメータを一つ渡した場合の動作を変更。
* `removeCache`メソッドを追加

####1.29.0

* `jquery.pjax.js`から検証コードを削除
* `jquery.pjax.dev.js`に検証コードを含むコードを分離
* コードを最適化

####1.28.2

* `scroll.suspend`パラメータを削除
* 内部関数`fallback`を最適化

####1.28.1

* 内部関数`parser`を`parseHTML`に変更
* `parseHTML`のクロスブラウザ問題を修正

####1.28.0

* jQueryプラグイン化処理を更新

####1.27.0

* `scope`パラメータの動作を拡張
  <br>適用範囲ごとにpjaxの設定を変更できるよう拡張。
* `setCache`メソッドの仕様を変更
  <br>パラメータの仕様その他を変更。
  <br>任意の時点でのページ状態の保持に対応。
* `getCache`メソッドの仕様を変更
* `pjax.unload`イベントを追加
* パース処理を変更
* 更新確認処理を修正

####1.26.4

* URLが書き換えられた場合に正常に動作しない場合があるバグを修正
* データベース処理のバグを修正
  <br>W3Cの仕様に準拠しないIndexedDBの実装を行っているブラウザには現在対応しておらず、IndexedDBを使用しない動作となる。

####1.26.3

* データベース処理のバグを修正

####1.26.2

* データベース処理のバグを修正
* 更新反映の確認回数に上限を設定

####1.26.1

* ローカル変数の宣言漏れを修正

####1.26.0

* ajaxレスポンスの処理をv1.24.x以前のものにロールバック
  <br>XMLレスポンスを使用したv1.25.xでエラーが多いため従前のテキストベースの処理にロールバック。

####1.25.3

* IE8でエラーが発生するバグを修正 version: 1.25.0 - 1.25.2

####1.25.2

* 更新範囲にあるCSSが読み込まれないバグを修正

####1.25.1

* `noscript`などのエスケープが不完全であるバグを修正
* Operaで動作しないバグを修正 version: 1.25.0

####1.25.0

* 内部処理を変更
  <br>HTMLをjQueryやDOMParserで文字列からオブジェクトにパースできないブラウザでもパースして処理するよう変更。
  <br>ajaxのレスポンスを`document`オブジェクトで受け取る設定`xhrFields: { responseType: 'document' } }`に対応。

####1.24.7

* `link`パラメータの初期値を変更

####1.24.6

* 検証コードを修正

####1.24.5

* `event.preventDefault()`によりpjaxの動作をキャンセルできるよう修正

####1.24.4

* ハッシュクリック動作のバグを修正

####1.24.3

* `load.reject`パラメータを追加

####1.24.2

* scope機能のバグを修正
  <br>同じページへのフォーム送信時にscope機能が動作しないバグを修正。

####1.24.1

* IndexedDBの処理でエラーが発生する場合がある重大なバグを修正 version: 1.20.0 - 1.24.0
  <br>IndexedDBのバージョンアップ機能を複数のタブを開いた状態で使用できない問題が見つかったため、バージョン管理及びバージョンアップに伴うデータベースの初期化をIndexedDBの機能を使用せず手動で行うよう変更。

####1.24.0

* IndexedDBの処理でエラーが発生する場合がある重大なバグを修正 version: 1.20.0 - 1.23.3

####1.23.3

* コードを最適化

####1.23.2

* XSS対策としてURLのサニタイズ処理を追加
* コードを最適化

####1.23.1

* 動作を高速化

####1.23.0

* CSSとJavaScriptの自動読み込み処理を非同期処理から同期処理に変更

####1.22.10

* コードを最適化

####1.22.9

* hashquery処理のバグを修正

####1.22.8

* スクロール処理を修正

####1.22.7

* IE10でscope機能が動作しないバグを修正
* URL処理のバグを修正
* 動作を高速化

####1.22.6

* マルチバイト文字が使用されたURLを自動的にUTF-8エンコードするよう修正
* コンディショナルコメントをエスケープするよう修正
* `noscript`タグをエスケープするよう修正

####1.22.5

* `script`要素の`defer`属性への対応を修正
* `load.reload`パラメータを追加
  <br>繰り返し読み込む外部ファイル形式のJavaScriptをjQueryセレクタで設定する。

####1.22.4

* 読み込まれるJavaScriptのコンテキストを`window`に修正
* scope機能が動作しないバグを修正

####1.22.3

* ajax通信で`complete`メソッド実行後pjaxの処理を開始するよう修正

####1.22.2

* Content-Typeが取得できなかった場合にエラーが発生するバグを修正
* 通信の強制終了処理のバグを修正

####1.22.1

* Firefoxで正常に動作しないバグを修正

####1.22.0

* JavaScript読み込み機能の仕様を変更
  <br>実行順序が完全に維持されるよう変更（通常のページ移動と同じ順序で実行される）。
* `load.ajax`パラメータを追加
  <br>`script`要素のajaxによる読み込み設定を上書きする。
* `load.async`パラメータを削除
  <br>`script`要素の`async`属性により個別に設定されるよう変更。
* `callbacks.update.cache.save`系コールバック関数の実行タイミングを変更
* jQuery1.4.x以下のバージョンでJavaScript読み込み機能が正常に動作しないバグを修正
* 実行速度を高速化
  <br>レンダリング完了確認までの、通信時間を除くページ移動時間を1/2に短縮。

####1.21.4

* スクロール復元機能を修正
* jQuery1.4.x未満のバージョンでのバグを修正
* コードを最適化

####1.21.3

* Android・iOSでの動作を高速化
* `load.rewrite`パラメータを追加
  <br>JavaScriptまたはCSSとして読み込まれる要素（`script``link``style`要素）を書き換える。
* `setCache`メソッドの仕様を変更
  <br>パラメータの順序を変更。
* 圧縮版のバグを修正
* コードを最適化

####1.21.2

* `click`メソッドの仕様を変更
* `submit`メソッドを追加
* `setCache`メソッドを追加
* `getCache`メソッドを追加
* `clearCache`メソッドを追加
* コードを最適化

####1.21.1

* `click`メソッドを追加

####1.21.0

* JavaScript読み込み処理の重大なバグを修正 version: 1.9.0 - 1.20.7
  <br>JavaScriptファイルの取得に失敗した場合にJavaScriptの読み込み処理が中断するバグを修正。
* `hashquery`パラメータを追加
  <br>ハッシュの変更によりページを更新するかを設定。
* ハッシュにより表示位置をスクロールするよう修正

####1.20.7

* `fix`パラメータを追加
  <br>pjaxの諸問題の修正を行うかを設定。
* `database`パラメータの動作を修正
* `scroll`パラメータの動作を修正

####1.20.6

* スクロール補正機能と`scroll`パラメータを追加
  <br>pjaxではブラウザバックでスクロール位置が復元されないことがある問題に対応。
* データベース処理のバグを修正

####1.20.5

* scope機能のrewrite処理のバグを修正

####1.20.4

* URLのハッシュ処理のバグを修正

####1.20.3

* コードを最適化

####1.20.2

* `callback``callbacks`パラメータの仕様を変更
  <br>すべてのコールバック関数のコンテキストを`null`に変更。
* `fallback`パラメータに設定された関数に第二引数を追加、移動先のURLが渡される
* コードを最適化

####1.20.1

* `state`パラメータを追加
  <br>`pushState`の第一引数として渡す値を設定する。関数が設定された場合は戻り値が渡される。

####1.20.0

* 履歴修正機能と`database`パラメータを追加
  <br>ajax通信が強制終了された場合に間違った履歴が記録される問題に対応。

####1.19.4

* スクロール処理を修正

####1.19.3

* scope機能を修正
  <br>正規表現を使用できるよう修正。
  <br>rewrite機能を追加。
  <br>inherit機能を追加。
* `scope`パラメータの仕様を変更
  <br>条件の設定方法を組み合わせ先のみ`{'/a/': ['/b/']}`）から自身を含めた組み合わせ（範囲）`{'/a/': ['/a/', '/b/']}`）に変更。
  <br>複数条件の設定方法を`|`区切りの文字列（`'a|b'`）から配列による列挙（`['a','b']`）に変更。
* `area`パラメータに設定された関数に第二引数を追加、移動先のURLが渡される
* スクロール処理を修正

####1.19.2

* scope機能のバグを修正

####1.19.1

* scope機能を修正
  <br>ページ単位で範囲を設定できるよう修正。
  <br>サブディレクトリで設定を上書きできるよう修正。
* scope機能のバグを修正

####1.19.0

* scope機能と`scope`パラメータを追加
  <br>pjaxにより移動するURLの範囲を設定、制限する。

####1.18.5

* URL整形処理のバグを修正。
* submit処理のバグを修正。

####1.18.4

* キャッシュ機能のバグを修正
  <br>submitによる移動先ページをキャッシュできないバグを修正。
* `cache.get``cache.post`パラメータを追加。

####1.18.3

* コードを最適化

####1.18.2

* ajax処理を修正
  <br>pjaxによる前回のajax通信が終了していない場合にこの通信を強制終了させてから次の通信を開始するよう修正。

####1.18.1

* コードを最適化

####1.18.0

* pjax処理の重大なバグを修正 version: 1.16.4 - 1.17.8
  <br>pjaxによるページ移動処理中にさらにページ移動をしようとした場合に通常のページ移動が行われることがあるバグを修正。

####1.17.8

* スクロール機能を修正

####1.17.7

* スクロール機能を修正
  <br>`scrollTop`および`scrollLeft`の設定値ないし戻り値が無効であった場合に使用される設定値を`null`から`0`に変更。
　

####1.17.6

* 動作検証の修正

####1.17.5

* コードを最適化

####1.17.4

* スクロール機能を修正

####1.17.3

* スクロール機能を修正

####1.17.2

* コードを最適化

####1.17.1

* コードを最適化

####1.17.0

* コードを最適化

####1.16.6

* server.queryの内部処理を修正
* history.stateを変更しないよう修正

####1.16.5

* 更新範囲の子要素であるテキストノードが更新内容に含まれないバグを修正
* spageとのスクロール機能の連携を削除

####1.16.4

* 更新範囲の動的設定処理を修正

####1.16.3

* 更新反映の確認処理の重大なバグを修正 version: 1.15.0 - 1.16.2
  <br>JavaScriptの同期読み込みを有効にしていない場合に更新反映の確認処理が無限ループするバグを修正。
* スクロール機能のバグを修正
* コードを高速化

####1.16.2

* カスタムイベントの発生箇所の変更
* コードを最適化

####1.16.1

* コードを最適化

####1.16.0

* カスタムイベントを追加
* JavaScriptの実行制御機能を追加

####1.15.1

* スクロール機能のバグを修正
* スクロール値の動的設定機能を追加
* コールバック関数と動作制御にupdate.rendering系を追加
* ネームスペース機能を削除

####1.15.0

* 更新反映の確認機能の汎用化
* スクロール機能の実装方法を修正
  <br>モバイル端末のブラウザでスクロールされない場合があるバグを修正。
* コードを高速化

####1.14.3

* pjax無効時のバグを修正

####1.14.2

* pjaxの多重実行を禁止

####1.14.1

* 更新範囲の動的設定機能のバグを修正

####1.14.0

* 更新範囲の動的設定機能の追加
* コードを高速化

####1.13.4

* コードを最適化

####1.13.3

* script要素のtype属性値の確認処理を追加
  <br>type属性に`text/javascript`以外の値が設定されている埋め込み型JavaScriptを実行しない。

####1.13.2

* rel属性値に複数の単語が設定されたCSSが読み込まれないバグを修正
* コードを最適化

####1.13.1

* rel属性値に複数の単語が設定されたCSSが読み込まれないバグを修正
* ページの正確なデータサイズの取得処理を無効化

####1.13.0

* コールバック関数の非同期実行機能を追加

####1.12.3

* コードを最適化

####1.12.2

* コードを最適化

####1.12.1

* コールバック関数と動作制御にupdate.verify系を追加

####1.12.0

* URLと表示されているページが一致しない場合があるバグを修正
  <br>ブラウザの操作（戻る進むボタンの連打等）によりページ移動が非常に高速に行われた場合に発生。

##ライセンス - MIT License
以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。
上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。
ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。

<a href="http://opensource.org/licenses/mit-license.php" target="_blank">http://opensource.org/licenses/mit-license.php</a>  
<a href="http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license" target="_blank">http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license</a>

##jQuery Plugins

###<a href="https://github.com/falsandtru/jquery.preload.js">preload</a>
ユーザーが次に見るページを予測してあらかじめ読み込みページ移動を高速化します。

###<a href="https://github.com/falsandtru/jquery.pjax.js">pjax</a>
HTML5による高速なページ移動機能をウェブサイトに実装します。

###<a href="https://github.com/falsandtru/jquery.visibilitytrigger.js">visibilitytrigger</a>
スクロールにより特定のHTML要素が画面に表示されることを条件としてスクリプトを遅延実行させます。

###<a href="https://github.com/falsandtru/jquery.clientenv.js">clientenv</a>
サイトの閲覧者のOS、ブラウザ、フォント対応などを判定してクロスブラウザ対応の労力を軽減します。

###<a href="https://github.com/falsandtru/jquery.validator.js">validator</a>
JavaScriptの動作検証とエラーレポートを行う、インストール不要の埋め込み型検証ツールです。

###<a href="https://github.com/falsandtru/jquery.spage.js">spage</a>
AutoPagerやAutoPatchWorkのようなページの自動読み込み＆継ぎ足し機能をウェブサイトに実装します。
