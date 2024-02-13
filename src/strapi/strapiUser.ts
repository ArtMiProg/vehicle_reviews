import { StrapiListResponse } from "./strapi";
import { StrapiCar } from "./strapiCar";

const BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

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

export async function loadUserCars(userId: number): Promise<StrapiListResponse<StrapiUser>> {
    const response = await fetch(`${BASE_URL}/api/users/${userId}?populate=cars`, {
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

export async function loadUserByUserId(userId: string | null): Promise<StrapiUser> {
    const result = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    return data;
}

export async function loadAllUsers(): Promise<StrapiUser[]> {
    const result = await fetch(`${BASE_URL}/api/users?populate=*`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const data = await result.json();
    return data;
}

export async function deleteUser(id: number): Promise<void>{
    const result = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        redirect: "follow"
    })
    const response = await result.json();
    if (!result.ok) {
        const errorMessage = await result.text(); 
        throw new Error(`Failed to delete user: ${errorMessage}`);
    }
}

export async function changeUsername(id: number, newUsername: string): Promise<StrapiUser> {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating user cars:', error);
        throw error;
    }
}