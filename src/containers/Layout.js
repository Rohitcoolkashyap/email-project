import React from 'react';
import { EmailProvider } from '../context/EmailContext';
import EmailContainer from './EmailContainer';

const Layout = () => {
  return (
    <EmailProvider>
      <EmailContainer />
    </EmailProvider>
  );
};

export default Layout; 