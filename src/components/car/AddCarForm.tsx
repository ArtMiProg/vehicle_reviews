import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadCars } from '../../api/carsApi';
import { FuelType } from '../../enums/FuelType';
import { useLoad } from '../../hooks/useLoad';
import { StrapiCar, addCar, loadCarByCarId, loadCarsFromDb } from '../../strapi/strapiCar';

interface AddCarFormProps {
  onClose: () => void;
  onAddCar: (newCar: StrapiCar) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onAddCar }) => {

  const { data, isLoading } = useLoad(loadCars);
  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [fuelType, setFuelType] = useState<FuelType>(FuelType.Gasoline);
  const [carsInDb, setCarsInDb] = useState<StrapiCar[]>();
  const [newCar, setNewCar] = useState<StrapiCar | undefined>();
  const [newCarId, setNewCarId] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      const { data, meta } = await loadCarsFromDb(currentPage, pageSize);
      setCarsInDb(data);
      setTotalPages(meta.pagination.pageCount);
    } fetchData();
  }, [newCar, currentPage, pageSize]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
    }
};

const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
    }
};

  useEffect(() => {
    async function fetchData() {
      if (newCarId) {
        const newFilledCar = await loadCarByCarId(newCarId);
        setNewCar(newFilledCar);
        if (newFilledCar) {
          onAddCar(newFilledCar);
          onClose();
        }
      }
    } fetchData();
  }, [newCarId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (carsInDb) {
      const existingCar: StrapiCar | undefined = carsInDb.find((car: StrapiCar) =>
        car.maker === maker && car.model === model && car.fuelType === fuelType);
      if (existingCar) {
        onAddCar(existingCar);
      } else {
        const idForNewCar = uuidv4();
        const carObject = {
          carId: idForNewCar,
          maker: maker,
          model: model,
          fuelType: fuelType
        }
        try {
          const addedCar = await addCar(carObject);
          if (addedCar) {
            setNewCarId(idForNewCar);
          }
        } catch (error) {
          console.error('error creating car', error);
        }

      }
      setMaker('');
      setModel('');
      setFuelType(FuelType.None);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Add Car</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details below to add a new car.
        </DialogContentText>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} marginTop={2}>
          <InputLabel>Maker</InputLabel>
          <FormControl fullWidth>
            <Select value={maker} onChange={(e) => setMaker(e.target.value as string)}>
              <MenuItem value="">Select Maker</MenuItem>
              {data.map((auto) => (
                <MenuItem key={auto.id} value={auto.name}>
                  {auto.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel>Model</InputLabel>
          <FormControl fullWidth>
            <Select value={model} onChange={(e) => setModel(e.target.value as string)}>
              <MenuItem value="">Select Model</MenuItem>
              {maker &&
                data
                  .find((auto) => auto.name === maker)
                  ?.models.map((model) => (
                    <MenuItem key={model.id} value={model.name}>
                      {model.name}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <InputLabel>Fuel type</InputLabel>
          <FormControl fullWidth>
            <Select value={fuelType} onChange={(e) => setFuelType(e.target.value as FuelType)}>
              <MenuItem value="">Select Fuel Type</MenuItem>
              {Object.values(FuelType).map((fuelType) => (
                <MenuItem key={fuelType} value={fuelType}>
                  {fuelType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Car</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarForm;