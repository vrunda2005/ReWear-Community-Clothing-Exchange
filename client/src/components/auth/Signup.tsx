
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await API.post('/auth/signup', form);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
        </Container>
    );
};

export default Signup;
