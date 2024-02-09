import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
import { StrapiCar, StrapiCarResponse } from '../../strapi/strapi';

const CarList: React.FC<{ cars: StrapiCar[], onDeleteCar: (carId: number) => void }> = ({ cars, onDeleteCar }) => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    };

    return (
        <List sx={{ width: '100%', maxWidth: 600 }}>
            {cars && cars.map((car) => (
                <ListItem key={car.id}>
                    <ListItemText
                        primary={`${car.maker} ${car.model} ${car.fuelType}`}
                    />
                    
                    <Link to={`/carReviews/${car.id}`} state={car}>
                        <Tooltip title="View a Review">
                            <IconButton aria-label="view review">
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to={`/addReview/${car.id}`} state={car}>
                        <Tooltip title="Add a Review">
                            <IconButton aria-label="add review">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title={"Delete car"}>
                        <IconButton aria-label="delete" onClick={() => onDeleteCar(car.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                </ListItem>
            ))}
        </List>
    );
}
export default CarList;