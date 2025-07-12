import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
        </Container>
    );
};

export default Login;
