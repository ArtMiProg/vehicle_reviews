import React, { useEffect, useState } from 'react';
import { UserRole } from '../AuthContext';
import { createUser } from '../components/user/UserComponent';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { addUser } from '../strapi/strapiUser';
import CustomAlert from '../components/alert/CustomAlert';


export interface AlertState {
    show: boolean;
    severity: 'success' | 'error' | 'warning' | 'info' | undefined
    message: string;
}
function RegistrationForm() {

    const [id, setId] = useState(uuidv4);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(UserRole.USER);
    const [errorMessage, setErrorMessage] = useState("");
    const [alert, setAlert] = useState<AlertState>({ show: false, severity: undefined, message: '' });
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (alert.show) {
            const timerId = setInterval(() => {
                setCountdown((currentCountdown) => {
                    if (currentCountdown === 1) {
                        clearInterval(timerId);
                        window.location.href = '/';
                        return 0;
                    } else {
                        return currentCountdown - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [alert.show]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newUser = createUser(id, username, password, name, surname, role);
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        if (existingUsers.some((user: any) => user.username === username)) {
            setErrorMessage("Username already exists");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            return;
        }

        const updatedUsers = [...existingUsers, newUser];
        // localStorage.setItem("users", JSON.stringify(updatedUsers));
        try {
            await addUser({
                username: username,
                password: password,
                email: email,
                provider: "local",
                confirmed: false,
                profile_slug: name,
                role: { connect: [{ id: 1 }] },
                name: name,
                surname: surname
            }
            );
            setAlert({ show: true, severity: 'success', message: 'Registration successful' });
            setTimeout(() => {
                setAlert({ show: false, severity: undefined, message: '' });
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            console.error('error creating user', error);
        }

    };

    const handleCancel = () => {
        window.history.back();
    }


    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {alert.show && (
                    <Typography>
                        <div>Redirecting in {countdown}...</div>
                        <CustomAlert severity={alert.severity} message={alert.message} />
                    </Typography>
                )}
                <Typography component="h1" variant="h5" style={{ margin: '20px 0' }}>
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Surname"
                        variant="outlined"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    {errorMessage && (
                        <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button variant="contained" type="submit" color="primary">
                        Register
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={handleCancel}>
                        Cancel
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default RegistrationForm;