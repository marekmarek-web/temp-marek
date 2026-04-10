/**
 * Jednotný zdroj právních a regulatorních textů (footer, formuláře, disclaimery).
 * Obsah vychází z legacy webu (marek-pribramsky) a registrace u BEplan.
 */
export const legalConfig = {
  personalName: "Ing. Marek Příbramský",
  personalIco: "02024870",
  partnerLegalName: "BEplan finanční plánování s.r.o.",
  partnerIco: "05779944",
  /** Kompletní regulatorní odstavec do patičky a právních stránek. */
  regulatoryDisclaimerFull:
    "Ing. Marek Příbramský, IČO: 02024870 je vázaným zástupcem samostatného zprostředkovatele BEplan finanční plánování s.r.o., IČO: 05779944. Služby jsou poskytovány v rámci následujících registrací. Pojištění: vázaný zástupce podle zákona č. 170/2018 Sb., o distribuci pojištění a zajištění. Spotřebitelské úvěry: vázaný zástupce podle zákona č. 257/2016 Sb., o spotřebitelském úvěru. Investiční služby a produkty: vázaný zástupce podle zákona č. 256/2004 Sb., o podnikání na kapitálovém trhu. Doplňkové penzijní spoření: vázaný zástupce podle zákona č. 427/2011 Sb., o doplňkovém penzijním spoření.",
  /** Kratší varianta pro úzké rozhraní / sekundární umístění. */
  regulatoryDisclaimerShort:
    "Ing. Marek Příbramský (IČO 02024870) je vázaným zástupcem samostatného zprostředkovatele BEplan finanční plánování s.r.o. (IČO 05779944). Činnost probíhá v registračním rámci: pojištění (zákon č. 170/2018 Sb.), spotřebitelské úvěry (zákon č. 257/2016 Sb.), investiční služby (zákon č. 256/2004 Sb.), doplňkové penzijní spoření (zákon č. 427/2011 Sb.).",
  partnerPrivacyUrl: "https://www.beplan.cz/ochrana-osobnich-udaju/",
  credit: {
    label: "M2DigitalAgency",
    href: "https://www.m2digitalagency.cz/",
  },
} as const;
