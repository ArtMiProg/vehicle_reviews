import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../../store';
import { StrapiCar } from '../../strapi/strapiCar';

const CarList: React.FC<{ onDeleteCar: (carId: number) => void }> = ({ onDeleteCar }) => {

    const cars: StrapiCar[] = useSelector((state: RootState) => state.user.userCars);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteCarId, setDeleteCarId] = useState<number>(0);

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    };

    const handleOpenModal = (carId: number) => {
        setDeleteCarId(carId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
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
                                <Typography sx={{ '&:hover': { color: 'darkBlue' } }}>
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
                                <Typography sx={{ '&:hover': { color: 'darkBlue' } }}>
                                    Create a review
                                </Typography>
                            </Box>
                        </Link>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Tooltip title={"Delete car"}>
                                <IconButton aria-label="delete" onClick={() => handleOpenModal(car.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{ '&:hover': { color: 'darkBlue' } }}>
                                Delete car
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Delete car</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this car?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={() => {onDeleteCar(deleteCarId); setIsModalOpen(false);}}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default CarList;