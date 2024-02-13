import { KeyboardArrowDown } from "@mui/icons-material";
import { Card, CardActions, CardContent, IconButton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../AuthContext";
import { OneCar } from "../components/car/CarComponent";
import Navbar from "../components/navbar/Navbar";
import { StrapiListResponse } from "../strapi/strapi";
import { loadCarsFromDb } from "../strapi/strapiCar";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BannerContainer = styled(Box)(({ theme }) => ({
    backgroundImage: `url("/images/banner.jpg")`,
    backgroundRepeat: 'no-repeat',
    minHeight: '400px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundSize: '100% 100%',
}));

const BannerContent = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginLeft: '150px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
}));

function StartPage() {

    const navigate = useNavigate();
    const [showRegistration, setShowRegistration] = useState(false);

    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    );

    const handleSignUpClick = () => {
        setShowRegistration(true);
        navigate('/signup')
    };

    const handleRegistrationClose = () => {
        setShowRegistration(false);
    };

    const [showSignInForm, setShowSignInForm] = useState(false);

    const handleSignInClick = () => {
        setShowSignInForm(true);
        navigate('/signin')
    };

    const handleSignInClose = (loggedInUser: User | null) => {
        setShowSignInForm(false);
        setCurrentUser(loggedInUser);
    };

    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };

    // const allReviews: Review[] = JSON.parse(localStorage.getItem('reviews') || "null");

    // @ts-ignore 
    // const  allReviews : Review[] = useAppSelector((state : ReviewsState) => state.reviews.reviews);

    const [allCars, setAllCars] = useState<StrapiListResponse<StrapiCar>>();
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        const load = async () => {
            try {
                const cars = await loadCarsFromDb();
                setAllCars(cars);
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

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const filteredCars = allCars?.data.filter(car =>
        car.attributes.maker && car.attributes.maker.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <Navbar isLogin={!!currentUser} handleLogOut={handleLogOut} />
            <BannerContainer>
                <BannerContent>
                    <Typography variant="h1" component="h1" color="#fff" fontWeight="bold" gutterBottom>
                        CAR REVIEWS
                    </Typography>
                    <Typography variant="h3" color="#fff" gutterBottom>
                        Find out the car's reliability
                    </Typography>
                    <Typography variant="h3" color="#fff" gutterBottom>
                        Already have a car?
                    </Typography>
                    <Typography variant="h3" color="#fff" gutterBottom>
                        Tell others about it!
                    </Typography>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: '140px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'primary.main',
                        }}
                        onClick={() => {
                            window.scrollBy({
                                top: window.innerHeight * 0.6,
                                behavior: 'smooth',
                            });
                        }}
                    >
                        <KeyboardArrowDown />
                    </IconButton>
                    <Card sx={{position: 'absolute', top: '100px', right: '30px', backgroundColor: '#E0E0E0', alignItems: 'center'}}>
                        <CardContent>
                            <TextField
                                sx={{  backgroundColor: 'white', top: '6px' }}
                                label="Search car"
                                variant="outlined"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                            <SearchIcon sx={{ fontSize: '55px', color: 'disabled' }} />
                        </CardContent>
                    </Card>
                </BannerContent>
            </BannerContainer>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
                    {filteredCars ? filteredCars?.map((car) => (
                        <Grid item xs={3.5}>
                            <Item>
                                <OneCar key={car.id} car={car} />
                            </Item>
                        </Grid>
                    )) : <Typography>Loading...</Typography>
                    }
                    {allCars ? allCars.data.map((car) => (

                        <Grid item xs={3.5}>
                            <Item>
                                <OneCar key={car.id} car={car} />
                            </Item>
                        </Grid>
                    )) : <Typography>Loading...</Typography>
                    }
                </Grid>
            </Box>
        </>
    )
}
export default StartPage;