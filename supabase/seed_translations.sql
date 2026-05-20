insert into public.translations (key, en, te, hi, mr)
values
  ('about_card_quality_title', 'High-Quality Fertilizers', null, null, null),
  ('about_card_quality_desc', 'Scientifically driven microbial formulations that enhance soil health naturally', null, null, null),
  ('about_card_tested_title', 'Scientifically Tested Formulas', null, null, null),
  ('about_card_tested_desc', 'Proven products that boost nutrient availability and improve crop performance', null, null, null),
  ('about_card_affordable_title', 'Affordable & Farmer-Friendly Pricing', null, null, null),
  ('about_card_affordable_desc', 'Sustainable, residue-free solutions that support long-term soil fertility', null, null, null),
  ('about_card_sustainable_title', 'Sustainable & Eco-Friendly Solutions', null, null, null),
  ('about_card_sustainable_desc', 'Farmer-focused innovations designed for all AGRO-CLIMATIC conditions', null, null, null)
on conflict (key) do update set
  en = excluded.en,
  te = excluded.te,
  hi = excluded.hi,
  mr = excluded.mr;
