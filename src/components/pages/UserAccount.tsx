import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, UserRole } from "../AuthContext";
import { Car } from "../car/CarComponent";
import AddCarForm from "../car/AddCarForm";
import { FuelType } from "../../enums/FuelType";
import { StrapiCar, StrapiUser, addCar, addCarToUser, loadUserCars, loadUserRole } from "../../strapi/strapi";
import { v4 as uuidv4 } from 'uuid';

function UserAccount() {
  const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [userRole, setUserRole] = useState<string>();
  user.role = userRole;
  const [userCars, setUserCars] = useState<StrapiCar[]>([]);
  const [isAddingCar, setIsAddingCar] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const userWithRole = await loadUserRole(user.id);
        setUserRole(userWithRole.role.name);
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

  useEffect(() => {
    const load = async () => {
      try {
        const ownCars = await loadUserCars(user.id);
        setUserCars(ownCars.cars);
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

  useEffect(() => {
    if(isAddingCar){      
      const updatedUser = { ...user, cars: userCars };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      const idsOfUserCars: number[] = userCars.map(car => car.id);
      console.log(idsOfUserCars)
      const addNewCarToDb = async () => {
        await addCarToUser(user.id, idsOfUserCars);
        setIsAddingCar(false);
      }
      addNewCarToDb();
    }
  }, [isAddingCar])

  async function handleAddCar(newCar: StrapiCar) {

    setUserCars(prev => [...prev, newCar]);
    setIsAddingCar(true);
    

  };

  // const onDeleteCar = (carId: string) => {
  //   const updatedCars = user.cars.filter((car) => car.id !== carId);
  //   setUserCars(updatedCars);
  //   const updatedUser = { ...user, cars: updatedCars };
  //   localStorage.setItem('currentUser', JSON.stringify(updatedUser));


  return (
    <div>
      <h2>User Account</h2>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Username: {user.username}</p>
      <p>You role is: {user.role}</p>
      {/*user.role === UserRole.ADMIN && (
        <p>
          <Link to="/admin">Admin Panel</Link>
        </p>
      )} */}
      <p>Your Cars:</p>
      <ul>
        {userCars && userCars.map((car) => (
          <li key={car.id}>
            {car.maker} {car.model} {car.fuelType} - {' '}
            <Link to={`/addReview/${car.id}`}>Leave a Review</Link><br />
            <Link to={`/carReviews/${car.id}`}>View Reviews for this Car</Link><br />
            {/* <button onClick={() => onDeleteCar(car.id)}>Delete Car</button>  */}
          </li>
        ))}
      </ul>
      <AddCarForm onAddCar={handleAddCar} />
      <Link to="/">Return to Start Page</Link>
    </div>
  );
}

export default UserAccount;