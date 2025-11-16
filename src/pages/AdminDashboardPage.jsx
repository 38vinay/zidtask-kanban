import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Search, Bell, Plus, HelpCircle, Calendar, Users, MessageSquare, BarChart3, Settings, LogOut, ChevronDown, Shield, Activity, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { darkMode } = useTheme();
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const stats = [
    { label: 'Total Users', value: '1,248', change: '+15%', icon: <Users size={24} />, color: '#3b82f6' },
    { label: 'Active Projects', value: '38', change: '+8%', icon: <Activity size={24} />, color: '#10b981' },
    { label: 'Total Revenue', value: '$48.5K', change: '+23%', icon: <TrendingUp size={24} />, color: '#f59e0b' },
    { label: 'System Health', value: '98.5%', change: '+2%', icon: <Shield size={24} />, color: '#8b5cf6' }
  ];

  const recentUsers = [
    { name: 'Alice Johnson', email: 'alice@company.com', role: 'Manager', status: 'active', joinDate: '2024-11-10' },
    { name: 'Bob Smith', email: 'bob@company.com', role: 'Employee', status: 'active', joinDate: '2024-11-09' },
    { name: 'Carol White', email: 'carol@company.com', role: 'Manager', status: 'inactive', joinDate: '2024-11-08' },
    { name: 'David Brown', email: 'david@company.com', role: 'Employee', status: 'active', joinDate: '2024-11-07' }
  ];

  const systemAlerts = [
    { type: 'warning', message: 'High server load detected', time: '5 min ago' },
    { type: 'info', message: 'System update available', time: '1 hour ago' },
    { type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
  ];

  const projectStats = [
    { name: 'Project Alpha', completion: 85, tasks: 24, members: 8, status: 'on-track' },
    { name: 'Project Beta', completion: 65, tasks: 18, members: 6, status: 'at-risk' },
    { name: 'Project Gamma', completion: 92, tasks: 31, members: 10, status: 'on-track' },
    { name: 'Project Delta', completion: 45, tasks: 15, members: 5, status: 'delayed' }
  ];

  const menuItems = [
    { icon: <BarChart3 size={20} />, label: 'Dashboard', path: 'Dashboard' },
    { icon: <Users size={20} />, label: 'User Management', path: 'Users' },
    { icon: <Activity size={20} />, label: 'System Analytics', path: 'Analytics' },
    { icon: <Shield size={20} />, label: 'Security', path: 'Security' },
    { icon: <Settings size={20} />, label: 'Settings', path: 'Settings' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#0f0f0f' : '#f5f5f5',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        background: darkMode ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        position: 'fixed',
        height: '100vh'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff'
          }}>Z</div>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              color: darkMode ? '#fff' : '#000'
            }}>Zidiotask</div>
            <div style={{
              fontSize: '11px',
              color: '#ef4444',
              fontWeight: '600'
            }}>ADMIN PANEL</div>
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ flex: 1 }}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMenu(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: selectedMenu === item.path
                  ? darkMode ? 'rgba(231, 76, 140, 0.2)' : 'rgba(231, 76, 140, 0.1)'
                  : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: selectedMenu === item.path
                  ? '#e74c8c'
                  : darkMode ? '#94a3b8' : '#64748b',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
          color: darkMode ? '#94a3b8' : '#64748b',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: '240px',
        flex: 1,
        padding: '20px 40px'
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            width: '300px'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: darkMode ? '#64748b' : '#94a3b8'
            }} />
            <input
              type="text"
              placeholder="Search users, projects..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 44px',
                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '10px',
                fontSize: '14px',
                color: darkMode ? '#fff' : '#000',
                outline: 'none'
              }}
            />
          </div>

          {/* Right Side */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button style={{
              padding: '10px',
              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: darkMode ? '#fff' : '#000',
              position: 'relative'
            }}>
              <Bell size={20} />
              <div style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%'
              }} />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: '10px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#fff',
                fontWeight: '600'
              }}>AD</div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#000'
                }}>Admin User</div>
                <div style={{
                  fontSize: '12px',
                  color: '#ef4444',
                  fontWeight: '600'
                }}>Administrator</div>
              </div>
              <ChevronDown size={16} style={{ color: darkMode ? '#64748b' : '#94a3b8' }} />
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: darkMode ? '#fff' : '#000',
            marginBottom: '4px'
          }}>Admin Dashboard</h1>
          <p style={{
            fontSize: '14px',
            color: darkMode ? '#64748b' : '#94a3b8'
          }}>Monitor and manage your entire system</p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `${stat.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}>
                  {stat.icon}
                </div>
                <span style={{
                  padding: '4px 8px',
                  background: stat.change.includes('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: stat.change.includes('+') ? '#10b981' : '#ef4444',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>{stat.change}</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: darkMode ? '#94a3b8' : '#64748b',
                marginBottom: '8px'
              }}>{stat.label}</div>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: darkMode ? '#fff' : '#000'
              }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Recent Users */}
          <div style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: darkMode ? '#fff' : '#000'
              }}>Recent Users</h3>
              <button style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Plus size={14} />
                Add User
              </button>
            </div>

            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{
                    borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                  }}>
                    <th style={{
                      padding: '12px 8px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: darkMode ? '#64748b' : '#94a3b8',
                      textTransform: 'uppercase'
                    }}>User</th>
                    <th style={{
                      padding: '12px 8px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: darkMode ? '#64748b' : '#94a3b8',
                      textTransform: 'uppercase'
                    }}>Role</th>
                    <th style={{
                      padding: '12px 8px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: darkMode ? '#64748b' : '#94a3b8',
                      textTransform: 'uppercase'
                    }}>Status</th>
                    <th style={{
                      padding: '12px 8px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: darkMode ? '#64748b' : '#94a3b8',
                      textTransform: 'uppercase'
                    }}>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, idx) => (
                    <tr key={idx} style={{
                      borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                    }}>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#fff'
                          }}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: darkMode ? '#fff' : '#000'
                            }}>{user.name}</div>
                            <div style={{
                              fontSize: '12px',
                              color: darkMode ? '#64748b' : '#94a3b8'
                            }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{
                        padding: '16px 8px',
                        fontSize: '14px',
                        color: darkMode ? '#94a3b8' : '#64748b'
                      }}>{user.role}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{
                          padding: '4px 12px',
                          background: user.status === 'active' 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : 'rgba(239, 68, 68, 0.2)',
                          color: user.status === 'active' ? '#10b981' : '#ef4444',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }}>{user.status}</span>
                      </td>
                      <td style={{
                        padding: '16px 8px',
                        fontSize: '14px',
                        color: darkMode ? '#94a3b8' : '#64748b'
                      }}>{user.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Alerts */}
          <div style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: darkMode ? '#fff' : '#000',
              marginBottom: '20px'
            }}>System Alerts</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {systemAlerts.map((alert, idx) => (
                <div key={idx} style={{
                  padding: '16px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${
                    alert.type === 'warning' ? '#f59e0b' :
                    alert.type === 'success' ? '#10b981' : '#3b82f6'
                  }`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <AlertCircle size={18} style={{
                      color: alert.type === 'warning' ? '#f59e0b' :
                             alert.type === 'success' ? '#10b981' : '#3b82f6',
                      marginTop: '2px'
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: darkMode ? '#fff' : '#000',
                        marginBottom: '4px'
                      }}>{alert.message}</div>
                      <div style={{
                        fontSize: '11px',
                        color: darkMode ? '#64748b' : '#94a3b8'
                      }}>{alert.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div style={{
          background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: darkMode ? '#fff' : '#000',
            marginBottom: '20px'
          }}>Project Overview</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            {projectStats.map((project, idx) => (
              <div key={idx} style={{
                background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#000',
                  marginBottom: '12px'
                }}>{project.name}</div>

                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: darkMode ? '#fff' : '#000',
                  marginBottom: '8px'
                }}>{project.completion}%</div>

                <div style={{
                  width: '100%',
                  height: '6px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: `${project.completion}%`,
                    height: '100%',
                    background: project.status === 'on-track' 
                      ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                      : project.status === 'at-risk'
                      ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                      : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: darkMode ? '#64748b' : '#94a3b8'
                }}>
                  <span>{project.tasks} tasks</span>
                  <span>{project.members} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;