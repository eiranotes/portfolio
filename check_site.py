from pathlib import Path
import re
p=Path('public');s=(p/'index.html').read_text()
for asset in set(re.findall(r'assets/([a-zA-Z0-9-]+\.webp)',s)):
 assert (p/'assets'/asset).is_file(),asset
assert '겨울 풍경' not in s
assert s.count('class="product-category"')==4
assert 'Stained Glass V1' in s and 'Stained Glass V2' in s
print('PASS: assets, categories, V1/V2, removed winter artwork')
