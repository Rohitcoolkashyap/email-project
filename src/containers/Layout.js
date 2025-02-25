/*
 * Layout container component that wraps the main application.
 * Provides the EmailProvider context to all child components.
 */
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