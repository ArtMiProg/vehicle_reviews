import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { User } from "../AuthContext";
import { StrapiCar, loadCarByCarId } from "../strapi/strapiCar";
import { StrapiReview } from "../strapi/strapiReview";

function CarReviews() {
    const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    let { state } = useLocation();
    const car : StrapiCar= state;
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
        <div>
            <h2>Reviews for {car?.maker} {car?.model} {car?.fuelType} </h2>
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <p>User: {review.attributes.userId}</p>
                        <p>Car is of {review.attributes.releaseYear} release year</p>
                        <p>General Impression: {review.attributes.generalImpression}</p>
                    </div>
                ))
            ) : (
                <p>No reviews available for this car.</p>
            )}
        </div>
    );
}

export default CarReviews;