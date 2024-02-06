import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../AuthContext";
import { Fault } from "../fault/FaultComponent";
import { Review, createReview } from "./ReviewComponent";
import { v4 as uuidv4 } from 'uuid';
import { Car } from "../car/CarComponent";
import { useDispatch } from "react-redux";
import { loadReviewsActions } from "../../actions/loadings";
import { useAppDispatch } from "../../hooks/hooks";
import { actions } from "../../store";
import { addFault, addReview } from "../../strapi/strapi";

function CreateReview() {
    
    const [reviews, setReviews] = useState<Review[]>([]);
    const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    const car: Car | undefined = user.cars.find((car) => car.id === carId);
    const [releaseYear, setReleaseYear] = useState<string | number>("")
    const years: number[] = Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => new Date().getFullYear() - index);
    const [idsOfFaults, setIdsOfFaults] = useState<string[]>([]);
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

    async function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        // const updatedFaults = [...faults, newFault];
        // setFaults(updatedFaults);

        // console.log("Updated Faults:", updatedFaults);
        // localStorage.setItem('faults', JSON.stringify(updatedFaults));
        const idOfFault = uuidv4();
        try {
            toggleForm();
            await addFault({
                faultId: idOfFault,
                shortDescription: newFault.shortDescription,
                mileage: newFault.mileage,
                yearOfExploitation: newFault.yearOfExploitation,
                detailedDescription: newFault.detailedDescription
            });
            const updatedFaultIds = [...idsOfFaults, idOfFault];
            setIdsOfFaults(updatedFaultIds);
        } catch (error) {
            console.error('Error creating fault:', error);
        }
    };

    const handleGeneralImpressionSubmit = () => {
        setGeneralImpressionAboutCar(generalImpressionAboutCar);
        toggleGeneralImpression();
        localStorage.setItem('generalImpression', JSON.stringify(generalImpressionAboutCar));
    };
    const navigate = useNavigate();
    //@ts-ignore
    const dispatch = useAppDispatch();

    useEffect(() => {
        loadReviewsActions(dispatch, reviews);
    }, [dispatch, reviews]);

    async function handleReviewSubmit() {
        const reviewId = uuidv4();
        const carId: string | undefined = car?.id;
        const newReview = createReview(reviewId, user.id, carId, releaseYear, faults, generalImpressionAboutCar, 4);
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        //@ts-ignore
        // dispatch(actions.reviews.loadReviews(updatedReviews));
        // localStorage.setItem('reviews', JSON.stringify(reviews));
        // navigate("/account");
        try {
            await addReview({
                userId: user.id,
                reviewId: uuidv4(),
                carId: carId,
                releaseYear: releaseYear,
                //TODO
                faults: ['14', '15'],
                generalImpression: generalImpressionAboutCar,
                starRating: 4
            });
            console.log(idsOfFaults);
        } catch (error){
            console.error('error creating review', error);
        }
        navigate("/account");
    };
    return (
        <>
            {carId}
            <br></br>
            {car?.maker} {car?.model} <br></br>
            {car?.fuelType}
            <p>
                Car is of {releaseYear} release year
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

function sendReviewToDb(arg0: { faultId: string; shortDescription: string; mileage: number; yearOfExploitation: number; detailedDescription: string; }) {
    throw new Error("Function not implemented.");
}
