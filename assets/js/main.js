/* はなさとみ 公式サイト 共通スクリプト
   - 外部LINE友だち追加URLの一元管理（サイト内で定義はここ1箇所のみ）
   - モバイルのハンバーガーメニュー開閉
*/

/* === LINE公式アカウント 友だち追加URL ===
   この1行を変えれば、data-line-link を付けた全ページのボタンに自動反映される。
   HTML側は href を直書きせず、data-line-link 属性を付けた <a> に反映する仕組み。 */
var LINE_URL = "https://lin.ee/U0a5Cxd";

(function () {
  // data-line-link を持つ要素すべてに LINE_URL を反映（外部リンク化）。
  // JS無効時はHTML側の fallback href="/line/"（内部・同ページ）が効き、
  // リンクとして違和感なく機能する。JS有効時のみ外部URL＋別タブに昇格させる。
  var links = document.querySelectorAll('[data-line-link]');
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute('href', LINE_URL);
    links[i].setAttribute('target', '_blank');
    links[i].setAttribute('rel', 'noopener');
  }

  // 固定CTAの出し分け：ページ内CTAブロック／フッターが見えている間は引っ込める（二重表示回避）
  var mobileCta = document.querySelector('.mobile-cta');
  if (mobileCta && 'IntersectionObserver' in window) {
    var watched = document.querySelectorAll('.cta-block, .site-footer');
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) visible.add(entries[j].target);
        else visible.delete(entries[j].target);
      }
      mobileCta.classList.toggle('is-hidden', visible.size > 0);
    }, { threshold: 0.15 });
    for (var k = 0; k < watched.length; k++) io.observe(watched[k]);
  }

  // ハンバーガーメニュー
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) setOpen(false);
  });
})();
