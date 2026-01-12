import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TaskAlt, Logout } from '@mui/icons-material';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: '#0F2A1F',
        borderBottom: '1px solid #1E5C44',
        boxShadow: '0 10px 30px rgba(0, 255, 170, 0.12), 0 0 0 1px rgba(42, 255, 167, 0.08)'
      }}
    >
      <Toolbar>
        <TaskAlt sx={{ mr: 2, color: '#2AFFA7' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, color: '#E8FFF4' }}>
          Task Manager
        </Typography>
        {user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: '#2AFFA7', width: 32, height: 32, boxShadow: '0 0 10px rgba(42, 255, 167, 0.6), 0 0 25px rgba(42, 255, 167, 0.35)' }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#A6EBD1' }}>
              {user.name}
            </Typography>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{ 
                ml: 1,
                color: '#A6EBD1',
                '&:hover': { 
                  bgcolor: 'rgba(255, 92, 92, 0.1)',
                  color: '#FF5C5C'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;