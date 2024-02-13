import { Home } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../AuthContext";
import { loadCarsActions } from "../actions/loadings";
import AddCarForm from "../components/car/AddCarForm";
import CarList from "../components/carList/CarList";
import Navbar from "../components/navbar/Navbar";
import { StrapiCar, deleteCar } from "../strapi/strapiCar";
import { StrapiUser, addCarToUser, changeUsername, loadUserCars, loadUserRole } from "../strapi/strapiUser";

type MenuItems = 'Account' | 'Add Car' | 'Admin' | 'StartPage';

function UserAccount() {
  const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [currentUser, setCurrentUser] = useState<StrapiUser | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  const [userRole, setUserRole] = useState<string>();
  user.role = userRole;
  const [userCars, setUserCars] = useState<StrapiCar[]>([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItems>('Account');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePersonDataOpen, setIsChangePersonDataOpen] = useState(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleMenuItemClick = (item: MenuItems) => {
    setSelectedItem(item);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenChangePersonalData = () => {
    setIsChangePersonDataOpen(true);
  };

  const handleCloseChangePersonalData = () => {
    setIsChangePersonDataOpen(false);
    setNewUsername("");
  };

  const handleLogOut = () => {
    navigate('/');
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const userWithRole = await loadUserRole(user.id);
        setUserRole(userWithRole.role.name);
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

  useEffect(() => {
    const load = async () => {
      try {
        const ownCars = await loadUserCars(user.id);
        setUserCars(ownCars.cars);
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

  useEffect(() => {
    if (isAddingCar) {
      const updatedUser = { ...user, cars: userCars };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      const idsOfUserCars: number[] = userCars.map(car => car.id);
      console.log(idsOfUserCars)
      const addNewCarToDb = async () => {
        await addCarToUser(user.id, idsOfUserCars);
        setIsAddingCar(false);
      }
      addNewCarToDb();
    }
  }, [isAddingCar])

  async function handleAddCar(newCar: StrapiCar) {

    setUserCars(prev => [...prev, newCar]);
    setIsAddingCar(true);

  };

  const onDeleteCar = async (carId: number) => {
    try {
      await deleteCar(carId);
      setUserCars(prevUserCars => prevUserCars.filter(car => car.id !== carId));
      const updatedUser = { ...user, cars: userCars.filter(car => car.id !== carId) };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      console.log(`Car with ID ${carId} deleted successfully.`);
    } catch (error: any) {
      console.error('Error deleting car:', error.message);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    loadCarsActions(dispatch, userCars);
  }, [dispatch, userCars]);

  const handleConfirmUsernameChange = async () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, username: newUsername };
    await changeUsername(updatedUser.id, newUsername);
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    handleCloseChangePersonalData();
    window.location.reload();
  };

  const handleNewUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

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
            <ListItemButton onClick={() => handleMenuItemClick('Account')}>
              <ListItemIcon >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={`${user.username}`} />
            </ListItemButton>
            <ListItemButton onClick={handleOpenModal}>
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText primary="Add Car" />
            </ListItemButton>
            {user.role === 'Admin' && (
              <ListItemButton onClick={() => handleMenuItemClick('Admin')} href="/admin">
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin panel" />
              </ListItemButton>
            )}
            <ListItemButton onClick={handleOpenChangePersonalData}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Personal settings" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('StartPage')} href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="StartPage" />
            </ListItemButton>
          </List>
          {isChangePersonDataOpen && (
            <Modal open={isChangePersonDataOpen} onClose={handleCloseChangePersonalData}>
              <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
                <Typography variant="h5" component="div">
                  Change Username
                </Typography>
                <TextField
                  label="New Username"
                  variant="outlined"
                  value={newUsername}
                  onChange={handleNewUsernameChange}
                />
                <Button onClick={handleConfirmUsernameChange}>Confirm</Button>
                <Button onClick={handleCloseChangePersonalData}>Cancel</Button>
              </Box>
            </Modal>
          )}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: 1 }}
        >
          <Typography paragraph>
            {`You have ${user.role} account`}
          </Typography>
          <Card sx={{ maxWidth: 800, }}>
            <CardContent>
              <Typography variant="h5" component="div">
                List of your cars:
              </Typography>
            </CardContent>
            {userCars.length > 0 ?
              <CarList onDeleteCar={onDeleteCar} />
              :
              <>
                <Typography>
                  You didn't add any car yet.
                </Typography>
                <Typography>
                  If you wanna create a review for a car, press "Add car" first for adding a car to your list
                </Typography>
              </>
            }
          </Card>
          {isModalOpen && (
            <AddCarForm onClose={handleCloseModal} onAddCar={handleAddCar} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default UserAccount;