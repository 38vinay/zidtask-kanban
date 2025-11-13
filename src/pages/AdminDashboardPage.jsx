export const AdminDashboardPage = () => {
  const { darkMode } = useTheme();
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkMode ? '#0a0f1e' : '#ffffff'
    }}>
      <div className="text-center">
        <h1 className="gradient-text">Admin Dashboard</h1>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginTop: '20px' }}>
          Coming Soon...
        </p>
        <Link to="/" style={{
          display: 'inline-block',
          marginTop: '30px',
          padding: '12px 30px',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none'
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};