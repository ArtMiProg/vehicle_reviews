import { StrapiListResponse } from "./strapi";
import { StrapiReview, StrapiReviewResponse } from "./strapiReview";

const BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

export interface StrapiCar {
    id: number;
    carId: string;
    maker: string;
    model: string;
    fuelType: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    reviews: StrapiReview[];
}

export interface StrapiCarResponse {
    id: number;
    attributes: {
        carId: string;
        maker: string;
        model: string;
        fuelType: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        reviews: StrapiReviewResponse;
    }
}

export async function addCar(
    data: {
        carId: string;
        maker: string;
        model: string;
        fuelType: string;
    } | undefined
): Promise<StrapiListResponse<StrapiCar>> {
    const body = {
        data: {
            ...data,
        }
    };
    const res = await fetch(`${BASE_URL}/api/cars`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    const result = await res.json();
    if (result.error) {
        throw new Error(result.error.message);
    }
    return result;
}

export async function loadCarsFromDb(): Promise<StrapiListResponse<StrapiCar>> {
    const result = await fetch(`${BASE_URL}/api/cars?populate=reviews`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    return data;
}

export async function loadCarById(id: string): Promise<StrapiCar> {
    const result = await fetch(`${BASE_URL}/api/cars/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    return data;
}

export async function loadCarByCarId(stringId: string): Promise<StrapiCar> {
    const result = await fetch(`${BASE_URL}/api/cars?filters[carId][$eq]=${stringId}&populate=reviews`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    const extractedData = data.data[0];
    console.log(extractedData)
    const { carId, maker, model, fuelType, createdAt, updatedAt, publishedAt } = extractedData.attributes;
    const reviews = extractedData.attributes.reviews.data;
    console.log(reviews);
    const { id } = extractedData;
    const unitedData = { id, carId, maker, model, fuelType, createdAt, updatedAt, publishedAt, reviews };
    return unitedData;
}

export async function deleteCar(id: number): Promise<void>{
    const result = await fetch(`${BASE_URL}/api/cars/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const response = await result.json();
    if (!result.ok) {
        const errorMessage = await result.text(); 
        throw new Error(`Failed to delete car: ${errorMessage}`);
    }
}