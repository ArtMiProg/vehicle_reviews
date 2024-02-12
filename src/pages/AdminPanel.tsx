import { Home } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../AuthContext";
import Navbar from "../components/navbar/Navbar";
import { StrapiUser, deleteUser, loadAllUsers } from "../strapi/strapiUser";

type MenuItems = 'Account' | 'Add Car' | 'Admin' | 'StartPage';

function AdminPanel() {

  const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  const [users, setUsers] = useState<StrapiUser[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItems>('Account');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const handleMenuItemClick = (item: MenuItems) => {
    setSelectedItem(item);
  }

  const handleOpenModal = (userId: number) => {
    setDeleteUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const users = await loadAllUsers();
        setUsers(users);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          throw error;
        }
      }
    }
    load();
  }, []);
  console.log(users);

  const onDeleteUser = async () => {
    try {
      if (deleteUserId !== null) {
        await deleteUser(deleteUserId);
        setUsers(users.filter(user => user.id !== deleteUserId));
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error('Error deleting user:', error.message);
    }
  }

  return (
    <>
      <Navbar isLogin={!!currentUser} handleLogOut={handleLogOut} />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              marginTop: 9,
              width: 240,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            <Typography variant="h5" gutterBottom sx={{ marginLeft: 2 }}>Admin Panel</Typography>
            <ListItemButton onClick={() => handleMenuItemClick('Account')} href="/account">
              <ListItemIcon >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={`${user.username}`} />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('StartPage')} href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="StartPage" />
            </ListItemButton>
          </List>
        </Drawer>
        <TableContainer sx={{ marginTop: 9 }}>
          <Table>
            <TableHead>
              <TableCell colSpan={5} style={{ borderRight: 'none' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', marginLeft: 5 }}>
                  List of users
                </Typography>
              </TableCell>
              <TableCell style={{ borderLeft: 'none' }}></TableCell>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 8 }}>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ width: 8 }}>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {user.role.name !== 'Admin' ? (
                      <>
                        <Tooltip title="Delete user">
                          <IconButton aria-label="delete" onClick={() => handleOpenModal(user.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Typography sx={{ '&:hover': { color: 'darkBlue' } }}>
                          Delete user
                        </Typography>
                      </>
                    ) : (
                      <Typography>This user can't be deleted</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={onDeleteUser}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default AdminPanel;