import React, { useEffect, useState } from "react";
import { loadCars} from "../../api/carsApi";
import { useLoad } from "../../hooks/useLoad";
// import FuelType from "../../enums/FuelType";

function CreateReviewDraft() {
    const reviewTitle: string = 'create review here';
    const user: string = 'Paul Stown';

    const { data, isLoading } = useLoad(loadCars);

    const [selectedCar, setSelectedCar] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    // const fuelTypes: string[] = ["gasoline", "diesel", "gas", "electro"];
    // const [selectedFuelType, setSelectedFuelType] = useState<FuelType | "">("");

    const [releaseYear, setReleaseYear] = useState<string | number>("")
    const years: number[] = Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => new Date().getFullYear() - index);

    useEffect(() => {
        setReleaseYear(new Date().getFullYear());
    }, []);

    interface Issue {
        issue: string,
        yearOfExploitation: number,
        mileage: number,
        description: string
    };

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [newIssue, setNewIssue] = useState<Issue>({
        issue: "",
        yearOfExploitation: 0,
        mileage: 0,
        description: "",
    });
    const [issues, setIssues] = useState<Issue[]>([]);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewIssue((prevIssue) => ({
            ...prevIssue,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIssues((prevIssues) => [...prevIssues, newIssue]);
        setNewIssue({
            issue: "",
            yearOfExploitation: 0,
            mileage: 0,
            description: "",
        });
        toggleForm();
    };

    const [generalImpressionAboutCar, setGeneralImpressionAboutCar] = useState<string>("");
    const handleGeneralImpressionSubmit = () => {
        console.log("General Impression Submitted:", generalImpressionAboutCar);
    };

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
                <br />
                <label>
                    Release Year:
                    <select
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(parseInt(e.target.value))}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                {/* <label>
                    Fuel Type:
                    <select
                        value={selectedFuelType}
                        onChange={(e) => setSelectedFuelType(e.target.value as FuelType)}
                    >
                        <option value="">Select Fuel Type</option>
                        {Object.values(FuelType).map((fuelType) => (
                            <option key={fuelType} value={fuelType}>
                                {fuelType}
                            </option>
                        ))}
                    </select>
                </label> */}
                <br></br>
                {!isFormOpen ? <button onClick={toggleForm}>Add an Issue</button> : undefined}
                {isFormOpen && (
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Issue:
                            <input
                                type="text"
                                name="issue"
                                value={newIssue.issue}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Year of Exploitation:
                            <input
                                type="number"
                                name="yearOfExploitation"
                                value={newIssue.yearOfExploitation}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Mileage:
                            <input
                                type="number"
                                name="mileage"
                                value={newIssue.mileage}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={newIssue.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <button type="submit">Add an Issue</button>
                    </form>
                )}
            </div>
            <div>
                <p>Selected Car: {selectedCar}</p>
                <p>Selected Model: {selectedModel}</p>
                <p>Selected Release year: {releaseYear}</p>
                {/* <p>Selected Fuel type: {selectedFuelType}</p> */}
            </div>
            <div>
                {issues.map((issue, index) => (
                    <div key={index}>
                        <h3>{issue.issue}</h3>
                        <p>{`Issue: ${issue.issue}`}</p>
                        <p>{`Year of Exploitation: ${issue.yearOfExploitation}`}</p>
                        <p>{`Mileage: ${issue.mileage}`}</p>
                        <p>{`Description: ${issue.description}`}</p>
                        <hr />
                    </div>
                ))}
            </div>
            <textarea
                value={generalImpressionAboutCar}
                onChange={(e) => setGeneralImpressionAboutCar(e.target.value)}
                placeholder="General Impression About Car"
            />
            {/* Button to submit general impression */}
            <button onClick={handleGeneralImpressionSubmit}>Submit General Impression</button>

            {/* Display general impression */}
            {generalImpressionAboutCar && (
                <div>
                    <p>General Impression:</p>
                    <p>{generalImpressionAboutCar}</p>
                </div>
            )}
        </>
    )
}
export default CreateReviewDraft;