from pathlib import Path
import re,html
p=Path('public');s=(p/'index.html').read_text()
for asset in {html.unescape(a) for a in re.findall(r'assets/[^"\s,]+\.webp',s)}:
 assert (p/asset).is_file(),asset
assert '겨울 풍경' not in s
assert 'performance.js' not in (p/'app.js').read_text()
assert s.count('class="product-category"')==4
assert 'Stained Glass V1' in s and 'Stained Glass V2' in s
assert s.count('class="piece"')==130 and s.count('class="glass-window')==2
print('PASS: assets, categories, V1/V2 windows with 130 pieces, removed winter artwork')
