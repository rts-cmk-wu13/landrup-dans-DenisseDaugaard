import z from "zod"

export const instructorScheme = z.object({
    file: z.file().min(1, "Vælg venligst en fil").max(5 * 1024 * 1024, "Filen må ikke være større end 5MB"),
    name: z.string('Indtast venligst dit navn').min(3, "Navn skal være mindst 3 karakterer"),
    description: z.string('Indtast venligst en beskrivelse').min(10, "Beskrivelse skal være mindst 10 karakterer"),
    weekday: z.string('Indtast venligst en ugedag').min(3, "Ugedag skal være mindst 3 karakterer"),
    time: z.string('Indtast venligst et tidspunkt').min(3, "Tidspunkt skal være mindst 3 karakterer"),
    minAge: z.coerce.number({required_error: "Indtast venligst en minimumsalder",
        invalid_type_error: "Indtast venligst en minimumsalder",})
        .int("Minimumsalder skal være et helt tal")
        .min(1, "Minimumsalder skal være mindst 1"),
    maxAge: z.coerce.number({required_error: "Indtast venligst en maksimumsalder",
        invalid_type_error: "Indtast venligst en maksimumsalder",})
         .int("Maksimumsalder skal være et helt tal")
        .min(1, "Maksimumsalder skal være mindst 1"),
    maxParticipants: z.coerce.number({required_error: "Indtast venligst et maksimum antal deltagere",
        invalid_type_error: "Indtast venligst et maksimum antal deltagere",})
        .int("Maksimum antal deltagere skal være et helt tal")
        .min(1, "Maksimum antal deltagere skal være mindst 1"),

})

// validate only what exists
export const updateActivityScheme = instructorScheme.partial().required({ name: true }); // name required, others optional
// if you *don't* want to require name, remove `.required({ name: true })`