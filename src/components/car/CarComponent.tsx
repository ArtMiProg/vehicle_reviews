import { v4 as uuidv4 } from 'uuid';
import { Maker, Model } from '../../api/carsApi';
import { FuelType } from '../../enums/FuelType';
import { Review } from '../review/ReviewComponent';


export interface Car {
  id: string;
  maker: string;
  model: string;
  fuelType: FuelType;
  reviews: Review[];
}

export function createCar(id: string, maker: string, model: string, fuelType: FuelType): Car {
  return {
    id,
    maker,
    model,
    fuelType,
    reviews: [],
  };
}

export function addReviewToCar(car: Car, review: Review): void {
  car.reviews.push(review);
}