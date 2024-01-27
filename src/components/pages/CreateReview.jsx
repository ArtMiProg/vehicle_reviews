import React, { useState } from "react";
import { loadCars } from "../../api/carsApi";
import { useLoad } from "../../hooks/useLoad";

function CreateReview() {
    const reviewTitle = 'create review here';
    const user = 'Paul Stown';

    const { data, isLoading } = useLoad(loadCars);

    const [selectedCar, setSelectedCar] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const fuelTypes = ["gasoline", "diesel", "gas", "electro"];

    const releaseYear = "year";

    const addIssue = {issue: "issue", yearOfExploitation: "year", mileage: "mileage", description: "textOfDescription" };

    const generalImpressionAboutCar = "textField";

    return (
        <>
            {reviewTitle}<br></br>
            {user}
            <div>
                {/* First dropdown for car names */}
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

                {/* Second dropdown for car models */}
                <label>
                    Select Model:
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <option value="">Select Model</option>
                        {/* Only show models if a car is selected */}
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

            {/* Display selected car and model */}
            <div>
                <p>Selected Car: {selectedCar}</p>
                <p>Selected Model: {selectedModel}</p>
            </div>
        </>
    )
}
export default CreateReview;