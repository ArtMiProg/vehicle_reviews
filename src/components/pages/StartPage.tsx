import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StrapiListResponse, StrapiReview, loadCarsFromDb, loadReviews } from "../../strapi/strapi";
import { User } from "../AuthContext";
import Navbar from "../navbar/Navbar";
import { OneReview } from "../review/ReviewComponent";
import { OneCar } from "../car/CarComponent";



function StartPage() {

    // const api = 'https://cars-base.ru/api/cars';
    // const lastUpdateApi = (api + "/api/status");
    // const makersAndModels = (api + "/api/cars?full=1")
    // const makers = (api + "/api/cars");
    // const modelsid = (api + "/api/cars/[mark_id]");

    // npm install --save typescript @types/node @types/react-dam @types/jest
    // d5-=FgDvMFt.bxB

    const navigate = useNavigate();
    const [showRegistration, setShowRegistration] = useState(false);

    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    );


    const handleSignUpClick = () => {
        setShowRegistration(true);
        navigate('/signup')
    };

    const handleRegistrationClose = () => {
        setShowRegistration(false);
    };

    const [showSignInForm, setShowSignInForm] = useState(false);

    const handleSignInClick = () => {
        setShowSignInForm(true);
        navigate('/signin')
    };

    const handleSignInClose = (loggedInUser: User | null) => {
        setShowSignInForm(false);
        setCurrentUser(loggedInUser);
    };


    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };


    const greeting = (
        <>
            <h1>CAR REVIEWS</h1>
            <h2>Find out the reliability of the car</h2>
            <h3>Do you already have a car?<br></br>
                Tell others about it!</h3>
        </>)

    const autosExample = [{ manufacturer: "Audi", model: "A4", year: 2015, mileage: 150000 },
    { manufacturer: "BMW", model: "520", year: 2020, mileage: 70000 }];

    // const allReviews: Review[] = JSON.parse(localStorage.getItem('reviews') || "null");

    // @ts-ignore 
    // const  allReviews : Review[] = useAppSelector((state : ReviewsState) => state.reviews.reviews);

    const [allCars, setAllCars] = useState<StrapiListResponse<StrapiCar>>();
    useEffect(() => {
        const load = async () => {
            try {
                const cars = await loadCarsFromDb();
                setAllCars(cars);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    throw error;
                }
            }
        }
        load();
    }, []);

    return (
        <>
            <Navbar isLogin={!!currentUser} handleLogOut={handleLogOut} />
            {currentUser ? (
                <div>
                    <p>Welcome, {currentUser.username}! <Link to="/account">Go to account</Link></p>
                    {/* <button onClick={handleLogOut}>Log Out</button> */}
                </div>
            ) : null}
            {greeting}
            <div>{autosExample.map(auto => <div>
                manufacturer: {auto.manufacturer},
                model: {auto.model},
                year: {auto.year},
                mileage: {auto.mileage}.
            </div>
            )}
            </div>
          
            {allCars ? allCars.data.map((car) => (
                <OneCar key={car.id} car={car} />
              

            )) : "loading"
            }
        </>
    )
}
export default StartPage;