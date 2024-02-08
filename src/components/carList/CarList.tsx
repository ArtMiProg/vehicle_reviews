import React from 'react';
import { List, ListItem, ListItemText, Button, IconButton, Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Car } from '../car/CarComponent';
import {Link} from "react-router-dom";
import { StrapiCar } from '../../strapi/strapi';

const CarList: React.FC<{ cars: StrapiCar[], onDeleteCar: (carId: string) => void }> = ({ cars, onDeleteCar }) => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    };

    return (
        <List  sx={{ width: '100%', maxWidth: 600 }}>
            {cars.map((car) => (
                <ListItem key={car.id}>
                    <ListItemText
                        primary={`${car.maker} ${car.model} ${car.fuelType}`}
                    />
                    {/*<Typography aria-label="add review" >*/}
                    {/*    <Link to={`/addReview/${car.id}`} style={linkStyle}>Leave a Review</Link>*/}
                    {/*</Typography>*/}
                    {/*<Typography aria-label="view review" >*/}
                    {/*    <Link to={`/viewReviews/${car.id}`} style={linkStyle}>View Reviews</Link>*/}
                    {/*</Typography>*/}
                    <Link to={`/viewReviews/${car.id}`}>
                        <Tooltip title="View a Review">
                            <IconButton aria-label="view review">
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to={`/addReview/${car.id}`}>
                        <Tooltip title="Add a Review">
                            <IconButton aria-label="add review">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title={"Delete car"}>
                        <IconButton aria-label="delete" onClick={() => onDeleteCar(car.carId)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                </ListItem>
            ))}
        </List>
    );
}
// <Link to={`/addReview/${car.id}`}>Leave a Review</Link><br />*/}
{/*      <Link to={`/carReviews/${car.id}`}>View Reviews for this Car</Link><br />*/}
export default CarList;