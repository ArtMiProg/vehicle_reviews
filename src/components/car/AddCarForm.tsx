import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadCars } from '../../api/carsApi';
import { FuelType } from '../../enums/FuelType';
import { useLoad } from '../../hooks/useLoad';
import { Car, createCar } from './CarComponent';

interface AddCarFormProps {
    onAddCar: (car: Car) => void;
}

function AddCarForm({ onAddCar }: AddCarFormProps) {

    const { data, isLoading } = useLoad(loadCars);
    const [maker, setMaker] = useState('');
    const [model, setModel] = useState('');
    const [fuelType, setFuelType] = useState<FuelType>(FuelType.Gasoline);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Assume you have a function to generate a unique ID (e.g., generateUniqueId())
        const carId = uuidv4();

        const newCar = createCar(carId, maker, model, fuelType); // Adjust as needed

        onAddCar(newCar);

        // Reset form
        setMaker('');
        setModel('');
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