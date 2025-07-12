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
            await API.patch(`/items/admin/reject/${selectedItem._id}`, { reason: rejectReason });
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

    if (!user?.isAdmin) return null;

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
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Panel</Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Item Moderation</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Review and moderate pending item submissions.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {pendingItems.length === 0 ? (
                    <Card><CardContent>No pending items to review.</CardContent></Card>
                ) : (
                    <List>
                        {pendingItems.map((item) => (
                            <Card key={item._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                        <Box>
                                            <Typography variant="h6">Images</Typography>
                                            {item.images.length > 0 ? (
                                                <ImageList cols={2} rowHeight={120}>
                                                    {item.images.map((img, i) => (
                                                        <ImageListItem key={i}>
                                                            <img src={img} alt={item.title} loading="lazy" />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            ) : (
                                                <Typography>No images</Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography paragraph>{item.description}</Typography>
                                            <Typography variant="body2"><strong>Category:</strong> {item.category}</Typography>
                                            <Typography variant="body2"><strong>Type:</strong> {item.type}</Typography>
                                            <Typography variant="body2"><strong>Size:</strong> {item.size}</Typography>
                                            <Typography variant="body2"><strong>Condition:</strong> {item.condition}</Typography>
                                            {item.tags.length > 0 && (
                                                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                                                    {item.tags.map((tag, i) => (
                                                        <Chip key={i} label={tag} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            )}
                                            <Card variant="outlined" sx={{ mt: 2 }}>
                                                <CardContent>
                                                    <Typography variant="body2"><strong>Uploaded by:</strong> {item.uploader.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{item.uploader.email}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Submitted: {new Date(item.createdAt).toLocaleDateString()}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <Box mt={2} display="flex" gap={2}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleApprove(item._id)}
                                                    disabled={actionLoading === item._id}
                                                >
                                                    {actionLoading === item._id ? <CircularProgress size={20} /> : 'Approve'}
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => openRejectDialog(item)}
                                                    disabled={actionLoading === item._id}
                                                >
                                                    {actionLoading === item._id ? <CircularProgress size={20} /> : 'Reject'}
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
                        Please provide a reason for rejecting this item.
                    </Typography>
                    <TextField
                        label="Rejection Reason"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
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
