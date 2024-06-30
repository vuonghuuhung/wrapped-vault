import axios, { AxiosInstance } from 'axios';

export class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.BE_URL || 'http://localhost:3001',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

const http = new Http().instance;

export default http;
