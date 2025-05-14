// components/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p);

  return (
    <nav aria-label="breadcrumb">
      <ol style={{ display: 'flex', listStyle: 'none', gap: '8px' }}>
        <li>
          <Link to="/">Home</Link>
          {paths.length > 0 && <span> / </span>}
        </li>
        {paths.map((segment, index) => {
          const routeTo = '/' + paths.slice(0, index + 1).join('/');
          const isLast = index === paths.length - 1;
          return (
            <li key={routeTo}>
              {isLast ? (
                <span>{decodeURIComponent(segment)}</span>
              ) : (
                <>
                  <Link to={routeTo}>{decodeURIComponent(segment)}</Link>
                  <span> / </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
