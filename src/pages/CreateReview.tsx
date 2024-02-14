import { Button, InputLabel, Rating, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../AuthContext";
import { Fault } from "../components/fault/FaultComponent";
import Navbar from "../components/navbar/Navbar";
import { loadCarByCarId } from "../strapi/strapiCar";
import { StrapiReview, addReview, addReviewToCar, loadLastReview } from "../strapi/strapiReview";
import { StrapiUser } from "../strapi/strapiUser";

function CreateReview() {
    let { state } = useLocation();
    const car = state;
    const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    const [releaseYear, setReleaseYear] = useState<string | number>("")
    const years: number[] = Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => new Date().getFullYear() - index);
    const [generalImpressionAboutCar, setGeneralImpressionAboutCar] = useState<string>("");
    const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
    const [newReviewId, setNewReviewId] = useState<string>();
    const [carReviews, setCarReviews] = useState<StrapiReview[]>();
    const [idsOfCarReviews, setIdsOfCarReviews] = useState<number[]>([]);
    const [carRating, setCarRating] = useState<number | null>(1);
    const [showRegistration, setShowRegistration] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    );
    const navigate = useNavigate();

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
        navigate('/');
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };
    
    useEffect(() => {
        setReleaseYear(new Date().getFullYear());
    }, []);

    const handleGeneralImpressionSubmit = () => {
        setGeneralImpressionAboutCar(generalImpressionAboutCar);

    };

    useEffect(() => {
        if (idsOfCarReviews.length != 0 && isAddingReview) {
            console.log(idsOfCarReviews)
            const boundReviewToCar = async () => {
                await addReviewToCar(car.id, idsOfCarReviews);
                setIsAddingReview(false);
                navigate("/account");
            }
            boundReviewToCar();
        }
    }
        , [idsOfCarReviews]);

    const loadCarReviews = async () => {
        try {
            const againFilledCar = await loadCarByCarId(car.carId);
            console.log(againFilledCar);
            setCarReviews(againFilledCar.reviews || []);
            if (againFilledCar.reviews) {
                const reviewIds: number[] = againFilledCar.reviews.map(review => review.id)
                setIdsOfCarReviews(reviewIds);
            }
            return againFilledCar.reviews || [];
        } catch (error) {
            console.error('Failed to load car reviews:', error);
        }
    };

    useEffect(() => {
        if (isAddingReview) {
            processReview().then((reviews) => {
                console.log(reviews)
            });
        }
    }, [isAddingReview]);

    useEffect(() => {
        loadCarReviews().then(() => {
            console.log(carReviews)
        });
    }, []);

    const processReview = async () => {
        try {
            if (newReviewId === undefined) {
                return;
            }
            const lastReview = await loadLastReview(newReviewId);
            console.log(lastReview);
            setIdsOfCarReviews(prev => [...prev, lastReview.data[0].id])
        } catch (error) {
            console.error('Failed to load car reviews:', error);
        }
    };

    const handleReviewSubmit = async () => {
        let idForNewReview = uuidv4();
        setNewReviewId(idForNewReview);
        setIsAddingReview(true);
        const reviewObject = {
            userId: `${user.id}`,
            reviewId: idForNewReview,
            carId: car?.carId,
            releaseYear: releaseYear,
            generalImpression: generalImpressionAboutCar,
            starRating: carRating
        }
        await addReview(reviewObject);
    };

    return (
        <Box>
            <Navbar isLogin={!!currentUser} handleLogOut={handleLogOut} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: 400
            }}
                marginTop={2}
                marginLeft={3}
            >
                <Typography>
                    You are creating a review for the car Nr {carId}
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Maker: </span> {car?.maker}
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Model: </span> {car?.model}
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Fuel type: </span> {car?.fuelType}
                </Typography>
                <InputLabel>
                    Indicate the year of production of your car
                </InputLabel>
                <TextField
                    label="Release Year"
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(parseInt(e.target.value))}
                    InputProps={{
                        inputProps: {
                            min: years[years.length - 1],
                            max: years[0]
                        }
                    }}
                    variant="outlined"
                    sx={{
                        maxWidth: 150
                    }}
                />
                <TextField
                    label="General Impression About Car"
                    multiline
                    rows={4}
                    value={generalImpressionAboutCar}
                    onChange={(e) => setGeneralImpressionAboutCar(e.target.value)}
                    variant="outlined"
                    fullWidth
                />

                <Rating
                    name="rating"
                    value={carRating}
                    onChange={(event, newValue) => {
                        setCarRating(newValue);
                    }}
                />
                <Button style={{backgroundColor: '#2196f3', color: '#e3f2fd', width: '170px'}} onClick={handleReviewSubmit}>Submit Review</Button>
            </Box>
        </Box>

    )
}
export default CreateReview;

