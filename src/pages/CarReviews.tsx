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

function CarReviews() {
    const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    let { state } = useLocation();
    const car: StrapiCar = state;
    console.log(car);
    const [reviews, setReviews] = useState<StrapiReview[]>();

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


    console.log(reviews)

    return (
        <Box>
            <Card sx={{ maxWidth: 300, backgroundColor: '#F5F5F5', margin: 3}}>
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
                                borderRadius: '4px'
                                }}>
                                <Typography sx={{ backgroundColor: '#E0E0E0' }}>Left by user: {review.attributes.userId}</Typography>
                                <Typography>Car is of {review.attributes.releaseYear} release year</Typography>
                                <Typography>General Impression: {review.attributes.generalImpression}</Typography>
                                <Typography>My rating for this car:</Typography>
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