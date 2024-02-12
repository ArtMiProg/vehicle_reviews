import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import AddCarForm from "../components/car/AddCarForm";
import CarList from "../components/carList/CarList";
import { StrapiCar, deleteCar } from "../strapi/strapiCar";
import { StrapiUser, addCarToUser, loadUserCars, loadUserRole } from "../strapi/strapiUser";
import { Home } from "@mui/icons-material";
import Navbar from "../components/navbar/Navbar";
import { User } from "../AuthContext";
import { useDispatch } from "react-redux";
import { loadCarsActions } from "../actions/loadings";

type MenuItems = 'Account' | 'Add Car' | 'Admin' | 'StartPage';

function UserAccount() {
  const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  const [userRole, setUserRole] = useState<string>();
  user.role = userRole;
  const [userCars, setUserCars] = useState<StrapiCar[]>([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItems>('Account');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuItemClick = (item: MenuItems) => {
    setSelectedItem(item);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogOut = () => {
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
            <ListItemButton onClick={() => handleMenuItemClick('StartPage')} href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="StartPage" />
            </ListItemButton>
          </List>
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