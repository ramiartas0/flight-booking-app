import React from 'react';
import Header from './Header';
import Footer from './Footer';

const RenderBody = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RenderBody;