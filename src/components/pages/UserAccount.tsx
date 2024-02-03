import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, UserRole } from "../AuthContext";
import { Car } from "../car/CarComponent";
import AddCarForm from "../car/AddCarForm";

function UserAccount() {
  const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [userCars, setUserCars] = useState<Car[]>(user.cars);

  const handleAddCar = (newCar: Car) => {
    const updatedCars = [...userCars, newCar];
    setUserCars(updatedCars);
    const updatedUser = { ...user, cars: updatedCars };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const onDeleteCar = (carId: string) => {
    const updatedCars = user.cars.filter((car) => car.id !== carId);
    setUserCars(updatedCars);
    const updatedUser = { ...user, cars: updatedCars };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
  return (
    <div>
      <h2>User Account</h2>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Username: {user.username}</p>
      <p>You role is: {user.role}</p>
      {user.role === UserRole.ADMIN && (
        <p>
          <Link to="/admin">Admin Panel</Link>
        </p>
      )}
      <p>Your Cars:</p>
      <ul>
        {user.cars.map((car) => (
          <li key={car.id}>
            {car.maker} {car.model} {car.fuelType} - {' '}
            <Link to={`/addReview/${car.id}`}>Leave a Review</Link><br />
            <Link to={`/carReviews/${car.id}`}>View Reviews for this Car</Link><br />
            <button onClick={() => onDeleteCar(car.id)}>Delete Car</button>
          </li>
        ))}
      </ul>
      <AddCarForm onAddCar={handleAddCar} />
      <Link to="/">Return to Start Page</Link>
    </div>
  );
}

export default UserAccount;