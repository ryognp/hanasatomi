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

自然薯農家「はなさとみ」（株式会社はなさとみ／代表取締役 田口美佳）は、
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
- Card shadow `0 8px 24px rgba(61, 59, 59, 0.06)`
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
- 11月出荷予定を明記する
- 10月末に一般販売開始予定であることを明記する
- Shopify業者専用ページは後日案内予定と明記する

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
  Shopify業者専用ページは 2026年10月末以降に `shop.hanasatomi.com` へ接続する前提で仮リンク管理する。
