from pathlib import Path
import html,re
from bs4 import BeautifulSoup

p=Path('public')
pages=[('ko',p/'index.html'),('ja',p/'ja/index.html'),('en',p/'en/index.html')]
expected={
 'ko':'https://app.adeliedraw.com/portfolio/',
 'ja':'https://app.adeliedraw.com/portfolio/ja/',
 'en':'https://app.adeliedraw.com/portfolio/en/',
}
for locale,path in pages:
    assert path.is_file(), path
    text=path.read_text()
    soup=BeautifulSoup(text,'html.parser')
    assert soup.html.get('lang')==locale, (path,soup.html.get('lang'))
    assert 'noindex' not in text.lower(), path
    canonical=soup.find('link',rel='canonical')
    assert canonical and canonical.get('href')==expected[locale], (path,canonical)
    alternates={x.get('hreflang'):x.get('href') for x in soup.find_all('link',rel='alternate')}
    assert alternates.get('ja')==expected['ja'] and alternates.get('ko')==expected['ko'] and alternates.get('en')==expected['en'], (path,alternates)
    assert soup.find(id='signature') and soup.find(id='works') and soup.find(id='products') and soup.find(id='exhibitions') and soup.find(id='organizers')
    assert soup.select_one('.lang-switch') and len(soup.select('.lang-switch a'))==3
    ids={x.get('id') for x in soup.find_all(id=True)}
    for a in soup.find_all('a',href=True):
        href=a['href']
        if href.startswith('#'):
            assert href[1:] in ids, (path,href)
    for ref in {html.unescape(x) for x in re.findall(r'(?:\.\./)?assets/[^"\s,>]+\.(?:webp|jpg|jpeg|png)',text,re.I)}:
        while ref.startswith('../'): ref=ref[3:]
        assert (p/ref).is_file(), (path,ref)
    assert text.count('class="piece"')==39 and text.count('class="glass-window')==2 and text.count('class="work"')==11, path
    assert text.count('class="product-category"')==4, path

sitemap=(p/'sitemap.xml').read_text()
for url in expected.values(): assert url in sitemap,url
assert 'performance.js' not in (p/'app.js').read_text()
assert '겨울 풍경' not in (p/'index.html').read_text()
assert (p/'assets').is_dir()
print('PASS: 3 locales, assets, hreflang/canonical, indexable metadata, anchors, signature archive and sitemap')
