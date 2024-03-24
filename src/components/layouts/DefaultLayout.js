import React from 'react';

const DefaultLayout = ({ children }) => (
  <div id="outer-container" style={{ height: '100%' }}>
    <main id="page-wrap">
      <div className="mt-0">
        <h1 className="text-4xl">Panda-React-UI</h1>
      </div>
      <div>
        {children}
      </div>
    </main>
  </div>
);

export default DefaultLayout;