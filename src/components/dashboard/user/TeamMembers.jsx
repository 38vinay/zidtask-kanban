// src/components/dashboard/user/TeamMembers.jsx
import React from 'react';
import { Users, Plus, Mail, MoreVertical } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { getInitials, getColorFromString } from '../../../Utils/helpers';

const TeamMembers = ({ boards }) => {
  const { darkMode } = useTheme();

  // Collect unique team members from all boards
  const getTeamMembers = () => {
    const membersMap = new Map();
    
    boards.forEach(board => {
      board.members?.forEach(member => {
        if (!membersMap.has(member.id)) {
          membersMap.set(member.id, {
            ...member,
            boards: [board.name],
            taskCount: 0
          });
        } else {
          const existing = membersMap.get(member.id);
          existing.boards.push(board.name);
        }
      });

      // Count tasks assigned to each member
      board.columns?.forEach(column => {
        column.tasks?.forEach(task => {
          task.assignees?.forEach(assignee => {
            const member = membersMap.get(assignee.id);
            if (member) {
              member.taskCount++;
            }
          });
        });
      });
    });

    return Array.from(membersMap.values());
  };

  const teamMembers = getTeamMembers();

  return (
    <div style={{
      background: darkMode 
        ? 'rgba(30, 64, 175, 0.1)' 
        : '#fff',
      border: `1px solid ${darkMode 
        ? 'rgba(59, 130, 246, 0.2)' 
        : 'rgba(30, 64, 175, 0.1)'}`,
      borderRadius: '16px',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: darkMode ? '#fff' : '#1e293b',
            margin: '0 0 4px 0'
          }}>
            Team Members
          </h3>
          <p style={{
            fontSize: '13px',
            color: darkMode ? '#64748b' : '#94a3b8',
            margin: 0
          }}>
            {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''} across all projects
          </p>
        </div>

        <button style={{
          padding: '10px 16px',
          background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <Plus size={14} />
          Add Member
        </button>
      </div>

      {/* Members List */}
      {teamMembers.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: darkMode ? '#64748b' : '#94a3b8'
        }}>
          <Users size={48} style={{ 
            opacity: 0.5, 
            marginBottom: '16px',
            display: 'block',
            margin: '0 auto 16px'
          }} />
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '8px',
            color: darkMode ? '#94a3b8' : '#64748b'
          }}>
            No team members yet
          </h4>
          <p style={{
            fontSize: '14px',
            color: darkMode ? '#64748b' : '#94a3b8',
            marginBottom: '20px'
          }}>
            Start collaborating by adding team members to your projects
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              style={{
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '12px',
                padding: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Member Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: member.avatar 
                    ? `url(${member.avatar}) center/cover`
                    : getColorFromString(member.name || ''),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {!member.avatar && getInitials(member.name || '')}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: darkMode ? '#fff' : '#1e293b',
                    margin: '0 0 2px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {member.name}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {member.role || 'Member'}
                  </p>
                </div>

                {/* Menu Button */}
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: darkMode ? '#64748b' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                paddingTop: '12px',
                borderTop: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)'}`,
                marginBottom: '12px'
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Tasks
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: darkMode ? '#fff' : '#1e293b'
                  }}>
                    {member.taskCount || 0}
                  </div>
                </div>

                <div>
                  <div style={{
                    fontSize: '11px',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Projects
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: darkMode ? '#fff' : '#1e293b'
                  }}>
                    {member.boards?.length || 0}
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <button style={{
                width: '100%',
                padding: '8px',
                background: darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.3)' 
                  : 'rgba(30, 64, 175, 0.2)'}`,
                borderRadius: '8px',
                color: '#3b82f6',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)';
                e.currentTarget.style.color = '#3b82f6';
              }}>
                <Mail size={14} />
                Send Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;