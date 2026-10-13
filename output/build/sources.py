"""Parse ## Bronnen sections from research/*.md into a prefixed, numbered source list."""
import re
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'research'
FILES = [('M','macro.md','Macro (PESTEL)'),('C','meso-creatine.md','Creatine gummies'),('G','meso-greens.md','Greens gummies'),
         ('E','meso-electrolytes.md','Electrolyte gummies'),('MG','meso-magnesium.md','Magnesium gummies'),
         ('L','meso-lionsmane.md',"Lion's mane gummies"),('H','meso-hair.md','Hair gummies'),('A','meso-acv.md','ACV gummies'),
         ('K','meso-combi.md','Combi creatine + electrolytes'),('V','verificatie.md','Verificatie (aanvullende bronnen)')]
def parse(path):
    if not path.exists(): return []
    txt = path.read_text()
    m = re.search(r'^## Bronnen.*?$(.*)', txt, re.M|re.S)
    if not m: return []
    out = []
    for line in m.group(1).splitlines():
        line = line.strip().lstrip('-* ').strip()
        mm = re.match(r'\[[A-Z]?(\d+[a-z]?)\]\s*(.*)', line)
        if mm: out.append((mm.group(1), mm.group(2)))
        elif re.match(r'^## ', line): break
    return out
def all_sources():
    return [(p, title, parse(R/f)) for p,f,title in FILES]
if __name__ == '__main__':
    for p,t,s in all_sources(): print(p, t, len(s))
