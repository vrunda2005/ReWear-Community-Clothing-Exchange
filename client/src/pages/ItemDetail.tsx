import React from 'react';
import { useParams } from 'react-router-dom';

const dummyItem = {
  id: 1,
  title: 'Vintage Denim Jacket',
  description: 'Classic 90s denim jacket in great condition. Lightly used, fits medium-large, made of 100% cotton.',
  images: [
    '/images/featured1.jpg',
    '/images/featured2.jpg',
    '/images/featured3.jpg',
  ],
  uploader: {
    name: 'Aarav Shah',
    email: 'aarav@example.com',
  },
  status: 'Available',
};

const ItemDetail = () => {
  const { id } = useParams(); // For real integration later

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{dummyItem.title}</h1>

      {/* Grid: Images + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div className="space-y-4">
          {dummyItem.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Item ${i + 1}`}
              className="w-full h-60 object-cover rounded-lg shadow"
            />
          ))}
        </div>

        {/* Details */}
        <div>
          <p className="text-lg mb-4">{dummyItem.description}</p>

          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <strong>Uploaded by:</strong> {dummyItem.uploader.name}
            </p>
            <p className="text-xs text-gray-500">{dummyItem.uploader.email}</p>
          </div>

          <p className="mb-4">
            <strong>Status:</strong>{' '}
            <span className={`font-semibold ${
              dummyItem.status === 'Available' ? 'text-green-600' : 'text-red-500'
            }`}>
              {dummyItem.status}
            </span>
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Request Swap
            </button>
            <button className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              Redeem via Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ImageList,
    ImageListItem,
    AppBar,
    Toolbar,
    IconButton
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

const ItemDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [swapDialogOpen, setSwapDialogOpen] = useState(false);
    const [swapType, setSwapType] = useState<'swap' | 'points'>('swap');
    const [swapLoading, setSwapLoading] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await API.get(`/items/${id}`);
                setItem(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error loading item');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    const handleSwapRequest = async () => {
        if (!user || !item) return;

        setSwapLoading(true);
        try {
            await API.post('/swaps', {
                itemId: item._id,
                type: swapType
            });
            setSwapDialogOpen(false);
            alert('Swap request sent successfully!');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error sending swap request');
        } finally {
            setSwapLoading(false);
        }
    };

    const canRequestSwap = user && item && user._id !== item.uploader._id && item.status === 'available';

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !item) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error">{error || 'Item not found'}</Alert>
            </Container>
        );
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={() => navigate(-1)}>
                        ← Back
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Item Details
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                    {/* Image Gallery */}
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Images</Typography>
                                {item.images.length > 0 ? (
                                    <ImageList cols={2} rowHeight={200}>
                                        {item.images.map((image, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={image}
                                                    alt={`${item.title} - Image ${index + 1}`}
                                                    loading="lazy"
                                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://via.placeholder.com/400x300/CCCCCC/666666?text=No+Image';
                                                    }}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                ) : (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        height={200}
                                        bgcolor="grey.100"
                                    >
                                        <Typography color="text.secondary">No images available</Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Item Details */}
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>{item.title}</Typography>

                                <Box display="flex" gap={1} mb={2}>
                                    <Chip
                                        label={item.status}
                                        color={item.status === 'available' ? 'success' : 'default'}
                                    />
                                    {item.approved ? (
                                        <Chip label="Approved" color="success" size="small" />
                                    ) : (
                                        <Chip label="Pending Approval" color="warning" size="small" />
                                    )}
                                </Box>

                                <Typography variant="body1" paragraph>
                                    {item.description}
                                </Typography>

                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Category</Typography>
                                        <Typography>{item.category}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Type</Typography>
                                        <Typography>{item.type}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Size</Typography>
                                        <Typography>{item.size}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">Condition</Typography>
                                        <Typography>{item.condition}</Typography>
                                    </Box>
                                </Box>

                                {item.tags.length > 0 && (
                                    <Box mb={3}>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Tags
                                        </Typography>
                                        <Box display="flex" gap={1} flexWrap="wrap">
                                            {item.tags.map((tag, index) => (
                                                <Chip key={index} label={tag} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Uploader Info */}
                                <Card variant="outlined" sx={{ mb: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Uploaded by</Typography>
                                        <Typography><strong>Name:</strong> {item.uploader.name}</Typography>
                                        <Typography><strong>Email:</strong> {item.uploader.email}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Listed on {new Date(item.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                {canRequestSwap && (
                                    <Box display="flex" gap={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setSwapDialogOpen(true)}
                                            fullWidth
                                        >
                                            Request Swap
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                setSwapType('points');
                                                setSwapDialogOpen(true);
                                            }}
                                            fullWidth
                                        >
                                            Redeem with Points
                                        </Button>
                                    </Box>
                                )}

                                {!user && (
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        Please <Button onClick={() => navigate('/login')}>login</Button> to request swaps.
                                    </Alert>
                                )}

                                {user && user._id === item.uploader._id && (
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        This is your item. You cannot swap with yourself.
                                    </Alert>
                                )}

                                {item.status !== 'available' && (
                                    <Alert severity="warning" sx={{ mt: 2 }}>
                                        This item is not available for swapping.
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>

            {/* Swap Request Dialog */}
            <Dialog open={swapDialogOpen} onClose={() => setSwapDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Request Swap</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Swap Type</InputLabel>
                        <Select
                            value={swapType}
                            label="Swap Type"
                            onChange={(e) => setSwapType(e.target.value as 'swap' | 'points')}
                        >
                            <MenuItem value="swap">Item Swap</MenuItem>
                            <MenuItem value="points">Points Redemption</MenuItem>
                        </Select>
                    </FormControl>

                    {swapType === 'swap' && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            You're requesting to swap this item with one of your own items.
                        </Typography>
                    )}

                    {swapType === 'points' && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            You're requesting to redeem this item using your points.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSwapDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSwapRequest}
                        variant="contained"
                        disabled={swapLoading}
                    >
                        {swapLoading ? 'Sending...' : 'Send Request'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ItemDetail; 