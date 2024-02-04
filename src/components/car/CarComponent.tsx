import { FuelType } from '../../enums/FuelType';
import { Review } from '../review/ReviewComponent';


export interface Car {
  id: string;
  maker: string;
  model: string;
  fuelType: FuelType;
}

export function createCar(id: string, maker: string, model: string, fuelType: FuelType): Car {
  return {
    id,
    maker,
    model,
    fuelType,
  };
}

// export function addReviewToCar(car: Car | undefined, review: Review): void {
//   car ? car.reviews.push(review) : console.error("There is no car to add the review to.");
// }