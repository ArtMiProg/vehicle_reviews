import { StrapiFault, StrapiListResponse } from "./strapi";

const BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

export interface StrapiReview {
    id: number;
    attributes: {
        createdAt: string | null;
        updatedAt: string | null;
        publishedAt: string | null;
        userId: string | null;
        reviewId: string | null;
        carId: string | null;
        releaseYear: string | number;
        faults?: {
            data: StrapiFault[];
        }
        generalImpression: string | null;
        starRating: number;
    }
}

export interface StrapiReviewResponse {
    data: StrapiReview[];

}

export async function loadReviews(): Promise<StrapiListResponse<StrapiReview>> {
    const result = await fetch(`${BASE_URL}/api/reviews?populate=*`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"

    })

    const data = await result.json();

    return data;
}

export async function addReview(
    data: {
        userId: string | null,
        reviewId: string | null,
        carId: string | undefined,
        releaseYear: string | number,
        faults: string[],
        generalImpression: string | null,
        starRating: number | null
    }
): Promise<StrapiListResponse<StrapiReview>> {
    const body = {
        data: {
            ...data,
        }

    };
    console.log(data);
    const res = await fetch(`${BASE_URL}/api/reviews`, {
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

export async function addReviewToCar(carId: number, idsOfCarReviews: number[]): Promise<StrapiListResponse<StrapiReview>> {
    const res = await fetch(`${BASE_URL}/api/cars/${carId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { reviews: idsOfCarReviews } }),
    })
    console.log(res)
    const result = await res.json();
    console.log(result);
    if (result.error) {
        throw new Error(result.error.message);
    }
    return result;
}

export async function loadLastReview(reviewId: string): Promise<StrapiListResponse<StrapiReview>>{
    const result = await fetch(`${BASE_URL}/api/reviews/?filters[reviewId][$eq]=${reviewId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    return data;
} 
