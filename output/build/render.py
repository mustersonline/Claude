import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
src = Path(sys.argv[1]).resolve(); out = Path(sys.argv[2]).resolve()
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg = b.new_page()
    pg.goto(src.as_uri(), wait_until='networkidle')
    pg.evaluate('document.fonts.ready')
    pg.wait_for_timeout(1500)
    assert pg.evaluate('document.fonts.check("16px Poppins")'), 'Poppins not loaded'
    pg.pdf(path=str(out), format='A4', print_background=True, prefer_css_page_size=True,
           display_header_footer=True, header_template='<span></span>',
           footer_template='<div style="font-family:Helvetica;font-size:7.5px;color:#6E655C;width:100%;padding:0 16mm;display:flex;justify-content:space-between"><span>lorea · UK gummies marktanalyse · okt 2026</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
           margin={'top':'14mm','bottom':'16mm','left':'0','right':'0'})
    b.close()
print('ok', out)
# Underlay cream background so page margins are not white
from pypdf import PdfReader, PdfWriter
import copy, tempfile
bgp = Path(tempfile.mkdtemp())/'bg.pdf'
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg = b.new_page()
    pg.set_content('<html style="background:#FBF6EE;margin:0"><body style="margin:0"></body></html>')
    pg.pdf(path=str(bgp), format='A4', print_background=True, margin={'top':'0','bottom':'0','left':'0','right':'0'}); b.close()
bg = PdfReader(str(bgp)).pages[0]
r = PdfReader(str(out)); w = PdfWriter()
for page in r.pages:
    base = copy.deepcopy(bg)
    base.merge_page(page)
    w.add_page(base)
w.write(str(out)); print('bg ok')
