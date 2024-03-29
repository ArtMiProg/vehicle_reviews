import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from "react";
import CustomAlert from "../components/alert/CustomAlert";
import { AlertState } from "./RegistrationForm";


const SignInForm: React.FC = () => {
    
    const BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<AlertState>({ show: false, severity: undefined, message: '' });
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        try {
            const identifier = username;
            const response = await fetch(`${BASE_URL}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await response.json();
            const user = data.user;
            const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;
            const responseRole = await fetch(`${BASE_URL}/api/users/${user.id}?populate=role`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                redirect: "follow"
            })

            const dataRole = await responseRole.json();

            const role = dataRole.role.name;
            user.role = role;

            console.log(user.role);
            if (!response.ok) {
                throw new Error('Authentication failed');
                setErrorMessage('Authentication failed. Please check your credentials.');
            }
            if (user) {
                console.log(user)
                localStorage.setItem("currentUser", JSON.stringify(user));
                setAlert({ show: true, severity: 'success', message: 'Sign in successful' });
                setTimeout(() => {
                    setAlert({ show: false, severity: undefined, message: '' });
                    window.location.href = '/';
                }, 500);
            } else {
                setAlert({ show: true, severity: 'error', message: 'No such username or password' });
                
            }
        } catch (error) {
            setErrorMessage('Authentication failed. Please check your credentials.');
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5">Sign In</Typography>
                <form onSubmit={handleSignIn} >
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <Button type="submit" variant="contained">Sign In</Button>
                    <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={handleCancel}>
                        Cancel
                    </Button>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
                {alert.show && (
                    <Typography style={{ marginTop: "10px" }}>
                        <CustomAlert severity={alert.severity} message={alert.message} />
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default SignInForm;