import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Snackbar
} from '@mui/material';
import API from '../services/api';

const categories = ['Tops', 'T-Shirts', 'Jeans', 'Formals', 'Ethnic-wear', 'Dresses', 'Outerwear', 'Accessories'];
const types = ['Shirt', 'Pants', 'Dress', 'Jacket', 'Sweater', 'Skirt', 'Shoes', 'Bag', 'Jewelry'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const conditions = ['New', 'Like New', 'Good', 'Fair', 'Used'];

const AddItem = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value as string
    }));
    setError(''); // Clear error when user types
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Validate file count
      if (filesArray.length > 5) {
        setError('Maximum 5 images allowed');
        return;
      }

      // Validate file types and sizes
      const validFiles = filesArray.filter(file => {
        if (!file.type.startsWith('image/')) {
          setError(`${file.name} is not an image file`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB
          setError(`${file.name} is too large. Maximum size is 5MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length !== filesArray.length) {
        return; // Error already set above
      }

      setImages(validFiles);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();

      // Add form fields
      Object.entries(form).forEach(([key, value]) => {
        if (value) { // Only add non-empty values
          formData.append(key, value);
        }
      });

      // Add images
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await API.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(response.data.message || 'Item submitted successfully!');

      // Reset form
      setForm({
        title: '',
        description: '',
        category: '',
        type: '',
        size: '',
        condition: '',
        tags: ''
      });
      setImages([]);

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error submitting item';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            ← Back
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add New Item
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          List Your Item
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Share your clothing items with the ReWear community. All items will be reviewed before being published.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Basic Information */}
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Basic Information
              </Typography>

              <TextField
                label="Item Title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                placeholder="e.g., Vintage Denim Jacket"
              />

              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
                placeholder="Describe your item in detail..."
              />

              {/* Item Details */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Item Details
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={form.category}
                    label="Category"
                    onChange={handleInputChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={form.type}
                    label="Type"
                    onChange={handleInputChange}
                  >
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Size</InputLabel>
                  <Select
                    name="size"
                    value={form.size}
                    label="Size"
                    onChange={handleInputChange}
                  >
                    {sizes.map((size) => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Condition</InputLabel>
                  <Select
                    name="condition"
                    value={form.condition}
                    label="Condition"
                    onChange={handleInputChange}
                  >
                    {conditions.map((condition) => (
                      <MenuItem key={condition} value={condition}>{condition}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                label="Tags (comma-separated)"
                name="tags"
                value={form.tags}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                placeholder="e.g., vintage, denim, casual, streetwear"
                helperText="Add relevant tags to help others find your item"
              />

              {/* Image Upload */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Images
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload up to 5 images of your item. First image will be the main photo. Maximum file size: 5MB each.
              </Typography>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ mb: 2 }}
                >
                  Choose Images
                </Button>
              </label>

              {images.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected Images ({images.length}/5):
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: 4
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: 'error.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'error.dark' }
                          }}
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Submit Button */}
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading || !form.title || !form.description || !form.category || !form.type || !form.size || !form.condition}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Item'
                  )}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
        message={success}
      />
    </>
  );
};

export default AddItem;
