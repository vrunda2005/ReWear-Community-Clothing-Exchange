import React from 'react';

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    profilePic: "/images/avatar1.png",
    listings: 5,
    swaps: 2,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    profilePic: "/images/avatar2.png",
    listings: 3,
    swaps: 1,
  },
];

const AdminPanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Manage Users</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Manage Orders</button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md">Manage Listings</button>
      </div>

      <div className="space-y-4">
        {dummyUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <div className="flex items-center gap-4">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">
                  Listings: {user.listings} | Swaps: {user.swaps}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-yellow-500 px-3 py-1 text-white rounded text-sm">
                Approve Listing
              </button>
              <button className="bg-red-500 px-3 py-1 text-white rounded text-sm">
                Remove User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    Chip,
    Alert,
    AppBar,
    Toolbar,
    IconButton,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    ImageList,
    ImageListItem
} from '@mui/material';
import API from '../services/api';

interface Item {
    _id: string;
    title: string;
    description: string;
    images: string[];
    category: string;
    type: string;
    size: string;
    condition: string;
    tags: string[];
    status: string;
    approved: boolean;
    uploader: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
}

const AdminPanel = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pendingItems, setPendingItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate('/dashboard');
            return;
        }

        fetchPendingItems();
    }, [user, navigate]);

    const fetchPendingItems = async () => {
        try {
            const response = await API.get('/items/admin/pending');
            setPendingItems(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error fetching pending items');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (itemId: string) => {
        setActionLoading(itemId);
        try {
            await API.patch(`/items/admin/approve/${itemId}`);
            setPendingItems(prev => prev.filter(item => item._id !== itemId));
            alert('Item approved successfully!');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error approving item');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async () => {
        if (!selectedItem) return;

        setActionLoading(selectedItem._id);
        try {
            await API.delete(`/items/admin/reject/${selectedItem._id}`);
            setPendingItems(prev => prev.filter(item => item._id !== selectedItem._id));
            setRejectDialogOpen(false);
            setSelectedItem(null);
            setRejectReason('');
            alert('Item rejected successfully!');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error rejecting item');
        } finally {
            setActionLoading(null);
        }
    };

    const openRejectDialog = (item: Item) => {
        setSelectedItem(item);
        setRejectDialogOpen(true);
    };

    if (!user?.isAdmin) {
        return null;
    }

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
                    <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
                        ← Back
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Item Moderation
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Review and moderate pending item submissions. Approve appropriate items or reject those that don't meet guidelines.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {pendingItems.length === 0 ? (
                    <Card>
                        <CardContent sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                No pending items to review
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                All submitted items have been reviewed.
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <List>
                        {pendingItems.map((item) => (
                            <Card key={item._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                        {/* Item Images */}
                                        <Box>
                                            <Typography variant="h6" gutterBottom>Images</Typography>
                                            {item.images.length > 0 ? (
                                                <ImageList cols={2} rowHeight={120}>
                                                    {item.images.map((image, index) => (
                                                        <ImageListItem key={index}>
                                                            <img
                                                                src={image}
                                                                alt={`${item.title} - Image ${index + 1}`}
                                                                loading="lazy"
                                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = '/images/placeholder.jpg';
                                                                }}
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            ) : (
                                                <Typography color="text.secondary">No images</Typography>
                                            )}
                                        </Box>

                                        {/* Item Details */}
                                        <Box>
                                            <Typography variant="h6" gutterBottom>{item.title}</Typography>
                                            <Typography variant="body2" paragraph>{item.description}</Typography>

                                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                                                <Typography variant="body2"><strong>Category:</strong> {item.category}</Typography>
                                                <Typography variant="body2"><strong>Type:</strong> {item.type}</Typography>
                                                <Typography variant="body2"><strong>Size:</strong> {item.size}</Typography>
                                                <Typography variant="body2"><strong>Condition:</strong> {item.condition}</Typography>
                                            </Box>

                                            {item.tags.length > 0 && (
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="body2" gutterBottom><strong>Tags:</strong></Typography>
                                                    <Box display="flex" gap={1} flexWrap="wrap">
                                                        {item.tags.map((tag, index) => (
                                                            <Chip key={index} label={tag} size="small" variant="outlined" />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}

                                            <Card variant="outlined" sx={{ mb: 2 }}>
                                                <CardContent sx={{ py: 1 }}>
                                                    <Typography variant="body2"><strong>Uploaded by:</strong> {item.uploader.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{item.uploader.email}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Submitted: {new Date(item.createdAt).toLocaleDateString()}
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                            {/* Action Buttons */}
                                            <Box display="flex" gap={2}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleApprove(item._id)}
                                                    disabled={actionLoading === item._id}
                                                    sx={{ minWidth: 100 }}
                                                >
                                                    {actionLoading === item._id ? (
                                                        <CircularProgress size={20} />
                                                    ) : (
                                                        'Approve'
                                                    )}
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => openRejectDialog(item)}
                                                    disabled={actionLoading === item._id}
                                                    sx={{ minWidth: 100 }}
                                                >
                                                    {actionLoading === item._id ? (
                                                        <CircularProgress size={20} />
                                                    ) : (
                                                        'Reject'
                                                    )}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </List>
                )}
            </Container>

            {/* Reject Dialog */}
            <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Reject Item</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Please provide a reason for rejecting this item. This will help the uploader understand why their item was not approved.
                    </Typography>
                    <TextField
                        label="Rejection Reason"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="e.g., Item doesn't meet community guidelines, inappropriate content, poor image quality..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleReject}
                        variant="contained"
                        color="error"
                        disabled={actionLoading === selectedItem?._id}
                    >
                        {actionLoading === selectedItem?._id ? 'Rejecting...' : 'Reject Item'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminPanel; 
