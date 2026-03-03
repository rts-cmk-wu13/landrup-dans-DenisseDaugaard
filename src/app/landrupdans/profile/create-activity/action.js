import { instructorScheme } from "@/lib/instructorScheme";
import  z  from "zod";

export async function createActivity(prevState, formData) {
   
    const inputData = Object.fromEntries(formData);
    const values = {
        name: inputData.name ?? "",
        description: inputData.description ?? "",
        weekday: inputData.weekday ?? "",
        time: inputData.time ?? "",
        minAge: inputData.minAge ?? "",
        maxAge: inputData.maxAge ?? "",
        maxParticipants: inputData.maxParticipants ?? "",
        file: inputData.file ?? null
    }

    const result = instructorScheme.safeParse(values);

        if (!result.success) {
            console.log('validation failed ☠️', result.error);
            return {
                values,
                errors: z.flattenError(result.error).fieldErrors
            }; 
        } 
        console.log('validation success 😁✅', result.data);
}