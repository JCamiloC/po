declare module "@/lib/i18n" {
  import * as React from 'react';
  type Lang = 'es' | 'en';
  interface I18nCtx {
    lang: Lang;
    t: (k: any) => string;
    toggle: () => void;
  }
  export const I18nProvider: React.FC<{ children: React.ReactNode }>;
  export const useLanguage: () => I18nCtx;
}