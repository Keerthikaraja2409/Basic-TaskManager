import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#EEF4FF',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#4F5BFF',
      light: '#6B7CFF',
      dark: '#3D46E0',
    },
    secondary: {
      main: '#FFC83D',
      light: '#FFD966',
    },
    success: {
      main: '#2ED573',
      light: '#A3F7BF',
    },
    error: {
      main: '#FF6B8A',
      light: '#FF9BB0',
    },
    text: {
      primary: '#1E1E2F',
      secondary: '#6B6F8A',
      disabled: '#A0A3B8',
    },
    divider: '#E0E4F7',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #E0E4F7',
          boxShadow: '0 4px 20px rgba(79, 91, 255, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F6F8FF',
          border: '1px solid #E0E4F7',
          boxShadow: '0 2px 12px rgba(79, 91, 255, 0.06)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;