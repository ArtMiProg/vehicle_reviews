import { FuelType } from '../../enums/FuelType';
import { StrapiCar, StrapiCarResponse } from '../../strapi/strapi';
import { OneReview, Review } from '../review/ReviewComponent';

interface CarProps {
  car: StrapiCarResponse;
}

export const OneCar: React.FC<CarProps> = (props) => {
  const {
    id,
    attributes: {
    carId,
    maker,
    model,
    fuelType,
    reviews,
    },
  } = props.car;

  return <div>
    <div>
      Car Nr {id}
    </div>
    <div>
      Internal identifier {carId}
    </div>
    <div>
     Maker {maker} 
    </div>
    <div>
     Model {model} 
    </div>
    <div>
     FuelType {fuelType} 
    </div>
    <div>
      {reviews && reviews.length ? <>
        <div>
          {reviews.map(review => (
            <OneReview key={review.id} review={review}/>
          ))}
        </div>
      </> : "no reviews"
      }
    </div>
    </div>
}

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