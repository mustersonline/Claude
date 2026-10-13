"""One-off: apply round-2 findings (research/verificatie.md, sectie 7) to report.html."""
from pathlib import Path
p = Path(__file__).resolve().parent / 'report.html'
t = p.read_text()
R = [
("prijzen tot £0,22 per dag.</td>", "prijzen vanaf £0,22 per dag.</td>"),
("Bij 0,9 tot 2,0 g actief per gummy: 3 tot 5 gummies <span class=\"tag\">AANNAME</span>.", "Bij 0,9 tot 2,0 g actief per gummy: 3 tot 5 gummies, realistisch 4 tot 5 <span class=\"tag\">AANNAME</span>."),
("<span class=\"chip bulk\">Bulk-kandidaat</span> <b>zekerheid middel.</b> Meest stabiele vraag van de acht, laag seizoensrisico, standaardformule zonder stabiliteitsvalkuil.",
 "<span class=\"chip bulk\">Bulk-kandidaat</span> <b>zekerheid middel.</b> Het meso-onderzoek gaf \"eerst testen via dropship\"; wij noemen magnesium een bulk-kandidaat omdat het als enige geen stabiliteits-, claim- of seizoensvalkuil heeft, maar pas na een dropshiptest van 60 dagen. Naar de beschikbare signalen de meest stabiele vraag van de acht {{MG1, MG2, MG5}} <span class=\"tag\">AANNAME</span>, laag seizoensrisico, standaardformule."),
("<td>Beste fit met merk en ICP's; stabiele vraag; bulk na 60-dagen dropshiptest.</td>", "<td>Beste fit met merk en ICP's; groeiende, weinig seizoensgebonden vraag (UK niet geverifieerd); bulk na 60-dagen dropshiptest.</td>"),
("<tr class=\"hl\"><td><b>Magnesium</b></td><td>Hoog</td>", "<tr class=\"hl\"><td><b>Magnesium</b></td><td>Middel tot hoog <span class=\"tag\">AANNAME</span></td>"),
("Lion's mane staat bij gelijke score vóór greens.", "Lion's mane en greens delen plek 5 (gelijke gewogen en ongewogen score); hun volgorde in de tabel is willekeurig."),
("Plek 2 en 3 en plek 5 tot 7 liggen binnen 0,1 punt en zijn feitelijk gelijk.", "Plek 2 en 3 en plek 5 tot 7 liggen binnen 0,1 punt en zijn feitelijk gelijk; lion's mane en greens delen plek 5."),
("Er is een prijsgat tussen £0,50 en £2,25 per dag.", "Het middensegment is dun bezet: tussen budget (£0,47 tot £0,48) en Grüns (£2,25) staat alleen Starpowa op £1,00 per dag."),
("<td>Gat in het middensegment, maar geen claim en greenwashing-risico.</td>", "<td>Dun bezet middensegment, maar geen claim en greenwashing-risico.</td>"),
("<tr><td>Known Nutrition (gummy)</td><td class=\"num\">£13,59 (was £16,99)</td><td class=\"num\">60</td><td class=\"num\">4</td><td>per 4: Na 94, K 40, Mg 56, Cl 149 mg</td><td>13,59 / 15 = <b>£0,91</b></td>",
 "<tr><td>Known Nutrition (gummy)</td><td class=\"num\">£16,99 (actie £13,59)</td><td class=\"num\">60</td><td class=\"num\">4</td><td>per 4: Na 94, K 40, Mg 56, Cl 149 mg</td><td>16,99 / 15 = <b>£1,13</b> (actie £0,91)</td>"),
("<tr><td>Known Nutrition</td><td>Budget</td><td class=\"num\">£13,59 (was £16,99)</td><td class=\"num\">60</td><td class=\"num\">2</td><td>ca. 250 mg extract (10:1)</td><td>13,59 / 30 = <b>£0,45</b></td>",
 "<tr><td>Known Nutrition</td><td>Budget</td><td class=\"num\">£16,99 (actie £13,59)</td><td class=\"num\">60</td><td class=\"num\">2</td><td>ca. 250 mg extract (10:1)</td><td>16,99 / 30 = <b>£0,57</b> (actie £0,45)</td>"),
("<div class=\"kpi\"><b>£0,45 tot £1,05</b><span>per dag, UK-retail {{L9, L13, L14}}</span></div>", "<div class=\"kpi\"><b>£0,50 tot £1,05</b><span>per dag, UK-retail regulier; actie vanaf £0,45 {{L9, L13, L14, L15}}</span></div>"),
("<tr><td>Hairburst</td><td>Instagram-merk</td><td class=\"num\">£14,30 (RRP £22)</td><td class=\"num\">60</td><td class=\"num\">2</td><td>150 µg / 10 mg / 55 µg</td><td>14,30 / 30 = <b>£0,48</b> (RRP £0,73)</td>",
 "<tr><td>Hairburst</td><td>Instagram-merk</td><td class=\"num\">£22,00 RRP (actie £14,30)</td><td class=\"num\">60</td><td class=\"num\">2</td><td>150 µg / 10 mg / 55 µg</td><td>22,00 / 30 = <b>£0,73</b> (actie £0,48)</td>"),
("<td class=\"num\">£17,98 (sale)</td>", "<td class=\"num\">£17,98 (sale; regulier onbekend)</td>"),
("richt op de bewuste oudere (55+-krachttrainingsclaim) en vrouwen.", "richt op de bewuste oudere (55+-krachttrainingsclaim) en, zonder doelgroepclaim, op vrouwen die krachttrainen."),
("prijs per dag zichtbaar rond £0,55 tot £0,65 (markt £0,57 tot £0,67 {{MG9, MG13}}).", "prijs per dag zichtbaar rond £0,55 tot £0,65 <span class=\"tag\">AANNAME</span> (doelprijs net onder de markt van £0,57 tot £0,67 {{MG9, MG13}})."),
("CAC versus marge bij £0,60 tot £0,83 per dag,", "CAC versus marge bij £0,60 tot £0,83 per dag (marktband {{C10, C16}}),"),
("CPA versus marge bij £0,60 tot £1,00 per dag,", "CPA versus marge bij £0,60 tot £1,00 per dag <span class=\"tag\">AANNAME</span> (doelprijs middensegment),"),
("CAC ruim onder de marge bij £0,30 tot £0,50 per dag.", "CAC ruim onder de marge bij £0,30 tot £0,50 per dag <span class=\"tag\">AANNAME</span> (doelprijs)."),
("<div class=\"kpi\"><b>£0,27 tot £0,32</b><span>per dag, Amazon-generiek en Myvitamins {{MG18, MG19}}</span></div>", "<div class=\"kpi\"><b>£0,27 tot £0,32</b><span>per dag: Amazon-generiek (bij 2 per dag, AANNAME) en Myvitamins {{MG18, MG19}}</span></div>"),
("nervous system) {{V3}} <span class=\"check\">CHECK CLAIM</span>.", "nervous system) {{M2}} <span class=\"check\">CHECK CLAIM</span>."),
("<td>3 g creatine plus 56,25 mg Mg of 300 mg K</td>", "<td>3 g creatine plus minimaal 57 mg Mg (15% NRV = 56,25 mg) of 300 mg K</td>"),
("<td>56,25 mg Mg; 300 mg kalium</td>", "<td>56,25 mg Mg (formuleer op 57 mg of meer); 300 mg kalium</td>"),
]
for a, b in R:
    assert a in t, a[:90]
    t = t.replace(a, b)
p.write_text(t); print('applied', len(R))
