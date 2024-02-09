import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { StrapiReview, StrapiUser, addReview, addReviewToCar, loadCarByCarId, loadLastReview } from "../../strapi/strapi";
import CreateFault from "../fault/CreateFault";
import { Fault } from "../fault/FaultComponent";

function CreateReview() {
    let { state } = useLocation();
    const car = state;
    const user: StrapiUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const { carId } = useParams();
    const [releaseYear, setReleaseYear] = useState<string | number>("")
    const years: number[] = Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => new Date().getFullYear() - index);
    const [faults, setFaults] = useState<Fault[]>([]);
    const [isGeneralImpressionOpen, setIsGeneralImpressionOpen] = useState<boolean>(false);
    const [generalImpressionAboutCar, setGeneralImpressionAboutCar] = useState<string>("");
    const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
    const [newReviewId, setNewReviewId] = useState<string>();
    const [carReviews, setCarReviews] = useState<StrapiReview[]>();
    const [idsOfCarReviews, setIdsOfCarReviews] = useState<number[]>([]);
    console.log(idsOfCarReviews)


    useEffect(() => {
        setReleaseYear(new Date().getFullYear());
    }, []);

    const toggleGeneralImpression = () => {
        setIsGeneralImpressionOpen(!isGeneralImpressionOpen);
    };

    const handleGeneralImpressionSubmit = () => {
        setGeneralImpressionAboutCar(generalImpressionAboutCar);
        toggleGeneralImpression();
        localStorage.setItem('generalImpression', JSON.stringify(generalImpressionAboutCar));
    };

    const navigate = useNavigate();
    //@ts-ignore
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     loadReviewsActions(dispatch, reviews);
    // }, [dispatch, reviews]);

    
    useEffect(() => {
        if (idsOfCarReviews.length != 0 && isAddingReview) {
            console.log(idsOfCarReviews)
            const boundReviewToCar = async () => {
                await addReviewToCar(car.id, idsOfCarReviews);
                setIsAddingReview(false);
                navigate("/account");
            }
            boundReviewToCar();
        }
    }
        , [idsOfCarReviews]);

    const loadCarReviews = async () => {
        try {
            const againFilledCar = await loadCarByCarId(car.carId);
            console.log(againFilledCar);
            setCarReviews(againFilledCar.reviews || []);
            if (againFilledCar.reviews) {
                const reviewIds: number[] = againFilledCar.reviews.map(review => review.id)
                setIdsOfCarReviews(reviewIds);
            }
            return againFilledCar.reviews || [];
        } catch (error) {
            console.error('Failed to load car reviews:', error);
        }
    };

    useEffect(() => {
        if (isAddingReview) {
            processReview().then((reviews) => {
                console.log(reviews)
            });
        }
    }, [isAddingReview]);

    useEffect(() => {
        loadCarReviews().then(() => {
            console.log(carReviews)
        });
    }, []);

    const processReview = async () => {
        try {
            if (newReviewId === undefined) {
                return;
            }
            const lastReview = await loadLastReview(newReviewId);
            console.log(lastReview);
            setIdsOfCarReviews(prev => [...prev, lastReview.data[0].id])
        } catch (error) {
            console.error('Failed to load car reviews:', error);
        }
    };

    const handleReviewSubmit = async () => {
        let idForNewReview = uuidv4();
        setNewReviewId(idForNewReview);
        setIsAddingReview(true);
        const reviewObject = {
            userId: `${user.id}`,
            reviewId: idForNewReview,
            carId: car?.carId,
            releaseYear: releaseYear,
            //TODO
            faults: ['14', '15'],
            generalImpression: generalImpressionAboutCar,
            starRating: 4
        }
        await addReview(reviewObject);
    };
    //async function handleReviewSubmit() {

    //@ts-ignore
    // dispatch(actions.reviews.loadReviews(updatedReviews));
    // localStorage.setItem('reviews', JSON.stringify(reviews));
    // navigate("/account");


    // setIsAddingReview(true);

    //};
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
            <CreateFault />
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