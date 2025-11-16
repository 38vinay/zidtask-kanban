// src/components/card/Attachments.jsx
import React, { useState, useRef } from 'react';
import { 
  Paperclip, 
  Upload, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  File,
  Eye
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { formatDate } from '../../Utils/helpers';

const Attachments = ({ attachments = [], onAddAttachment, onDeleteAttachment }) => {
  const { darkMode } = useTheme();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) {
      return <Image size={20} color="#10b981" />;
    } else if (type.includes('pdf') || type.includes('document') || type.includes('text')) {
      return <FileText size={20} color="#3b82f6" />;
    } else {
      return <File size={20} color="#64748b" />;
    }
  };

  // Handle file selection
  const handleFileSelect = (files) => {
    Array.from(files).forEach(file => {
      // Create a file URL for preview (in real app, you'd upload to server)
      const reader = new FileReader();
      reader.onload = (e) => {
        if (onAddAttachment) {
          onAddAttachment({
            name: file.name,
            url: e.target.result, // In real app, this would be the server URL
            type: file.type,
            size: file.size
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle file input change
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
      e.target.value = ''; // Reset input
    }
  };

  // Handle drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div>
      {/* Attachments List */}
      {attachments.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}>
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)';
              }}
            >
              {/* File Icon */}
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)',
                borderRadius: '8px',
                flexShrink: 0
              }}>
                {getFileIcon(attachment.type)}
              </div>

              {/* File Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginBottom: '4px'
                }}>
                  {attachment.name}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: darkMode ? '#64748b' : '#94a3b8'
                }}>
                  {formatFileSize(attachment.size)}
                  {attachment.uploadedAt && ` • ${formatDate(attachment.uploadedAt)}`}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '4px'
              }}>
                {attachment.type.startsWith('image/') && (
                  <button
                    onClick={() => window.open(attachment.url, '_blank')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      color: darkMode ? '#60a5fa' : '#3b82f6'
                    }}
                    title="Preview"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = darkMode 
                        ? 'rgba(59, 130, 246, 0.1)' 
                        : 'rgba(219, 234, 254, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Eye size={14} />
                  </button>
                )}
                <a
                  href={attachment.url}
                  download={attachment.name}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    color: darkMode ? '#60a5fa' : '#3b82f6',
                    textDecoration: 'none'
                  }}
                  title="Download"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = darkMode 
                      ? 'rgba(59, 130, 246, 0.1)' 
                      : 'rgba(219, 234, 254, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Download size={14} />
                </a>
                {onDeleteAttachment && (
                  <button
                    onClick={() => {
                      if (confirm('Delete this attachment?')) {
                        onDeleteAttachment(attachment.id);
                      }
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ef4444'
                    }}
                    title="Delete"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          padding: '32px',
          background: isDragging
            ? darkMode 
              ? 'rgba(59, 130, 246, 0.1)' 
              : 'rgba(219, 234, 254, 0.3)'
            : darkMode 
              ? 'rgba(255, 255, 255, 0.03)' 
              : 'rgba(0, 0, 0, 0.02)',
          border: `2px dashed ${isDragging 
            ? '#3b82f6'
            : darkMode 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(30, 64, 175, 0.2)'}`,
          borderRadius: '12px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          style={{ display: 'none' }}
          accept="*/*"
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: darkMode 
              ? 'rgba(59, 130, 246, 0.1)' 
              : 'rgba(219, 234, 254, 0.3)',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}>
            <Upload 
              size={28} 
              color={darkMode ? '#60a5fa' : '#3b82f6'} 
            />
          </div>

          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: darkMode ? '#fff' : '#1e293b',
              margin: '0 0 8px 0'
            }}>
              {isDragging ? 'Drop files here' : 'Upload attachments'}
            </h4>
            <p style={{
              fontSize: '14px',
              color: darkMode ? '#94a3b8' : '#64748b',
              margin: 0
            }}>
              Drag and drop files here or click to browse
            </p>
            <p style={{
              fontSize: '12px',
              color: darkMode ? '#64748b' : '#94a3b8',
              margin: '8px 0 0 0'
            }}>
              Supports: Images, PDFs, Documents, and more
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 140, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Paperclip size={16} />
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attachments;