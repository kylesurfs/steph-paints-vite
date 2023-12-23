//== react, react-router-dom, Auth0 ==//
import React, { ReactNode } from 'react';

//== TSX Components, Functions ==//
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
type LayoutProps = {
  children: ReactNode;
};

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
const Layout: React.FC<LayoutProps> = ({ children }) => {
  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
