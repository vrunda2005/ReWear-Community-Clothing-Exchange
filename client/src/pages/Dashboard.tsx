import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [tokenChecked, setTokenChecked] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/login');
        } else {
            setToken(storedToken);
        }
        setTokenChecked(true);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Avoid rendering anything until token check is done
    if (!tokenChecked) return null;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Welcome to Dashboard!</Typography>
            <Button variant="outlined" onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
        </Container>
    );
};

export default Dashboard;
