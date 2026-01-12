import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  Fade
} from '@mui/material';
import { Person, Email, Lock, PersonAdd } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Side - Quote Section */}
      <Box 
        sx={{ 
          flex: 1,
          background: 'linear-gradient(135deg, #6B7CFF 0%, #4F5BFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          color: 'white'
        }}
      >
        <Box sx={{ maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
            Join Our Community!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
            "The way to get started is to quit talking and begin doing."
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            - Walt Disney
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Register Form */}
      <Box 
        sx={{ 
          flex: 1,
          background: '#EEF4FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Fade in timeout={800}>
          <Paper 
            elevation={0} 
            sx={{ 
              padding: 4, 
              borderRadius: 3,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E4F7',
              boxShadow: '0 4px 20px rgba(79, 91, 255, 0.08)',
              width: '100%',
              maxWidth: 400
            }}
          >
            <Box textAlign="center" mb={3}>
              <PersonAdd sx={{ fontSize: 48, color: '#4F5BFF', mb: 2 }} />
              <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: '#1E1E2F' }}>
                Sign Up
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#6B6F8A' }}>
                Create your account to get started
              </Typography>
            </Box>
            
            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#6B6F8A' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#4F5BFF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4F5BFF',
                    }
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#6B6F8A' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#4F5BFF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4F5BFF',
                    }
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#6B6F8A' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#4F5BFF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4F5BFF',
                    }
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  background: '#4F5BFF',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: '#3D46E0',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 16px rgba(79, 91, 255, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <Box textAlign="center">
                <Link 
                  to="/login" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#4F5BFF',
                    fontWeight: 500
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default Register;