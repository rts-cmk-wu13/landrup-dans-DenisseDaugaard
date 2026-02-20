"use server";

import { CreateUserScheme } from "@/lib/scheme";
import { CreateUserRequest } from "@/lib/dal/users/createUser";
import { z } from "zod";

const url = "http://localhost:4000/api/v1/users";

export async function CreateUser(_, formData) {
  const inputData = Object.fromEntries(formData.entries());
  console.log(inputData, 'inputData');

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
    //console.log('error');
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

        if (!response.ok) {
           // console.log('something went wrong !! ☠️');
        return {
            ok: false,
            status: response.status,
            serverResponse: { error: response.data?.message || "Der skete en fejl ved oprettelse af brugeren, prøv igen senere." },
        };
        }
 

        if (!response?.data) {
                //console.log('no data recived from the server');
            return {
            values,
            serverResponse: { error: "Der skete en fejl ved indlæsning af data, prøv igen senere." },
            };
        }else{
                //console.log("now you have  a user !! ");
            
            return{
                ok: true,
               serverResponse: { success: "Brugeren blev oprettet, du bliver nu omdirigeret til login siden" }
            }
        }

}