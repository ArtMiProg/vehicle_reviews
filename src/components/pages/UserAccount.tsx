import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, UserRole } from "../AuthContext";
import { Car } from "../car/CarComponent";
import AddCarForm from "../car/AddCarForm";
import { FuelType } from "../../enums/FuelType";

function UserAccount() {
  const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
  const existingCars: Car[] = JSON.parse(localStorage.getItem('cars') || "[]");
  // const [userCars, setUserCars] = useState<Car[]>(user.cars);

  const handleAddCar = (newCar: Car, maker: string, model: string, fuelType: FuelType) => {
    const updatedCars = [...existingCars, newCar];
    // const checkDuplicationUserCar: Car | undefined = userCars.find(car =>
    //   newCar.maker === maker && newCar.model === model && newCar.fuelType === fuelType);
    //   console.log(checkDuplicationUserCar);
  //   const doesCarExist = userCars.some(car => car.maker === maker && car.model === model && car.fuelType === fuelType);
  //   if (!doesCarExist) {
  //     const updatedUserCars = [...userCars, newCar]
  //     setUserCars(updatedUserCars);
  //     const updatedUser = { ...user, cars: updatedUserCars };
  //     localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  //   }
  //   localStorage.setItem('cars', JSON.stringify(updatedCars));
  // };

  // const onDeleteCar = (carId: string) => {
  //   const updatedCars = user.cars.filter((car) => car.id !== carId);
  //   setUserCars(updatedCars);
  //   const updatedUser = { ...user, cars: updatedCars };
  //   localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
      {/* <ul>
        {userCars.map((car) => (
          <li key={car.id}>
            {car.maker} {car.model} {car.fuelType} - {' '}
            <Link to={`/addReview/${car.id}`}>Leave a Review</Link><br />
            <Link to={`/carReviews/${car.id}`}>View Reviews for this Car</Link><br />
            <button onClick={() => onDeleteCar(car.id)}>Delete Car</button>
          </li>
        ))}
      </ul> */}
      <AddCarForm onAddCar={handleAddCar} />
      <Link to="/">Return to Start Page</Link>
    </div>
  );
}

export default UserAccount;