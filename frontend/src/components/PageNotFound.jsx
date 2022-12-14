import { Link } from 'react-router-dom';
import React from 'react';

import { useTranslation } from 'react-i18next';

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div className="text-center pt-5">
      <h2 style={{ color: 'orange' }}>
        {t('notFound.header')}
      </h2>

      <p style={{ color: 'orange' }}>
        {t('notFound.message')}

        <Link
          style={{ color: 'dodgerblue' }}
          to="/"
        >
          {t('notFound.linkText')}
        </Link>
      </p>
    </div>
  );
}

export default PageNotFound;
