import { useTranslation } from 'react-i18next';

function TheatersPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className='h-screen flex text-2xl items-center justify-center bg-[#AA0000] bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)]'>
      {t('Theaters')}</div>
  )
}

export default TheatersPage