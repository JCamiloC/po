"use client";
import { useLanguage } from '@/lib/i18n';

const I18nInnerCTA = () => {
  const { t, lang } = useLanguage();
  return (
    <a
      href="#contact"
      data-lang={lang}
      className="cta-sticky btn-glass"
      aria-label={t('btn_lets_talk')}
    >
      {t('btn_lets_talk')}
    </a>
  );
};
export default I18nInnerCTA;
