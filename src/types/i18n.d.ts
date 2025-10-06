declare module "@/lib/i18n" {
  import * as React from 'react';
  type Lang = 'es' | 'en';
  type DictKey =
    | 'nav_home' | 'nav_tech' | 'nav_projects' | 'nav_testimonials' | 'nav_contact'
    | 'hero_title_prefix' | 'hero_sub_1' | 'hero_sub_2' | 'hero_sub_3' | 'hero_sub_4'
    | 'hero_paragraph_1' | 'hero_paragraph_2'
    | 'testimonials_heading' | 'testimonials_intro'
    | 'contact_heading' | 'contact_intro' | 'contact_intro_full'
    | 'projects_heading' | 'projects_intro' | 'projects_cta_card_title' | 'projects_cta_card_text' | 'projects_cta_card_button'
    | 'testimonials_cta_more_title' | 'testimonials_cta_more_text' | 'testimonials_toggle_hint'
    | 'btn_lets_talk' | 'tech_heading' | 'tech_intro' | 'tech_loading'
    | 'modal_close' | 'project_view_demo'
  | 'slider_prev' | 'slider_next' | 'slider_go_to_image'
    | 'contact_toast_email' | 'contact_toast_phone' | 'contact_live_email' | 'contact_live_phone'
    | 'contact_github_aria' | 'contact_linkedin_aria' | 'contact_email_aria' | 'contact_phone_aria'
    | 'contact_button_email' | 'contact_button_phone';

  interface I18nCtx {
    lang: Lang;
    t: (k: DictKey) => string;
    toggle: () => void;
  }
  export const I18nProvider: React.FC<{ children: React.ReactNode }>;
  export const useLanguage: () => I18nCtx;
}