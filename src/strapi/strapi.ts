
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

//add user
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
