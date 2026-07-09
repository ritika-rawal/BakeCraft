import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ ...styles.page, gridTemplateColumns: collapsed ? '72px 1fr' : '230px 1fr' }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  page: {
    display: 'grid',
    minHeight: '100vh',
    background: 'var(--bg)',
    fontFamily: 'var(--font-body)',
    transition: 'grid-template-columns 0.2s ease',
  },
  main: {
    padding: '28px 36px',
    overflow: 'hidden',
  },
};