"""Assemble report.html -> lorea-gummies-markt-analyse.html, inject computed scores and source list."""
import html, re
from pathlib import Path
from sources import all_sources

B = Path(__file__).resolve().parent
OUT = B.parent

CRIT = [  # (key, label, weight)
    ('markt', 'Marktomvang/groei', 0.15),
    ('conc', 'Concurrentiedruk (omgekeerd)', 0.10),
    ('prijs', 'Prijsruimte', 0.10),
    ('herhaal', 'Herhaalpotentie', 0.15),
    ('claim', 'Claim-mogelijkheid', 0.10),
    ('risico', 'Productrisico (omgekeerd)', 0.15),
    ('fit', 'Fit met Lorea-branding', 0.15),
    ('bulk', 'Bulk-geschiktheid', 0.10),
]
SCORES = {
    'Magnesium':     dict(markt=4, conc=2, prijs=3, herhaal=4, claim=3, risico=3, fit=4, bulk=3),
    'Creatine':      dict(markt=4, conc=2, prijs=3, herhaal=4, claim=3, risico=1, fit=3, bulk=2),
    'Hair':          dict(markt=3, conc=1, prijs=2, herhaal=4, claim=3, risico=3, fit=3, bulk=2),
    "Lion's mane":   dict(markt=3, conc=2, prijs=3, herhaal=3, claim=2, risico=2, fit=4, bulk=2),
    'Greens':        dict(markt=3, conc=2, prijs=3, herhaal=3, claim=2, risico=2, fit=3, bulk=2),
    'Electrolytes':  dict(markt=3, conc=3, prijs=3, herhaal=2, claim=2, risico=2, fit=3, bulk=2),
    'Combi creatine + electrolytes': dict(markt=3, conc=2, prijs=3, herhaal=4, claim=2, risico=1, fit=2, bulk=1),
    'ACV':           dict(markt=3, conc=1, prijs=2, herhaal=3, claim=1, risico=1, fit=2, bulk=2),
}
assert abs(sum(w for *_, w in CRIT) - 1) < 1e-9

def weighted(s): return sum(s[k]*w for k, _, w in CRIT)
def unweighted(s): return sum(s[k] for k, _, _ in CRIT) / len(CRIT)
def nl(x, d=2):
    from decimal import Decimal, ROUND_HALF_UP
    q = Decimal(str(round(x, 6))).quantize(Decimal(1).scaleb(-d), rounding=ROUND_HALF_UP)
    return str(q).replace('.', ',')

def ranking():
    return sorted(SCORES.items(), key=lambda kv: -weighted(kv[1]))

def score_table():
    rows = []
    head = ''.join(f'<th class="c">{l}<br><span class="xs sub">{int(w*100)}%</span></th>' for _, l, w in CRIT)
    for i, (name, s) in enumerate(ranking(), 1):
        cells = ''.join(f'<td class="c">{s[k]}</td>' for k, _, _ in CRIT)
        rows.append(f'<tr{" class=hl" if i<=3 else ""}><td><b>{i}</b></td><td><b>{html.escape(name)}</b></td>{cells}'
                    f'<td class="num"><b>{nl(weighted(s))}</b></td><td class="num sub">{nl(unweighted(s))}</td></tr>')
    return (f'<table><thead><tr><th>#</th><th>Product</th>{head}<th class="num">Gewogen</th><th class="num">Ongewogen</th></tr></thead>'
            f'<tbody>{"".join(rows)}</tbody></table>')

def rank_of(name):
    return [n for n, _ in ranking()].index(name) + 1

def sources_html():
    out = []
    for p, title, srcs in all_sources():
        if not srcs: continue
        items = []
        for n, txt in srcs:
            t = html.escape(txt)
            t = re.sub(r'(https?://[^\s,;)]+)', r'<span style="color:#6E655C">\1</span>', t)
            items.append(f'<p class="src"><b>[{p}{n}]</b> {t}</p>')
        out.append(f'<div class="srcgroup"><h4>{html.escape(title)} <span class="sub small">(prefix {p})</span></h4>{"".join(items)}</div>')
    return ''.join(out)

def main():
    t = (B/'report.html').read_text()
    t = t.replace('[[SCORES]]', score_table()).replace('[[SOURCES]]', sources_html())
    t = t.replace('[[CSS]]', (B/'style.css').read_text())
    def r(m): return f'<span class="ref">[{m.group(1)}]</span>'
    t = re.sub(r'\{\{([A-Z]{1,2}\d+[a-z]?(?:, ?[A-Z]{1,2}\d+[a-z]?)*)\}\}', r, t)
    t = re.sub(r'\{\{RANK:([^}]+)\}\}', lambda m: str(rank_of(m.group(1))), t)
    t = re.sub(r'\{\{SCORE:([^}]+)\}\}', lambda m: nl(weighted(SCORES[m.group(1)])), t)
    t = t.replace('[AANNAME]', '<span class="tag">AANNAME</span>').replace('[CHECK CLAIM]', '<span class="check">CHECK CLAIM</span>')
    bad = [c for c in ('—', '–') if c in t]
    assert not bad, f'dashes found: {bad}'
    (OUT/'lorea-gummies-markt-analyse.html').write_text(t)
    for n, s in ranking(): print(rank_of(n), n, nl(weighted(s)), nl(unweighted(s)))

if __name__ == '__main__':
    main()
