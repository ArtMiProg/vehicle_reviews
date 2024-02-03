import { User } from '../AuthContext';
import { Car } from '../car/CarComponent';
import { Fault } from '../fault/FaultComponent';

export interface Review {
  id: string;
  user: User;
  car: Car | undefined;
  releaseYear: string | number;
  faults: Fault[];
  generalImpression: string;
  starRating: number;
}

export function createReview(
  id: string,
  user: User,
  car: Car | undefined,
  releaseYear: string | number,
  faults: Fault[],
  generalImpression: string,
  starRating: number): Review {
  return {
    id,
    user,
    car,
    releaseYear,
    faults,
    generalImpression,
    starRating,
  };
}

export function addFaultToReview(review: Review, fault: Fault): void {
  review.faults.push(fault);
}