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

  // 固定CTAの出し分け：ヒーロー／ページ内CTAブロック／フッターが見えている間は引っ込める（二重表示回避）
  // スクロール判定方式（getBoundingClientRect）で、読み込み時・スクロール時・リサイズ時に評価する。
  var mobileCta = document.querySelector('.mobile-cta');
  if (mobileCta) {
    var watched = document.querySelectorAll('.hero, .cta-block, .site-footer');
    var ticking = false;
    function updateMobileCta() {
      ticking = false;
      var anyVisible = false;
      for (var j = 0; j < watched.length; j++) {
        var r = watched[j].getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { anyVisible = true; break; }
      }
      mobileCta.classList.toggle('is-hidden', anyVisible);
    }
    function onScrollCta() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateMobileCta); }
    }
    window.addEventListener('scroll', onScrollCta, { passive: true });
    window.addEventListener('resize', onScrollCta, { passive: true });
    updateMobileCta(); // 初期評価（読み込み直後）
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
