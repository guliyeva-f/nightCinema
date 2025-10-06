import React from 'react'
// the hook
import { useTranslation } from 'react-i18next';


function HomePage() {
    const { t, i18n } = useTranslation();

  return <div className='min-h-[90vh] flex items-center justify-center'>
    <h1 className='text-[60px] '>{t('welcome')}</h1>
  </div>
}

export default HomePage



