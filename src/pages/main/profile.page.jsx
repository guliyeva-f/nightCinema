import React from 'react'
import { useTranslation } from 'react-i18next';

function ProfilePage() {
  const { t, i18n } = useTranslation();

  return (
    <div className='h-screen flex items-center justify-center'>{t('Profile')}</div>
  )
}

export default ProfilePage