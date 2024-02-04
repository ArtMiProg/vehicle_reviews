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
    console.log(car);
    const allReviews : Review[] = JSON.parse(localStorage.getItem('reviews') || "null");
    const reviews = allReviews.filter(review => review.carId === car?.id);
    console.log(reviews)
    return (
        <div>
            <h2>Reviews for {car?.maker} {car?.model} {car?.fuelType} </h2>
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <p>User: {review.user.name}</p>
                        <p>Car is of {review.releaseYear} release year</p>
                        <p>General Impression: {review.generalImpression}</p>
                        {review.faults.map((fault) => (
                            <div key={fault.id}>
                                <p>The part that fault: {fault.shortDescription}</p>
                                <p>I happened on the {fault.yearOfExploitation} year of exploitation</p>
                                <p>The car past at the moment about {fault.mileage} km</p>
                                <p>The issue was the next: <br /> {fault.detailedDescription}</p>
                            </div>
                        ))}
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