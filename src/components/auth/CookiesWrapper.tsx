'use client';

import { CookiesProvider } from 'react-cookie';

interface ICookiesWrapperProps {
  children: React.ReactNode;
}

const CookiesWrapper: React.FC<ICookiesWrapperProps> = ({ children }) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default CookiesWrapper; 