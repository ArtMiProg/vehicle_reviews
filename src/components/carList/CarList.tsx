import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Box, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
import { StrapiCar, StrapiCarResponse } from '../../strapi/strapiCar';

const CarList: React.FC<{ cars: StrapiCar[], onDeleteCar: (carId: number) => void }> = ({ cars, onDeleteCar }) => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    };

    return (
        <List sx={{ width: '100%', maxWidth: 700 }}>
            {cars && cars.map((car) => (
                <ListItem key={car.id}>
                    <ListItemText
                        primary={`${car.maker} ${car.model} ${car.fuelType}`}
                    />
                    <Link to={`/carReviews/${car.id}`} state={car}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="View a Review">
                                <IconButton aria-label="view review">
                                    <ReviewsIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography>
                                See reviews
                            </Typography>
                        </Box>
                    </Link>
                    <Link to={`/addReview/${car.id}`} state={car}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Add a Review">
                                <IconButton aria-label="add review">
                                    <TextSnippetIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography>
                                Create a review
                            </Typography>
                        </Box>
                    </Link>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Tooltip title={"Delete car"}>
                            <IconButton aria-label="delete" onClick={() => onDeleteCar(car.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography>
                            Delete car
                        </Typography>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
}
export default CarList;