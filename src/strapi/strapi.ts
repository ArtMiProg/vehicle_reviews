import { Fault } from "../components/fault/FaultComponent";

const BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

export interface StrapiFault {
    id: number;
    attributes: {
        createdAt: string; // date ISO
        updatedAt: string; // date ISO
        publishedAt: string; // date ISO
        faultId: string;
        shortDescription: string;
        mileage: number;
        yearOfExploitation: string;
        detailedDescription: string;
    }
}

export interface StrapiReview {
    id: number;
    attributes: {
        createdAt: string | null;
        updatedAt: string | null;
        publishedAt: string | null;
        userId: string | null;
        reviewId: string | null;
        carId: string | null;
        releaseYear: string | null;
        faults?: {
            data: StrapiFault[];
        }
        generalImpression: string | null;
        starRating: number;
    }
}

export interface StrapiMetaPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export type StrapiListResponse<T> = {
    data: T[];
    meta: {
        pagination: StrapiMetaPagination;
    }
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

export async function addFault(data:
    {
        faultId: string,
        shortDescription: string,
        mileage: number,
        yearOfExploitation: number,
        detailedDescription: string
    }
): Promise<StrapiListResponse<StrapiFault>> {
    const body = {
        data: {
            ...data,
        }
    };

    const res = await fetch(`${BASE_URL}/api/faults`, {
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

export async function addReview(
    data: {
        userId: string | null,
        reviewId: string | null,
        carId: string | undefined,
        releaseYear: string | number,
        faults: string[],
        generalImpression: string | null,
        starRating: number
    }
) : Promise<StrapiListResponse<StrapiReview>>{
    const body = {
        data: {
            ...data,
        }
    };
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