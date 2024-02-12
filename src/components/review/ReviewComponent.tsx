import Accordion from '@mui/material/Accordion';
import { StrapiFault } from '../../strapi/strapi';
import { StrapiReview } from '../../strapi/strapiReview'
import { User } from '../../AuthContext';

import { Fault, OneFault } from '../fault/FaultComponent';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { AccordionDetails, MenuItem, Rating } from '@mui/material';

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