import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Box,
  Alert,
  Fab,
  Grid,
  Paper,
  InputAdornment,
  Slide
} from '@mui/material';
import { Add, Search, Assignment } from '@mui/icons-material';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    fetchTasks();
  }, [search]);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks(search);
      setTasks(response.data.tasks);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      setSuccess('Task created successfully');
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskAPI.updateTask(editingTask.id, taskData);
      setSuccess('Task updated successfully');
      setIsFormOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        setSuccess('Task deleted successfully');
        fetchTasks();
      } catch (error) {
        setError('Failed to delete task');
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    return { total, completed, inProgress, pending };
  };

  const stats = getTaskStats();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#EEF4FF' }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto' }}>
        <Slide in timeout={500}>
          <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {activeSection === 'dashboard' && (
              <>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#1E1E2F',
                    textAlign: 'center',
                    mb: 4,
                    textShadow: 'none'
                  }}
                >
                  Dashboard Overview
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center', 
                        background: 'linear-gradient(135deg, #4F5BFF 0%, #3D46E0 100%)', 
                        color: 'white',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(79, 91, 255, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(79, 91, 255, 0.4)',
                          background: 'linear-gradient(135deg, #6B7CFF 0%, #4F5BFF 100%)'
                        }
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{stats.total}</Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>Total Tasks</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center', 
                        background: 'linear-gradient(135deg, #FF6B8A 0%, #FF9BB0 100%)', 
                        color: 'white',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(255, 107, 138, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(255, 107, 138, 0.4)',
                          background: 'linear-gradient(135deg, #FF9BB0 0%, #FF6B8A 100%)'
                        }
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{stats.pending}</Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>Pending</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center', 
                        background: 'linear-gradient(135deg, #FFC83D 0%, #FFD966 100%)', 
                        color: 'white',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(255, 200, 61, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(255, 200, 61, 0.4)',
                          background: 'linear-gradient(135deg, #FFD966 0%, #FFC83D 100%)'
                        }
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{stats.inProgress}</Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>In Progress</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center', 
                        background: 'linear-gradient(135deg, #2ED573 0%, #A3F7BF 100%)', 
                        color: 'white',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(46, 213, 115, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(46, 213, 115, 0.4)',
                          background: 'linear-gradient(135deg, #A3F7BF 0%, #2ED573 100%)'
                        }
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{stats.completed}</Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>Completed</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}

            {activeSection === 'tasks' && (
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1E1E2F',
                  textAlign: 'center',
                  mb: 4,
                  textShadow: 'none'
                }}
              >
                My Tasks
              </Typography>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, backgroundColor: '#FFFFFF', border: '1px solid #FF9BB0', color: '#FF6B8A' }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3, backgroundColor: '#FFFFFF', border: '1px solid #A3F7BF', color: '#2ED573' }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            )}

            {(activeSection === 'tasks' || activeSection === 'dashboard') && (
              <>
                <Paper sx={{ p: 3, mb: 4, backgroundColor: '#F6F8FF', border: '1px solid #E0E4F7' }}>
                  <TextField
                    fullWidth
                    label="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: '#6B6F8A' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '& fieldset': {
                          borderColor: '#E0E4F7',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4F5BFF',
                          boxShadow: '0 0 8px rgba(79, 91, 255, 0.2)'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4F5BFF',
                          boxShadow: '0 0 12px rgba(79, 91, 255, 0.3)'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#6B6F8A'
                      },
                      '& .MuiInputBase-input': {
                        color: '#1E1E2F'
                      }
                    }}
                  />
                </Paper>

                {loading ? (
                  <Box textAlign="center" py={6}>
                    <Typography variant="h6" sx={{ color: '#6B6F8A' }}>Loading tasks...</Typography>
                  </Box>
                ) : tasks.length === 0 ? (
                  <Paper sx={{ p: 6, textAlign: 'center', backgroundColor: '#F6F8FF', border: '1px solid #E0E4F7' }}>
                    <Assignment sx={{ fontSize: 64, color: '#A0A3B8', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#6B6F8A' }} gutterBottom>
                      {search ? 'No tasks found matching your search.' : 'No tasks yet. Create your first task!'}
                    </Typography>
                  </Paper>
                ) : (
                  <Box>
                    {tasks.map((task, index) => (
                      <Box key={task.id} sx={{ animationDelay: `${index * 100}ms` }}>
                        <TaskCard
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </>
            )}

            {activeSection === 'profile' && (
              <>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#1E1E2F',
                    textAlign: 'center',
                    mb: 4,
                    textShadow: 'none'
                  }}
                >
                  Profile Settings
                </Typography>
                <Paper sx={{ p: 4, backgroundColor: '#F6F8FF', border: '1px solid #E0E4F7' }}>
                  <Typography variant="h6" sx={{ color: '#1E1E2F', mb: 2 }}>User Information</Typography>
                  <Typography variant="body1" sx={{ color: '#6B6F8A' }}>Profile management coming soon...</Typography>
                </Paper>
              </>
            )}

            <Fab
              color="primary"
              aria-label="add"
              sx={{ 
                position: 'fixed', 
                bottom: 32, 
                right: 24,
                background: '#4F5BFF',
                '&:hover': {
                  background: '#6B7CFF',
                  boxShadow: '0 4px 16px rgba(79, 91, 255, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={() => setIsFormOpen(true)}
            >
              <Add />
            </Fab>

            <TaskForm
              open={isFormOpen}
              onClose={handleCloseForm}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              task={editingTask}
            />
          </Box>
        </Slide>
      </Box>
    </Box>
  );
};

export default Dashboard;