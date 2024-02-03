import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../AuthContext";
import { Fault } from "../fault/FaultComponent";
import { createReview } from "./ReviewComponent";
import { v4 as uuidv4 } from 'uuid';
import { Car } from "../car/CarComponent";

function CreateReview() {
    const reviewTitle: string = 'create review here';
    const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    const car : Car | undefined = user.cars.find((car) => car.id === carId);
    const [releaseYear, setReleaseYear] = useState<string | number>("")
    const years: number[] = Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => new Date().getFullYear() - index);
    useEffect(() => {
        setReleaseYear(new Date().getFullYear());
    }, []);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [newFault, setNewFault] = useState<Fault>({
        id: "",
        shortDescription: "",
        yearOfExploitation: 0,
        mileage: 0,
        detailedDescription: "",
    });
    const [faults, setFaults] = useState<Fault[]>([]);

    const [isGeneralImpressionOpen, setIsGeneralImpressionOpen] = useState<boolean>(false);
    const [generalImpressionAboutCar, setGeneralImpressionAboutCar] = useState<string>("");

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const toggleGeneralImpression = () => {
        setIsGeneralImpressionOpen(!isGeneralImpressionOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewFault((prevFault) => ({
            ...prevFault,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFaults = [...faults, newFault];
        setFaults(updatedFaults);
        toggleForm();
        console.log("Updated Faults:", updatedFaults);
        localStorage.setItem('faults', JSON.stringify(updatedFaults));
    };
    
    const handleGeneralImpressionSubmit = () => {
        setGeneralImpressionAboutCar(generalImpressionAboutCar);
        toggleGeneralImpression();
        console.log("General Impression:", generalImpressionAboutCar);
        localStorage.setItem('generalImpression', JSON.stringify(generalImpressionAboutCar));
    };
    const navigate = useNavigate();
    const handleReviewSubmit = () => {
        const reviewId = uuidv4();
        // Create a new review object
        const newReview = createReview(reviewId, user, car, releaseYear, faults, generalImpressionAboutCar, 4);
    
        // Save the new review to local storage
        const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
        const updatedReviews = [...existingReviews, newReview];
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    
        navigate("/account");
    };
    return (
        <>
            {carId}
            <br></br>
            {car?.maker} {car?.model} <br></br>
            {car?.fuelType}
            <p>
                Release year: {releaseYear}
                <label>
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
            </p>
            {!isFormOpen ? <button onClick={toggleForm}>Add a Fault</button> : undefined}
            {isFormOpen && (
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Fault:
                        <input
                            type="text"
                            name="shortDescription"
                            value={newFault.shortDescription}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Year of Exploitation:
                        <input
                            type="number"
                            name="yearOfExploitation"
                            value={newFault.yearOfExploitation}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Mileage:
                        <input
                            type="number"
                            name="mileage"
                            value={newFault.mileage}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea
                            name="detailedDescription"
                            value={newFault.detailedDescription}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Add a Fault</button>
                </form>
            )}

            <button onClick={toggleGeneralImpression}>
                {isGeneralImpressionOpen ? 'Cancel General Impression' : 'Add General Impression'}
            </button>

            {isGeneralImpressionOpen && (
                <div>
                    <textarea
                        value={generalImpressionAboutCar}
                        onChange={(e) => setGeneralImpressionAboutCar(e.target.value)}
                        placeholder="General Impression About Car"
                    />
                    <button onClick={handleGeneralImpressionSubmit}>Submit General Impression</button>
                </div>
            )}
            
            {generalImpressionAboutCar && (
                <div>
                    <p>General Impression:</p>
                    <p>{generalImpressionAboutCar}</p>
                </div>
            )}
            <div>
                {faults.map((fault, index) => (
                    <div key={index}>
                        <h3>{fault.shortDescription}</h3>
                        <p>{`Fault: ${fault.shortDescription}`}</p>
                        <p>{`Year of Exploitation: ${fault.yearOfExploitation}`}</p>
                        <p>{`Mileage: ${fault.mileage}`}</p>
                        <p>{`Description: ${fault.detailedDescription}`}</p>
                        <hr />
                    </div>
                ))}
            </div>
            <button onClick={handleReviewSubmit}>Submit Review</button>
        </>

    )
}
export default CreateReview;