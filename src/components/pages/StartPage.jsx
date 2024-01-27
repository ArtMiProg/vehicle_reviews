import { loadCars } from "../../api/carsApi";
import { useLoad } from "../../hooks/useLoad";
import { useState } from "react";

function StartPage() {

    // const api = 'https://cars-base.ru/api/cars';
    // const lastUpdateApi = (api + "/api/status");
    // const makersAndModels = (api + "/api/cars?full=1")
    // const makers = (api + "/api/cars");
    // const modelsid = (api + "/api/cars/[mark_id]");

    const greeting = (
        <>
            <h1>CAR REVIEWS</h1>
            <h2>Find out the reliability of the car</h2>
            <h3>Do you already have a car?<br></br>
                Tell others about it!</h3>
        </>)

    const autosExample = [{ manufacturer: "Audi", model: "A4", year: 2015, mileage: 150000 },
    { manufacturer: "BMW", model: "520", year: 2020, mileage: 70000 }];

    const { data, isLoading } = useLoad(loadCars);

    const [selectedCar, setSelectedCar] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    return (
        <>
            {greeting}
            <div>{autosExample.map(auto => <div>
                manufacturer: {auto.manufacturer},
                model: {auto.model},
                year: {auto.year},
                mileage: {auto.mileage}.
            </div>
            )}
            </div>
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

            {isLoading
                ? "isLoading" :
                <div>
                    Number of cars makers = {data.length};
                    {data.map(auto => <div>
                        {auto.name}
                        {auto.models.map(model => <div>
                            {model.name}
                        </div>)}<br></br>
                    </div>)}
                </div>
            }
        </>
    )
}
export default StartPage;