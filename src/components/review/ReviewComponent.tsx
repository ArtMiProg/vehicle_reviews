import { StrapiReview } from '../../strapi/strapi';
import { User } from '../AuthContext';

import { Fault, OneFault } from '../fault/FaultComponent';

interface ReviewProps {
  review: StrapiReview;
}

export const OneReview: React.FC<ReviewProps> = (props) => {
  const {
    id,
    attributes: {
      userId,
      reviewId,
      carId,
      releaseYear,
      faults,
      generalImpression,
      starRating,
    },
  } = props.review;

  return <div>
    <div>
      Review Nr {reviewId}
    </div>
    <div>
      Created by user Nr {userId}
    </div>
    <div>
      For the car Nr{carId}
    </div>
    <div>
      of {releaseYear} release year
    </div>
    <div>
      {faults && faults.data.length ? <>
        <div>
          {faults.data.map(fault => (
            <OneFault key={fault.id} fault={fault}/>
          ))}
        </div>
      </> : "no faults"
      }
    </div>
    <div>
      General impression: {generalImpression}
    </div>
    <div>
      My evaluation: {starRating}
    </div>
  </div>
}

export interface Review {
  id: string;
  userId: string | number;
  carId: string | undefined;
  releaseYear: string | number;
  faults: Fault[];
  generalImpression: string;
  starRating: number;
}

export function createReview(
  id: string,
  userId: string | number,
  carId: string | undefined,
  releaseYear: string | number,
  faults: Fault[],
  generalImpression: string,
  starRating: number): Review {
  return {
    id,
    userId,
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