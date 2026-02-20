import z from "zod"

export const baseScheme = z.object({
    firstname: z.string('Indtast venligst dit navn').min(3, "Navn skal være mindst 3 karakterer"),
    lastname: z.string('Indtast venligst dit efternavn').min(3, "Efternavn skal være mindst 3 karakterer"),
    age: z.coerce.number({required_error: "Indtast venligst din alder",invalid_type_error: "Indtast venligst din alder",})
    .int("Alder skal være et helt tal")
    .min(1, "Alder skal være mindst 1"),
    username: z.string('Indtast venligst dit brugernavn').min(3, "Brugernavn skal være mindst 3 karakterer"),
    password: z.string('Indtast venligst dit password').min(4, "Password skal være mindst 4 karakterer"),
    confirmPassword: z.string("Bekræft venligst din adgangskode"),
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

export const CreateUserScheme = baseScheme
  .omit({
    message: true,
    email: true,
  })