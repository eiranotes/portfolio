# Adelie Draw Portfolio

Published at https://info.adeliedraw.com/

Static illustration and stationery portfolio. Artwork belongs to Adelie Draw; no reuse license granted. Deploys only public/. Internal source material and QA are excluded.

Validate with `python3 check_site.py` and `node --check public/app.js`.

Design follows the shared Adelie web design (canonical repo `adelie-web-design`), vendored in
`public/brand/`. Never edit `public/brand/` here; edit the canonical and run its
`tools/sync.py --write info`. `check_site.py` rejects edited brand files, a missing brand bar,
the wrong Shop locale link and the non-existent LINE Seed 500 weight.
