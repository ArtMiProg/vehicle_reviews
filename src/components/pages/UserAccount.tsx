import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StrapiCar, StrapiUser, addCarToUser, loadUserCars, loadUserRole } from "../../strapi/strapi";
import AddCarForm from "../car/AddCarForm";
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem, ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import CarList from "../carList/CarList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

type MenuItems = 'Account' | 'Add Car';

function UserAccount() {
  const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [userRole, setUserRole] = useState<string>();
  user.role = userRole;
  const [userCars, setUserCars] = useState<StrapiCar[]>([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItems>('Account');

  const handleMenuItemClick = (item: MenuItems) => {
      setSelectedItem(item);
  };

  console.log(selectedItem)

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
    if(isAddingCar){      
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

  // const onDeleteCar = (carId: string) => {
  //   const updatedCars = user.cars.filter((car) => car.id !== carId);
  //   setUserCars(updatedCars);
  //   const updatedUser = { ...user, cars: updatedCars };
  //   localStorage.setItem('currentUser', JSON.stringify(updatedUser));


  return (
    <Box sx={{ display: 'flex' }}>
        <Drawer
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItemButton  onClick={() => handleMenuItemClick('Account')}>
                    <ListItemIcon >
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${user.name}`} />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuItemClick('Add Car')}>
                    <ListItemIcon>
                        <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Car" />
                </ListItemButton>
            </List>
        </Drawer>
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Typography paragraph>
                User Account
            </Typography>
            <Card sx={{ maxWidth: 345,  }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {user.name} {user.surname}
                    </Typography>
                    <Typography variant="body2">
                        Username: {user.username}
                    </Typography>
                    <Typography variant="body2">
                        Role: {user.role}
                    </Typography>
                    {/* {user.role === UserRole.ADMIN && (
                        <Button variant="contained" color="primary" href="/admin" style={{ marginTop: '10px' }}>
                            Admin Panel
                        </Button>
                    )} */}
                    {/* <Typography variant="h6">
                        Cars Count: {user.cars.length}
                    </Typography> */}

                </CardContent>
                <CarList cars={userCars} /*onDeleteCar={onDeleteCar}*/ onDeleteCar={function (carId: string): void {
            throw new Error("Function not implemented.");
          } } /*onDeleteCar={onDeleteCar}*/ />
            </Card>
            <Link to="/">
                <Button variant="contained" color="secondary" style={{ marginTop:"10px" }} >
                     Return to Start Page
                </Button>
            </Link>
            <AddCarForm onAddCar={handleAddCar} />
        </Box>

      </Box>
  )
}

export default UserAccount;