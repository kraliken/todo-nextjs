import { z } from "zod/v4";

export const todoFormSchema = z.object({
    title: z
        .string()
        .min(3, 'A feladatnak legalább 3 karakternek kell lennie')
        .max(50, 'A feladat maximum 50 karakter lehet'),
    description: z
        .string()
        .max(500, 'A leírás maximum 500 karakter lehet'),
    category: z.enum(['personal', 'work'], {
        errorMap: () => ({ message: 'A kategória személyes vagy munka lehet' }),
    }),
    deadline: z
        .string({
            required_error: "A határidő kötelező",
            invalid_type_error: "Due date must be a string",
        })
        .min(1, "A határidő kötelező")
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Helytelen dátum formátum",
        })
        .transform((val) => new Date(val)),
});
