import { User } from "@/types/User";
import { ENDPOINTS } from "@/utilities/endpoints";


export async function getCurrentUser(): Promise<User| null> {

    const response  = await fetch(ENDPOINTS.CALLBACK,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if(!response.ok){
        throw new Error("Failed to fetch current user");
    }

    return response.json() as Promise<User | null>;
}