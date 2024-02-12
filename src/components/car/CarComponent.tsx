import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, CardActions, CardContent, Grid, Rating } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FuelType } from '../../enums/FuelType';
import { Item } from '../../pages/StartPage';
import { StrapiCarResponse } from '../../strapi/strapiCar';
import { OneReview } from '../review/ReviewComponent';
import { useEffect, useState } from 'react';

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

  const [showReviews, setShowReviews] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  useEffect(() => {
    if (reviews) {
      let totalRating = 0;
      reviews.data.forEach(review => {
        totalRating += review.attributes.starRating;
      });
      const average = totalRating / reviews.data.length;
      setAverageRating(average);
    }
  }, [reviews]);

  return <div>
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" textAlign='left'>
          {maker} {model} {fuelType}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          Average car rating
          <Rating value={averageRating} readOnly />
        </Typography>
        {reviews && reviews.data.length > 0 && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Item sx={{ backgroundColor: '#F5F5F5', mb: 2 }}>
              <OneReview key={reviews.data[0].id} review={reviews.data[0]} />
            </Item>
          </Grid>
        )}

      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={toggleReviews}
          startIcon={<MoreVertIcon />}
          sx={{ backgroundColor: '#E0E0E0', color: '#333333' }}
        >
          {
            showReviews
              ?
              <Typography sx={{ color: '#333333' }}>
                Collapse the rest of reviews
              </Typography>
              :
              <Typography sx={{ color: '#333333' }}>
                Show more reviews
              </Typography>
          }
        </Button>
      </CardActions>
      {showReviews && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', mb: 2 }}>
          {reviews && reviews.data.length ? (
            reviews.data.slice(1).map(review => (
              <Grid item xs={12} sx={{ alignSelf: 'flex-end', mb: 2 }}>
                <Item sx={{ backgroundColor: '#F5F5F5', mb: 2 }}>
                  <OneReview key={review.id} review={review} />
                </Item>
              </Grid>
            ))
          ) : (
            <Typography>No reviews for this car yet</Typography>
          )}
        </Box>
      )}
    </Card>
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