

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
           
        </>
    )
}
export default StartPage;