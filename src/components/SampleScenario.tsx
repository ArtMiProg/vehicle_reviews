import { createUser, addCarToUser, addReviewToUser } from './user/UserComponent';
import {User, UserRole} from './AuthContext'
import { createCar, Car } from './car/CarComponent';
import { createReview, addFaultToReview, Review } from './review/ReviewComponent';
import { createFault, Fault } from './fault/FaultComponent';
import { Maker, Model, FuelType } from '../enums/FuelType';

const user1: User = createUser('1', 'ElliotParker', 'password1', 'Elliot', 'Parker', UserRole.USER);
const user2: User = createUser('2', 'RomanBrown', 'password2', 'Roman', 'Brown', UserRole.USER);

const car1: Car = createCar('1', Maker.Audi, Model.A6, FuelType.Gasoline);
const car2: Car = createCar('2', Maker.BMW, Model.M520, FuelType.Diesel);

addCarToUser(user1, car1);
addCarToUser(user2, car2);

const review1: Review = createReview('1', user1, '2', '2015', [], 'Excellent car!', 5);
const review2: Review = createReview('2', user2, '3', '2015', [], 'Great performance', 4);

addReviewToUser(user1, review1);
addReviewToUser(user2, review2);

const fault1: Fault = createFault('1', 'Brake issue', 50000, 2, 'Brake failed unexpectedly');
const fault2: Fault = createFault('2', 'Engine problem', 80000, 3, 'Engine overheating');

addFaultToReview(review1, fault1);
addFaultToReview(review2, fault2);

console.log('User 1:', user1);
console.log('User 2:', user2);

function SampleScenario() {

  return (
    <div >
      <h2>Sample Scenario</h2>

      <div >
        <h3>User Information</h3>
      
        <p>User 1: {user1.username}</p>
        <p>User 2: {user2.username}</p>

      </div>

      <div >
        <h3>Car Information</h3>
       
        <p>Car 1: {car1.maker} {car1.model}</p>
        <p>Car 2: {car2.maker} {car2.model}</p>
      </div>

      <div >
        <h3>Review Information</h3>
       
        <p>Review 1: {review1.generalImpression}</p>
        <p>Review 2: {review2.generalImpression}</p>
      </div>

      <div >
        <h3>Fault Information</h3>
        <p>Fault 1: {fault1.shortDescription}</p>
        <p>Fault 2: {fault2.shortDescription}</p>
      </div>
    </div>
  );
}

export default SampleScenario;