// Find the page with `modulestatus.page` set to true

try {
var wxPublicSlug = function(p) {
    if (!p) return '';
    var n = p.pathnext;
    if (n != null && String(n).trim() !== '') return String(n).trim();
    return p.path != null ? String(p.path) : '';
};
var pagesettingjson = webmakerdata.pagesetting.data.find(
    function(item) { return item.modulestatus && item.modulestatus.page; },
);
var backhtml = `<a href="${wxLangInternalHref('')}" class="modulexmenuitem">@home@ </a>`;
if (pagesettingjson) {
    // Iterate over the relevant data to create HTML content
    for (var iterator of webmakerdata[pagesettingjson.path].data) {
        if (iterator.status == 'play' && iterator.category == '') {
            // Aktif sayfa: pathnext ile aynı yayın segmentinde karşılaştır
            var isActive = wxPublicSlug(iterator) === wxPublicSlug(page);
            var activeClass = isActive ? ' modulexmenuactive' : '';
            backhtml += `<a href="${wxLangInternalHref(
                wxPublicSlug(iterator),
            )}" class="modulexmenuitem${activeClass}">${
                iterator.name[json.lang]
            }</a>`;
        }
    }
    // Replace the placeholder {{html}} with the generated backhtml content
    html = html.replace(new RegExp('{{html}}', 'g'), backhtml);
}
// Dil linkleri: bulunulan sayfada kalsın (ana sayfa değilse aynı path ile dil değişsin)
langhtml = '';
var langCount = 0;
var currentPagePath = wxPublicSlug(page);
for (var key in webmakerdata.setting.langs) {
    if (webmakerdata.setting.langs[key] == true) {
        langCount++;
        var langUrl = wxLangHref(key, currentPagePath || "");
        /* G1: tek üretici (hreflang + aria-current; png yoksa kod) — wmLangLi yoksa eski biçim */
langhtml += typeof wmLangLi === "function" ? wmLangLi(key, langUrl, { style: "flag" }) : `<li><a href="${langUrl}"><img height="25" src="/src/lang/${key}.png" alt="${key}" loading="lazy"></a></li>`;
    }
}
// Eğer sadece 1 dil varsa dil seçiciyi gösterme
if (langCount <= 1) {
    langhtml = '';
}
html = html.replace(new RegExp('{{langhtml}}', 'g'), langhtml);
} catch (error) {
    html = html.replace(new RegExp('{{langhtml}}', 'g'), error);

}