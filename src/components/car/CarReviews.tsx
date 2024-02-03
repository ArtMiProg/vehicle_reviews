import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "../review/ReviewComponent";
import { User } from "../AuthContext";
import { Car } from "./CarComponent";
// ... other imports

function CarReviews() {
    const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    const car: Car | undefined = user.cars.find((car) => car.id === carId);
    console.log(car)
    const reviews = car?.reviews;
    console.log(reviews)
    return (
        <div>
            <h2>Reviews for {car?.maker} {car?.model} {car?.fuelType} </h2>
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <p>User: {review.user.name}</p>
                        <p>General Impression: {review.generalImpression}</p>
                        {/* TODO */}
                    </div>
                ))
            ) : (
                <p>No reviews available for this car.</p>
            )}
        </div>
    );
}

export default CarReviews;