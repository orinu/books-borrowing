import React from 'react';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <TopBar />
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  );
};

export default Layout;
