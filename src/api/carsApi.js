const BASE_URL = "https://cars-base.ru/api/cars";

export async function loadCars() {
    const response = await fetch(`${BASE_URL}?full=1`);
    console.log(response);
    return await response.json();
}