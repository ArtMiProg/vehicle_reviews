import React from "react";

function UserAccount(){
    const fullName = "Sam Witerspoon";
    const username = "TechSmart";
    const usersCar = {car: {maker: "Volkswagen", model: "Passat"}, reviews: ["goodReview ", " badReview"]};

    return (
        <>
        {fullName}<br></br>
        {username}<br></br>
        {usersCar.car.maker} {usersCar.car.model} <br></br>
        {usersCar.reviews}
        </>
    )

}
export default UserAccount;