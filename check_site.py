from pathlib import Path
import hashlib,html,json,re

p=Path('public')
pages=[('ko',p/'index.html'),('ja',p/'ja/index.html'),('en',p/'en/index.html')]
expected={
 'ko':'https://info.adeliedraw.com/',
 'ja':'https://info.adeliedraw.com/ja/',
 'en':'https://info.adeliedraw.com/en/',
}
for locale,path in pages:
    assert path.is_file(), path
    text=path.read_text()
    assert re.search(rf'<html\s+lang="{locale}"',text), path
    assert 'noindex' not in text.lower(), path
    canonical=re.search(r'<link rel="canonical" href="([^"]+)">',text)
    assert canonical and canonical.group(1)==expected[locale], (path,canonical.group(1) if canonical else None)
    alternates=dict(re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">',text))
    assert alternates.get('ja')==expected['ja'] and alternates.get('ko')==expected['ko'] and alternates.get('en')==expected['en'], (path,alternates)
    for required in ('signature','works','products','exhibitions','organizers'):
        assert f'id="{required}"' in text, (path,required)
    assert text.count('class="lang-switch"')==1
    shop={'ko':'https://shop.adeliedraw.com/','ja':'https://jp.adeliedraw.com/','en':'https://en.adeliedraw.com/'}[locale]
    assert 'class="ad-brandbar"' in text and 'href="https://info.adeliedraw.com/" aria-current="page">Info</a>' in text and f'href="{shop}">Shop</a>' in text, (path,'brand bar')
    assert 'font-weight:500' not in (p/'styles.css').read_text(), 'LINE Seed has no 500 weight'
    assert text.count('hreflang="ja"')>=2 and text.count('hreflang="ko"')>=2 and text.count('hreflang="en"')>=2
    ids=set(re.findall(r'\bid="([^"]+)"',text))
    for href in re.findall(r'<a\b[^>]*\bhref="([^"]+)"',text):
        if href.startswith('#'):
            assert href[1:] in ids, (path,href)
    for ref in {html.unescape(x) for x in re.findall(r'(?:\.\./)?assets/[^"\s,>]+\.(?:webp|jpg|jpeg|png|svg)',text,re.I)}:
        while ref.startswith('../'): ref=ref[3:]
        assert (p/ref).is_file(), (path,ref)
    assert text.count('class="piece"')==39 and text.count('class="glass-window')==2 and text.count('class="work"')==11, path
    assert text.count('class="product-category"')==4, path
    stockists=text.split('id="stockists"',1)[1].split('</div>',1)[0]
    assert all(store in stockists for store in ('https://shop.adeliedraw.com/','https://en.adeliedraw.com/','https://jp.adeliedraw.com/')), (path,'official stores in sales channels')
    assert text.count('class="text-link category-shop" href="'+shop+'?category=')==4, (path,'store link per product category')
    assert 'class="sr-only"' not in ''.join(re.findall(r'<a class="image-link"[^>]*>.*?</a>',text)), (path,'image link repeats its aria-label')
    for channel in ('https://app.adeliedraw.com/','https://smartstore.naver.com/adeliedraw','https://www.instagram.com/adelie.draw/','https://x.com/canvaswitch_'):
        assert channel in text, (path, channel)

sitemap=(p/'sitemap.xml').read_text()
for url in expected.values(): assert url in sitemap,url
assert 'performance.js' not in (p/'app.js').read_text()
assert '겨울 풍경' not in (p/'index.html').read_text()
assert (p/'assets').is_dir()
brand=json.loads((p/'brand/MANIFEST.json').read_text())
for name,digest in brand['files'].items():
    assert hashlib.sha256((p/'brand'/name).read_bytes()).hexdigest()==digest,('Edited vendored brand file; sync from adelie-web-design',name)
for icon in ('adelie-app.png','adelie-draw.png','naver-smartstore.png','email.svg','kakao.svg','instagram.svg','x.svg','twenty.svg'):
    assert (p/'assets/icons'/icon).is_file(), icon
print('PASS: 3 locales, brand copy and brand bar, assets/icons, channel links, hreflang/canonical, indexable metadata, anchors, signature archive and sitemap')
