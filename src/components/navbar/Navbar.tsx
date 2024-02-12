import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { User } from '../../AuthContext';

interface NavbarProps {
    isLogin: boolean;
    handleLogOut: () => void;

}
const Navbar: React.FC<NavbarProps> = ({ isLogin, handleLogOut }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    );

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={linkStyle}>
                        Vehicle Reviews
                    </Link>
                </Typography>
                {isLogin ? (
                    <>
                        {currentUser ? (
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1,
                                    display: { xs: 'none', sm: 'block' },
                                    maxWidth: '30%',
                                    textAlign: 'right' }}
                            >
                                WELCOME, {currentUser.username}!
                            </Typography>
                        ) : null}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}

                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Link to="/account" style={linkStyle}>
                                <MenuItem>Account</MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Link to="/signin" style={linkStyle}>
                            <Button color="inherit">Sign in</Button>
                        </Link>
                        <Link to="/signup" style={linkStyle}>
                            <Button color="inherit">Sign up</Button>
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;