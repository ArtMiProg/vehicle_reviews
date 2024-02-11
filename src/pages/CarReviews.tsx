import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { User } from "../AuthContext";
import { StrapiCar, loadCarByCarId } from "../strapi/strapiCar";
import { StrapiReview } from "../strapi/strapiReview";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { MenuItem, Rating } from "@mui/material";
import { StrapiUser, loadUserByUserId } from "../strapi/strapiUser";

function CarReviews() {
    const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    let { state } = useLocation();
    const car: StrapiCar = state;
    console.log(car);
    const [reviews, setReviews] = useState<StrapiReview[]>();
    const [usersWhoAddedReview, setUsersWhoAddedReview] = useState<StrapiUser[]>([]);

    const loadCarReviews = async () => {
        try {
            const againFilledCar = await loadCarByCarId(car.carId);
            console.log(againFilledCar);
            setReviews(againFilledCar.reviews || []);


        } catch (error) {
            console.error('Failed to load car reviews:', error);
        }
    };

    useEffect(() => {
        loadCarReviews().then(() => {
            console.log(reviews)
        });
    }, []);

    useEffect(() => {
        if (reviews) {
            reviews.map(async (review) => {
                const userData = await loadUserByUserId(review.attributes.userId);
                console.log(userData)
                setUsersWhoAddedReview(prev => [...prev, userData]);
                return userData;
            })
        }
    }, [reviews]);

    function handleWriteUserToReviewHeader(userId: string | null) {
        const id: number = Number(userId);
        usersWhoAddedReview.find(user => user.id === id)
        return user.username
    }

    return (
        <Box>
            <Card sx={{ maxWidth: 300, backgroundColor: '#F5F5F5', margin: 3 }}>
                <CardContent sx={{ backgroundColor: '#E0E0E0' }}>
                    <Typography variant="h5" component="div">
                        {car?.maker} {car?.model} {car?.fuelType}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review) => (
                            <MenuItem key={review.id} sx={{
                                display: 'block',
                                flexDirection: 'column',
                                marginTop: 2,
                                border: '1px solid #ccc',
                                padding: '8px',
                                borderRadius: '4px',
                                maxWidth: 270,
                                overflowWrap: 'break-word'
                            }}>
                                <Typography sx={{ backgroundColor: '#E0E0E0'}}>Left by user: {handleWriteUserToReviewHeader(review.attributes.userId)}</Typography>
                                <Typography style={{ whiteSpace: 'pre-wrap' }}>Car is of {review.attributes.releaseYear} release year</Typography>
                                <Typography style={{ whiteSpace: 'pre-wrap' }}>General Impression: {review.attributes.generalImpression}</Typography>
                                <Typography style={{ whiteSpace: 'pre-wrap' }}>My rating for this car:</Typography>
                                <Rating value={review.attributes.starRating} readOnly />
                            </MenuItem>
                        ))
                    ) : (
                        <Typography>No reviews available for this car.</Typography>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
}

export default CarReviews;