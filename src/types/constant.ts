export interface ResponseProps<T> {
    status?: number;
    message: string;
    data: T;
}

export const API_URL = "http://localhost:8080/MegaCabServiceBackend";
