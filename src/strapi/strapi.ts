
const BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

export interface StrapiFault {
    id: number;
    attributes: {
        createdAt: string;
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
    reviewId: any;
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

export interface StrapiUser {
    id: number;
    userId: string;
    username: string;
    password: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string,
    updatedAt: string;
    profile_slug: string;
    role: any;
    name: string;
    surname: string;
    cars: StrapiCar[];
}

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
        reviews: StrapiReview[];
    }
}

export interface StrapiMetaPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export type StrapiListResponse<T> = {
    cars: any;
    role: any;
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
        // body: JSON.stringify({cars: carIds.map(id => ({ id })) }),
    })
    console.log(res)
    const result = await res.json();
    console.log(result);
    if (result.error) {
        throw new Error(result.error.message);
    }
    return result;
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
    const result = await fetch(`${BASE_URL}/api/cars?reviews`, {
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
    const result = await fetch(`${BASE_URL}/api/cars/${id}?populate=reviews`, {
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
    const result = await fetch(`${BASE_URL}/api/cars?filters[carId][$eq]=${stringId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    const extractedData = data.data[0];
    console.log(extractedData)
    const { carId, maker, model, fuelType, createdAt, updatedAt, publishedAt, reviews } = extractedData.attributes;
    const { id } = extractedData;
    const unitedData = { id, carId, maker, model, fuelType, createdAt, updatedAt, publishedAt, reviews };
    return unitedData;
}

export async function addUser(
    data: {
        username: string;
        password: string;
        email: string;
        provider: string;
        confirmed: boolean;
        profile_slug: string;
        role: { connect: [{ id: number }] };
        name: string;
        surname: string;

    }): Promise<StrapiListResponse<StrapiUser>> {
    const body = { ...data, };
    //request formate:
    // "username": "LanaIstwood",
    // "password": "555555",
    // "email": "li@gmail.com",
    // "provider": "local",
    // "confirmed": false,
    // "blocked": false,
    // "profile_slug": "lana",
    // "role": {
    //     "connect": [{"id": 2}]
    // },
    // "name": "Lana",
    // "surname": "Istwood"

    const res = await fetch(`${BASE_URL}/api/auth/local/register`, {
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
// POST request:
// {

//     "username": "FionaMay",
//     "password": "555555",
//     "email": "fm@gmail.com",
//     "provider": "local",
//     "confirmed": false,
//     "blocked": false,
//     "profile_slug": "fiona",
// "role": {
//     "connect": [{"id": 1}]
// },
//     "name": "Fiona",
//     "surname": "May"

// }

export async function loadUsers() {

}

export async function loadUserCars(userId: number): Promise<StrapiListResponse<StrapiUser>> {
    const response = await fetch(`http://localhost:1337/api/users/${userId}?populate=cars`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    });
    const data = await response.json();
    return data;
}

export async function loadUserRole(userId: number): Promise<StrapiListResponse<StrapiUser>> {
    const responseRole = await fetch(`${BASE_URL}/api/users/${userId}?populate=role`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await responseRole.json();
    return data;
}

export async function addCarToUser(userId: number, carIds: number[]): Promise<StrapiListResponse<StrapiUser>> {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cars: carIds.map(id => ({ id })) }),
        });
        const result = await response.json();
        console.log(result)
        if (result.error) {
            throw new Error(result.error.message);
        }
        return result;
    } catch (error) {
        console.error('Error updating user cars:', error);
        throw error;
    }
}