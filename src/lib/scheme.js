import z from "zod"

export const baseScheme = z.object({
    name: z.string('Indtast venligst dit navn').min(3, "Navn skal være mindst 3 karakterer"),
    lastName: z.string('Indtast venligst dit efternavn').min(3, "Efternavn skal være mindst 3 karakterer"),
    username: z.string('Indtast venligst dit brugernavn').min(3, "Brugernavn skal være mindst 3 karakterer"),
    age: z.number('Indtast venligst din alder'),
    password: z.string('Indtast venligst dit password').min(4, "Password skal være mindst 4 karakterer"),
    email:z.string('Indtast venligst din email').email("Ugyldig email adresse"),
    message: z.string('Indtast venligst din besked').min(10, "Besked skal være mindst 10 karakterer")
})

export const newsLetterScheme = baseScheme.pick({
    email:true,
})

export const contactScheme = baseScheme.pick({
    name:true,
    email:true,
    message:true,
})

export const loginScheme = baseScheme.pick({
    username:true,
    password:true,
})