import React from 'react'
import { useTranslation } from 'react-i18next';

function ContactPage() {
  const { t, i18n } = useTranslation();
  return (
    <div className='h-screen flex items-center justify-center'>{t('Contact')}</div>
  )
}

export default ContactPage