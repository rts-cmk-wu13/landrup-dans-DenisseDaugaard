"use server";

import { CreateUserScheme } from "@/lib/scheme";
import { CreateUserRequest } from "@/lib/dal/users/createUser";
import { z } from "zod";


export async function CreateUser(_, formData) {
  const inputData = Object.fromEntries(formData.entries());
  //console.log(inputData, 'inputData');

  const url = "http://localhost:4000/api/v1/users";
  const values = {
    firstname: inputData.firstname ?? "",
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
    console.log('validation failed ☠️', result.error);
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
        //console.log(payload, '☺️');

    const response = await CreateUserRequest(url, payload);

       if(response.status === 404){ 
          return{
            values,
            serverResponse: { error: "Resource ikke fundet. Kontakt support." }
          }
       }  


      if (!response.ok) {
           //console.log('❌', response);
      return {
              values, 
              serverResponse: { error: response.text || "Der skete en fejl ved oprettelsen af brugeren, prøv igen senere." },
              };
      }


}