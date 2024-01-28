const BASE_URL = "https://cars-base.ru/api/cars";

export interface Car {
    id: number;
    name: string;
    cyrillicName: string;
    popular: boolean;
    country: string;
    models: Model[];
}

export interface Model {
    id: number;
    name: string;
    cyrillicName: string;
    class: string;
    yearFrom: number;
    yearTo: number;
};

export async function loadCars(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}?full=1`);
    console.log(response);
    return await response.json();
}