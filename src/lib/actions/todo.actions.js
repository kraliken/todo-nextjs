"use server"

import axios from 'axios';

const BASE_URL = process.env.BASE_URL

export async function getTodos() {

    try {

        const response = await axios.get(`${BASE_URL}/api/v1/todos`)
        console.log(response.data);
        return response.data

    } catch (error) {
        console.log(error);
        console.log(error.message);
        throw new Error(`Failed to fetch todos: ${error.response?.status || error.message}`)
    }

}