import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ROOT,buildRecipeOutputs,buildSitemap,validateRecipes} from '../scripts/build-recipes.mjs';
const {recipes}=JSON.parse(await readFile(ROOT+'/content/recipes.json','utf8'));
const chrome={head:'<!doctype html><html lang="ja"><head><title>Test</title><link rel="canonical" href="https://hanasatomi.com/"><meta name="description" content="Test">',header:'<header><a href="/recipes/">自然薯レシピ</a></header>',footer:'<footer>はなさとみ</footer>'};
test('all recipes have complete linked pages with the provided quantities',()=>{
 const pages=buildRecipeOutputs(recipes,chrome);assert.equal(pages.size,recipes.length+1);
 for(const r of recipes){assert.ok(pages.get('recipes/index.html').includes('/recipes/'+r.slug+'/'));const html=pages.get('recipes/'+r.slug+'/index.html');assert.ok(html.includes('id="ingredients"'));assert.ok(html.includes('id="steps"'));assert.ok(html.includes('"@type":"Recipe"'));assert.ok(html.includes(r.image));}
 const anchovy=recipes.find(r=>r.slug==='mukago-anchovy-garlic');assert.deepEqual(anchovy.ingredients.slice(0,3),[['むかご','150g'],['にんにく','約1/2片'],['アンチョビ','1切れ']]);assert.ok(anchovy.steps[0][1].includes('約5分'));
 const plum=recipes.find(r=>r.slug==='jinenjo-ume-shiso');assert.deepEqual(plum.ingredients[0],['自然薯','300g']);assert.equal(plum.ingredients.length,7);
});
test('a future recipe appears in the list, detail pages, related links and sitemap without template changes',()=>{
 const extra={...recipes[0],slug:'future-recipe',title:'追加レシピの確認'};
 const all=[...recipes,extra];const pages=buildRecipeOutputs(all,chrome);assert.equal(pages.size,all.length+1);assert.ok(pages.get('recipes/index.html').includes('/recipes/future-recipe/'));assert.ok(pages.has('recipes/future-recipe/index.html'));assert.ok(pages.get('recipes/tororo-rice/index.html').includes('/recipes/future-recipe/'));
 const base='<?xml version="1.0"?><urlset><url><loc>https://hanasatomi.com/</loc></url></urlset>';const map=buildSitemap(base,all);assert.ok(map.includes('/recipes/future-recipe/'));assert.equal(buildSitemap(map,all),map);
});
test('invalid slugs and duplicate routes are rejected; recipe text is safely escaped',()=>{
 assert.throws(()=>validateRecipes([...recipes,{...recipes[0]}]),/duplicate/);
 assert.throws(()=>validateRecipes([{...recipes[0],slug:'../outside'}]),/slug/);
 const malicious={...recipes[0],title:'<script>alert(1)</script>'};const html=buildRecipeOutputs([malicious],chrome).get('recipes/tororo-rice/index.html');assert.ok(!html.includes('<script>alert(1)</script>'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('\\u003cscript'));
});
