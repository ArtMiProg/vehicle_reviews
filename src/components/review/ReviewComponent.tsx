import Accordion from '@mui/material/Accordion';
import { StrapiReview } from '../../strapi/strapi';
import { User } from '../AuthContext';

import { Fault, OneFault } from '../fault/FaultComponent';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { AccordionDetails } from '@mui/material';

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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>
          Review Nr {reviewId}<br />
          Created by user Nr {userId}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          The car is of {releaseYear} release year
        </Typography>
        <Typography>
          {faults && faults.data.length ? <>
            <div>
              {faults.data.map(fault => (
                <OneFault key={fault.id} fault={fault} />
              ))}
            </div>
          </> : "no faults"
          }
        </Typography>
        <div>
          General impression: {generalImpression}
        </div>
        <div>
          My evaluation: {starRating}
        </div>
      </AccordionDetails>
    </Accordion>
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