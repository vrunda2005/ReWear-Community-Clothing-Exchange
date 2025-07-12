import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Dummy data for now
  const uploadedItems = [
    { id: 1, title: 'Denim Jacket', status: 'Available' },
    { id: 2, title: 'Red Saree', status: 'Swapped' },
  ];

  const swaps = [
    { id: 1, item: 'Blue Kurti', status: 'Ongoing' },
    { id: 2, item: 'Woolen Scarf', status: 'Completed' },
  ];

  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ReWear Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            Logout
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Your Profile</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Points:</strong> {user.points}</Typography>
            <Typography><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</Typography>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Your Uploaded Items</Typography>
              <List>
                {uploadedItems.map(item => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.title}
                      secondary={`Status: ${item.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Your Swaps</Typography>
              <List>
                {swaps.map(swap => (
                  <ListItem key={swap.id}>
                    <ListItemText
                      primary={swap.item}
                      secondary={`Status: ${swap.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/list-item')}
          >
            Add New Item
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
