import Accordion from '@mui/material/Accordion';
import { FuelType } from '../../enums/FuelType';
import { StrapiCar, StrapiCarResponse } from '../../strapi/strapi';
import { OneReview, Review } from '../review/ReviewComponent';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Item } from '../../pages/StartPage';

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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>
          {maker} {model} {fuelType}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {reviews && reviews.data.length ?
          <>
            {reviews.data.map(review => (
              <Grid item xs={12}>
                <Item>
                  <OneReview key={review.id} review={review} />
                </Item>
              </Grid>
            ))}
          </> : <Typography>There is no reviews for this car yet</Typography>
        }
      </AccordionDetails>
    </Accordion>
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