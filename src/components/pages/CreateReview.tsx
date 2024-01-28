import React, { useState } from "react";
import { loadCars, Car, Model } from "../../api/carsApi";
import { useLoad } from "../../hooks/useLoad";

function CreateReview() {
    const reviewTitle: string = 'create review here';
    const user: string = 'Paul Stown';

    const { data, isLoading } = useLoad(loadCars);

    const [selectedCar, setSelectedCar] = useState<string>(""); 
    const [selectedModel, setSelectedModel] = useState<string>("");
    const fuelTypes: string[] = ["gasoline", "diesel", "gas", "electro"];

    const releaseYear: string = "year";

    type Issue = {issue: string, yearOfExploitation: number, mileage: number, description: string };
    const addIssue: Issue = {issue: "issue", yearOfExploitation: 5, mileage: 80000, description: "textOfDescription" };

    const generalImpressionAboutCar: string = "textField";

    return (
        <>
            {reviewTitle}<br></br>
            {user}
            <div>
                <label>
                    Select Car:
                    <select
                        value={selectedCar}
                        onChange={(e) => setSelectedCar(e.target.value)}
                    >
                        <option value="">Select Car</option>
                        {data.map((auto) => (
                            <option key={auto.id} value={auto.name}>
                                {auto.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                <label>
                    Select Model:
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <option value="">Select Model</option>
                        {selectedCar &&
                            data
                                .find((auto) => auto.name === selectedCar)
                                ?.models.map((model) => (
                                    <option key={model.id} value={model.name}>
                                        {model.name}
                                    </option>
                                ))}
                    </select>
                </label>
            </div>

            <div>
                <p>Selected Car: {selectedCar}</p>
                <p>Selected Model: {selectedModel}</p>
            </div>
        </>
    )
}
export default CreateReview;