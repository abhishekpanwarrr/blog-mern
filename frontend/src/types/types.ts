import { ZodType, z } from "zod";

export type FormDataSignup = {
    fullName: string;
    email: string;
    password: string;
};
export type FormDataSignin = {
    email: string;
    password: string;
};

const UserSchemaSignup: ZodType<FormDataSignup> = z
    .object({
        email: z.string().toLowerCase().trim().email("Email is required"),
        fullName: z
            .string().min(3, { message: "Full name should be more then 3 letters" }),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
    })
const UserSchemaSignin: ZodType<FormDataSignin> = z
    .object({
        email: z.string().toLowerCase().trim().email("Email is required"),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
    })

export {
    UserSchemaSignup,
    UserSchemaSignin
}