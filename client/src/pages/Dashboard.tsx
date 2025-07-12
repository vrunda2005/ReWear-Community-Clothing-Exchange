import React, { useState, useEffect } from 'react';
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
  IconButton,
  Grid,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import API from '../services/api';

interface Item {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  condition: string;
  status: string;
  approved: boolean;
  createdAt: string;
}

interface Swap {
  _id: string;
  item: Item;
  type: 'swap' | 'points';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

const mockUser = {
  name: "Devashree",
  email: "dev@example.com",
  profilePic: "/images/avatar1.png",
  points: 120,
};

const mockListings = [
  { id: 1, title: "Yellow Kurti", image: "/images/product1.jpg" },
  { id: 2, title: "Black Jeans", image: "/images/product2.jpg" },
];

const mockSwaps = [
  { id: 3, title: "Pink Hoodie", image: "/images/product3.jpg" },
  { id: 4, title: "Formal Shirt", image: "/images/product4.jpg" },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [mySwaps, setMySwaps] = useState<Swap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [itemsResponse, swapsResponse] = await Promise.all([
          API.get('/items/my/items'),
          API.get('/swaps/my')
        ]);
        setMyItems(itemsResponse.data);
        setMySwaps(swapsResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getApprovalStatus = (approved: boolean) => {
    return approved ?
      <Chip label="Approved" color="success" size="small" /> :
      <Chip label="Pending" color="warning" size="small" />;
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

const UserDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, {mockUser.name}</h1>

      {/* Profile Overview */}
      <div className="bg-white shadow p-6 rounded-md flex items-center gap-6 mb-8">
        <img
          src={mockUser.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{mockUser.name}</h2>
          <p className="text-gray-500">{mockUser.email}</p>
          <p className="mt-2 text-sm font-medium">Points Balance: {mockUser.points}</p>
        </div>
      </div>

      {/* My Listings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">My Listings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockListings.map((item) => (
            <div key={item.id} className="bg-gray-100 rounded shadow p-2">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
              <p className="text-center mt-2 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Swaps */}
      <div>
        <h3 className="text-xl font-semibold mb-4">My Swaps</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockSwaps.map((item) => (
            <div key={item.id} className="bg-gray-100 rounded shadow p-2">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
              <p className="text-center mt-2 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
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
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>

        {/* Profile Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Your Profile</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Points:</strong> {user.points}</Typography>
              </Box>
              <Box>
                <Typography><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</Typography>
                <Typography><strong>Member since:</strong> {new Date().toLocaleDateString()}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* My Uploaded Items */}
          <Box>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Your Uploaded Items</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/list-item')}
                  >
                    Add New
                  </Button>
                </Box>
                {myItems.length > 0 ? (
                  <List>
                    {myItems.map((item) => (
                      <ListItem key={item._id} divider>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1">{item.title}</Typography>
                              {getApprovalStatus(item.approved)}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {item.description.substring(0, 100)}...
                              </Typography>
                              <Box display="flex" gap={1} mt={1}>
                                <Chip label={item.category} size="small" />
                                <Chip label={item.condition} size="small" />
                                <Chip label={item.status} size="small" color={getStatusColor(item.status) as any} />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="text.secondary" textAlign="center" py={2}>
                    No items uploaded yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* My Swaps */}
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Your Swaps</Typography>
                {mySwaps.length > 0 ? (
                  <List>
                    {mySwaps.map((swap) => (
                      <ListItem key={swap._id} divider>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1">{swap.item.title}</Typography>
                              <Chip
                                label={swap.status}
                                size="small"
                                color={getStatusColor(swap.status) as any}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Type: {swap.type === 'swap' ? 'Item Swap' : 'Points Redemption'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Requested: {new Date(swap.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="text.secondary" textAlign="center" py={2}>
                    No swap requests yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/list-item')}
          >
            Add New Item
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/')}
          >
            Browse Items
          </Button>
          {user.isAdmin && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </Button>
          )}
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

export default UserDashboard;
