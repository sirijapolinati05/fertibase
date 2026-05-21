create table if not exists public.translations (
  id bigint generated always as identity primary key,
  key text not null unique,
  en text not null,
  te text,
  hi text,
  mr text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_translations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists translations_set_updated_at on public.translations;

create trigger translations_set_updated_at
before update on public.translations
for each row
execute function public.set_translations_updated_at();

alter table public.translations enable row level security;

drop policy if exists "Public can read translations" on public.translations;
create policy "Public can read translations"
on public.translations
for select
to anon, authenticated
using (true);

insert into public.translations (key, en, te, hi, mr)
values
  ('latest_update', 'Latest Update', null, null, null),
  ('website_releasing_soon', 'This website is releasing soon.', null, null, null),
  ('nav_home', 'Home', null, null, null),
  ('nav_product', 'Product', null, null, null),
  ('nav_resources', 'Resources', null, null, null),
  ('nav_about', 'About', null, null, null),
  ('nav_career', 'Career', null, null, null),
  ('nav_contact', 'Contact', null, null, null),
  ('nav_language', 'Language', null, null, null),
  ('nav_menu', 'Menu', null, null, null),
  ('hero_title_line_1', 'The Foundation of', null, null, null),
  ('hero_title_line_2', 'Fertile Fields', null, null, null),
  ('hero_subtitle_line_1', 'Bringing life back to the soil, one microbe at a time.', null, null, null),
  ('hero_subtitle_line_2', 'Because strong fields grow from a stronger foundation.', null, null, null),
  ('discover_solutions', 'Discover Solutions', null, null, null),
  ('about_why_choose_line_1', 'Why Choose', null, null, null),
  ('about_why_choose_line_2', 'Fertibase?', null, null, null),
  ('about_intro', 'Fertibase provides biofertilizers that boost soil health and strengthen crop growth. Our innovative solutions are designed to bring life back to the soil, one microbe at a time.', null, null, null),
  ('about_learn_more', 'Learn More About Us', null, null, null),
  ('footer_quick_links', 'Quick Links', null, null, null),
  ('footer_about_us', 'About Us', null, null, null),
  ('footer_products', 'Products', null, null, null),
  ('footer_careers', 'Careers', null, null, null),
  ('footer_company', 'Company', null, null, null),
  ('footer_contact_us', 'Contact Us', null, null, null),
  ('footer_our_mission', 'Our Mission', null, null, null),
  ('footer_our_vision', 'Our Vision', null, null, null),
  ('footer_contact', 'Contact', null, null, null),
  ('footer_address_line_1', 'SY NO. 81, Sultanpur', null, null, null),
  ('footer_address_line_2', 'Hyderabad, India', null, null, null),
  ('footer_rights_reserved', 'All rights reserved.', null, null, null),
  ('products_page_badge', 'Red Soil Solutions', null, null, null),
  ('products_page_heading_our', 'Our', null, null, null),
  ('products_page_heading_products', 'Products', null, null, null),
  ('products_page_subtitle', 'Discover our range of innovative biological solutions for sustainable agriculture', null, null, null),
  ('products_page_search_placeholder', 'Search products...', null, null, null),
  ('products_page_no_results', 'No products found matching your search.', null, null, null),
  ('product_details_loading_product', 'Loading product...', null, null, null),
  ('product_details_not_found', 'Product Not Found', null, null, null),
  ('product_details_back_to_products', 'Back to Products', null, null, null),
  ('product_details_quick_overview', 'Quick overview', null, null, null),
  ('product_details_no_additional_details', 'No additional details available.', null, null, null),
  ('product_details_full_dosage_note', 'Full dosage & pack information is available in the Dosage & Application section below.', null, null, null),
  ('product_details_suggested_dosage', 'Suggested dosage', null, null, null),
  ('product_details_available_packs', 'Available Packs', null, null, null),
  ('product_details_suitable_crops', 'Suitable Crops', null, null, null),
  ('product_details_what_is_it', 'What Is It?', null, null, null),
  ('product_details_how_it_works', 'How It Works?', null, null, null),
  ('product_details_why_choose', 'Why Choose?', null, null, null),
  ('product_details_key_benefits', 'Key Benefits', null, null, null),
  ('product_details_dosage_application', 'Dosage & Application', null, null, null),
  ('product_details_recommended_usage', 'Recommended usage for optimal results.', null, null, null),
  ('product_details_method', 'Method', null, null, null),
  ('product_details_dosage', 'Dosage', null, null, null),
  ('product_details_timing_details', 'Timing/Details', null, null, null),
  ('product_details_technical_specifications', 'Technical Specifications', null, null, null),
  ('product_details_faqs', 'Frequently Asked Questions', null, null, null),
  ('auth_confirming_email', 'Confirming Email', null, null, null),
  ('auth_success', 'Success', null, null, null),
  ('auth_verification_problem', 'Verification Problem', null, null, null),
  ('auth_unable_to_verify_email', 'Unable to verify your email right now.', null, null, null),
  ('auth_email_confirmed_successfully', 'Email confirmed successfully', null, null, null),
  ('auth_no_active_session', 'No active session found. Please open the latest magic link again.', null, null, null),
  ('auth_verification_failed', 'Verification failed. Please try the magic link again.', null, null, null),
  ('auth_redirecting_home', 'Redirecting you to the home page...', null, null, null)
on conflict (key) do update set
  en = excluded.en,
  te = excluded.te,
  hi = excluded.hi,
  mr = excluded.mr;

