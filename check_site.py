from pathlib import Path
import html,json,re

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
    for required in ('signature','schedule','works','products','exhibitions','organizers'):
        assert f'id="{required}"' in text, (path,required)
    assert text.count('class="lang-switch"')==1
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
    for channel in ('https://app.adeliedraw.com/','https://smartstore.naver.com/adeliedraw','https://www.instagram.com/adelie.draw/','https://x.com/canvaswitch_'):
        assert channel in text, (path, channel)

sitemap=(p/'sitemap.xml').read_text()
for url in expected.values(): assert url in sitemap,url
assert 'performance.js' not in (p/'app.js').read_text()
assert '겨울 풍경' not in (p/'index.html').read_text()
assert (p/'assets').is_dir()
for icon in ('adelie-app.png','naver-smartstore.png','email.svg','kakao.svg','instagram.svg','x.svg','twenty.svg'):
    assert (p/'assets/icons'/icon).is_file(), icon
schedule=json.loads((p/'data/schedule.json').read_text())
seed=json.loads((p/'data/schedule.seed.json').read_text())
for data in (schedule,seed):
    assert data.get('schema')==1
    assert data.get('timezone')=='Asia/Seoul'
    assert isinstance(data.get('events'),list)
    for event in data['events']:
        assert re.fullmatch(r'\d{4}-\d{2}-\d{2}',event['start'])
        assert re.fullmatch(r'\d{4}-\d{2}-\d{2}',event.get('end',event['start']))
        assert event.get('type') in {'schedule','major','blocked'}
assert 'data-monthly-schedule' in (p/'index.html').read_text()
assert 'data-repo-path="public/data/schedule.json"' in (p/'index.html').read_text()
print('PASS: 3 locales, assets/icons, monthly schedule, channel links, hreflang/canonical, indexable metadata, anchors, signature archive and sitemap')
