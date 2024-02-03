import { User } from '../AuthContext';
import { Car } from '../car/CarComponent';
import { Fault } from '../fault/FaultComponent';

export interface Review {
  id: string;
  user: User;
  carId: string | undefined;
  releaseYear: string | number;
  faults: Fault[];
  generalImpression: string;
  starRating: number;
}

export function createReview(
  id: string,
  user: User,
  carId: string | undefined,
  releaseYear: string | number,
  faults: Fault[],
  generalImpression: string,
  starRating: number): Review {
  return {
    id,
    user,
    carId,
    releaseYear,
    faults,
    generalImpression,
    starRating,
  };
}

export function addFaultToReview(review: Review, fault: Fault): void {
  review.faults.push(fault);
}