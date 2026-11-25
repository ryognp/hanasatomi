import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://hanasatomi.com';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const h = escapeHtml;
const url = r => '/recipes/' + r.slug + '/';
const jsonld = data => '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g, '\\u003c') + '</script>';

export function validateRecipes(recipes) {
  if (!Array.isArray(recipes) || !recipes.length) throw new Error('recipes must be a non-empty array');
  const slugs = new Set();
  for (const r of recipes) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.slug) || slugs.has(r.slug)) throw new Error('Invalid or duplicate slug: ' + r.slug);
    slugs.add(r.slug);
    for (const key of ['title','description','image','imageAlt','yieldLabel','updatedAt']) if (typeof r[key] !== 'string' || !r[key].trim()) throw new Error('Missing ' + key + ': ' + r.slug);
    if (!['jinenjo','mukago'].includes(r.category)) throw new Error('Invalid category');
    if (!/^\/assets\/images\/[a-zA-Z0-9_.-]+$/.test(r.image)) throw new Error('Invalid image path');
    if (!(r.imageWidth > 0 && r.imageHeight > 0)) throw new Error('Invalid image dimensions');
    for (const key of ['ingredients','steps']) if (!Array.isArray(r[key]) || !r[key].length || r[key].some(v => !Array.isArray(v) || v.length !== 2 || v.some(s => typeof s !== 'string' || !s.trim()))) throw new Error('Invalid ' + key);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.updatedAt)) throw new Error('Invalid update date');
    for (const [,href] of r.references || []) if (!href.startsWith('https://')) throw new Error('Invalid reference URL');
  }
}
function image(r, eager=false) {
  return '<img src="' + h(r.image) + '" alt="' + h(r.imageAlt) + '" width="' + r.imageWidth + '" height="' + r.imageHeight + '" loading="' + (eager?'eager':'lazy') + '" decoding="async">';
}
function card(r) {
  const keywords = [r.title, r.categoryLabel, r.description, ...r.ingredients.map(i => i[0])].join(' ');
  return '<li class="recipe-card" data-category="' + h(r.category) + '" data-keywords="' + h(keywords) + '"><a class="recipe-card-photo" href="' + url(r) + '" aria-label="' + h(r.title) + 'の作り方">' + image(r) + '</a><p class="recipe-category">' + h(r.categoryLabel) + '</p><h2>' + h(r.title) + '</h2><p class="recipe-card-description">' + h(r.description) + '</p><a class="recipe-read" href="' + url(r) + '">作り方を見る</a></li>';
}
function shell(chrome, title, description, path, img, main, schemas, index=false) {
  const fullTitle = title + '｜はなさとみ';
  const values = {'description':description,'og:title':fullTitle,'og:description':description,'og:url':ORIGIN+path,'og:image':ORIGIN+img,'twitter:title':fullTitle,'twitter:description':description,'twitter:image':ORIGIN+img};
  let head = chrome.head.replace('<html lang="ja">','<html lang="ja" class="recipes-document">').replace(/<title>.*?<\/title>/s, '<title>'+h(fullTitle)+'</title>');
  head = head.replace(/<meta (name|property)="([^"]+)" content="[^"]*">/g, (tag,type,name) => values[name] ? '<meta '+type+'="'+name+'" content="'+h(values[name])+'">' : tag);
  head = head.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="'+ORIGIN+path+'">').replace(/<link rel="stylesheet" href="\/assets\/css\/jinenjo.css[^"]*">\n?/g, '');
  const header = chrome.header.replace(/ aria-current="page"/g,'').replace('href="/recipes/"','href="/recipes/" aria-current="'+(index?'page':'true')+'"');
  return head + '<link rel="stylesheet" href="/assets/css/recipes.css?v=20261126-1">\n' + schemas.map(jsonld).join('\n') + '\n</head>\n<body class="recipes-page"><a class="recipe-skip" href="#main">本文へ進む</a>\n' + header + '\n<main id="main">\n' + main + '\n</main>\n' + chrome.footer + '\n<script src="/assets/js/main.js?v=20260710-polish2"></script>\n<script src="/assets/js/recipes.js?v=20261126-1" defer></script>\n</body>\n</html>\n';
}
function breadcrumbs(r) {
  return '<nav class="recipe-breadcrumbs" aria-label="パンくずリスト"><a href="/">ホーム</a><span aria-hidden="true">/</span>' + (r?'<a href="/recipes/">自然薯レシピ</a><span aria-hidden="true">/</span><span aria-current="page">'+h(r.title)+'</span>':'<span aria-current="page">自然薯レシピ</span>') + '</nav>';
}
function breadcrumbSchema(r) {
  const items = [{name:'ホーム',item:ORIGIN+'/'},{name:'自然薯レシピ',item:ORIGIN+'/recipes/'}];
  if (r) items.push({name:r.title,item:ORIGIN+url(r)});
  return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((v,i)=>({'@type':'ListItem',position:i+1,...v}))};
}
export function buildRecipeOutputs(recipes, chrome) {
  validateRecipes(recipes);
  const outputs = new Map();
  const indexMain = '<div class="container recipe-library">' + breadcrumbs() + '<header class="recipe-intro"><p class="eyebrow">RECIPES</p><h1>自然薯レシピ</h1><p>すりおろして、和えて、炊き込んで。<br>自然薯とむかごを楽しむ、日々の食卓。</p></header><section class="recipe-controls" aria-label="レシピを探す" data-recipe-controls hidden><form class="recipe-search" role="search"><label for="recipe-search">料理名・食材で探す<input id="recipe-search" name="q" type="search" placeholder="例：むかご、梅、大葉" autocomplete="off"></label><button type="reset" disabled>条件をクリア</button></form><div class="recipe-filters" role="group" aria-label="素材で絞り込む"><button type="button" data-filter="all" aria-pressed="true">すべて</button><button type="button" data-filter="jinenjo" aria-pressed="false">自然薯</button><button type="button" data-filter="mukago" aria-pressed="false">むかご</button></div></section><p class="recipe-result" role="status" aria-live="polite" data-recipe-count>' + recipes.length + '件のレシピ</p><ul class="recipe-grid" data-recipe-list>' + recipes.map(card).join('\n') + '</ul><div class="recipe-empty" data-recipe-empty hidden><p>条件に合うレシピが見つかりません。</p><p>別の料理名や食材で探してみてください。</p></div></div>';
  const listSchema = {'@context':'https://schema.org','@type':'ItemList',itemListElement:recipes.map((r,i)=>({'@type':'ListItem',position:i+1,url:ORIGIN+url(r),name:r.title}))};
  outputs.set('recipes/index.html', shell(chrome,'自然薯レシピ','自然薯とむかごの写真付きレシピ。とろろごはんや季節の一品など、料理名・食材から探せる材料と作り方をご紹介します。','/recipes/',recipes[0].image,indexMain,[breadcrumbSchema(),listSchema],true));
  for (const r of recipes) {
    const others = [...recipes.filter(v=>v.slug!==r.slug&&v.category===r.category),...recipes.filter(v=>v.category!==r.category)].slice(0,2);
    const heading = r.headingLines ? r.headingLines.map(line=>'<span>'+h(line)+'</span>').join('') : h(r.title);
    const ingredients = r.ingredients.map(([n,q])=>'<div><dt>'+h(n)+'</dt><dd>'+h(q)+'</dd></div>').join('\n');
    const steps = r.steps.map(([t,p])=>'<li><h3>'+h(t)+'</h3><p>'+h(p)+'</p></li>').join('\n');
    const tips = r.tips?.length ? '<aside class="recipe-tips" aria-labelledby="tips-heading"><h2 id="tips-heading">おいしく作るコツ</h2><ul>'+r.tips.map(t=>'<li>'+h(t)+'</li>').join('')+'</ul></aside>' : '';
    const refs = r.references?.length ? '<div class="recipe-references">'+r.references.map(([label,href])=>'<p><a href="'+h(href)+'" target="_blank" rel="noopener">'+h(label)+'</a></p>').join('')+'</div>' : '';
    const main = '<article class="container recipe-detail">'+breadcrumbs(r)+'<header class="recipe-hero"><div class="recipe-hero-copy"><p class="eyebrow">'+h(r.categoryLabel)+'のレシピ</p><h1>'+heading+'</h1><p class="recipe-description">'+h(r.description)+'</p><p class="recipe-yield">'+h(r.yieldLabel)+'</p><nav class="recipe-actions" aria-label="レシピ内の移動"><a href="#ingredients">材料</a><a href="#steps">作り方</a><button type="button" data-print hidden>印刷する</button></nav></div><figure class="recipe-main-photo">'+image(r,true)+'</figure></header><div class="recipe-body"><section id="ingredients" aria-labelledby="ingredients-heading"><h2 id="ingredients-heading">材料<span>'+h(r.yieldLabel)+'</span></h2><dl class="recipe-ingredients">'+ingredients+'</dl></section><section id="steps" aria-labelledby="steps-heading"><h2 id="steps-heading">作り方</h2><ol class="recipe-steps">'+steps+'</ol></section></div>'+tips+(r.note?'<p class="recipe-note">'+h(r.note)+'</p>':'')+refs+'<nav class="recipe-bottom-nav" aria-label="レシピの関連ページ"><a class="btn btn--secondary" href="/recipes/">レシピ一覧へ</a><a class="recipe-read" href="/jinenjo/">自然薯について知る</a></nav></article><section class="recipe-related"><div class="container"><h2>こちらのレシピも</h2><ul class="recipe-grid">'+others.map(card).join('')+'</ul></div></section>';
    const schema = {'@context':'https://schema.org','@type':'Recipe',name:r.title,description:r.description,image:[ORIGIN+r.image],recipeYield:r.yieldLabel,recipeIngredient:r.ingredients.map(i=>i.join(' ')),recipeInstructions:r.steps.map(([name,text])=>({'@type':'HowToStep',name,text})),author:{'@type':'Organization',name:'株式会社はなさとみ',url:ORIGIN+'/'}};
    outputs.set('recipes/'+r.slug+'/index.html', shell(chrome,r.title,r.description,url(r),r.image,main,[breadcrumbSchema(r),schema]));
  }
  return outputs;
}
export function buildSitemap(base, recipes) {
  const cleaned = base.replace(/\s*<url>\s*<loc>https:\/\/hanasatomi\.com\/recipes\/(?:[^<]*)<\/loc>[\s\S]*?<\/url>/g,'');
  const date = recipes.map(r=>r.updatedAt).sort().at(-1);
  const paths = ['/recipes/',...recipes.map(url)];
  return cleaned.replace(/\s*<\/urlset>/,'\n'+paths.map(p=>'  <url>\n    <loc>'+ORIGIN+p+'</loc>\n    <lastmod>'+date+'</lastmod>\n    <priority>0.7</priority>\n  </url>').join('\n')+'\n</urlset>');
}
export async function build({check=false}={}) {
  const data = JSON.parse(await readFile(resolve(ROOT,'content/recipes.json'),'utf8'));
  const source = await readFile(resolve(ROOT,'jinenjo/index.html'),'utf8');
  const chrome = {head:source.slice(0,source.indexOf('</head>')),header:source.match(/<header class="site-header">[\s\S]*?<\/header>/)[0],footer:source.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0]};
  for (const r of data.recipes) if (!existsSync(resolve(ROOT,'.'+r.image))) throw new Error('Missing image: '+r.image);
  const outputs = buildRecipeOutputs(data.recipes,chrome);
  outputs.set('sitemap.xml',buildSitemap(await readFile(resolve(ROOT,'sitemap.xml'),'utf8'),data.recipes));
  for (const [path,content] of outputs) {
    const target=resolve(ROOT,path);
    if (check) {if (!existsSync(target)||(await readFile(target,'utf8'))!==content) throw new Error('Regenerate '+path);}
    else {await mkdir(dirname(target),{recursive:true});await writeFile(target,content);}
  }
  console.log((check?'Checked ':'Generated ')+data.recipes.length+' recipes and recipe index.');
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) await build({check:process.argv.includes('--check')});
