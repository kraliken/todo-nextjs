"use server"

import axios from 'axios';
import { todoFormSchema } from '../schemas';
import * as z from "zod/v4";

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

export async function createTodo(prevState, formData) {

    const rawFormData = Object.fromEntries(formData);
    const result = todoFormSchema.safeParse(rawFormData);
    console.log(rawFormData);
    if (rawFormData.description === "") {
        rawFormData.description = null;
    }

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {
        await axios.post(`${BASE_URL}/api/v1/todos/create`, rawFormData)

        return {
            success: true,
            message: 'A feladat sikeresen létrehozva!',
            errors: {},
            data: {},
        };
    } catch (error) {
        console.error('Feladat létrehozás hiba:', error);
        return {
            success: false,
            message: 'A feladatot nem sikerült létrehozni',
            errors: {},
            data: rawFormData
        };
    }

}