import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "../review/ReviewComponent";
// ... other imports

function CarReviews() {
  const { carId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     // Assuming you have an API function to fetch reviews by carId
//     // Adjust the API call based on your actual implementation
//     const fetchReviews = async () => {
//       try {
//         const response = await api.fetchCarReviews(carId); // Replace with your actual API function
//         setReviews(response.data); // Update based on your API response structure
//       } catch (error) {
//         console.error("Error fetching car reviews", error);
//       }
//     };

//     fetchReviews();
//   }, [carId]);

  return (
    <div>
      <h2>Reviews for the Selected Car</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>User: {review.user.name}</p>
          <p>General Impression: {review.generalImpression}</p>
          {/* Display other review details as needed */}
        </div>
      ))}
    </div>
  );
}

export default CarReviews;