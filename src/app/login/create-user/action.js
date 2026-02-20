"use server";

import { CreateUserScheme } from "@/lib/scheme";
import { postJSON } from "@/lib/dal/general";
import { redirect } from "next/navigation";
import { z } from "zod";

const URL = "http://localhost:4000/api/v1/users";

export async function CreateUser(formData) {
  const inputData = Object.fromEntries(formData.entries());

  const values = {
    name: inputData.name ?? "",
    lastname: inputData.lastname ?? "",
    username: inputData.username ?? "",
    age: inputData.age ?? "",
    password: inputData.password ?? "",
    confirmPassword: inputData.confirmPassword ?? "",
  };

  if(values.password !== values.confirmPassword){
    return {
      values,
      errors: { confirmPassword: "Adgangskoderne matcher ikke" },
    };
  }


  const result = CreateUserScheme.safeParse(inputData);

  if (!result.success) {
    console.log('error');
      return {
          values,
          errors: z.flattenError(result.error).fieldErrors
        }; 
    }
        
    //remove confirmPassword from payload and add a role: "default" before sending to API
        const { confirmPassword, ...res } = result.data;
        const payload = {
             ...res, 
             role: "default" 
            };

        console.log(payload, '☺️');
    

   


//   const response = await postJSON(URL, payload);

//   // Map API errors into form errors
//   if (response?.status === 401) {
//     return {
//       values,
//       errors: { error: "Ugyldigt brugernavn eller adgangskode" },
//     };
//   }

//   if (!response?.data) {
//     return {
//       values,
//       errors: { error: "Der skete en fejl ved indlæsning af data, prøv igen senere." },
//     };
//   }

//   redirect("/login");
}