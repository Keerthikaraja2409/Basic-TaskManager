import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Fade
} from '@mui/material';
import { Edit, Delete, CheckCircle, Schedule, PlayArrow } from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { color: '#2ED573', icon: <CheckCircle sx={{ fontSize: 16 }} />, shadow: 'rgba(46, 213, 115, 0.2)' };
      case 'in-progress':
        return { color: '#FFC83D', icon: <PlayArrow sx={{ fontSize: 16 }} />, shadow: 'rgba(255, 200, 61, 0.2)' };
      default:
        return { color: '#A0A3B8', icon: <Schedule sx={{ fontSize: 16 }} />, shadow: 'rgba(160, 163, 184, 0.2)' };
    }
  };

  const statusConfig = getStatusConfig(task.status);

  return (
    <Fade in timeout={300}>
      <Card 
        sx={{ 
          mb: 2,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E0E4F7',
          borderLeft: `4px solid ${statusConfig.color}`,
          transition: 'all 0.3s ease',
          '&:hover': { 
            transform: 'translateY(-2px)', 
            boxShadow: `0 4px 20px ${statusConfig.shadow}, 0 4px 16px rgba(79, 91, 255, 0.08)`,
            borderColor: '#4F5BFF'
          }
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, color: '#1E1E2F' }}>
                {task.title}
              </Typography>
              {task.description && (
                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: '#6B6F8A' }}>
                  {task.description}
                </Typography>
              )}
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  label={task.status.replace('-', ' ')}
                  size="small"
                  icon={statusConfig.icon}
                  sx={{ 
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    backgroundColor: `${statusConfig.color}20`,
                    color: statusConfig.color,
                    border: `1px solid ${statusConfig.color}40`,
                    boxShadow: `0 0 10px ${statusConfig.shadow}`
                  }}
                />
                <Typography variant="caption" sx={{ ml: 1, color: '#A0A3B8' }}>
                  {new Date(task.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={0.5}>
              <IconButton 
                onClick={() => onEdit(task)} 
                size="small"
                sx={{ 
                  color: '#4F5BFF',
                  '&:hover': { 
                    bgcolor: 'rgba(79, 91, 255, 0.08)',
                    boxShadow: '0 4px 16px rgba(79, 91, 255, 0.2)'
                  }
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(task.id)} 
                size="small" 
                sx={{ 
                  color: '#FF5C5C',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 92, 92, 0.1)',
                    boxShadow: '0 0 15px rgba(255, 92, 92, 0.4)'
                  }
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default TaskCard;