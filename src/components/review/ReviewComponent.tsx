import { StrapiReview } from '../../strapi/strapiReview';

import { MenuItem, Rating } from '@mui/material';
import Typography from '@mui/material/Typography';

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
      generalImpression,
      starRating,
    },
  } = props.review;

  return <div>
    <MenuItem
      sx={{
        display: 'block',
        flexDirection: 'column',
        marginTop: 2,
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
        maxWidth: 270,
        overflowWrap: 'break-word',
        backgroundColor: 'white'
      }}>
      <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
        Review Nr {id}<br />
        Created by user Nr {userId}
      </Typography>
      <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
        The car is of {releaseYear} release year
      </Typography>
      <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
        General impression: {generalImpression}
      </Typography>
      <Rating value={starRating} readOnly />
    </MenuItem>
  </div>
}

export interface Review {
  id: string;
  userId: string | number;
  carId: string | undefined;
  releaseYear: string | number;
  generalImpression: string;
  starRating: number;
}

export function createReview(
  id: string,
  userId: string | number,
  carId: string | undefined,
  releaseYear: string | number,
  generalImpression: string,
  starRating: number): Review {
  return {
    id,
    userId,
    carId,
    releaseYear,
    generalImpression,
    starRating,
  };
}

// export function addFaultToReview(review: Review, fault: Fault): void {
//   review.faults.push(fault);
// }