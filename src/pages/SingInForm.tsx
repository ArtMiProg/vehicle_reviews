import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from "react";
import CustomAlert from "../components/alert/CustomAlert";
import { AlertState } from "./RegistrationForm";


const SignInForm: React.FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<AlertState>({ show: false, severity: undefined, message: '' });

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // http://localhost:1337/api/auth/local
        // http://localhost:1337/api/users/${user.id}?populate=role
        // https://ingenious-novelty-a7dcbe42e4.strapiapp.com
        try {
            const identifier = username;
            const response = await fetch('https://ingenious-novelty-a7dcbe42e4.strapiapp.com/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await response.json();
            const user = data.user;
            const TOKEN = '176a561b4f7da77c9938bdea38b97e757b27b392a6c30bed81aea04d6d61c20553848bfeae583394132ba9bd637325f5ef6fe96c221a6baad87d8d229f258cd4fed05f40f1850765cb03baec142baca17f877eb80b9696af65add434b1f02d85b6412a6c4e4c1d6e074524989b059c7bbbfab26fd8db4b52245e9f4107af3b46';
            const responseRole = await fetch(`https://ingenious-novelty-a7dcbe42e4.strapiapp.com/api/users/${user.id}?populate=role`, {
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
            }
            if (user) {
                console.log(user)
                localStorage.setItem("currentUser", JSON.stringify(user));
                setAlert({ show: true, severity: 'success', message: 'Sign in successful' });
                setTimeout(() => {
                    setAlert({ show: false, severity: undefined, message: '' });
                    window.location.href = '/';
                }, 500);
                // onClose(user);
            } else {
                setAlert({ show: true, severity: 'error', message: 'No such username or password' });
            }
        } catch (error) {
            // setErrorMessage('Authentication failed. Please check your credentials.');
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
                {/*{errorMessage && <p>{errorMessage}</p>}*/}
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