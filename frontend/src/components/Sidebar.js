import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { Dashboard, Assignment, Person, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, key: 'dashboard' },
    { text: 'Tasks', icon: <Assignment />, key: 'tasks' },
    { text: 'Profile', icon: <Person />, key: 'profile' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          backgroundColor: '#2E2F7F',
          border: 'none',
          borderRight: '1px solid #E0E4F7',
          boxShadow: '0 4px 20px rgba(79, 91, 255, 0.08)',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            bgcolor: '#4F5BFF', 
            width: 64, 
            height: 64, 
            mx: 'auto',
            mb: 2,
            boxShadow: '0 4px 16px rgba(79, 91, 255, 0.3)',
            fontSize: '1.5rem'
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#A0A3B8' }}>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#4A4B8C' }} />

      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => onSectionChange(item.key)}
            sx={{
              borderRadius: 2,
              mb: 1,
              backgroundColor: activeSection === item.key ? 'rgba(79, 91, 255, 0.15)' : 'transparent',
              border: activeSection === item.key ? '1px solid rgba(79, 91, 255, 0.3)' : '1px solid transparent',
              '&:hover': {
                backgroundColor: 'rgba(79, 91, 255, 0.08)',
                border: '1px solid rgba(79, 91, 255, 0.2)',
              },
              cursor: 'pointer'
            }}
          >
            <ListItemIcon sx={{ color: activeSection === item.key ? '#4F5BFF' : '#A0A3B8', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': { 
                  color: activeSection === item.key ? '#FFFFFF' : '#A0A3B8',
                  fontWeight: activeSection === item.key ? 600 : 400
                } 
              }} 
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItem
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            border: '1px solid transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 138, 0.1)',
              border: '1px solid rgba(255, 107, 138, 0.2)',
            },
            cursor: 'pointer'
          }}
        >
          <ListItemIcon sx={{ color: '#FF6B8A', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            sx={{ 
              '& .MuiListItemText-primary': { 
                color: '#FF6B8A',
                fontWeight: 500
              } 
            }} 
          />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;