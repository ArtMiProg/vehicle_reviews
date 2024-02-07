import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Maker, Model, loadCars } from '../../api/carsApi';
import { FuelType } from '../../enums/FuelType';
import { useLoad } from '../../hooks/useLoad';
import { Car, createCar } from './CarComponent';
import { StrapiCar, StrapiListResponse, addCar, loadCarByCarId, loadCarsFromDb } from '../../strapi/strapi';

interface AddCarFormProps {
    onAddCar: (newCar: StrapiCar ) => void;
}

function AddCarForm({ onAddCar }: AddCarFormProps) {

    const { data, isLoading } = useLoad(loadCars);
    const [maker, setMaker] = useState('');
    const [model, setModel] = useState('');
    const [fuelType, setFuelType] = useState<FuelType>(FuelType.Gasoline);
    const [carsInDb, setCarsInDb] = useState<StrapiCar[]>();
    const [newCar, setNewCar] = useState<StrapiCar>();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const loadedCars = await loadCarsFromDb();
        setCarsInDb(loadedCars.data);
        
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
                    await addCar(carObject);
                } catch (error) {
                    console.error('error creating car', error);
                }
                setNewCar(await loadCarByCarId(idForNewCar));                
                console.log(newCar)
                newCar && onAddCar(newCar);
            }
            setMaker('');
            setModel('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Maker:
                <select
                    value={maker}
                    onChange={(e) => setMaker(e.target.value)}
                >
                    <option value="">Select Maker</option>
                    {data.map((auto) => (
                        <option key={auto.id} value={auto.name}>
                            {auto.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Model:
                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                >
                    <option value="">Select Model</option>
                    {maker &&
                        data
                            .find((auto) => auto.name === maker)
                            ?.models.map((model) => (
                                <option key={model.id} value={model.name}>
                                    {model.name}
                                </option>
                            ))}
                </select>
            </label>
            <br />
            <label>
                Fuel Type:
                <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as FuelType)}
                >
                    <option value="">Select Fuel Type</option>
                    {Object.values(FuelType).map((fuelType) => (
                        <option key={fuelType} value={fuelType}>
                            {fuelType}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Car</button>
        </form>
    );
}

export default AddCarForm;