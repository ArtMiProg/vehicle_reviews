import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Box, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { StrapiCar, StrapiCarResponse } from '../../strapi/strapiCar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { loadSingleCarActions } from '../../actions/loadings';

const CarList: React.FC<{ onDeleteCar: (carId: number) => void }> = ({ onDeleteCar }) => {

    const cars: StrapiCar[] = useSelector((state: RootState) => state.user.userCars);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     loadSingleCarActions(dispatch, car);
    // }, [dispatch, car]);

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
                    <Link to={`/carReviews/${car.id}`} state={car} style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Tooltip title="View a Review">
                                <IconButton aria-label="view review">
                                    <ReviewsIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{'&:hover': {color: 'darkBlue' }}}>
                                See reviews
                            </Typography>
                        </Box>
                    </Link>
                    <Link to={`/addReview/${car.id}`} state={car} style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Tooltip title="Add a Review">
                                <IconButton aria-label="add review">
                                    <TextSnippetIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{'&:hover': {color: 'darkBlue' }}}>
                                Create a review
                            </Typography>
                        </Box>
                    </Link>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Tooltip title={"Delete car"}>
                            <IconButton aria-label="delete" onClick={() => onDeleteCar(car.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{'&:hover': {color: 'darkBlue' }}}>
                            Delete car
                        </Typography>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
}
export default CarList;