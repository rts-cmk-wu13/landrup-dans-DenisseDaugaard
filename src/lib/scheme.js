import z from "zod"

export const baseScheme = z.object({
    name: z.string().min(3, "Navn skal være mindst 3 karakterer"),
    email:z.email("Ugyldig email adresse"),
    message: z.string().optional(),
})

export const newsLetterScheme = baseScheme.pick({
    email:true,
})