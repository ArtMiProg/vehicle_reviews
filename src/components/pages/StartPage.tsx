import React, { useState } from "react";
import RegistrationForm from './RegistrationForm';
import SignInForm from "./SingInForm";
import { User } from "../AuthContext";
import { Link} from "react-router-dom";

function StartPage() {

    // const api = 'https://cars-base.ru/api/cars';
    // const lastUpdateApi = (api + "/api/status");
    // const makersAndModels = (api + "/api/cars?full=1")
    // const makers = (api + "/api/cars");
    // const modelsid = (api + "/api/cars/[mark_id]");

    // npm install --save typescript @types/node @types/react-dam @types/jest
    // d5-=FgDvMFt.bxB

    const [showRegistration, setShowRegistration] = useState(false);

    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    );


    const handleSignUpClick = () => {
        setShowRegistration(true);
    };

    const handleRegistrationClose = () => {
        setShowRegistration(false);
    };

    const [showSignInForm, setShowSignInForm] = useState(false);

    const handleSignInClick = () => {
        setShowSignInForm(true);
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



    return (
        <>
            {currentUser ? (
                <div>
                    <p>Welcome, {currentUser.username}! <Link to="/account">Go to account</Link></p>
                    <button onClick={handleLogOut}>Log Out</button>
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
            <button onClick={handleSignUpClick}>Sign up</button>
            {showRegistration && <RegistrationForm onClose={handleRegistrationClose} />}
            <button onClick={handleSignInClick}>Sign In</button>

            {showSignInForm && <SignInForm onClose={(user) => handleSignInClose(user)}/>}
        </>
    )
}
export default StartPage;