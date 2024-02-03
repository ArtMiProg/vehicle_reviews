import { Car } from '../car/CarComponent';
import { Review } from '../review/ReviewComponent';
import {User, UserRole} from '../AuthContext';

export function createUser(id: string, username: string, password: string, name: string, surname: string, role: UserRole): User {
  return {
    id,
    username,
    password,
    name,
    surname,
    role: UserRole.USER,
    cars: [],
    reviews: [],
  };
}

export function addCarToUser(user: User, car: Car): void {
  user.cars.push(car);
}

export function addReviewToUser(user: User, review: Review): void {
  user.reviews.push(review);
}