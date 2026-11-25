# DESIGN.md — 自然薯農家「はなさとみ」公式サイト

このファイルは、サイト全体のデザインルールを管理する唯一の基準です。
UIを実装・修正する際は必ず本ファイルを参照し、ここに定義されていない
色・フォント・余白・ボタン・カードスタイルを独自に追加しないでください。
新しいルールが必要になった場合は、実装より先に本ファイルへ追記します。

実装トークンは `assets/css/styles.css` の `:root` に集約しています。

---

# Foundation

## 1. Worldview

### Brand

自然薯農家「はなさとみ」（株式会社はなさとみ／代表取締役 田口 実佳）は、
茨城県北茨城市で自然薯を育てる農家ブランドです。

ブランドの印象は、力強い農業ブランドではなく、丁寧に育てた自然薯を、
飲食店・小売店・家庭へやさしく届ける自然派ブランドです。

### Tone

- やさしい / 上品 / 清潔感 / 丁寧 / 自然体
- 余白がある / 女性的 / 淡い / 静か / 信頼できる

### Visual Keywords

- 淡いピンク / 生成り / 白 / グレージュ
- 植物線画 / 明朝体 / 余白
- 自然薯 / 土 / 秋冬 / 食卓 / 贈りもの / 飲食店

### Avoid

- 安売り感 / 直売所チラシ感
- 強すぎる黒 / 濃すぎる緑 / 原色 / 蛍光色
- 男性的すぎる高級感 / 業務用卸サイト感 / 派手なECサイト感
- 健康効果の断定

---

## 2. Color Palette & Roles

### Brand Colors

- **Primary** `#F8D2C9`
  - メインCTA / ブランドアクセント / 重要な背景装飾 / LINE登録導線の強調
- **Primary Soft** `#F4DAD4`
  - セクション背景 / CTA背景 / カードの淡い背景
- **Background** `#F1EFEE`
  - サイト全体の基本背景（生成りに近い柔らかい背景）
- **Surface** `#FFFFFF`
  - カード背景 / ナビゲーション背景 / フォーム背景
- **Text Main** `#3D3B3B`
  - 本文 / 見出し / 基本テキスト
- **Text Sub** `#7D7373`
  - 補足文 / キャプション / 日付 / FAQの説明文
- **Border** `#B8AFAF`
  - 入力欄 / 区切り線 / カード境界
- **Accent Green** `#9FCF8A`
  - 自然感の補助色 / 小さなラベル / 植物モチーフ（使いすぎないこと）
- **Accent Green Soft** `#D6E1D2`
  - 淡い自然系背景 / 補助セクション背景

### 補助トーン（上記から派生。新規色ではなく濃淡違い）

- **Primary Deep** `#E8B4A8`（Primaryのホバー／濃いめ装飾。淡いピンク系の範囲内）
- **Dark** `#3D3B3B`（Dark Buttonの背景。Text Mainと同一）

### Formal Accent（名刺由来。ごく小さなアクセント限定）

名刺の濃紺・金の高級感を、ブランドの一貫性のためにWebへ“少しだけ”橋渡しするための色。
Web全体は淡ピンク・生成り・自然派を維持し、この2色は**メインカラー・CTA・広い背景には使用禁止**。

- **Formal Gold** `#B8960C`
  - フッターや会社情報の細い罫線・小さな装飾のみ（名刺のロゴ下の金罫を踏襲）
- **Formal Navy** `#1A2540`
  - 会社情報まわりの小見出し文字など、ごく限定的なアクセントのみ
  - 使用ルール: 面で塗らない／CTAに使わない／1画面に1〜2箇所まで

### 使用ルール

- Primaryは淡いピンク系を使用する
- 緑はメインカラーにしない
- 黒 `#000000` は原則として本文・背景に直接使わない
- Text Mainは `#3D3B3B` を基本とする
- 背景は白または生成り・薄いピンクベージュを基本とする
- CTAは「淡いピンク背景 + 濃いブラウン文字」または「濃いブラウン背景 + 白文字」とする
- コントラストが不足する場合は、文字色を `#3D3B3B` に寄せる
- 派手な赤、強い緑、原色、蛍光色は使用禁止

---

## 3. Typography Rules

### Font Family

- **Heading Font**: `Shippori Mincho`, `Zen Old Mincho`, `Noto Serif JP`, serif
- **Body Font**: `Noto Sans JP`, `Noto Serif JP`, sans-serif
- **Logo Text**: 画像ロゴを優先し、テキスト再現する場合は明朝系を使用する

### Base Typography

- Base size: `16px`
- Base line-height: `1.8`
- Letter spacing: `0.03em`
- Body weight: `400`
- Heading weight: `500` / `600`

### Heading Scale

| 要素 | Desktop | Mobile |
|------|---------|--------|
| H1 | `40px` | `30px` |
| H2 | `30px` | `24px` |
| H3 | `22px` | `20px` |
| Small Label | `13px` | `13px` |
| Caption | `13px` | `13px` |

### Heading Rules

- 見出しは詰めすぎない / 行間は広めにする
- 強すぎる太字は避ける
- H1はブランドの余白感を出す
- 英数字より日本語の読みやすさを優先する
- 見出しに過度な装飾をつけない
- ゴシック体だけで構成しない / 太すぎるフォントを使わない
- 見出しを黒ベタで強くしすぎない
- 本文は読みやすさを優先し、行間を詰めない
- スマホで1行が長くなりすぎないようにする

---

# Style

## 4. Component Stylings

### Button

#### Primary Button
- Background `#F8D2C9` / Text `#3D3B3B` / Border `1px solid #F8D2C9`
- Border radius `999px`
- Padding desktop `14px 28px` / mobile `13px 22px`
- Min width `160px` / Font size `15px` / Font weight `600` / Letter spacing `0.04em`
- Hover: background `#F4DAD4`（濃いめ装飾時は `#E8B4A8`）
- Transition `all 0.2s ease`

#### Secondary Button
- Background `#FFFFFF` / Text `#3D3B3B` / Border `1px solid #B8AFAF`
- Border radius `999px` / Padding desktop `14px 28px` / mobile `13px 22px`
- Min width `160px` / Hover: background `#F1E9E7`

#### Dark Button
- Background `#3D3B3B` / Text `#FFFFFF` / Border radius `999px`
- Padding desktop `14px 28px` / mobile `13px 22px` / Hover: opacity `0.88`

#### LINE Button（プラットフォーム公式色の例外）
- Background `#06C755`（LINE公式ブランドカラー） / Text `#FFFFFF`
- 用途: `/line/` の「友だち追加」ボタンのみ。LINE公式のガイドラインに合わせるための例外色で、
  一般UIには使用しない。それ以外のLINE導線は Primary Button を使う。
- Border radius `999px` / Padding desktop `14px 28px` / mobile `13px 22px` / Hover: opacity `0.9`

### Card
- Background `#FFFFFF`
- Border `1px solid rgba(184, 175, 175, 0.35)`
- Border radius `20px`
- Padding desktop `32px` / mobile `22px`
- Shadow `0 8px 24px rgba(61, 59, 59, 0.06)`
- 用途: FAQ・ステップ・お知らせ枠など、通常のカード全般はこの基準を使う

### Elevated Card（写真・ブランド訴求カード・特別枠の上位表現）
通常カードより上品に「浮かせたい」要素専用の基準。写真枠（Photo Frame）や「極」のような
特別訴求カードにのみ使い、すべてのカードへ強制適用しない（通常のカードは上記 Card を使う）。
- Border radius desktop `26px` / mobile `22px`
- Shadow `0 18px 40px rgba(61, 59, 59, 0.06)`
- Border（使う場合） `1px solid rgba(184, 175, 175, 0.22)`（通常カードのborderより薄く）

### Input
- Background `#FFFFFF` / Border `1px solid #B8AFAF` / Border radius `12px`
- Padding `12px 14px` / Font size `16px` / Text `#3D3B3B` / Placeholder `#B8AFAF`
- Focus border `#F8D2C9` / Focus shadow `0 0 0 3px rgba(248, 210, 201, 0.35)`

### Header
- Height desktop `80px` / mobile `64px`
- Background `rgba(255, 255, 255, 0.86)` / Backdrop filter `blur(12px)`
- Border bottom `1px solid rgba(184, 175, 175, 0.25)`

### Section
- Padding desktop `96px 24px` / tablet `72px 24px` / mobile `56px 20px`
- Max width `1120px`

### CTA Block
- Background `#F4DAD4` / Border radius `28px`
- Padding desktop `48px` / mobile `28px 22px`
- Decoration: 植物線画を薄く配置

### Badge / Label
- Background `#D6E1D2` / Text `#3D3B3B` / Font size `13px`
- Border radius `999px` / Padding `4px 12px` / Letter spacing `0.06em`

### Footer
- Background `#F1E9E7` / Text `#3D3B3B` / Sub text `#7D7373`
- Border top `1px solid rgba(184, 175, 175, 0.25)`
- Padding desktop `64px 24px 40px` / mobile `48px 20px 32px`

### Photo Frame（写真枠 / 差し替え前提の上品なプレースホルダ）
- Elevated Card基準を使用: Border radius desktop `26px` / mobile `22px`、Shadow `0 18px 40px rgba(61, 59, 59, 0.06)`、Border `1px solid rgba(184,175,175,0.22)` / overflow hidden
- プレースホルダ背景: `linear-gradient(150deg, #F4DAD4, #D6E1D2)`（Primary Soft → Accent Green Soft）
- 装飾: 植物線画（opacity 0.18〜0.24、色 `#FFFFFF`/`#B8AFAF`）＋ 小さなキャプションpill
- キャプション: 明朝 `14px` / `#7D7373` / 白半透明pill。「写真準備中」等は大きく出さない
- 実写真キャプション（差し替え後の控えめな説明文）: `13px`（mobile `12.5px`）/ line-height `1.7` / letter-spacing `0.02em` / `#7D7373` / 中央寄せ。写真より目立たせない
- 実写真差し替え: 枠内に `<img>` を入れると自動的に全面表示（object-fit: cover）
- 比率: 既定 `4/3`、`--wide` `16/9`、`--tall` `3/4`、`--square` `1/1`

### むかご・葉の写真（2026-11-26）
- `/jinenjo/` の調理紹介後に「畑で出会う、むかご。」を追加。見出しと本文は既存のSection／Typographyを使用し、写真に文字を重ねない。
- 写真は手のひらのむかごを先、つるについたむかごを後に配置。Desktopは `minmax(0, 1.35fr) minmax(0, 1fr)`・gap32px・下揃え、767px以下は1列・gap32px。
- 写真は元の縦横比で全体を表示。角丸は既存のRadius Card、キャプションは既存のPhoto Caption。見出しと本文の最大幅はContent Width、本文と写真の間は40px。英字ラベルの罫線は左揃え。緑の背景上の英字ラベルとキャプションはText Mainで読みやすさを確保する。
- `/about/` のはじまりの文章の後に、葉の風景を既存Section／Photo Frame Wide／Photo Captionで横長に配置する。
- 新しい色・フォント・影は追加しない。目次には既存と同じ形式で「むかごの風景」を追加する。

### 自然薯の粘りと料理写真（2026-11-26）
- `/jinenjo/` の食感比較は、縦長の粘り写真と既存の説明・比較表を2列で配置。列幅は `minmax(0, 0.8fr) minmax(0, 1.2fr)`、gap48px、中央揃え。写真は最大400px幅・元の比率で全体を表示、角丸はRadius Card。
- 「自然薯の梅しそ和え」は、既存Section Soft・Section Headを使用。料理写真と材料表を2列（1.2fr／1fr、gap48px）で配置し、材料は16pxのdt/dd、行padding12px・gap16px・Border Softで区切る。分量は右揃え。濃縮倍率は14pxで併記する。材料と料理名はユーザー提供内容に従い、未提供の人数・手順は追加しない。
- むかご紹介の末尾に、食卓の写真として「むかごご飯」を添える。本文と写真は等幅2列・gap48px・上に64pxの余白。写真は元の比率で全体を表示。
- 食感比較は980px以下、その他は767px以下で1列・gap32px。写真の上に文字を重ねず、配色・書体・角丸は既存トークンを使用する。緑色の背景上の文字にはText Mainを使用する。

### Info Table（会社概要表）
- カード内に配置 / `th` は `#7D7373`・14px・左寄せ・35%幅、`td` は `#3D3B3B`・15px
- 行区切りに `1px solid rgba(184,175,175,0.35)`
- 会社名の値のみ Formal Navy（`.formal-name`）＋カード上部に金の細罫（`.gold-rule`）＝小さなアクセント

### 自然薯・長芋の比較表（2026-11-25）
- `/jinenjo/` の食感・栄養比較に使用。列は「項目・自然薯・長芋」の3列を維持し、数値は同じ食品成分表の生・可食部100g当たりで比較する。
- 見出し行はPrimary Soft、自然薯の列はPrimaryを18%重ねた淡い背景、他列はSurface。優劣を示す赤・緑や勝敗マークは使わない。
- 外枠はBorder Soft、角丸20px。セルの区切りはBorder Softの1px、本文色はText Main。数値は等幅数字・中央寄せ、項目は左寄せ。
- Desktop: セルpadding 16px、本文15px。Mobile: padding 12px 8px、本文14px・補足13px。列幅は項目40%・各食品30%、食感表のみ34%・33%・33%。長い項目は自然に折り返し、横スクロールを前提にしない。
- 主な成分を先に掲載し、追加成分は`details/summary`で開く。出典・分析値ではない旨・調味前の値を表の直後に常時表示する。
- ページ内リンクは既存の色とpill形状を使用。gap12px、padding12px 16px。調理手順は3列、767px以下では1列、gap24px。新規の色・フォントは設けない。

### Section Split（写真＋テキストの2カラム）
- Desktop: 2カラム（`1fr 1fr`、gap 48px、`align-items:center`）
- `--reverse` で左右入れ替え（セクションごとに交互）
- Mobile: 1カラムに積む（Heroのみ写真→コピー→CTAの順）

### LINE CTA / Benefits（Phase Polish-2）
- LINE登録理由を示す「LINEで受け取れること」は3点までとする
- pill/カードは淡い背景（`rgba(255,255,255,0.48)`）・細い罫線（`rgba(184,175,175,0.24)`）・小さな文字（13px前後）
- 強い緑や派手な誘導は禁止。絵文字は使わない
- PC: 横並びpill（gap 10-14px） / SP: 縦積み1カラム（gap 8-10px）

### Section Label（英字ラベル＋短い罫線 / Phase Polish-2）
- 英字ラベルは11-12px、letter-spacing 0.16-0.22em、uppercase、色は `#B8AFAF` または `#7D7373`
- ラベル上に短い罫線（width 28-36px、height 1px、`rgba(184,175,175,0.48)`）を添える
- 罫線は日本語見出しより目立たせない。既存のeyebrow/section-kickerがある場合はそれを再利用し、新規クラスを増やさない
- Hero（`.hero-eyebrow`）・page-hero（二次ページのバナー）は対象外。すでに整っている箇所へ無理に追加しない

### Photo Depth Layer（写真背面のごく薄い装飾レイヤー / Phase Polish-2）
- 重要写真（`.photo-frame` / `.about-intro-image` / `.jinenjo-image` / `.general-sale-image`）の背面に、ごく薄いピンクのレイヤーを右下方向に少しだけずらして配置してよい
- PC: offset 8-10px、border-radius 26-30px、`background: rgba(248,210,201,0.18)`、`border: 1px solid rgba(184,175,175,0.18)`
- SP: offset 6-8px、PCよりさらに薄く、画面端に飛び出させない
- 実装は既存要素のoverflow:hiddenを壊さないよう、専用ラッパー（`.photo-depth`）または対象要素自身に`overflow`を持たせず img 側に `border-radius: inherit` を与える方式で行う
- 装飾過多にしない。写真本体のhover zoomやキャプションと重ねない

### Message Card（代表メッセージ等の静かな引用ブロック / Phase Polish-2）
- background: `rgba(255,255,255,0.52)` または `#F1EFEE` 系
- border: `1px solid rgba(184,175,175,0.22)` / border-radius: 24-28px
- padding: PC 36-44px / SP 26-30px、max-width 820-900px、`margin:0 auto`
- 本文line-height 1.9以上、署名はmargin-top 22-26px・font-size 14-15px
- 強い装飾は不要。代表個人を押し出しすぎない、控えめな引用ブロックとして使う

---

## 5. Layout

### Container
- Max width `1120px` / Wide max width `1280px` / Content width `760px`
- Horizontal padding desktop `24px` / mobile `20px`

### Grid
- Desktop: 12 columns / Tablet: 6 columns / Mobile: 1 column

### Section Spacing
- Desktop section padding `96px 0` / Mobile `56px 0`
- Inner block gap desktop `40px` / mobile `24px`

### CTA Placement

LINE登録CTAは以下に必ず配置する。

- ファーストビュー
- 卸案内セクション
- 一般販売案内セクション
- ページ末尾
- スマホ固定CTA

---

## 6. Depth

### Shadow（強くしない）
- Card shadow `0 8px 24px rgba(61, 59, 59, 0.06)`（通常カード）
- Elevated Card shadow `0 18px 40px rgba(61, 59, 59, 0.06)`（写真枠・ブランド訴求カード・特別枠のみ。全カードに強制適用しない）
- Floating CTA shadow `0 10px 30px rgba(61, 59, 59, 0.12)`
- Header: shadowは使わない。必要なら薄いborderのみ。

### Border
- 基本border `rgba(184, 175, 175, 0.35)`
- 強い黒線は使わない / 角丸は大きめにする

### Decoration（植物線画）
- Opacity `0.12` 〜 `0.24`
- Position: セクション右上・右下・CTA背景
- 色 `#B8AFAF` または `#F8D2C9`
- 情報を邪魔しない

---

# Operation

## 7. Do / Don't

### Do
- LINE登録を最重要CTAとして扱う
- 淡いピンクと生成りを中心にする
- 余白を大きく使う / 見出しに明朝体を使う
- スマホファーストで設計する
- 飲食店・小売店向けの信頼感を出す
- 一般客にもやさしく見える表現にする
- 2026年12月1日に出荷開始・一般販売開始予定であることを明記する
- 飲食店・小売店向けのご案内・ご相談は、LINE公式アカウントへ誘導する（業者専用ページの記載は現在サイトに掲載しない）

### Don't
- 独自カート／独自決済／会員ログイン／業者専用ログインを作らない
- Shopify風の仮ECを作らない
- 強い黒背景を多用しない / 濃い緑をメインカラーにしない
- 安売り感を出さない / 健康効果を断定しない
- CTAを分散させすぎない

### 薬機法・景表法への配慮
- 「〜が治る」「〜に効く」等、効能・効果を断定する表現を使わない
- 「最高」「日本一」等の優良誤認を招く最上級表現を根拠なく使わない
- 栄養や特徴は事実ベース（自然薯という食材の一般的特徴）にとどめる

---

## 8. Responsive

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px 〜 1023px`
- Desktop: `1024px+`

### Mobile Rules
- スマホファーストで実装する
- H1は最大30px程度に抑える
- CTAボタンは横幅100%を基本とする
- セクション余白は56pxを基準にする
- カードは1列表示 / ヘッダーは64px
- ハンバーガーメニューを使用する
- 画面下部にLINE登録の固定CTAを出す

---

## 9. AI Prompt Guide

### UIを追加する時の基本指示

新しいUIを追加する場合は、必ず本 `DESIGN.md` を参照し、以下を守る。

- `Color Palette & Roles` に定義された色だけを使う
- `Typography Rules` のフォント・サイズ・行間に従う
- `Component Stylings` のボタン・カード・入力欄を使う
- 新しい色・余白ルールを勝手に追加しない
- CTAはLINE登録を最優先にする（内部 `/line/` へ集約）

### 画像生成・装飾指示

はなさとみの装飾は以下の方向で作る。

- 淡いピンク / 生成り / 植物線画 / 自然薯 / 土 / 手仕事感 / 余白 / やさしい農家ブランド

---

## 実装メモ

- 全ページ共通のヘッダー・フッター・スマホ固定CTA・植物線画SVGは各HTMLに直接記述する
  （静的HTML構成のため。マークアップは全ページで揃えること）。
- 外部LINE友だち追加URLはサイト内で1箇所（`/line/` の友だち追加ボタン）のみに置く。
  他のすべてのLINE CTAは内部 `/line/` へ誘導する。
- 販売機能（カート・決済・ログイン）は実装しない。
  業者専用ページ（`shop.hanasatomi.com`）の案内は現在サイトに掲載していない。業者向けの導線はLINEへ集約する。


## 自然薯レシピ（2026-11-26）
- `/recipes/` を写真付きの一覧、`/recipes/<slug>/` を各料理の詳細とする。本文16px・既存の明朝見出し・ブランド色を継承し、写真に文字を重ねない。
- 一覧は最大1120px・3列（minmax(0,1fr)）・gap32px。980px以下は2列、767px以下は1列・gap32px。写真は3:2、Radius Card。素材分類・検索・結果件数を一覧の上に置き、フィルターは44px以上の高さ、文字14px。料理名は見出し、導線は短い「作り方を見る」で統一する。
- 詳細の冒頭は、料理名と説明・写真の2列（1fr／1.2fr、gap48px）。料理名40px、767px以下28px、359px以下26px。長い料理名は意味のまとまりで改行する。材料と作り方は1fr／1.4frの2列・gap64px、980px以下は1列・gap40px。食材・分量は16px、補足14px。写真は元の比率を保つ。
- 背景はSurface／Background、区切りはBorder Soft。選択中のフィルターはPrimary Soft、文字はText Main。フォーカスはText Mainの2px枠と4pxの余白。印刷時はヘッダー・フッター・操作を省き、料理名・写真・材料・手順を印刷する。
- レシピ追加によるメニュー増加に合わせ、1279px以下は既存のドロワーメニューを使用する。Desktopのメニュー間隔は20pxとする。ページとメニューの情報構造は維持する。
- レシピは`content/recipes.json`で管理し、生成処理で一覧・詳細・サイトマップを更新する。人数・時間・栄養値など未確認の情報は自動で補わない。

### 1行のレシピ見出し（2026-11-26）
- ユーザー指定の「自然薯のフレンチフライ」は強制改行せず1行で表示する。見出しの書体・色・余白を継承し、文字間隔は既存の本文基準0.03em。横にはみ出さないよう、文字サイズはDesktopでclamp(22px, 2.7vw, 36px)、980px以下でclamp(22px, 6.2vw, 28px)とする。他の料理の改行・文字サイズは維持する。

## レシピの探しやすさ・調理中の操作（2026-11-26）
- ジャンルは既存の静かな食卓・読み物の雰囲気を維持。一覧は料理を選ぶ写真カタログ、詳細は材料と手順を読む構成。色・フォント・サイト共通のヘッダーとフッターは既存トークンを継承する。
- 一覧の導入はDesktop上下40/32px、Mobile上下24px。検索操作は既存Backgroundの面に16〜24pxの余白。素材フィルターを先に表示し、件数を併記。検索ラベルの横に「条件をクリア」を配置し、条件がないときは表示領域を保って非表示。入力欄・ボタンは高さ44〜48pxを確保する。768px以上は素材と検索を等幅2列で横に並べ、767px以下のフィルターは左右padding10px・gap6pxとし320pxでも3つを1列に収める。
- 料理カードは画像・料理名・説明・「作り方を見る」を1つのリンクにまとめる。Desktopは3列・gap32px、980px以下は2列、767px以下は1列・gap32px。見出しはDesktop22px／Mobile22px、説明15px・行間1.8、分類・分量は13px。写真は3:2・既存Radius Card、カード自体は囲まず、本文下にBorder Softの細い区切り。hover時の写真拡大は控えめにし、focus-visibleはText Mainの2px枠。
- 詳細の料理名・説明・写真を先に表示し、説明の末尾に「作り方へ進む」を置く。分量は材料欄に集約。写真下のページ内メニューは「材料／作り方／コツ／印刷」。高さ64px・Surface背景・Border Soft上下線、サイトヘッダーの実際の高さ（Desktop80px／Mobile72px）分だけ下へずらして追従、z-index20で共通ヘッダー50より下に置く。アンカーの到着位置はヘッダーとメニューの合計＋24px空ける。
- 材料はネイティブのチェックボックスを使用し、1行全体を押せるラベルにする。食材・分量16px、チェック24px、行の最低高さ48px。チェック時は文字の取り消し線とBackgroundの淡い面を併用。「チェックを外す」で初期化し、準備済み件数を表示。同じタブ内で当該レシピを再表示してもチェックを維持する。印刷時はチェックや操作を隠し、全材料を通常文字で表示する。
- 手順は20pxの明朝見出し、16px本文、32px間隔、Border Softの区切り。番号は20pxの既存明朝、本文と16px空ける。幅981px以上かつ高さ800px以上では材料欄もメニューの下で追従。980px以下では通常の縦並び、低い画面では材料欄も通常位置にして隠れないようにする。
- 検索・素材の条件はURLのクエリに反映し、詳細から戻る際にも維持。0件の際は結果の位置から条件を解除できる。JSが無効でも全料理、材料、手順は表示する。新たな時間・人数・栄養値は追加しない。
