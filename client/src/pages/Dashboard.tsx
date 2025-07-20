import { useState, useEffect } from 'react';
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
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
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

const UserDashboard = () => {
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
        console.error('Dashboard fetch error:', err);
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

  const getApprovalStatus = (approved: boolean) => (
    <Chip label={approved ? 'Approved' : 'Pending'} color={approved ? 'success' : 'warning'} size="small" />
  );

  if (!user) return null;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ReWear Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>

        {/* Profile Section */}
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
                <Typography><strong>Member since:</strong> {new Date(user.createdAt || Date.now()).toLocaleDateString()}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Items Section */}
          <Box>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Your Items</Typography>
                  <Button variant="outlined" size="small" onClick={() => navigate('/list-item')}>
                    Add New
                  </Button>
                </Box>

                {myItems.length > 0 ? (
                  <List>
                    {myItems.map((item) => (
                      <ListItem key={item._id} divider alignItems="flex-start">
                        {item.images?.[0] && (
                          <img
                            src={
                              item.images[0].startsWith('http')
                                ? item.images[0]
                                : `http://localhost:5000${item.images[0]}`
                            }
                            alt={item.title}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '6px',
                              marginRight: '10px'
                            }}
                          />
                        )}
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1">{item.title}</Typography>
                              {getApprovalStatus(item.approved)}
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {item.description.substring(0, 100)}...
                              </Typography>
                              <Box display="flex" gap={1} mt={1}>
                                <Chip label={item.category} size="small" />
                                <Chip label={item.condition} size="small" />
                                <Chip label={item.status} size="small" color={getStatusColor(item.status) as any} />
                              </Box>
                            </>
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

          {/* Swaps Section */}
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
                            <>
                              <Typography variant="body2" color="text.secondary">
                                Type: {swap.type === 'swap' ? 'Item Swap' : 'Points Redemption'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Requested: {new Date(swap.createdAt).toLocaleDateString()}
                              </Typography>
                            </>
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
          <Button variant="contained" onClick={() => navigate('/list-item')}>Add New Item</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>Browse Items</Button>
          {user.isAdmin && (
            <Button variant="outlined" color="secondary" onClick={() => navigate('/admin')}>
              Admin Panel
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};

export default UserDashboard;
